begin;

create extension if not exists pgtap with schema extensions;

select plan(22);

insert into public.website_data_snapshots (
  id,
  payload,
  source,
  source_checksum,
  captured_at,
  status,
  validation_report,
  validated_at
)
values
  (
    '00000000-0000-4000-8000-000000000001',
    '{"snapshot":"one"}'::jsonb,
    'test:website-data',
    repeat('a', 64),
    '2026-08-21T10:00:00Z',
    'validated',
    jsonb_build_object(
      'result', 'PASS',
      'contract', 'WebsiteData@phase1',
      'checksum', repeat('a', 64),
      'errors', jsonb_build_array(),
      'warnings', jsonb_build_array()
    ),
    '2026-08-21T10:01:00Z'
  ),
  (
    '00000000-0000-4000-8000-000000000002',
    '{"snapshot":"two"}'::jsonb,
    'test:website-data',
    repeat('b', 64),
    '2026-08-21T11:00:00Z',
    'validated',
    jsonb_build_object(
      'result', 'PASS',
      'contract', 'WebsiteData@phase1',
      'checksum', repeat('b', 64),
      'errors', jsonb_build_array(),
      'warnings', jsonb_build_array()
    ),
    '2026-08-21T11:01:00Z'
  );

select is(
  (public.activate_website_data_snapshot('00000000-0000-4000-8000-000000000001')).status,
  'active',
  'a validated snapshot can be activated'
);

select is(
  (select count(*) from public.website_data_snapshots where status = 'active'),
  1::bigint,
  'the first activation leaves exactly one active snapshot'
);

select is(
  (public.activate_website_data_snapshot('00000000-0000-4000-8000-000000000002')).id,
  '00000000-0000-4000-8000-000000000002'::uuid,
  'a second validated snapshot becomes active'
);

select is(
  (select status from public.website_data_snapshots where id = '00000000-0000-4000-8000-000000000001'),
  'superseded',
  'normal activation supersedes the previous active snapshot'
);

select is(
  (select count(*) from public.website_data_snapshots where status = 'active'),
  1::bigint,
  'normal activation still leaves exactly one active snapshot'
);

select is(
  (
    public.rollback_website_data_snapshot(
      '00000000-0000-4000-8000-000000000001',
      '00000000-0000-4000-8000-000000000002',
      repeat('a', 64)
    )
  ).id,
  '00000000-0000-4000-8000-000000000001'::uuid,
  'rollback restores the explicitly selected superseded snapshot'
);

select is(
  (select status from public.website_data_snapshots where id = '00000000-0000-4000-8000-000000000002'),
  'superseded',
  'rollback supersedes the previously active snapshot'
);

select is(
  (select count(*) from public.website_data_snapshots where status = 'active'),
  1::bigint,
  'rollback leaves exactly one active snapshot'
);

select throws_ok(
  $$
    insert into public.website_data_snapshots (
      payload, source, source_checksum, captured_at, status
    ) values (
      '{"snapshot":"duplicate-active"}'::jsonb,
      'test:website-data',
      repeat('c', 64),
      pg_catalog.clock_timestamp(),
      'active'
    )
  $$,
  '23505',
  null,
  'the partial unique index prevents multiple active snapshots'
);

select throws_ok(
  $$select public.activate_website_data_snapshot('00000000-0000-4000-8000-000000000002')$$,
  '22023',
  null,
  'normal activation rejects a superseded snapshot'
);

insert into public.website_data_snapshots (
  id, payload, source, source_checksum, captured_at, status, validation_report
)
values (
  '00000000-0000-4000-8000-000000000003',
  '{"snapshot":"pending"}'::jsonb,
  'test:website-data',
  repeat('c', 64),
  pg_catalog.clock_timestamp(),
  'pending',
  '{}'::jsonb
);

select throws_ok(
  $$
    select public.rollback_website_data_snapshot(
      '00000000-0000-4000-8000-000000000003',
      '00000000-0000-4000-8000-000000000001',
      repeat('c', 64)
    )
  $$,
  '22023',
  null,
  'rollback rejects a pending target'
);

insert into public.website_data_snapshots (
  id, payload, source, source_checksum, captured_at, status, validation_report, validated_at
)
values (
  '00000000-0000-4000-8000-000000000004',
  '{"snapshot":"validated"}'::jsonb,
  'test:website-data',
  repeat('d', 64),
  pg_catalog.clock_timestamp(),
  'validated',
  jsonb_build_object(
    'result', 'PASS',
    'contract', 'WebsiteData@phase1',
    'checksum', repeat('d', 64),
    'errors', jsonb_build_array()
  ),
  pg_catalog.clock_timestamp()
);

select throws_ok(
  $$
    select public.rollback_website_data_snapshot(
      '00000000-0000-4000-8000-000000000004',
      '00000000-0000-4000-8000-000000000001',
      repeat('d', 64)
    )
  $$,
  '22023',
  null,
  'rollback rejects a validated target that was never active'
);

select throws_ok(
  $$
    select public.rollback_website_data_snapshot(
      '00000000-0000-4000-8000-000000000001',
      '00000000-0000-4000-8000-000000000001',
      repeat('a', 64)
    )
  $$,
  '22023',
  null,
  'rollback rejects the snapshot that is already active'
);

select throws_ok(
  $$
    select public.rollback_website_data_snapshot(
      '00000000-0000-4000-8000-000000000002',
      '00000000-0000-4000-8000-000000000099',
      repeat('b', 64)
    )
  $$,
  '22023',
  null,
  'rollback rejects a stale expected active snapshot id'
);

select throws_ok(
  $$
    select public.rollback_website_data_snapshot(
      '00000000-0000-4000-8000-000000000002',
      '00000000-0000-4000-8000-000000000001',
      repeat('f', 64)
    )
  $$,
  '22023',
  null,
  'rollback rejects an unexpected target checksum'
);

insert into public.website_data_snapshots (
  id, payload, source, source_checksum, captured_at, status,
  validation_report, validated_at, activated_at
)
values
  (
    '00000000-0000-4000-8000-000000000005',
    '{"snapshot":"other-source"}'::jsonb,
    'other:website-data',
    repeat('e', 64),
    pg_catalog.clock_timestamp(),
    'superseded',
    jsonb_build_object(
      'result', 'PASS',
      'contract', 'WebsiteData@phase1',
      'checksum', repeat('e', 64),
      'errors', jsonb_build_array()
    ),
    pg_catalog.clock_timestamp(),
    pg_catalog.clock_timestamp()
  ),
  (
    '00000000-0000-4000-8000-000000000006',
    '{"snapshot":"invalid-report"}'::jsonb,
    'test:website-data',
    repeat('f', 64),
    pg_catalog.clock_timestamp(),
    'superseded',
    jsonb_build_object(
      'result', 'FAIL',
      'contract', 'WebsiteData@phase1',
      'checksum', repeat('f', 64),
      'errors', jsonb_build_array()
    ),
    pg_catalog.clock_timestamp(),
    pg_catalog.clock_timestamp()
  ),
  (
    '00000000-0000-4000-8000-000000000007',
    '{"snapshot":"validation-errors"}'::jsonb,
    'test:website-data',
    repeat('0', 64),
    pg_catalog.clock_timestamp(),
    'superseded',
    jsonb_build_object(
      'result', 'PASS',
      'contract', 'WebsiteData@phase1',
      'checksum', repeat('0', 64),
      'errors', jsonb_build_array(jsonb_build_object('code', 'TEST_ERROR'))
    ),
    pg_catalog.clock_timestamp(),
    pg_catalog.clock_timestamp()
  );

select throws_ok(
  $$
    select public.rollback_website_data_snapshot(
      '00000000-0000-4000-8000-000000000005',
      '00000000-0000-4000-8000-000000000001',
      repeat('e', 64)
    )
  $$,
  '22023',
  null,
  'rollback rejects a snapshot from a different source'
);

select throws_ok(
  $$
    select public.rollback_website_data_snapshot(
      '00000000-0000-4000-8000-000000000006',
      '00000000-0000-4000-8000-000000000001',
      repeat('f', 64)
    )
  $$,
  '22023',
  null,
  'rollback rejects a failed validation report'
);

select throws_ok(
  $$
    select public.rollback_website_data_snapshot(
      '00000000-0000-4000-8000-000000000007',
      '00000000-0000-4000-8000-000000000001',
      repeat('0', 64)
    )
  $$,
  '22023',
  null,
  'rollback rejects a validation report containing errors'
);

select throws_ok(
  $$
    select public.rollback_website_data_snapshot(
      '00000000-0000-4000-8000-000000000099',
      '00000000-0000-4000-8000-000000000001',
      repeat('9', 64)
    )
  $$,
  'P0002',
  null,
  'rollback rejects a missing target snapshot'
);

select ok(
  not has_function_privilege(
    'anon',
    'public.rollback_website_data_snapshot(uuid,uuid,text)',
    'EXECUTE'
  ),
  'anon cannot execute rollback'
);

select ok(
  not has_function_privilege(
    'authenticated',
    'public.rollback_website_data_snapshot(uuid,uuid,text)',
    'EXECUTE'
  ),
  'authenticated cannot execute rollback'
);

select ok(
  has_function_privilege(
    'service_role',
    'public.rollback_website_data_snapshot(uuid,uuid,text)',
    'EXECUTE'
  ),
  'service_role can execute rollback'
);

select * from finish();

rollback;
