import type { MyReadingItem } from "@/lib/phase1-data";

type AnnualStatsProps = {
  readings: MyReadingItem[];
  challenge: {
    year: number;
    goal: number;
    completed: number;
    progressPercent: number;
  };
};

const MONTHS = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

function getYearFromDate(value?: string) {
  if (!value) return "";
  return String(value).slice(0, 4);
}

function getMonthIndexFromDate(value?: string) {
  if (!value) return -1;

  const month = Number(String(value).slice(5, 7));
  if (!Number.isFinite(month) || month < 1 || month > 12) return -1;

  return month - 1;
}

function normalizeEstado(value?: string) {
  return String(value || "").toLowerCase();
}

function normalizeFormato(value?: string) {
  return String(value || "").toLowerCase();
}

function getReadableFormat(format: string) {
  if (format === "fisico") return "Físico";
  if (format === "digital") return "Digital";
  return format || "Sin formato";
}

function getReadableStatus(status: string) {
  if (status === "leyendo") return "Leyendo";
  if (status === "pausado") return "Pausado";
  if (status === "terminado") return "Terminado";
  if (status === "abandonado") return "Abandonado";
  return status || "Sin estado";
}

function splitGenres(value?: string) {
  if (!value) return [];

  return String(value)
    .split(/[,/·|]+/)
    .map((genre) => genre.trim())
    .filter(Boolean);
}

function sortEntriesByCount(entries: [string, number][]) {
  return entries.sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return a[0].localeCompare(b[0], "es");
  });
}

export default function PersonalAnnualStatsSection({
  readings,
  challenge,
}: AnnualStatsProps) {
  const year = challenge?.year || new Date().getFullYear();
  const yearString = String(year);

  const readingsThisYear = readings.filter((reading) => {
    const startYear = getYearFromDate(reading.fecha_inicio);
    const endYear = getYearFromDate(reading.fecha_fin);
    const progressYear = getYearFromDate(reading.ultimo_progreso);

    return startYear === yearString || endYear === yearString || progressYear === yearString;
  });

  const finishedThisYear = readings.filter(
    (reading) =>
      normalizeEstado(reading.estado) === "terminado" &&
      getYearFromDate(reading.fecha_fin || reading.ultimo_progreso) === yearString
  );

  const monthlyFinished = Array.from({ length: 12 }, () => 0);

  finishedThisYear.forEach((reading) => {
    const monthIndex = getMonthIndexFromDate(reading.fecha_fin || reading.ultimo_progreso);
    if (monthIndex >= 0) monthlyFinished[monthIndex] += 1;
  });

  const maxMonthlyFinished = Math.max(...monthlyFinished, 1);

  const formatCounts = readingsThisYear.reduce<Record<string, number>>((acc, reading) => {
    const format = normalizeFormato(reading.formato) || "sin-formato";
    acc[format] = (acc[format] || 0) + 1;
    return acc;
  }, {});

  const statusCounts = readingsThisYear.reduce<Record<string, number>>((acc, reading) => {
    const status = normalizeEstado(reading.estado) || "sin-estado";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const personalGenreCounts = finishedThisYear.reduce<Record<string, number>>((acc, reading) => {
    splitGenres(reading.generos).forEach((genre) => {
      acc[genre] = (acc[genre] || 0) + 1;
    });

    return acc;
  }, {});

  const personalGenreEntries = sortEntriesByCount(
    Object.entries(personalGenreCounts)
  ).slice(0, 10);

  const maxPersonalGenreCount = Math.max(
    ...personalGenreEntries.map(([, count]) => count),
    1
  );

  const finishedWithPages = finishedThisYear.filter(
    (reading) => Number(reading.paginas_totales || 0) > 0
  );

  const registeredPagesRead = finishedWithPages.reduce(
    (sum, reading) => sum + Number(reading.paginas_totales || 0),
    0
  );

  const longestBook = finishedWithPages
    .slice()
    .sort((a, b) => Number(b.paginas_totales || 0) - Number(a.paginas_totales || 0))[0];

  const shortestBook = finishedWithPages
    .slice()
    .sort((a, b) => Number(a.paginas_totales || 0) - Number(b.paginas_totales || 0))[0];

  const challengeProgress = Math.min(Math.max(challenge?.progressPercent || 0, 0), 100);
  const goal = challenge?.goal || 0;
  const completed = challenge?.completed || finishedThisYear.length;

  return (
    <>
      <style>
        {`
          .annual-stats-section {
            max-width: 1040px;
            margin: 0 auto;
          }

          .annual-stats-header {
            text-align: center;
            margin-bottom: 30px;
          }

          .annual-stats-kicker {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #F3ECE7;
            color: #5f544f;
            border: 1px solid #E8DED8;
            border-radius: 999px;
            padding: 7px 14px;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            margin-bottom: 14px;
          }

          .annual-stats-title {
            margin: 0;
            font-family: Georgia, serif;
            font-size: 44px;
            line-height: 1.08;
            color: #403A36;
          }

          .annual-stats-subtitle {
            max-width: 720px;
            margin: 14px auto 0 auto;
            color: #5f544f;
            font-size: 17px;
            line-height: 1.7;
          }

          .annual-stats-grid {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 16px;
            margin-bottom: 24px;
          }

          .annual-stat-card {
            background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
            border: 1px solid #E8DED8;
            border-radius: 24px;
            padding: 20px;
            box-shadow: 0 10px 24px rgba(64, 58, 54, 0.055);
          }

          .annual-stat-label {
            margin: 0 0 8px 0;
            color: #5f544f;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
          }

          .annual-stat-value {
            margin: 0;
            font-family: Georgia, serif;
            font-size: 34px;
            line-height: 1;
            color: #403A36;
          }

          .annual-stat-note {
            margin: 8px 0 0 0;
            color: #6F655F;
            font-size: 13px;
            line-height: 1.4;
          }

          .annual-stats-main-grid {
            display: grid;
            grid-template-columns: 1.25fr 0.75fr;
            gap: 22px;
            align-items: stretch;
          }

          .annual-stats-panel {
            background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
            border: 1px solid #E8DED8;
            border-radius: 28px;
            padding: 24px;
            box-shadow: 0 10px 26px rgba(64, 58, 54, 0.055);
          }

          .annual-stats-panel-title {
            margin: 0 0 18px 0;
            font-family: Georgia, serif;
            font-size: 25px;
            line-height: 1.15;
            color: #403A36;
          }

          .annual-months {
            display: grid;
            gap: 12px;
          }

          .annual-month-row {
            display: grid;
            grid-template-columns: 44px 1fr 30px;
            gap: 10px;
            align-items: center;
          }

          .annual-month-name {
            color: #5f544f;
            font-size: 13px;
            font-weight: 700;
          }

          .annual-month-bar-outer {
            height: 14px;
            border-radius: 999px;
            background: #F3ECE7;
            overflow: hidden;
            border: 1px solid #E8DED8;
          }

          .annual-month-bar-inner {
            height: 100%;
            border-radius: 999px;
            background: linear-gradient(90deg, #D8B7B0 0%, #A8B8A3 100%);
          }

          .annual-month-count {
            color: #403A36;
            font-size: 13px;
            font-weight: 700;
            text-align: right;
          }

          .annual-breakdown-list {
            display: grid;
            gap: 12px;
          }

          .annual-breakdown-row {
            display: flex;
            justify-content: space-between;
            gap: 14px;
            align-items: center;
            background: #F7F3EE;
            border: 1px solid #E8DED8;
            border-radius: 16px;
            padding: 12px 14px;
          }

          .annual-breakdown-name {
            color: #403A36;
            font-size: 14px;
            font-weight: 700;
          }

          .annual-breakdown-value {
            color: #5f544f;
            font-size: 14px;
            font-weight: 700;
          }

          .annual-genre-panel {
            margin-top: 22px;
            background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
            border: 1px solid #E8DED8;
            border-radius: 28px;
            padding: 24px;
            box-shadow: 0 10px 26px rgba(64, 58, 54, 0.055);
          }

          .annual-genre-list {
            display: grid;
            gap: 12px;
          }

          .annual-genre-row {
            display: grid;
            grid-template-columns: 150px 1fr 34px;
            gap: 12px;
            align-items: center;
          }

          .annual-genre-name {
            color: #403A36;
            font-size: 14px;
            font-weight: 700;
          }

          .annual-genre-bar-outer {
            height: 14px;
            border-radius: 999px;
            background: #F3ECE7;
            overflow: hidden;
            border: 1px solid #E8DED8;
          }

          .annual-genre-bar-inner {
            height: 100%;
            border-radius: 999px;
            background: linear-gradient(90deg, #D8B7B0 0%, #A8B8A3 100%);
          }

          .annual-genre-count {
            color: #403A36;
            font-size: 13px;
            font-weight: 700;
            text-align: right;
          }

          .annual-genre-empty {
            margin: 0;
            color: #5f544f;
            font-size: 14px;
            line-height: 1.6;
          }

          .annual-book-extremes {
            display: grid;
            gap: 12px;
            margin-top: 18px;
          }

          .annual-book-extreme {
            background: #F7F3EE;
            border: 1px solid #E8DED8;
            border-radius: 18px;
            padding: 14px;
          }

          .annual-book-extreme-label {
            margin: 0 0 5px 0;
            color: #5f544f;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
          }

          .annual-book-extreme-title {
            margin: 0 0 4px 0;
            font-family: Georgia, serif;
            font-size: 18px;
            line-height: 1.2;
            color: #403A36;
          }

          .annual-book-extreme-meta {
            margin: 0;
            color: #6F655F;
            font-size: 13px;
            line-height: 1.4;
          }

          .annual-stats-empty {
            background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
            border: 1px dashed #D8B7B0;
            border-radius: 26px;
            padding: 28px;
            color: #5f544f;
            text-align: center;
            line-height: 1.6;
          }

          @media (max-width: 900px) {
            .annual-stats-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            .annual-stats-main-grid {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 700px) {
            .annual-stats-title {
              font-size: 34px;
            }

            .annual-stats-subtitle {
              font-size: 15.5px;
            }

            .annual-stats-grid {
              grid-template-columns: 1fr;
            }

            .annual-stat-card,
            .annual-stats-panel {
              border-radius: 24px;
              padding: 20px;
            }

            .annual-stat-value {
              font-size: 31px;
            }

            .annual-genre-panel {
              border-radius: 24px;
              padding: 20px;
            }

            .annual-genre-row {
              grid-template-columns: 1fr 34px;
              gap: 8px 10px;
            }

            .annual-genre-name {
              grid-column: 1 / -1;
            }
          }
        `}
      </style>

      <section className="annual-stats-section">
        <div className="annual-stats-header">
          <div className="annual-stats-kicker">📊 Balance lector</div>

          <h1 className="annual-stats-title">
            Estadísticas lectoras de {year}
          </h1>

          <p className="annual-stats-subtitle">
            Un resumen de mi año lector: libros terminados, formatos de lectura,
            estados, páginas registradas, géneros y evolución mensual.
          </p>
        </div>

        {readingsThisYear.length > 0 ? (
          <>
            <div className="annual-stats-grid">
              <div className="annual-stat-card">
                <p className="annual-stat-label">Terminados</p>
                <p className="annual-stat-value">{finishedThisYear.length}</p>
                <p className="annual-stat-note">Libros finalizados en {year}</p>
              </div>

              <div className="annual-stat-card">
                <p className="annual-stat-label">Reto anual</p>
                <p className="annual-stat-value">{challengeProgress}%</p>
                <p className="annual-stat-note">
                  {completed} de {goal || "—"} libros
                </p>
              </div>

              <div className="annual-stat-card">
                <p className="annual-stat-label">En seguimiento</p>
                <p className="annual-stat-value">{readingsThisYear.length}</p>
                <p className="annual-stat-note">Lecturas registradas este año</p>
              </div>

              <div className="annual-stat-card">
                <p className="annual-stat-label">Páginas registradas</p>
                <p className="annual-stat-value">{registeredPagesRead}</p>
                <p className="annual-stat-note">
                  Lecturas terminadas con páginas disponibles
                </p>
              </div>
            </div>

            <div className="annual-stats-main-grid">
              <div className="annual-stats-panel">
                <h2 className="annual-stats-panel-title">
                  Libros terminados por mes
                </h2>

                <div className="annual-months">
                  {MONTHS.map((month, index) => {
                    const count = monthlyFinished[index];
                    const width = count === 0 ? 0 : Math.max((count / maxMonthlyFinished) * 100, 8);

                    return (
                      <div key={month} className="annual-month-row">
                        <div className="annual-month-name">{month}</div>

                        <div className="annual-month-bar-outer">
                          <div
                            className="annual-month-bar-inner"
                            style={{ width: `${width}%` }}
                          />
                        </div>

                        <div className="annual-month-count">{count}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="annual-stats-panel">
                <h2 className="annual-stats-panel-title">
                  Resumen del año
                </h2>

                <div className="annual-breakdown-list">
                  {Object.entries(formatCounts).map(([format, count]) => (
                    <div key={format} className="annual-breakdown-row">
                      <span className="annual-breakdown-name">
                        {getReadableFormat(format)}
                      </span>
                      <span className="annual-breakdown-value">{count}</span>
                    </div>
                  ))}

                  {Object.entries(statusCounts).map(([status, count]) => (
                    <div key={status} className="annual-breakdown-row">
                      <span className="annual-breakdown-name">
                        {getReadableStatus(status)}
                      </span>
                      <span className="annual-breakdown-value">{count}</span>
                    </div>
                  ))}
                </div>

                <div className="annual-book-extremes">
                  {longestBook ? (
                    <div className="annual-book-extreme">
                      <p className="annual-book-extreme-label">Libro más largo</p>
                      <p className="annual-book-extreme-title">{longestBook.titulo}</p>
                      <p className="annual-book-extreme-meta">
                        {longestBook.autor} · {longestBook.paginas_totales} páginas
                      </p>
                    </div>
                  ) : null}

                  {shortestBook ? (
                    <div className="annual-book-extreme">
                      <p className="annual-book-extreme-label">Libro más corto</p>
                      <p className="annual-book-extreme-title">{shortestBook.titulo}</p>
                      <p className="annual-book-extreme-meta">
                        {shortestBook.autor} · {shortestBook.paginas_totales} páginas
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="annual-genre-panel">
              <h2 className="annual-stats-panel-title">
                Géneros de mis lecturas en {year}
              </h2>

              {personalGenreEntries.length > 0 ? (
                <div className="annual-genre-list">
                  {personalGenreEntries.map(([genre, count]) => {
                    const width =
                      count === 0 ? 0 : Math.max((count / maxPersonalGenreCount) * 100, 8);

                    return (
                      <div key={genre} className="annual-genre-row">
                        <div className="annual-genre-name">{genre}</div>

                        <div className="annual-genre-bar-outer">
                          <div
                            className="annual-genre-bar-inner"
                            style={{ width: `${width}%` }}
                          />
                        </div>

                        <div className="annual-genre-count">{count}</div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="annual-genre-empty">
                  Todavía no hay géneros registrados en las lecturas terminadas de {year}.
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="annual-stats-empty">
            Todavía no hay lecturas registradas para {year}. Cuando añadas tus primeras
            lecturas del año, aparecerán aquí las estadísticas.
          </div>
        )}
      </section>
    </>
  );
}