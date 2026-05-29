import type { MetadataRoute } from "next";

const siteUrl = "https://stitchingwithfru.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
  "",
  "/punto-de-cruz",
  "/punto-de-cruz/empezar-punto-de-cruz",
  "/punto-de-cruz/telas-punto-de-cruz",
  "/punto-de-cruz/organizar-hilos",
  "/punto-de-cruz/organizar-proyectos",
  "/punto-de-cruz/errores-comunes-punto-de-cruz",
  "/herramientas/seguimiento",
  "/herramientas/inventario",
  "/pedidos/seguimiento",
  "/pedidos/inventario",
  "/mis-lecturas",
  "/estadisticas",
  "/faq",
  "/contacto",
  "/politica-privacidad",
  "/condiciones-compra",
  "/acceso-clientes",
];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : route === "/punto-de-cruz"
          ? 0.9
          : route.startsWith("/herramientas")
            ? 0.85
            : route.startsWith("/punto-de-cruz/")
              ? 0.8
              : 0.6,
  }));
}