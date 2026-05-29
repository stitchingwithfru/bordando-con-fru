import type { ReadingItem } from "@/lib/phase1-data";
import { formatPeriod } from "@/lib/phase1-data";

type ClubReadingWithState = ReadingItem & {
  archiveState?: string;
};

type ClubReadingStatsProps = {
  previousReadings: ReadingItem[];
  currentReading: ReadingItem | null;
  nextReading: ReadingItem | null;
};

function getYearFromDate(value?: string) {
  if (!value) return "";
  return String(value).slice(0, 4);
}

function getReadingDurationDays(start?: string, end?: string) {
  if (!start || !end) return 0;

  const startDate = new Date(start);
  const endDate = new Date(end);

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return 0;
  }

  const diff = endDate.getTime() - startDate.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return Math.max(days, 0);
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

export default function ClubReadingStatsSection({
  previousReadings,
  currentReading,
  nextReading,
}: ClubReadingStatsProps) {
  const clubReadings: ClubReadingWithState[] = [
    ...previousReadings.map((reading) => ({
      ...reading,
      archiveState: "Leída",
    })),
    ...(currentReading
      ? [
          {
            ...currentReading,
            archiveState: "Actual",
          },
        ]
      : []),
  ];

  const totalReadings = clubReadings.length;
  const recommendedCount = clubReadings.filter((reading) => reading.recomendada).length;

  const currentYear = new Date().getFullYear();
  const currentYearString = String(currentYear);

  const clubReadingsThisYear = clubReadings.filter((reading) => {
    const startYear = getYearFromDate(reading.fecha_inicio);
    const endYear = getYearFromDate(reading.fecha_fin);

    return startYear === currentYearString || endYear === currentYearString;
  });

  const readingsByYear = clubReadings.reduce<Record<string, number>>((acc, reading) => {
    const year =
      getYearFromDate(reading.fecha_inicio) ||
      getYearFromDate(reading.fecha_fin) ||
      "Sin fecha";

    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  const yearEntries = Object.entries(readingsByYear).sort((a, b) => Number(b[0]) - Number(a[0]));
  const maxYearCount = Math.max(...yearEntries.map(([, count]) => count), 1);

  const genreCounts = clubReadings.reduce<Record<string, number>>((acc, reading) => {
    splitGenres(reading.generos).forEach((genre) => {
      acc[genre] = (acc[genre] || 0) + 1;
    });

    return acc;
  }, {});

  const genreEntries = sortEntriesByCount(Object.entries(genreCounts)).slice(0, 8);

  const yearGenreCounts = clubReadingsThisYear.reduce<Record<string, number>>((acc, reading) => {
    splitGenres(reading.generos).forEach((genre) => {
      acc[genre] = (acc[genre] || 0) + 1;
    });

    return acc;
  }, {});

  const yearGenreEntries = sortEntriesByCount(
    Object.entries(yearGenreCounts)
  ).slice(0, 10);

  const maxYearGenreCount = Math.max(
    ...yearGenreEntries.map(([, count]) => count),
    1
  );

  const readingsWithDuration = clubReadings
    .map((reading) => ({
      ...reading,
      durationDays: getReadingDurationDays(reading.fecha_inicio, reading.fecha_fin),
    }))
    .filter((reading) => reading.durationDays > 0);

  const totalDurationDays = readingsWithDuration.reduce(
    (sum, reading) => sum + reading.durationDays,
    0
  );

  const averageDurationDays =
    readingsWithDuration.length > 0
      ? Math.round(totalDurationDays / readingsWithDuration.length)
      : 0;

  const longestDurationReading = readingsWithDuration
    .slice()
    .sort((a, b) => b.durationDays - a.durationDays)[0];

  const shortestDurationReading = readingsWithDuration
    .slice()
    .sort((a, b) => a.durationDays - b.durationDays)[0];

  const latestFinishedReading = previousReadings
    .slice()
    .sort((a, b) => {
      const dateA = new Date(a.fecha_fin || a.fecha_inicio || 0).getTime();
      const dateB = new Date(b.fecha_fin || b.fecha_inicio || 0).getTime();

      return dateB - dateA;
    })[0];

  return (
    <>
      <style>
        {`
          .club-stats-section {
            max-width: 1040px;
            margin: 0 auto;
          }

          .club-stats-header {
            text-align: center;
            margin-bottom: 30px;
          }

          .club-stats-kicker {
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

          .club-stats-title {
            margin: 0;
            font-family: Georgia, serif;
            font-size: 44px;
            line-height: 1.08;
            color: #403A36;
          }

          .club-stats-subtitle {
            max-width: 740px;
            margin: 14px auto 0 auto;
            color: #5f544f;
            font-size: 17px;
            line-height: 1.7;
          }

          .club-stats-grid {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 16px;
            margin-bottom: 24px;
          }

          .club-stat-card {
            background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
            border: 1px solid #E8DED8;
            border-radius: 24px;
            padding: 20px;
            box-shadow: 0 10px 24px rgba(64, 58, 54, 0.055);
          }

          .club-stat-label {
            margin: 0 0 8px 0;
            color: #5f544f;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
          }

          .club-stat-value {
            margin: 0;
            font-family: Georgia, serif;
            font-size: 34px;
            line-height: 1;
            color: #403A36;
          }

          .club-stat-note {
            margin: 8px 0 0 0;
            color: #6F655F;
            font-size: 13px;
            line-height: 1.4;
          }

          .club-stats-columns {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 22px;
            align-items: start;
            }

            .club-stats-column {
            display: grid;
            gap: 22px;
            align-items: start;
            }

          .club-stats-panel {
            background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
            border: 1px solid #E8DED8;
            border-radius: 28px;
            padding: 24px;
            box-shadow: 0 10px 26px rgba(64, 58, 54, 0.055);
            align-self: start;
            }

          .club-stats-panel-title {
            margin: 0 0 18px 0;
            font-family: Georgia, serif;
            font-size: 25px;
            line-height: 1.15;
            color: #403A36;
          }

          .club-stats-bars {
            display: grid;
            gap: 12px;
          }

          .club-stats-bar-row {
            display: grid;
            grid-template-columns: 90px 1fr 34px;
            gap: 10px;
            align-items: center;
          }

          .club-stats-bar-label {
            color: #5f544f;
            font-size: 13px;
            font-weight: 700;
          }

          .club-stats-bar-outer {
            height: 14px;
            border-radius: 999px;
            background: #F3ECE7;
            overflow: hidden;
            border: 1px solid #E8DED8;
          }

          .club-stats-bar-inner {
            height: 100%;
            border-radius: 999px;
            background: linear-gradient(90deg, #D8B7B0 0%, #A8B8A3 100%);
          }

          .club-stats-bar-count {
            color: #403A36;
            font-size: 13px;
            font-weight: 700;
            text-align: right;
          }

          .club-genre-list {
            display: grid;
            gap: 12px;
          }

          .club-genre-row {
            display: flex;
            justify-content: space-between;
            gap: 14px;
            align-items: center;
            background: #F7F3EE;
            border: 1px solid #E8DED8;
            border-radius: 16px;
            padding: 12px 14px;
          }

          .club-genre-name {
            color: #403A36;
            font-size: 14px;
            font-weight: 700;
          }

          .club-genre-count {
            color: #5f544f;
            font-size: 14px;
            font-weight: 700;
          }

          .club-year-genre-panel {
            margin-top: 22px;
            background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
            border: 1px solid #E8DED8;
            border-radius: 28px;
            padding: 24px;
            box-shadow: 0 10px 26px rgba(64, 58, 54, 0.055);
          }

          .club-year-genre-list {
            display: grid;
            gap: 12px;
          }

          .club-year-genre-row {
            display: grid;
            grid-template-columns: 160px 1fr 34px;
            gap: 12px;
            align-items: center;
          }

          .club-year-genre-name {
            color: #403A36;
            font-size: 14px;
            font-weight: 700;
          }

          .club-year-genre-bar-outer {
            height: 14px;
            border-radius: 999px;
            background: #F3ECE7;
            overflow: hidden;
            border: 1px solid #E8DED8;
          }

          .club-year-genre-bar-inner {
            height: 100%;
            border-radius: 999px;
            background: linear-gradient(90deg, #D8B7B0 0%, #A8B8A3 100%);
          }

          .club-year-genre-count {
            color: #403A36;
            font-size: 13px;
            font-weight: 700;
            text-align: right;
          }

          .club-year-genre-empty {
            margin: 0;
            color: #5f544f;
            font-size: 14px;
            line-height: 1.6;
          }

          .club-highlight-card {
            background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
            border: 1px solid #E8DED8;
            border-radius: 28px;
            padding: 24px;
            box-shadow: 0 10px 26px rgba(64, 58, 54, 0.055);
          }

          .club-highlight-kicker {
            display: inline-flex;
            align-items: center;
            border-radius: 999px;
            padding: 6px 11px;
            margin-bottom: 12px;
            background: #F3ECE7;
            color: #5f544f;
            border: 1px solid #E8DED8;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
          }

          .club-highlight-title {
            margin: 0 0 8px 0;
            font-family: Georgia, serif;
            font-size: 24px;
            line-height: 1.12;
            color: #403A36;
          }

          .club-highlight-text {
            margin: 0;
            color: #6F655F;
            font-size: 14px;
            line-height: 1.55;
          }

          .club-duration-list {
            display: grid;
            gap: 12px;
            margin-top: 16px;
          }

          .club-duration-item {
            background: #F7F3EE;
            border: 1px solid #E8DED8;
            border-radius: 18px;
            padding: 14px;
          }

          .club-duration-label {
            margin: 0 0 5px 0;
            color: #5f544f;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
          }

          .club-duration-title {
            margin: 0 0 4px 0;
            font-family: Georgia, serif;
            font-size: 18px;
            line-height: 1.2;
            color: #403A36;
          }

          .club-duration-meta {
            margin: 0;
            color: #6F655F;
            font-size: 13px;
            line-height: 1.4;
          }

          .club-stats-empty {
            background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
            border: 1px dashed #D8B7B0;
            border-radius: 26px;
            padding: 28px;
            color: #5f544f;
            text-align: center;
            line-height: 1.6;
          }

          @media (max-width: 900px) {
            .club-stats-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            .club-stats-columns {
               grid-template-columns: 1fr;
            }
          }

          @media (max-width: 700px) {
            .club-stats-title {
              font-size: 34px;
            }

            .club-stats-subtitle {
              font-size: 15.5px;
            }

            .club-stats-grid {
              grid-template-columns: 1fr;
            }

            .club-stat-card,
            .club-stats-panel,
            .club-highlight-card {
              border-radius: 24px;
              padding: 20px;
            }

            .club-stat-value {
              font-size: 31px;
            }

            .club-stats-bar-row {
              grid-template-columns: 54px 1fr 28px;
            }

            .club-year-genre-panel {
              border-radius: 24px;
              padding: 20px;
            }

            .club-year-genre-row {
              grid-template-columns: 1fr 34px;
              gap: 8px 10px;
            }

            .club-year-genre-name {
              grid-column: 1 / -1;
            }
          }
        `}
      </style>

      <section className="club-stats-section">
        <div className="club-stats-header">
          <div className="club-stats-kicker">📊 Balance del Club</div>

          <h1 className="club-stats-title">
            Estadísticas del Club de Lectura
          </h1>

          <p className="club-stats-subtitle">
            Un resumen de las lecturas conjuntas del Club de Lectura: libros compartidos,
            géneros más repetidos, recomendaciones, duración media y evolución por año.
          </p>
        </div>

        {totalReadings > 0 ? (
          <>
            <div className="club-stats-grid">
              <div className="club-stat-card">
                <p className="club-stat-label">Lecturas del Club</p>
                <p className="club-stat-value">{totalReadings}</p>
                <p className="club-stat-note">Leídas o actualmente activas</p>
              </div>

              <div className="club-stat-card">
                <p className="club-stat-label">Años registrados</p>
                <p className="club-stat-value">{yearEntries.length}</p>
                <p className="club-stat-note">Con lecturas conjuntas</p>
              </div>

              <div className="club-stat-card">
                <p className="club-stat-label">Recomendadas</p>
                <p className="club-stat-value">{recommendedCount}</p>
                <p className="club-stat-note">Propuestas por la comunidad</p>
              </div>

              <div className="club-stat-card">
                <p className="club-stat-label">Duración media</p>
                <p className="club-stat-value">{averageDurationDays}</p>
                <p className="club-stat-note">Días por lectura conjunta</p>
              </div>
            </div>

            <div className="club-stats-columns">
              <div className="club-stats-column">
                <div className="club-stats-panel">
                  <h2 className="club-stats-panel-title">
                    Lecturas por año
                  </h2>

                  <div className="club-stats-bars">
                    {yearEntries.map(([year, count]) => {
                      const width =
                        count === 0 ? 0 : Math.max((count / maxYearCount) * 100, 8);

                      return (
                        <div key={year} className="club-stats-bar-row">
                          <div className="club-stats-bar-label">{year}</div>

                          <div className="club-stats-bar-outer">
                            <div
                              className="club-stats-bar-inner"
                              style={{ width: `${width}%` }}
                            />
                          </div>

                          <div className="club-stats-bar-count">{count}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="club-highlight-card">
                  <div className="club-highlight-kicker">Duración</div>

                  <h2 className="club-highlight-title">
                    Ritmo de las lecturas conjuntas
                  </h2>

                  <p className="club-highlight-text">
                    La duración se calcula con la fecha de inicio y fin de cada lectura conjunta.
                    La media actual es de <strong>{averageDurationDays} días</strong> por lectura.
                  </p>

                  <div className="club-duration-list">
                    {longestDurationReading ? (
                      <div className="club-duration-item">
                        <p className="club-duration-label">Más larga</p>
                        <p className="club-duration-title">
                          {longestDurationReading.titulo}
                        </p>
                        <p className="club-duration-meta">
                          {longestDurationReading.durationDays} días ·{" "}
                          {formatPeriod(
                            longestDurationReading.fecha_inicio,
                            longestDurationReading.fecha_fin
                          )}
                        </p>
                      </div>
                    ) : null}

                    {shortestDurationReading ? (
                      <div className="club-duration-item">
                        <p className="club-duration-label">Más corta</p>
                        <p className="club-duration-title">
                          {shortestDurationReading.titulo}
                        </p>
                        <p className="club-duration-meta">
                          {shortestDurationReading.durationDays} días ·{" "}
                          {formatPeriod(
                            shortestDurationReading.fecha_inicio,
                            shortestDurationReading.fecha_fin
                          )}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="club-stats-column">
                <div className="club-stats-panel">
                  <h2 className="club-stats-panel-title">
                    Géneros más repetidos
                  </h2>

                  {genreEntries.length > 0 ? (
                    <div className="club-genre-list">
                      {genreEntries.map(([genre, count]) => (
                        <div key={genre} className="club-genre-row">
                          <span className="club-genre-name">{genre}</span>
                          <span className="club-genre-count">{count}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="club-highlight-text">
                      Todavía no hay géneros suficientes para mostrar estadísticas.
                    </p>
                  )}
                </div>

                <div className="club-highlight-card">
                  <div className="club-highlight-kicker">Situación actual</div>

                  <h2 className="club-highlight-title">
                    Última y próxima lectura
                  </h2>

                  <div className="club-duration-list">
                    {latestFinishedReading ? (
                      <div className="club-duration-item">
                        <p className="club-duration-label">Última finalizada</p>
                        <p className="club-duration-title">
                          {latestFinishedReading.titulo}
                        </p>
                        <p className="club-duration-meta">
                          {latestFinishedReading.autor} ·{" "}
                          {formatPeriod(
                            latestFinishedReading.fecha_inicio,
                            latestFinishedReading.fecha_fin
                          )}
                        </p>
                      </div>
                    ) : null}

                    {nextReading ? (
                      <div className="club-duration-item">
                        <p className="club-duration-label">Próxima lectura</p>
                        <p className="club-duration-title">
                          {nextReading.titulo}
                        </p>
                        <p className="club-duration-meta">
                          {nextReading.autor} · empieza el{" "}
                          {nextReading.fecha_inicio
                            ? new Intl.DateTimeFormat("es-ES", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }).format(new Date(nextReading.fecha_inicio))
                            : "próximamente"}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="club-year-genre-panel">
              <h2 className="club-stats-panel-title">
                Géneros del Club en {currentYear}
              </h2>

              {yearGenreEntries.length > 0 ? (
                <div className="club-year-genre-list">
                  {yearGenreEntries.map(([genre, count]) => {
                    const width =
                      count === 0 ? 0 : Math.max((count / maxYearGenreCount) * 100, 8);

                    return (
                      <div key={genre} className="club-year-genre-row">
                        <div className="club-year-genre-name">{genre}</div>

                        <div className="club-year-genre-bar-outer">
                          <div
                            className="club-year-genre-bar-inner"
                            style={{ width: `${width}%` }}
                          />
                        </div>

                        <div className="club-year-genre-count">{count}</div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="club-year-genre-empty">
                  Todavía no hay géneros registrados en las lecturas del Club de {currentYear}.
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="club-stats-empty">
            Todavía no hay lecturas suficientes para mostrar estadísticas del Club.
          </div>
        )}
      </section>
    </>
  );
}