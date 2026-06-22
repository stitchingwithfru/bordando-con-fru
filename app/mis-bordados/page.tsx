import type { Metadata } from "next";
import Link from "next/link";
import { getWebsiteData, type BordadoMesActualItem } from "@/lib/phase1-data";

export const metadata: Metadata = {
  title: "Mis bordados | Bordando con Fru",
  description:
    "Mi progreso personal de punto de cruz: cruces mensuales y anuales, seguimiento diario del mes en curso y proyectos activos.",
  openGraph: {
    title: "Mis bordados | Bordando con Fru",
    description:
      "Consulta mi progreso real de bordado, actualizado desde mi Sistema de Seguimiento de Punto de Cruz.",
    url: "https://stitchingwithfru.com/mis-bordados",
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

function getMonthName(monthName?: string) {
  if (!monthName) return "";
  return monthName.charAt(0).toUpperCase() + monthName.slice(1);
}

function getCompactProjectName(project: string) {
  return project
    .replace("(SAL ORGULLO 2026)", "· SAL Orgullo")
    .replace(/\s+/g, " ")
    .trim();
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

function groupByDay(items: BordadoMesActualItem[]) {
  return items.reduce<Record<number, BordadoMesActualItem[]>>((acc, item) => {
    if (!acc[item.dia]) acc[item.dia] = [];
    acc[item.dia].push(item);
    return acc;
  }, {});
}

function getProjectTotals(items: BordadoMesActualItem[]) {
  const totals = items.reduce<Record<string, number>>((acc, item) => {
    acc[item.proyecto] = (acc[item.proyecto] || 0) + item.cruces;
    return acc;
  }, {});

  return Object.entries(totals)
    .map(([project, stitches]) => ({ project, stitches }))
    .sort((a, b) => b.stitches - a.stitches);
}

export default async function MisBordadosPage() {
  const data = await getWebsiteData();

  const resumen = data.bordadoResumen;
  const monthItems = data.bordadoMesActual || [];

  const year = resumen?.anio || new Date().getFullYear();
  const month = resumen?.mes || new Date().getMonth() + 1;
  const monthName = getMonthName(resumen?.mes_nombre);
  const daysInMonth = getDaysInMonth(year, month);
  const itemsByDay = groupByDay(monthItems);
  const projectTotals = getProjectTotals(monthItems);

  const calendarDays = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#403A36] pt-12 pb-24">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <style>
          {`
            .stitching-hero {
              max-width: 980px;
              margin: 0 auto 54px auto;
              background: linear-gradient(135deg, #EFE5DE 0%, #FCFAF7 100%);
              border: 1px solid #E8DED8;
              border-radius: 34px;
              padding: 42px 34px;
              box-shadow: 0 12px 30px rgba(64, 58, 54, 0.06);
              text-align: center;
            }

            .stitching-kicker {
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

            .stitching-title {
              margin: 0 0 16px 0;
              font-family: Georgia, serif;
              font-size: 46px;
              line-height: 1.05;
              color: #403A36;
            }

            .stitching-intro {
              max-width: 760px;
              margin: 0 auto 26px auto;
              color: #6F655F;
              font-size: 18px;
              line-height: 1.7;
            }

            .stitching-actions {
              display: flex;
              justify-content: center;
              gap: 12px;
              flex-wrap: wrap;
            }

            .stitching-button {
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

            .stitching-button.primary {
              background: #403A36;
              color: #FFFFFF;
              border-color: #403A36;
              box-shadow: 0 8px 18px rgba(64, 58, 54, 0.14);
            }

            .stitching-section {
              max-width: 1040px;
              margin: 0 auto 64px auto;
            }

            .stitching-section-heading {
              margin: 0 0 22px 0;
              display: flex;
              align-items: end;
              justify-content: space-between;
              gap: 16px;
              flex-wrap: wrap;
            }

            .stitching-section-title {
              margin: 0;
              font-family: Georgia, serif;
              font-size: 34px;
              line-height: 1.12;
              color: #403A36;
            }

            .stitching-section-subtitle {
              margin: 8px 0 0 0;
              color: #8A7C74;
              font-size: 15px;
              line-height: 1.6;
            }

            .stitching-updated {
              background: #FFFFFF;
              border: 1px solid #E8DED8;
              border-radius: 999px;
              padding: 9px 14px;
              color: #8A7C74;
              font-size: 13px;
              font-weight: 700;
            }

            .stitching-stats-grid {
              display: grid;
              grid-template-columns: repeat(4, minmax(0, 1fr));
              gap: 18px;
            }

            .stitching-stat-card {
              background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
              border: 1px solid #E8DED8;
              border-radius: 28px;
              padding: 24px;
              box-shadow: 0 10px 24px rgba(64, 58, 54, 0.06);
            }

            .stitching-stat-label {
              margin: 0 0 10px 0;
              color: #8A7C74;
              font-size: 12px;
              font-weight: 800;
              letter-spacing: 0.12em;
              text-transform: uppercase;
            }

            .stitching-stat-value {
              margin: 0;
              font-family: Georgia, serif;
              font-size: 32px;
              line-height: 1.1;
              color: #403A36;
            }

            .stitching-stat-note {
              margin: 10px 0 0 0;
              color: #8A7C74;
              font-size: 14px;
              line-height: 1.45;
            }

            .stitching-calendar {
              display: grid;
              grid-template-columns: repeat(7, minmax(0, 1fr));
              gap: 12px;
            }

            .stitching-day-card {
              min-height: 142px;
              background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
              border: 1px solid #E8DED8;
              border-radius: 24px;
              padding: 15px;
              box-shadow: 0 8px 20px rgba(64, 58, 54, 0.05);
            }

            .stitching-day-card.empty {
              background: rgba(255,255,255,0.45);
              border-style: dashed;
              box-shadow: none;
              opacity: 0.72;
            }

            .stitching-day-top {
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 8px;
              margin-bottom: 10px;
            }

            .stitching-day-number {
              width: 34px;
              height: 34px;
              border-radius: 14px;
              background: #F3ECE7;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              font-weight: 800;
              color: #403A36;
            }

            .stitching-day-total {
              color: #5E755C;
              font-size: 13px;
              font-weight: 800;
              white-space: nowrap;
            }

            .stitching-day-empty {
              margin: 18px 0 0 0;
              color: #B0A29A;
              font-size: 13px;
              line-height: 1.45;
            }

            .stitching-project-list {
              display: grid;
              gap: 8px;
            }

            .stitching-project-pill {
              background: #F7F3EE;
              border: 1px solid #E8DED8;
              border-radius: 16px;
              padding: 9px 10px;
            }

            .stitching-project-name {
              display: block;
              color: #403A36;
              font-size: 12.5px;
              font-weight: 800;
              line-height: 1.25;
              overflow-wrap: anywhere;
            }

            .stitching-project-stitches {
              display: block;
              margin-top: 4px;
              color: #8A7C74;
              font-size: 12.5px;
              font-weight: 700;
            }

            .stitching-ranking-grid {
              display: grid;
              gap: 14px;
            }

            .stitching-ranking-item {
              background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
              border: 1px solid #E8DED8;
              border-radius: 22px;
              padding: 18px;
              box-shadow: 0 8px 20px rgba(64, 58, 54, 0.05);
            }

            .stitching-ranking-top {
              display: flex;
              justify-content: space-between;
              gap: 14px;
              margin-bottom: 10px;
              color: #403A36;
              font-weight: 800;
            }

            .stitching-ranking-count {
              color: #5E755C;
              white-space: nowrap;
            }

            .stitching-ranking-bar {
              height: 10px;
              background: #F3ECE7;
              border-radius: 999px;
              overflow: hidden;
            }

            .stitching-ranking-fill {
              height: 100%;
              background: #B7C7A8;
              border-radius: 999px;
            }

            .stitching-cta-card {
              display: grid;
              grid-template-columns: 74px 1fr;
              gap: 24px;
              align-items: start;
              background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
              border: 1px solid #E8DED8;
              border-radius: 30px;
              padding: 28px;
              box-shadow: 0 10px 28px rgba(64, 58, 54, 0.06);
            }

            .stitching-cta-icon {
              width: 74px;
              height: 74px;
              border-radius: 24px;
              background: #F3ECE7;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 34px;
              box-shadow: 0 8px 18px rgba(64, 58, 54, 0.08);
            }

            .stitching-cta-kicker {
              display: inline-flex;
              align-items: center;
              background: #E9F0E6;
              color: #5E755C;
              border-radius: 999px;
              padding: 7px 13px;
              font-size: 12px;
              font-weight: 700;
              letter-spacing: 0.12em;
              text-transform: uppercase;
              margin-bottom: 12px;
            }

            .stitching-cta-title {
              margin: 0 0 12px 0;
              font-family: Georgia, serif;
              font-size: 32px;
              line-height: 1.12;
              color: #403A36;
            }

            .stitching-cta-text {
              margin: 0 0 22px 0;
              color: #6F655F;
              font-size: 16px;
              line-height: 1.7;
              max-width: 760px;
            }

            .stitching-empty-state {
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
              .stitching-stats-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
              }

              .stitching-calendar {
                grid-template-columns: repeat(2, minmax(0, 1fr));
              }
            }

            @media (max-width: 600px) {
              .stitching-hero {
                border-radius: 28px;
                padding: 32px 22px;
                margin-bottom: 48px;
              }

              .stitching-title {
                font-size: 36px;
              }

              .stitching-intro {
                font-size: 16px;
                line-height: 1.65;
              }

              .stitching-actions {
                flex-direction: column;
              }

              .stitching-button {
                width: 100%;
              }

              .stitching-stats-grid {
                grid-template-columns: 1fr;
              }

              .stitching-calendar {
                grid-template-columns: 1fr;
              }

              .stitching-day-card {
                min-height: auto;
              }

              .stitching-cta-card {
                grid-template-columns: 1fr;
                text-align: center;
                border-radius: 26px;
                padding: 24px 20px;
                gap: 16px;
              }

              .stitching-cta-icon {
                margin: 0 auto;
                width: 62px;
                height: 62px;
                border-radius: 22px;
                font-size: 30px;
              }

              .stitching-cta-title {
                font-size: 28px;
              }
            }
          `}
        </style>

        <section className="stitching-hero">
          <div className="stitching-kicker">🧵 Progreso personal</div>

          <h1 className="stitching-title">Mis bordados</h1>

          <p className="stitching-intro">
            Un rincón donde comparto mi progreso real de punto de cruz: cruces
            bordadas, avances del mes y proyectos activos. Los datos se actualizan
            desde mi propio Sistema de Seguimiento de Punto de Cruz.
          </p>

          <div className="stitching-actions">
            <Link href="/punto-de-cruz" className="stitching-button">
              ← Volver a Punto de cruz
            </Link>

            <Link href="/mis-bordados/wips" className="stitching-button">
              Ver WIPs activos
            </Link>

            <Link href="/herramientas/seguimiento" className="stitching-button primary">
              Ver Sistema de Seguimiento
            </Link>
          </div>
        </section>

        {resumen ? (
          <>
            <section className="stitching-section">
              <div className="stitching-section-heading">
                <div>
                  <h2 className="stitching-section-title">
                    Resumen de {monthName} {year}
                  </h2>
                  <p className="stitching-section-subtitle">
                    Totales calculados a partir de mi registro de bordado.
                  </p>
                </div>

                {resumen.ultima_actualizacion ? (
                  <div className="stitching-updated">
                    Actualizado: {resumen.ultima_actualizacion}
                  </div>
                ) : null}
              </div>

              <div className="stitching-stats-grid">
                <article className="stitching-stat-card">
                  <p className="stitching-stat-label">Cruces este mes</p>
                  <p className="stitching-stat-value">
                    {formatNumber(resumen.total_mes)}
                  </p>
                  <p className="stitching-stat-note">Durante {monthName.toLowerCase()}.</p>
                </article>

                <article className="stitching-stat-card">
                  <p className="stitching-stat-label">Cruces este año</p>
                  <p className="stitching-stat-value">
                    {formatNumber(resumen.total_anual)}
                  </p>
                  <p className="stitching-stat-note">Total acumulado anual.</p>
                </article>

                <article className="stitching-stat-card">
                  <p className="stitching-stat-label">Días con actividad</p>
                  <p className="stitching-stat-value">
                    {formatNumber(resumen.dias_activos_mes)}
                  </p>
                  <p className="stitching-stat-note">Días bordados este mes.</p>
                </article>

                <article className="stitching-stat-card">
                  <p className="stitching-stat-label">Proyecto destacado</p>
                  <p className="stitching-stat-value" style={{ fontSize: "25px" }}>
                    {resumen.proyecto_mas_trabajado_mes || "—"}
                  </p>
                  <p className="stitching-stat-note">El más trabajado del mes.</p>
                </article>
              </div>
            </section>

            <section className="stitching-section">
              <div className="stitching-section-heading">
                <div>
                  <h2 className="stitching-section-title">
                    Seguimiento visual del mes
                  </h2>
                  <p className="stitching-section-subtitle">
                    Cada tarjeta representa un día del mes y muestra las cruces
                    registradas por diseño.
                  </p>
                </div>
              </div>

              <div className="stitching-calendar">
                {calendarDays.map((day) => {
                  const dayItems = itemsByDay[day] || [];
                  const totalDay = dayItems[0]?.total_dia || 0;

                  return (
                    <article
                      key={day}
                      className={`stitching-day-card ${dayItems.length === 0 ? "empty" : ""}`}
                    >
                      <div className="stitching-day-top">
                        <span className="stitching-day-number">{day}</span>

                        {dayItems.length > 0 ? (
                          <span className="stitching-day-total">
                            {formatNumber(totalDay)} cruces
                          </span>
                        ) : null}
                      </div>

                      {dayItems.length > 0 ? (
                        <div className="stitching-project-list">
                          {dayItems.map((item) => (
                            <div
                              key={`${item.fecha}-${item.proyecto}-${item.orden}`}
                              className="stitching-project-pill"
                            >
                              <span className="stitching-project-name" title={item.proyecto}>
                                {getCompactProjectName(item.proyecto)}
                              </span>
                              <span className="stitching-project-stitches">
                                {formatNumber(item.cruces)} cruces
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="stitching-day-empty">Sin registro</p>
                      )}
                    </article>
                  );
                })}
              </div>
            </section>

            {projectTotals.length > 0 ? (
              <section className="stitching-section">
                <div className="stitching-section-heading">
                  <div>
                    <h2 className="stitching-section-title">
                      Proyectos más bordados este mes
                    </h2>
                    <p className="stitching-section-subtitle">
                      Distribución de cruces por diseño durante {monthName.toLowerCase()}.
                    </p>
                  </div>
                </div>

                <div className="stitching-ranking-grid">
                  {projectTotals.map((item) => {
                    const percent =
                      resumen.total_mes > 0
                        ? Math.round((item.stitches / resumen.total_mes) * 100)
                        : 0;

                    return (
                      <article key={item.project} className="stitching-ranking-item">
                        <div className="stitching-ranking-top">
                          <span>{item.project}</span>
                          <span className="stitching-ranking-count">
                            {formatNumber(item.stitches)} cruces
                          </span>
                        </div>

                        <div className="stitching-ranking-bar">
                          <div
                            className="stitching-ranking-fill"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ) : null}

            <section className="stitching-section">
              <article className="stitching-cta-card">
                <div className="stitching-cta-icon">🪡</div>

                <div>
                  <div className="stitching-cta-kicker">WIPs activos</div>

                  <h2 className="stitching-cta-title">
                    Proyectos que tengo actualmente en marcha
                  </h2>

                  <p className="stitching-cta-text">
                    Además del seguimiento mensual, puedes consultar mis proyectos
                    activos, su progreso acumulado, fechas de inicio y estado actual.
                  </p>

                  <Link href="/mis-bordados/wips" className="stitching-button primary">
                    Ver mis WIPs activos →
                  </Link>
                </div>
              </article>
            </section>
          </>
        ) : (
          <div className="stitching-empty-state">
            Todavía no hay datos de bordado disponibles.
          </div>
        )}
      </div>
    </main>
  );
}