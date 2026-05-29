import type { MetadataRoute } from "next";

const siteUrl = "https://stitchingwithfru.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/mi-cuenta",
        "/crear-contrasena",
        "/api/",
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}