create function public.rollback_website_data_snapshot(
  p_target_snapshot_id uuid,
  p_expected_active_snapshot_id uuid,
  p_expected_target_checksum text
)
returns public.website_data_snapshots
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_active public.website_data_snapshots%rowtype;
  v_target public.website_data_snapshots%rowtype;
begin
  if p_target_snapshot_id is null then
    raise exception 'Rollback target snapshot id is required'
      using errcode = '22023';
  end if;

  if p_expected_active_snapshot_id is null then
    raise exception 'Expected active snapshot id is required'
      using errcode = '22023';
  end if;

  if p_expected_target_checksum is null
     or p_expected_target_checksum !~ '^[0-9a-f]{64}$' then
    raise exception 'Expected rollback checksum must be a lowercase SHA-256'
      using errcode = '22023';
  end if;

  -- Use the same lock namespace as normal activation so both operations serialize.
  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended('public.website_data_snapshots.activate', 0)
  );

  select snapshot.*
    into v_active
    from public.website_data_snapshots as snapshot
   where snapshot.status = 'active'
   for update;

  if not found then
    raise exception 'No active website data snapshot exists'
      using errcode = 'P0002';
  end if;

  if v_active.id <> p_expected_active_snapshot_id then
    raise exception 'Active website data snapshot changed: expected %, found %',
      p_expected_active_snapshot_id,
      v_active.id
      using errcode = '22023';
  end if;

  if p_target_snapshot_id = v_active.id then
    raise exception 'Rollback target % is already active', p_target_snapshot_id
      using errcode = '22023';
  end if;

  select snapshot.*
    into v_target
    from public.website_data_snapshots as snapshot
   where snapshot.id = p_target_snapshot_id
   for update;

  if not found then
    raise exception 'Rollback target snapshot % does not exist', p_target_snapshot_id
      using errcode = 'P0002';
  end if;

  if v_target.status <> 'superseded' then
    raise exception 'Rollback target snapshot % must be superseded', p_target_snapshot_id
      using errcode = '22023';
  end if;

  if v_target.source is distinct from v_active.source then
    raise exception 'Rollback target source % does not match active source %',
      v_target.source,
      v_active.source
      using errcode = '22023';
  end if;

  if v_target.source_checksum <> p_expected_target_checksum then
    raise exception 'Rollback target checksum does not match the expected checksum'
      using errcode = '22023';
  end if;

  if v_target.validated_at is null
     or pg_catalog.jsonb_typeof(v_target.validation_report) is distinct from 'object'
     or v_target.validation_report ->> 'result' is distinct from 'PASS'
     or v_target.validation_report ->> 'contract' is distinct from 'WebsiteData@phase1'
     or v_target.validation_report ->> 'checksum' is distinct from v_target.source_checksum then
    raise exception 'Rollback target snapshot % has an invalid validation report', p_target_snapshot_id
      using errcode = '22023';
  end if;

  if pg_catalog.jsonb_typeof(v_target.validation_report -> 'errors') is distinct from 'array' then
    raise exception 'Rollback target snapshot % has an invalid validation errors collection', p_target_snapshot_id
      using errcode = '22023';
  end if;

  if pg_catalog.jsonb_array_length(v_target.validation_report -> 'errors') <> 0 then
    raise exception 'Rollback target snapshot % contains validation errors', p_target_snapshot_id
      using errcode = '22023';
  end if;

  update public.website_data_snapshots
     set status = 'superseded'
   where id = v_active.id
     and status = 'active';

  if not found then
    raise exception 'Active website data snapshot changed during rollback'
      using errcode = '40001';
  end if;

  update public.website_data_snapshots
     set status = 'active',
         activated_at = pg_catalog.clock_timestamp()
   where id = v_target.id
     and status = 'superseded'
  returning * into v_target;

  if not found then
    raise exception 'Rollback target snapshot changed during rollback'
      using errcode = '40001';
  end if;

  return v_target;
end;
$$;

comment on function public.rollback_website_data_snapshot(uuid, uuid, text) is
  'Explicitly restores a previously active WebsiteData snapshot after verifying the expected active row, source, checksum, and validation report.';

revoke all privileges
  on function public.rollback_website_data_snapshot(uuid, uuid, text)
  from public, anon, authenticated, service_role;

grant execute
  on function public.rollback_website_data_snapshot(uuid, uuid, text)
  to service_role;
