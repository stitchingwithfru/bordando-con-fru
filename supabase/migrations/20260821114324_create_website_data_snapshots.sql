create table public.website_data_snapshots (
  id uuid primary key default gen_random_uuid(),
  version bigint generated always as identity,
  payload jsonb not null,
  source_checksum text not null,
  source text not null,
  captured_at timestamptz not null,
  status text not null default 'pending',
  validation_report jsonb,
  notes text,
  created_at timestamptz not null default now(),
  validated_at timestamptz,
  activated_at timestamptz,
  constraint website_data_snapshots_version_key unique (version),
  constraint website_data_snapshots_version_positive check (version > 0),
  constraint website_data_snapshots_source_not_blank
    check (source = btrim(source) and source <> ''),
  constraint website_data_snapshots_source_checksum_format
    check (source_checksum ~ '^[0-9a-f]{64}$'),
  constraint website_data_snapshots_source_checksum_key
    unique (source, source_checksum),
  constraint website_data_snapshots_status_check
    check (status in ('pending', 'validated', 'active', 'superseded'))
);

comment on table public.website_data_snapshots is
  'Versioned snapshots of the public WebsiteData contract.';

comment on column public.website_data_snapshots.source_checksum is
  'Lowercase hexadecimal SHA-256 of the canonical WebsiteData payload.';

create unique index website_data_snapshots_single_active_idx
  on public.website_data_snapshots (status)
  where status = 'active';

alter table public.website_data_snapshots enable row level security;

revoke all privileges
  on table public.website_data_snapshots
  from public, anon, authenticated, service_role;

grant select (payload)
  on table public.website_data_snapshots
  to anon;

grant select, insert
  on table public.website_data_snapshots
  to service_role;

grant update (
  status,
  validation_report,
  notes,
  validated_at,
  activated_at
)
  on table public.website_data_snapshots
  to service_role;

revoke all privileges
  on sequence public.website_data_snapshots_version_seq
  from public, anon, authenticated, service_role;

grant usage
  on sequence public.website_data_snapshots_version_seq
  to service_role;

create policy "Anonymous users can read the active website data snapshot"
  on public.website_data_snapshots
  for select
  to anon
  using (status = 'active');

create function public.activate_website_data_snapshot(p_snapshot_id uuid)
returns public.website_data_snapshots
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_snapshot public.website_data_snapshots%rowtype;
begin
  -- Serialize every activation attempt without blocking ordinary SELECT queries.
  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended('public.website_data_snapshots.activate', 0)
  );

  select snapshot.*
    into v_snapshot
    from public.website_data_snapshots as snapshot
   where snapshot.id = p_snapshot_id
   for update;

  if not found then
    raise exception 'Website data snapshot % does not exist', p_snapshot_id
      using errcode = 'P0002';
  end if;

  if v_snapshot.status <> 'validated' then
    raise exception 'Website data snapshot % must be validated before activation', p_snapshot_id
      using errcode = '22023';
  end if;

  update public.website_data_snapshots
     set status = 'superseded'
   where status = 'active';

  update public.website_data_snapshots
     set status = 'active',
         activated_at = pg_catalog.clock_timestamp()
   where id = p_snapshot_id
     and status = 'validated'
  returning * into v_snapshot;

  return v_snapshot;
end;
$$;

revoke all privileges
  on function public.activate_website_data_snapshot(uuid)
  from public, anon, authenticated, service_role;

grant execute
  on function public.activate_website_data_snapshot(uuid)
  to service_role;
