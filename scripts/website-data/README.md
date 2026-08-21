# Publicador de WebsiteData

Este directorio separa las tres responsabilidades de la transición:

- `apps-script-extractor.mjs`: adaptador reemplazable para `GET ?mode=website-data`, con redirects, timeout, errores controlados y reintentos limitados.
- `website-data.mjs`: validación runtime, informe, canonicalización determinista y SHA-256.
- `publisher.mjs`: orquestación `prepare`/`activate` y adaptador de repositorio Supabase inyectable.
- `dry-run.mjs`: ejecución local segura sobre `website-data-backup.json`.

## Seguridad de Codex 2A

`prepare` y `activate` usan `dryRun: true` por defecto. Una escritura futura exige simultáneamente `dryRun: false`, `allowRemoteWrites: true` y un repositorio inyectado. El dry-run local no crea un cliente Supabase ni lee credenciales.

El cliente administrativo futuro debe crearse únicamente en servidor mediante la convención existente `createAdminClient()`, que usa `NEXT_PUBLIC_SUPABASE_URL` y `SUPABASE_SECRET_KEY`. La clave privilegiada nunca debe usar un nombre `NEXT_PUBLIC_*`.

## Canonicalización y checksum

La representación canónica ordena recursivamente las claves de cada objeto y conserva exactamente el orden de los arrays y los valores JSON, incluidos `null` y cadenas vacías. `source_checksum` es el SHA-256 hexadecimal en minúsculas de esa representación canónica.

El SHA-256 del archivo bruto incluye detalles de serialización del archivo (espacios, saltos de línea y orden original de claves). Por eso no tiene que coincidir con `source_checksum`.

## Comandos seguros

```bash
npm run website-data:dry-run
npm run test:website-data
```

Ninguno de estos comandos escribe en Supabase.
