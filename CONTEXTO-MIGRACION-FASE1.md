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