# Migración Fase 1 — Bordando con Fru

## Objetivo

Eliminar el cuello de botella actual de la web sustituyendo Google Apps Script + Google Sheets como fuente de datos pública por Supabase.

## Arquitectura actual

Next.js
↓
lib/phase1-data.ts
↓
Google Apps Script Web App
↓
Google Sheets


## Problemas actuales

- Errores 502 en Netlify.
- Cargas lentas.
- Fallos aleatorios.
- Dependencia de Apps Script.
- Algunas páginas fallan porque esperan respuesta externa.

## Objetivo final Fase 1

Mantener:

- Next.js.
- Netlify.
- Diseño actual.
- Componentes actuales.
- URLs actuales.

Cambiar únicamente:

Origen de datos.

Antes:
Google Sheets

Después:
Supabase


## Páginas afectadas principalmente

- /
- /sals
- /sals/[slug]
- /mis-lecturas
- /mis-lecturas/archivo
- /mis-bordados
- /mis-bordados/wips
- /club-de-lectura
- /sitemap.xml


## Restricciones

- Coste 0 €.
- No rehacer la web.
- Prioridad absoluta: estabilidad.
- Hacer migración incremental.

## Checkpoint de endurecimiento operativo local

Supabase remoto ya contiene `website_data_snapshots` y un único snapshot activo, pero el runtime público continúa usando Apps Script. No hay cutover autorizado.

El trabajo local previo al corte separa:

1. **Bootstrap:** primera carga en una tabla vacía, con comparación contra el backup aprobado.
2. **Publicación normal:** dos capturas consecutivas, validación, checksum e inserción/reutilización de un candidato `validated`, sin activarlo.
3. **Activación:** transición transaccional `active → superseded` y `validated → active`.
4. **Rollback:** transición transaccional `active → superseded` y `superseded destino → active`.
5. **Comprobación:** contrato, checksum, exactamente un activo y lectura anónima coincidente.

Comandos operativos:

```bash
npm run website-data:check
npm run website-data:publish
npm run website-data:activate -- --snapshot-id <uuid> --expected-checksum <sha256> --confirm-activate-approved-snapshot
npm run website-data:rollback -- --snapshot-id <uuid-destino> --expected-active-snapshot-id <uuid-activo> --expected-checksum <sha256-destino> --confirm-rollback-approved-snapshot
```

`website-data:publish` prepara contenido pero nunca lo activa. `activate` y `rollback` requieren identificación y confirmación explícitas y realizan una comprobación anónima posterior.

El rollback solo admite un destino `superseded` del mismo `source`, con checksum esperado, informe `PASS` del contrato `WebsiteData@phase1` y sin errores de validación.

La RPC de rollback está definida en una migración aditiva local. Todavía no se ha aplicado al proyecto Supabase remoto y `WEBSITE_DATA_SOURCE` no debe cambiarse hasta completar las pruebas y obtener una autorización de cutover separada.
