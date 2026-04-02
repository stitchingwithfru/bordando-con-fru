# Bordando con Fru

Base inicial del proyecto web para publicar en GitHub y Vercel.

## Qué incluye
- Home
- Página de producto: Sistema de Seguimiento de Punto de Cruz
- Página de producto: Sistema de Inventario Profesional
- FAQ
- Contacto
- Formulario de pedido de Seguimiento
- Formulario de pedido de Inventario

## Importante
Esta versión es una base visual y funcional inicial.
Todavía NO está conectada a:
- correo automático real
- base de datos
- PayPal/Bizum real
- registro interno de pedidos

## Cómo usarlo
1. Descarga o descomprime este proyecto.
2. Súbelo a un repositorio de GitHub.
3. Importa ese repositorio en Vercel.
4. Vercel lo desplegará como proyecto Next.js.

## Comandos
npm install
npm run dev
npm run build


## Envío real de formularios

La integración real con Google Apps Script está preparada en el endpoint `app/api/forms/route.ts`.

Para activarla:

1. crea el Web App de Google Apps Script
2. añade las variables de entorno en Vercel
3. vuelve a desplegar

Consulta `google-apps-script/README.md` y `.env.example`.
