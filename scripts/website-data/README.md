# Operaciones de WebsiteData

Este directorio mantiene separadas las responsabilidades de la transición:

- `apps-script-extractor.mjs`: captura temporal desde `GET ?mode=website-data`.
- `website-data.mjs`: contrato, canonicalización determinista y SHA-256.
- `publisher.mjs`: preparación, activación y rollback mediante un repositorio inyectable.
- `operational-guards.mjs`: invariantes de estado, checksum, validación y lectura anónima.
- `bootstrap-real.mjs`: primera carga únicamente; exige una tabla vacía.
- `publish-real.mjs`: publicación normal; deja el candidato `validated` y nunca lo activa.
- `activate-real.mjs`: activa un candidato concreto mediante RPC.
- `rollback-real.mjs`: restaura un `superseded` concreto mediante RPC.
- `check-real.mjs`: comprobación read-only del activo y de la lectura anónima.

## Credenciales

Los comandos remotos se ejecutan exclusivamente en Node:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SECRET_KEY`
- `GOOGLE_APPS_SCRIPT_WEBHOOK_URL` para capturar publicaciones nuevas

`SUPABASE_SECRET_KEY` nunca debe exponerse en una variable `NEXT_PUBLIC_*` ni imprimirse.

## Bootstrap inicial

El bootstrap conserva las comprobaciones históricas de tabla vacía y coincidencia entre dos capturas y el backup aprobado:

```bash
npm run website-data:bootstrap
npm run website-data:bootstrap -- --write-initial-validated-snapshot
```

No debe utilizarse para publicaciones futuras.

## Operación normal

Comprobación read-only:

```bash
npm run website-data:check
```

Captura dos veces, valida, calcula el checksum e inserta o reutiliza un candidato sin cambiar el activo:

```bash
npm run website-data:publish
```

Activación explícita de un `validated`:

```bash
npm run website-data:activate -- \
  --snapshot-id <uuid> \
  --expected-checksum <sha256> \
  --confirm-activate-approved-snapshot
```

Rollback explícito a un `superseded`:

```bash
npm run website-data:rollback -- \
  --snapshot-id <uuid-destino> \
  --expected-active-snapshot-id <uuid-activo-actual> \
  --expected-checksum <sha256-destino> \
  --confirm-rollback-approved-snapshot
```

El rollback comprueba en cliente y base de datos:

- destino `superseded`;
- activo esperado;
- mismo `source`;
- checksum esperado;
- `validation_report.result = PASS`;
- contrato `WebsiteData@phase1`;
- checksum del informe coincidente;
- `errors` presente y vacío.

La activación y el rollback se serializan con el mismo advisory lock. El índice único parcial sigue impidiendo más de un `active`.

## Pruebas

Pruebas Node, sin escrituras remotas:

```bash
npm run test:website-data
npm run website-data:dry-run
```

La prueba SQL está en `supabase/tests/database/website_data_snapshots.test.sql`. Debe ejecutarse únicamente contra una base Supabase local o desechable que tenga aplicadas las migraciones:

```bash
supabase test db supabase/tests/database/website_data_snapshots.test.sql
```

La suite SQL se ejecuta dentro de una transacción y termina con `rollback`. No debe apuntarse al proyecto de producción.

## Estado de despliegue

La migración de rollback es local hasta que exista una autorización separada para aplicarla. Crear los scripts o ejecutar las pruebas Node no cambia `WEBSITE_DATA_SOURCE` ni realiza el cutover.
