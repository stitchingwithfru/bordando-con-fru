import type { Metadata } from "next";
import Link from "next/link";
import {
  getWebsiteData,
  type SalItem,
  type SalDisenoItem,
} from "@/lib/phase1-data";

export const metadata: Metadata = {
  title: "Stitch Alongs | Bordando con Fru",
  description:
    "Stitch Alongs activos y próximos de Bordando con Fru: bordados conjuntos, diseños participantes y enlaces para unirse.",
  openGraph: {
    title: "Stitch Alongs | Bordando con Fru",
    description:
      "Consulta los SALs activos y próximos de Bordando con Fru y únete a los bordados conjuntos.",
    url: "https://stitchingwithfru.com/sals",
    siteName: "Bordando con Fru",
    locale: "es_ES",
    type: "website",
  },
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

function getSalDesignCount(sal: SalItem, designs: SalDisenoItem[]) {
  return designs.filter((design) => design.sal_id === sal.id).length;
}

function getStatusLabel(status: string) {
  const normalized = status.trim().toLowerCase();

  if (normalized === "activo") return "Activo";
  if (normalized === "próximo" || normalized === "proximo") return "Próximo";
  if (normalized === "finalizado") return "Finalizado";

  return status || "SAL";
}

export default async function SalsPage() {
  const data = await getWebsiteData();

  const sals = (data.sals || [])
    .slice()
    .sort((a, b) => a.orden - b.orden);

  const designs = data.salDisenos || [];

  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#403A36] pt-12 pb-24">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <style>
          {`
            .sals-hero {
              max-width: 980px;
              margin: 0 auto 64px auto;
              background: linear-gradient(135deg, #EFE5DE 0%, #FCFAF7 100%);
              border: 1px solid #E8DED8;
              border-radius: 34px;
              padding: 42px 34px;
              box-shadow: 0 12px 30px rgba(64, 58, 54, 0.06);
              text-align: center;
            }

            .sals-kicker {
              display: inline-flex;
              align-items: center;
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

            .sals-title {
              margin: 0 0 16px 0;
              font-family: Georgia, serif;
              font-size: 46px;
              line-height: 1.05;
              color: #403A36;
            }

            .sals-intro {
              max-width: 760px;
              margin: 0 auto 26px auto;
              color: #6F655F;
              font-size: 18px;
              line-height: 1.7;
            }

            .sals-actions {
              display: flex;
              justify-content: center;
              gap: 12px;
              flex-wrap: wrap;
            }

            .sals-button {
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

            .sals-button.primary {
              background: #403A36;
              color: #FFFFFF;
              border-color: #403A36;
              box-shadow: 0 8px 18px rgba(64, 58, 54, 0.14);
            }

            .sals-section {
              max-width: 1040px;
              margin: 0 auto 64px auto;
            }

            .sals-section-heading {
              margin: 0 0 22px 0;
              display: flex;
              align-items: end;
              justify-content: space-between;
              gap: 16px;
              flex-wrap: wrap;
            }

            .sals-section-title {
              margin: 0;
              font-family: Georgia, serif;
              font-size: 34px;
              line-height: 1.12;
              color: #403A36;
            }

            .sals-section-subtitle {
              margin: 8px 0 0 0;
              color: #8A7C74;
              font-size: 15px;
              line-height: 1.6;
            }

            .sals-grid {
              display: grid;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: 22px;
            }

            .sals-card {
              overflow: hidden;
              background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
              border: 1px solid #E8DED8;
              border-radius: 30px;
              box-shadow: 0 10px 28px rgba(64, 58, 54, 0.06);
            }

            .sals-card-image {
              min-height: 260px;
              background: #F3ECE7;
              overflow: hidden;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .sals-card-image img {
              width: 100%;
              height: auto;
              display: block;
              object-fit: contain;
            }

            .sals-card-content {
              padding: 28px;
            }

            .sals-card-header {
              display: flex;
              align-items: center;
              gap: 10px;
              flex-wrap: wrap;
              margin-bottom: 16px;
            }

            .sals-badge {
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

            .sals-badge.active {
              background: #E9F0E6;
              color: #5E755C;
              border-color: #DCE8D7;
            }

            .sals-card-title {
              margin: 0 0 12px 0;
              font-family: Georgia, serif;
              font-size: 32px;
              line-height: 1.12;
              color: #403A36;
            }

            .sals-card-text {
              margin: 0 0 22px 0;
              color: #6F655F;
              font-size: 16px;
              line-height: 1.7;
            }

            .sals-card-info {
              display: grid;
              gap: 10px;
              margin: 0 0 24px 0;
            }

            .sals-card-info p {
              margin: 0;
              color: #6F655F;
              font-size: 15px;
              line-height: 1.55;
            }

            .sals-card-info strong {
              color: #403A36;
            }

            .sals-empty-state {
              max-width: 760px;
              margin: 0 auto;
              background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
              border: 1px dashed #D8B7B0;
              border-radius: 26px;
              padding: 34px;
              box-shadow: 0 10px 24px rgba(64, 58, 54, 0.04);
              text-align: center;
              color: #8A7C74;
              font-size: 16px;
              line-height: 1.6;
            }

            @media (max-width: 900px) {
              .sals-grid {
                grid-template-columns: 1fr;
              }
            }

            @media (max-width: 600px) {
              .sals-hero {
                border-radius: 28px;
                padding: 32px 22px;
                margin-bottom: 48px;
              }

              .sals-title {
                font-size: 36px;
              }

              .sals-intro {
                font-size: 16px;
                line-height: 1.65;
              }

              .sals-actions {
                flex-direction: column;
              }

              .sals-button {
                width: 100%;
              }

              .sals-card {
                border-radius: 26px;
              }

              .sals-card-content {
                padding: 24px 20px;
              }

              .sals-card-image {
                min-height: 220px;
              }

              .sals-card-title {
                font-size: 28px;
              }
            }
          `}
        </style>

        <section className="sals-hero">
          <div className="sals-kicker">🧵 Stitch Alongs</div>

          <h1 className="sals-title">SALs</h1>

          <p className="sals-intro">
            Aquí encontrarás los bordados conjuntos activos y próximos de
            Bordando con Fru. Cada SAL tiene su propia ficha con información,
            diseños participantes y enlace para unirse cuando esté disponible.
          </p>

          <div className="sals-actions">
            <Link href="/punto-de-cruz" className="sals-button">
              ← Volver a Punto de cruz
            </Link>

            <Link href="/mis-bordados" className="sals-button primary">
              Ver mis bordados
            </Link>
          </div>
        </section>

        <section className="sals-section">
          <div className="sals-section-heading">
            <div>
              <h2 className="sals-section-title">SALs disponibles</h2>
              <p className="sals-section-subtitle">
                Bordados conjuntos organizados por Bordando con Fru, con
                diseños, fechas y enlaces de participación.
              </p>
            </div>
          </div>

          {sals.length === 0 ? (
            <div className="sals-empty-state">
              Todavía no hay Stitch Alongs publicados. Cuando haya un SAL activo
              o anunciado, aparecerá aquí con toda la información para
              participar.
            </div>
          ) : (
            <div className="sals-grid">
              {sals.map((sal) => {
                const designCount = getSalDesignCount(sal, designs);
                const isActive = sal.estado.trim().toLowerCase() === "activo";

                return (
                  <article className="sals-card" key={sal.id}>
                    {sal.imagen_principal_url ? (
                      <div className="sals-card-image">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={sal.imagen_principal_url} alt="" />
                      </div>
                    ) : null}

                    <div className="sals-card-content">
                      <div className="sals-card-header">
                        <span className={`sals-badge ${isActive ? "active" : ""}`}>
                          {getStatusLabel(sal.estado)}
                        </span>

                        {sal.tipo ? (
                          <span className="sals-badge">{sal.tipo}</span>
                        ) : null}
                      </div>

                      <h3 className="sals-card-title">{sal.titulo}</h3>

                      {sal.descripcion_corta ? (
                        <p className="sals-card-text">
                          {sal.descripcion_corta}
                        </p>
                      ) : null}

                      <div className="sals-card-info">
                        {sal.fecha_inicio ? (
                          <p>
                            <strong>Inicio:</strong>{" "}
                            {formatDate(sal.fecha_inicio)}
                          </p>
                        ) : null}

                        {sal.fecha_fin ? (
                          <p>
                            <strong>Fin:</strong> {formatDate(sal.fecha_fin)}
                          </p>
                        ) : null}

                        <p>
                          <strong>Diseños:</strong> {designCount}
                        </p>
                      </div>

                      <Link
                        href={`/sals/${sal.slug}`}
                        className="sals-button primary"
                      >
                        Ver ficha del SAL →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}