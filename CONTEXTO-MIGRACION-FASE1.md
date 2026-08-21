# Migración Fase 1 — Bordando con Fru

## Objetivo

Eliminar el cuello de botella actual de la web sustituyendo Google Apps Script + Google Sheets como fuente de datos pública por Supabase.

## Arquitectura actual post-cutover

Next.js
↓
lib/phase1-data.ts
↓
Supabase `website_data_snapshots`
↓
único snapshot `active`

Google Sheets y Apps Script permanecen temporalmente como fuente editorial y productor de futuras publicaciones, pero ya no forman parte del camino de lectura de la web pública.

## Problemas previos resueltos por el cutover

- Errores 502 en Netlify.
- Cargas lentas.
- Fallos aleatorios.
- Dependencia de Apps Script.
- Algunas páginas fallan porque esperan respuesta externa.

## Estado final Fase 1

Mantener:

- Next.js.
- Netlify.
- Diseño actual.
- Componentes actuales.
- URLs actuales.

El origen público de `WebsiteData` cambió de Apps Script a Supabase sin modificar páginas, componentes, formularios ni endpoints de escritura.


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

## Cierre post-cutover confirmado

El cutover quedó activo en producción el **21 de agosto de 2026 a las 17:19:41 CEST**.

| Evidencia | Valor confirmado |
| --- | --- |
| Deploy de producción | `6a886c6dbce55371648d4f8e` |
| Commit declarado por el deploy CLI | `19bf47f87aca607e4e4815705c5cc44879af7330` |
| Fuente pública | `WEBSITE_DATA_SOURCE=supabase` |
| Snapshot activo | `v7` |
| Snapshot ID | `5b5718a7-2a4c-4ff5-9249-589a6767516d` |
| Checksum activo | `f868476462a4a8d6eb1268396c76059e39c28aaad7b7f11a097a0cdad3d5a983` |
| Rollback de datos | Disponible hacia `v6` |

Apps Script continúa disponible como fallback y como compilador editorial temporal. No se han eliminado sus variables ni los endpoints de escritura existentes.

El flujo operativo separa:

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

La RPC de rollback está aplicada en Supabase remoto mediante la migración `20260821204442_add_website_data_snapshot_rollback`. Solo `service_role` puede ejecutarla y el rollback requiere snapshot destino, snapshot activo esperado, checksum esperado, mismo `source` e informe de validación sin errores.

El destino disponible es `v6`, snapshot `d61e8eb6-25d8-4785-b3e0-624ddeb49fe5`, con checksum `22cadb2be2b3fb93c697f0a1a3909262c821383a106bc68b0607a7e50c290149`. No debe ejecutarse salvo fallo confirmado.
