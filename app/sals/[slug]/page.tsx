import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getWebsiteData,
  type SalDisenoItem,
  type SalItem,
} from "@/lib/phase1-data";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatDate(value?: string) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function getStatusLabel(status: string) {
  const normalized = status.trim().toLowerCase();

  if (normalized === "activo") return "Activo";
  if (normalized === "próximo" || normalized === "proximo") return "Próximo";
  if (normalized === "finalizado") return "Finalizado";

  return status || "SAL";
}

function findSalBySlug(sals: SalItem[], slug: string) {
  return sals.find((sal) => sal.slug === slug);
}

function getSalDesigns(sal: SalItem, designs: SalDisenoItem[]) {
  return designs
    .filter((design) => design.sal_id === sal.id)
    .slice()
    .sort((a, b) => a.orden - b.orden);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const data = await getWebsiteData();
  const sal = findSalBySlug(data.sals || [], slug);

  if (!sal) {
    return {
      title: "SAL no encontrado | Bordando con Fru",
    };
  }

  return {
    title: `${sal.titulo} | Bordando con Fru`,
    description:
      sal.descripcion_corta ||
      "Ficha de Stitch Along de Bordando con Fru con información, diseños y enlace de participación.",
    openGraph: {
      title: `${sal.titulo} | Bordando con Fru`,
      description:
        sal.descripcion_corta || "Ficha de Stitch Along de Bordando con Fru.",
      url: `https://stitchingwithfru.com/sals/${sal.slug}`,
      siteName: "Bordando con Fru",
      locale: "es_ES",
      type: "website",
      images: sal.imagen_principal_url
        ? [
            {
              url: sal.imagen_principal_url,
              alt: sal.titulo,
            },
          ]
        : undefined,
    },
  };
}

export default async function SalDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const data = await getWebsiteData();

  const sal = findSalBySlug(data.sals || [], slug);

  if (!sal) {
    notFound();
  }

  const designs = getSalDesigns(sal, data.salDisenos || []);
  const isActive = sal.estado.trim().toLowerCase() === "activo";

  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#403A36] pt-12 pb-24">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <style>
          {`
            .sal-detail-hero {
              max-width: 1040px;
              margin: 0 auto 64px auto;
              display: grid;
              grid-template-columns: 1.05fr 0.95fr;
              gap: 28px;
              align-items: stretch;
              background: linear-gradient(135deg, #EFE5DE 0%, #FCFAF7 100%);
              border: 1px solid #E8DED8;
              border-radius: 34px;
              padding: 34px;
              box-shadow: 0 12px 30px rgba(64, 58, 54, 0.06);
            }

            .sal-detail-hero-content {
              display: flex;
              flex-direction: column;
              justify-content: center;
              min-width: 0;
            }

            .sal-detail-kicker {
              display: inline-flex;
              align-items: center;
              width: fit-content;
              gap: 8px;
              background: rgba(255,255,255,0.75);
              border: 1px solid #E8DED8;
              border-radius: 999px;
              padding: 7px 14px;
              margin-bottom: 16px;
              color: #8A7C74;
              font-size: 12px;
              font-weight: 700;
              letter-spacing: 0.14em;
              text-transform: uppercase;
            }

            .sal-detail-title {
              margin: 0 0 16px 0;
              font-family: Georgia, serif;
              font-size: 46px;
              line-height: 1.05;
              color: #403A36;
            }

            .sal-detail-intro {
              margin: 0 0 26px 0;
              color: #6F655F;
              font-size: 18px;
              line-height: 1.7;
            }

            .sal-detail-actions {
              display: flex;
              gap: 12px;
              flex-wrap: wrap;
            }

            .sal-detail-button {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              border-radius: 999px;
              padding: 13px 20px;
              font-size: 15px;
              font-weight: 700;
              text-decoration: none;
              background: #FFFFFF;
              color: #403A36;
              border: 1px solid #E8DED8;
            }

            .sal-detail-button.primary {
              background: #403A36;
              color: #FFFFFF;
              border-color: #403A36;
              box-shadow: 0 8px 18px rgba(64, 58, 54, 0.14);
            }

            .sal-detail-hero-image {
              border-radius: 28px;
              overflow: hidden;
              background: #F3ECE7;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 340px;
            }

            .sal-detail-hero-image img {
              width: 100%;
              height: auto;
              display: block;
              object-fit: contain;
            }

            .sal-detail-placeholder {
              width: 86px;
              height: 86px;
              border-radius: 26px;
              background: #FFFFFF;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 40px;
              box-shadow: 0 10px 22px rgba(64, 58, 54, 0.08);
            }

            .sal-detail-layout {
              max-width: 1040px;
              margin: 0 auto;
              display: grid;
              grid-template-columns: 300px 1fr;
              gap: 24px;
              align-items: start;
            }

            .sal-detail-sidebar {
              position: sticky;
              top: 110px;
            }

            .sal-detail-info-card,
            .sal-detail-text-card,
            .sal-detail-join-card {
              background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
              border: 1px solid #E8DED8;
              border-radius: 30px;
              box-shadow: 0 10px 28px rgba(64, 58, 54, 0.06);
            }

            .sal-detail-info-card {
              padding: 26px;
            }

            .sal-detail-info-title,
            .sal-detail-card-title {
              margin: 0 0 18px 0;
              font-family: Georgia, serif;
              font-size: 28px;
              line-height: 1.12;
              color: #403A36;
            }

            .sal-detail-info-list {
              display: grid;
              gap: 14px;
              margin: 0;
            }

            .sal-detail-info-row {
              padding-bottom: 14px;
              border-bottom: 1px solid #E8DED8;
            }

            .sal-detail-info-row:last-child {
              padding-bottom: 0;
              border-bottom: 0;
            }

            .sal-detail-info-label {
              display: block;
              margin-bottom: 5px;
              color: #8A7C74;
              font-size: 11px;
              font-weight: 800;
              letter-spacing: 0.12em;
              text-transform: uppercase;
            }

            .sal-detail-info-value {
              color: #403A36;
              font-size: 15px;
              font-weight: 800;
            }

            .sal-detail-main {
              display: grid;
              gap: 24px;
            }

            .sal-detail-text-card,
            .sal-detail-join-card {
              padding: 32px;
            }

            .sal-detail-text {
              margin: 0;
              color: #6F655F;
              font-size: 16px;
              line-height: 1.8;
              white-space: pre-line;
            }

            .sal-detail-badge-row {
              display: flex;
              align-items: center;
              gap: 10px;
              flex-wrap: wrap;
              margin-bottom: 18px;
            }

            .sal-detail-badge {
              display: inline-flex;
              align-items: center;
              border-radius: 999px;
              padding: 7px 13px;
              font-size: 12px;
              font-weight: 700;
              letter-spacing: 0.12em;
              text-transform: uppercase;
              background: #F3ECE7;
              color: #5F544F;
              border: 1px solid #E8DED8;
            }

            .sal-detail-badge.active {
              background: #E9F0E6;
              color: #5E755C;
              border-color: #DCE8D7;
            }

            .sal-design-grid {
              display: grid;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: 18px;
            }

            .sal-design-card {
              overflow: hidden;
              background: #FFFFFF;
              border: 1px solid #E8DED8;
              border-radius: 26px;
            }

            .sal-design-image {
              min-height: 220px;
              background: #F3ECE7;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
            }

            .sal-design-image img {
              width: 100%;
              height: auto;
              display: block;
              object-fit: contain;
            }

            .sal-design-placeholder {
              width: 70px;
              height: 70px;
              border-radius: 22px;
              background: #FFFFFF;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 32px;
              box-shadow: 0 8px 18px rgba(64, 58, 54, 0.08);
            }

            .sal-design-body {
              padding: 24px;
            }

            .sal-design-title {
              margin: 0 0 10px 0;
              font-family: Georgia, serif;
              font-size: 26px;
              line-height: 1.1;
              color: #403A36;
            }

            .sal-design-text {
              margin: 0 0 14px 0;
              color: #6F655F;
              font-size: 15px;
              line-height: 1.65;
            }

            .sal-design-count {
              margin: 0 0 16px 0;
              color: #403A36;
              font-size: 14px;
              font-weight: 800;
            }

            .sal-detail-join-card {
              display: grid;
              gap: 16px;
            }

            @media (max-width: 900px) {
              .sal-detail-hero {
                grid-template-columns: 1fr;
              }

              .sal-detail-layout {
                grid-template-columns: 1fr;
              }

              .sal-detail-sidebar {
                position: static;
              }
            }

            @media (max-width: 600px) {
              .sal-detail-hero {
                border-radius: 28px;
                padding: 24px 20px;
                margin-bottom: 48px;
              }

              .sal-detail-title {
                font-size: 36px;
              }

              .sal-detail-intro {
                font-size: 16px;
                line-height: 1.65;
              }

              .sal-detail-actions {
                flex-direction: column;
              }

              .sal-detail-button {
                width: 100%;
              }

              .sal-detail-text-card,
              .sal-detail-join-card {
                border-radius: 26px;
                padding: 24px 20px;
              }

              .sal-design-grid {
                grid-template-columns: 1fr;
              }
            }
          `}
        </style>

        <section className="sal-detail-hero">
          <div className="sal-detail-hero-content">
            <div className="sal-detail-kicker">🧵 Stitch Along</div>

            <h1 className="sal-detail-title">{sal.titulo}</h1>

            {sal.descripcion_corta ? (
              <p className="sal-detail-intro">{sal.descripcion_corta}</p>
            ) : null}

            <div className="sal-detail-actions">
              <Link href="/sals" className="sal-detail-button">
                ← Volver a SALs
              </Link>

              {sal.whatsapp_url ? (
                <a
                  href={sal.whatsapp_url}
                  className="sal-detail-button primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Unirme al grupo
                </a>
              ) : null}
            </div>
          </div>

          <div className="sal-detail-hero-image">
            {sal.imagen_principal_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={sal.imagen_principal_url} alt="" />
            ) : (
              <div className="sal-detail-placeholder">🌈</div>
            )}
          </div>
        </section>

        <div className="sal-detail-layout">
          <aside className="sal-detail-sidebar">
            <section className="sal-detail-info-card">
              <h2 className="sal-detail-info-title">Información</h2>

              <div className="sal-detail-info-list">
                <div className="sal-detail-info-row">
                  <span className="sal-detail-info-label">Estado</span>
                  <span className="sal-detail-info-value">
                    {getStatusLabel(sal.estado)}
                  </span>
                </div>

                {sal.tipo ? (
                  <div className="sal-detail-info-row">
                    <span className="sal-detail-info-label">Tipo</span>
                    <span className="sal-detail-info-value">{sal.tipo}</span>
                  </div>
                ) : null}

                {sal.fecha_inicio ? (
                  <div className="sal-detail-info-row">
                    <span className="sal-detail-info-label">Inicio</span>
                    <span className="sal-detail-info-value">
                      {formatDate(sal.fecha_inicio)}
                    </span>
                  </div>
                ) : null}

                {sal.fecha_fin ? (
                  <div className="sal-detail-info-row">
                    <span className="sal-detail-info-label">Fin</span>
                    <span className="sal-detail-info-value">
                      {formatDate(sal.fecha_fin)}
                    </span>
                  </div>
                ) : null}

                <div className="sal-detail-info-row">
                  <span className="sal-detail-info-label">Diseños</span>
                  <span className="sal-detail-info-value">{designs.length}</span>
                </div>
              </div>
            </section>
          </aside>

          <div className="sal-detail-main">
            <section className="sal-detail-text-card">
              <div className="sal-detail-badge-row">
                <span className={`sal-detail-badge ${isActive ? "active" : ""}`}>
                  {getStatusLabel(sal.estado)}
                </span>

                {sal.tipo ? (
                  <span className="sal-detail-badge">{sal.tipo}</span>
                ) : null}
              </div>

              <h2 className="sal-detail-card-title">Sobre este SAL</h2>

              {sal.descripcion_larga ? (
                <p className="sal-detail-text">{sal.descripcion_larga}</p>
              ) : (
                <p className="sal-detail-text">
                  Próximamente añadiré más información sobre este Stitch Along.
                </p>
              )}
            </section>

            <section className="sal-detail-text-card">
              <h2 className="sal-detail-card-title">Diseños participantes</h2>

              {designs.length === 0 ? (
                <p className="sal-detail-text">
                  Todavía no hay diseños publicados para este SAL.
                </p>
              ) : (
                <div className="sal-design-grid">
                  {designs.map((design) => (
                    <article className="sal-design-card" key={design.id}>
                      <div className="sal-design-image">
                        {design.imagen_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={design.imagen_url} alt="" />
                        ) : (
                          <div className="sal-design-placeholder">🧵</div>
                        )}
                      </div>

                      <div className="sal-design-body">
                        <h3 className="sal-design-title">{design.titulo}</h3>

                        {design.descripcion ? (
                          <p className="sal-design-text">
                            {design.descripcion}
                          </p>
                        ) : null}

                        {design.count_info ? (
                          <p className="sal-design-count">
                            {design.count_info}
                          </p>
                        ) : null}

                        {design.enlace_compra ? (
                          <a
                            href={design.enlace_compra}
                            className="sal-detail-button primary"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Ver diseño →
                          </a>
                        ) : null}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            {sal.whatsapp_url ? (
              <section className="sal-detail-join-card">
                <h2 className="sal-detail-card-title">¿Quieres participar?</h2>

                <p className="sal-detail-text">
                  Puedes unirte al grupo específico del SAL para compartir
                  avances, dudas y progreso con el resto de participantes.
                </p>

                <a
                  href={sal.whatsapp_url}
                  className="sal-detail-button primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Unirme al grupo de WhatsApp
                </a>
              </section>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}