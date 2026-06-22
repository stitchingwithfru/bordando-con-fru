import type { Metadata } from "next";
import Link from "next/link";
import { getWebsiteData, type BordadoWipItem } from "@/lib/phase1-data";

export const metadata: Metadata = {
  title: "Mis WIPs activos | Bordando con Fru",
  description:
    "Proyectos de punto de cruz que tengo actualmente en marcha: progreso, cruces acumuladas, fechas de inicio y estado.",
  openGraph: {
    title: "Mis WIPs activos | Bordando con Fru",
    description:
      "Consulta mis proyectos activos de punto de cruz y su progreso acumulado.",
    url: "https://stitchingwithfru.com/mis-bordados/wips",
    siteName: "Bordando con Fru",
    locale: "es_ES",
    type: "website",
  },
};

function formatNumber(value: number | string) {
  const numericValue =
    typeof value === "number"
      ? value
      : Number(String(value).replace(/\./g, "").replace(",", "."));

  if (!Number.isFinite(numericValue)) return "0";

  return String(Math.round(numericValue)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function formatDate(value?: string) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function getProgressValue(progress: string) {
  if (!progress) return 0;

  const normalized = String(progress)
    .replace("%", "")
    .replace(",", ".")
    .trim();

  const number = Number(normalized);

  if (!Number.isFinite(number)) return 0;

  return Math.max(0, Math.min(100, number));
}

function getFeaturedWips(wips: BordadoWipItem[]) {
  return wips
    .slice()
    .sort((a, b) => getProgressValue(b.progreso) - getProgressValue(a.progreso))
    .slice(0, 4);
}

export default async function MisBordadosWipsPage() {
  const data = await getWebsiteData();

  const currentYear = data.bordadoResumen?.anio || new Date().getFullYear();

  const wips = (data.bordadoWips || [])
    .slice()
    .sort((a, b) => a.orden - b.orden);

  const featuredWips = getFeaturedWips(wips);

  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#403A36] pt-12 pb-24">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <style>
          {`
            .wips-hero {
              max-width: 980px;
              margin: 0 auto 54px auto;
              background: linear-gradient(135deg, #EFE5DE 0%, #FCFAF7 100%);
              border: 1px solid #E8DED8;
              border-radius: 34px;
              padding: 42px 34px;
              box-shadow: 0 12px 30px rgba(64, 58, 54, 0.06);
              text-align: center;
            }

            .wips-kicker {
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

            .wips-title {
              margin: 0 0 16px 0;
              font-family: Georgia, serif;
              font-size: 46px;
              line-height: 1.05;
              color: #403A36;
            }

            .wips-intro {
              max-width: 760px;
              margin: 0 auto 26px auto;
              color: #6F655F;
              font-size: 18px;
              line-height: 1.7;
            }

            .wips-actions {
              display: flex;
              justify-content: center;
              gap: 12px;
              flex-wrap: wrap;
            }

            .wips-button {
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

            .wips-button.primary {
              background: #403A36;
              color: #FFFFFF;
              border-color: #403A36;
              box-shadow: 0 8px 18px rgba(64, 58, 54, 0.14);
            }

            .wips-section {
              max-width: 1040px;
              margin: 0 auto 64px auto;
            }

            .wips-section-heading {
              margin: 0 0 22px 0;
            }

            .wips-section-title {
              margin: 0;
              font-family: Georgia, serif;
              font-size: 34px;
              line-height: 1.12;
              color: #403A36;
            }

            .wips-section-subtitle {
              margin: 8px 0 0 0;
              color: #8A7C74;
              font-size: 15px;
              line-height: 1.6;
            }

            .wips-summary-grid {
              display: grid;
              grid-template-columns: repeat(3, minmax(0, 1fr));
              gap: 18px;
              margin-bottom: 64px;
            }

            .wips-summary-card {
              background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
              border: 1px solid #E8DED8;
              border-radius: 28px;
              padding: 24px;
              box-shadow: 0 10px 24px rgba(64, 58, 54, 0.06);
            }

            .wips-summary-label {
              margin: 0 0 10px 0;
              color: #8A7C74;
              font-size: 12px;
              font-weight: 800;
              letter-spacing: 0.12em;
              text-transform: uppercase;
            }

            .wips-summary-value {
              margin: 0;
              font-family: Georgia, serif;
              font-size: 32px;
              line-height: 1.1;
              color: #403A36;
            }

            .wips-featured-grid {
              display: grid;
              grid-template-columns: repeat(4, minmax(0, 1fr));
              gap: 18px;
            }

            .wips-featured-card {
              background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
              border: 1px solid #E8DED8;
              border-radius: 26px;
              padding: 20px;
              box-shadow: 0 10px 24px rgba(64, 58, 54, 0.06);
            }

            .wips-featured-title {
              margin: 0 0 12px 0;
              font-family: Georgia, serif;
              font-size: 22px;
              line-height: 1.15;
              color: #403A36;
            }

            .wips-featured-progress {
              color: #5E755C;
              font-size: 20px;
              font-weight: 800;
            }

            .wips-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 24px;
            }

            .wip-card {
              background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
              border: 1px solid #E8DED8;
              border-radius: 30px;
              overflow: hidden;
              box-shadow: 0 10px 28px rgba(64, 58, 54, 0.06);
            }

            .wip-image-wrap {
              background: #F3ECE7;
              height: 210px;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
            }

            .wip-image {
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
            }

            .wip-placeholder {
              width: 82px;
              height: 82px;
              border-radius: 28px;
              background: #FFFFFF;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 38px;
              box-shadow: 0 8px 18px rgba(64, 58, 54, 0.08);
            }

            .wip-content {
              padding: 24px;
            }

            .wip-status {
              display: inline-flex;
              align-items: center;
              background: #E9F0E6;
              color: #5E755C;
              border-radius: 999px;
              padding: 7px 13px;
              font-size: 12px;
              font-weight: 800;
              letter-spacing: 0.1em;
              text-transform: uppercase;
              margin-bottom: 14px;
            }

            .wip-title {
              margin: 0 0 12px 0;
              font-family: Georgia, serif;
              font-size: 26px;
              line-height: 1.12;
              color: #403A36;
            }

            .wip-meta {
              display: grid;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: 12px;
              margin: 18px 0;
            }

            .wip-meta-item {
              background: #F7F3EE;
              border: 1px solid #E8DED8;
              border-radius: 18px;
              padding: 12px;
            }

            .wip-meta-label {
              display: block;
              color: #8A7C74;
              font-size: 11px;
              font-weight: 800;
              letter-spacing: 0.1em;
              text-transform: uppercase;
              margin-bottom: 6px;
            }

            .wip-meta-value {
              color: #403A36;
              font-size: 14px;
              font-weight: 800;
              line-height: 1.35;
            }

            .wip-progress-row {
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 14px;
              margin-bottom: 10px;
              font-weight: 800;
            }

            .wip-progress-percent {
              color: #5E755C;
            }

            .wip-progress-bar {
              height: 12px;
              background: #F3ECE7;
              border-radius: 999px;
              overflow: hidden;
            }

            .wip-progress-fill {
              height: 100%;
              background: #B7C7A8;
              border-radius: 999px;
            }

            .wip-notes {
              margin: 18px 0 0 0;
              color: #6F655F;
              font-size: 15px;
              line-height: 1.65;
            }

            .wips-empty-state {
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
              .wips-summary-grid,
              .wips-featured-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
              }
            }

            @media (max-width: 600px) {
              .wips-hero {
                border-radius: 28px;
                padding: 32px 22px;
                margin-bottom: 48px;
              }

              .wips-title {
                font-size: 36px;
              }

              .wips-intro {
                font-size: 16px;
                line-height: 1.65;
              }

              .wips-actions {
                flex-direction: column;
              }

              .wips-button {
                width: 100%;
              }

              .wips-summary-grid,
              .wips-featured-grid {
                grid-template-columns: 1fr;
              }

              .wip-meta {
                grid-template-columns: 1fr;
              }
            }
          `}
        </style>

        <section className="wips-hero">
          <div className="wips-kicker">🪡 Proyectos activos</div>

          <h1 className="wips-title">Mis WIPs activos</h1>

          <p className="wips-intro">
            Estos son los proyectos de punto de cruz que tengo actualmente en
            marcha. Los datos de progreso se actualizan desde mi Sistema de
            Seguimiento de Punto de Cruz.
          </p>

          <div className="wips-actions">
            <Link href="/mis-bordados" className="wips-button">
              ← Volver a Mis bordados
            </Link>

            <Link href="/herramientas/seguimiento" className="wips-button primary">
              Ver Sistema de Seguimiento
            </Link>
          </div>
        </section>

        {wips.length > 0 ? (
          <>
            <section className="wips-section">
              <div className="wips-summary-grid">
                <article className="wips-summary-card">
                  <p className="wips-summary-label">WIPs activos</p>
                  <p className="wips-summary-value">{formatNumber(wips.length)}</p>
                </article>

                <article className="wips-summary-card">
                  <p className="wips-summary-label">Cruces acumuladas</p>
                  <p className="wips-summary-value">
                    {formatNumber(
                      wips.reduce((sum, item) => sum + item.cruces_acumuladas, 0)
                    )}
                  </p>
                </article>

                <article className="wips-summary-card">
                  <p className="wips-summary-label">Cruces totales</p>
                  <p className="wips-summary-value">
                    {formatNumber(
                      wips.reduce((sum, item) => sum + item.total_cruces, 0)
                    )}
                  </p>
                </article>
              </div>
            </section>

            {featuredWips.length > 0 ? (
              <section className="wips-section">
                <div className="wips-section-heading">
                  <h2 className="wips-section-title">
                    Proyectos más avanzados
                  </h2>
                  <p className="wips-section-subtitle">
                    Una vista rápida de los WIPs con mayor porcentaje completado.
                  </p>
                </div>

                <div className="wips-featured-grid">
                  {featuredWips.map((wip) => (
                    <article key={wip.id} className="wips-featured-card">
                      <h3 className="wips-featured-title">{wip.titulo}</h3>
                      <div className="wips-featured-progress">
                        {wip.progreso || "0%"}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="wips-section">
              <div className="wips-section-heading">
                <h2 className="wips-section-title">
                  Todos mis WIPs activos
                </h2>
                <p className="wips-section-subtitle">
                  Proyectos en curso con fecha de inicio, cruces acumuladas y
                  porcentaje de progreso.
                </p>
              </div>

              <div className="wips-grid">
                {wips.map((wip) => {
                  const progressValue = getProgressValue(wip.progreso);

                  return (
                    <article key={wip.id} className="wip-card">
                      <div className="wip-image-wrap">
                        {wip.imagen_url ? (
                          <img
                            src={wip.imagen_url}
                            alt={wip.titulo}
                            className="wip-image"
                            width={600}
                            height={400}
                          />
                        ) : (
                          <div className="wip-placeholder">🧵</div>
                        )}
                      </div>

                      <div className="wip-content">
                        <div className="wip-status">{wip.estado || "En curso"}</div>

                        <h3 className="wip-title">{wip.titulo}</h3>

                        <div className="wip-progress-row">
                          <span>Progreso</span>
                          <span className="wip-progress-percent">
                            {wip.progreso || "0%"}
                          </span>
                        </div>

                        <div className="wip-progress-bar">
                          <div
                            className="wip-progress-fill"
                            style={{ width: `${progressValue}%` }}
                          />
                        </div>

                        <div className="wip-meta">
                          <div className="wip-meta-item">
                            <span className="wip-meta-label">Inicio</span>
                            <span className="wip-meta-value">
                              {formatDate(wip.fecha_inicio) || "Sin fecha"}
                            </span>
                          </div>

                          <div className="wip-meta-item">
                            <span className="wip-meta-label">Cruces {currentYear}</span>
                            <span className="wip-meta-value">
                              {formatNumber(wip.cruces_anio)}
                            </span>
                          </div>

                          <div className="wip-meta-item">
                            <span className="wip-meta-label">Acumuladas</span>
                            <span className="wip-meta-value">
                              {formatNumber(wip.cruces_acumuladas)}
                            </span>
                          </div>

                          <div className="wip-meta-item">
                            <span className="wip-meta-label">Total</span>
                            <span className="wip-meta-value">
                              {formatNumber(wip.total_cruces)}
                            </span>
                          </div>
                        </div>

                        {wip.notas ? (
                          <p className="wip-notes">{wip.notas}</p>
                        ) : null}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          </>
        ) : (
          <div className="wips-empty-state">
            Todavía no hay WIPs activos disponibles.
          </div>
        )}
      </div>
    </main>
  );
}