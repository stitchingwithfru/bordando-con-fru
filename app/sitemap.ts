import type { MetadataRoute } from "next";
import { getWebsiteData } from "@/lib/phase1-data";

const siteUrl = "https://stitchingwithfru.com";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/punto-de-cruz",
    "/punto-de-cruz/empezar-punto-de-cruz",
    "/punto-de-cruz/telas-punto-de-cruz",
    "/punto-de-cruz/organizar-hilos",
    "/punto-de-cruz/organizar-proyectos",
    "/punto-de-cruz/errores-comunes-punto-de-cruz",
    "/mis-bordados",
    "/mis-bordados/wips",
    "/sals",
    "/herramientas/seguimiento",
    "/herramientas/inventario",
    "/mis-lecturas",
    "/mis-lecturas/estadisticas",
    "/faq",
    "/contacto",
    "/politica-privacidad",
    "/condiciones-compra",
  ];

  let salRoutes: string[] = [];

  try {
    const data = await getWebsiteData();

    salRoutes = (data.sals || [])
      .filter((sal) => sal.slug)
      .map((sal) => `/sals/${sal.slug}`);
  } catch {
    salRoutes = [];
  }

  const routes = [...staticRoutes, ...salRoutes];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : route === "/punto-de-cruz"
          ? 0.9
          : route === "/mis-bordados"
            ? 0.85
            : route === "/sals"
              ? 0.85
              : route.startsWith("/herramientas")
                ? 0.85
                : route.startsWith("/punto-de-cruz/")
                  ? 0.8
                  : route.startsWith("/mis-bordados/")
                    ? 0.75
                    : route.startsWith("/sals/")
                      ? 0.75
                      : 0.6,
  }));
}