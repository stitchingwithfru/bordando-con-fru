import Link from "next/link";
import { getWebsiteData, type MyReadingItem } from "@/lib/phase1-data";

function formatPersonalArchiveDate(value?: string) {
  if (!value) return "";

  if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
    const datePart = value.split(" ")[0];
    const [year, month, day] = datePart.split("-");

    const monthName = new Intl.DateTimeFormat("es-ES", {
      month: "long",
    }).format(new Date(Number(year), Number(month) - 1, Number(day)));

    return `${Number(day)} de ${monthName} de ${year}`;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("es-ES", {
    timeZone: "Europe/Madrid",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function getReadingDateForSorting(reading: MyReadingItem) {
  return reading.fecha_fin || reading.ultimo_progreso || reading.fecha_inicio || "";
}

function getReadingYear(reading: MyReadingItem) {
  const date = reading.fecha_fin || reading.ultimo_progreso || reading.fecha_inicio || "";
  const match = String(date).match(/^(\d{4})/);

  return match ? match[1] : "Sin fecha";
}

function getStatusLabel(status: string) {
  const normalized = String(status || "").toLowerCase();

  if (normalized === "leyendo") return "Leyendo";
  if (normalized === "pausado") return "Pausado";
  if (normalized === "terminado") return "Terminado";
  if (normalized === "abandonado") return "Abandonado";

  return status || "Sin estado";
}

function getMainDateLabel(reading: MyReadingItem) {
  const status = String(reading.estado || "").toLowerCase();

  if (status === "terminado" && reading.fecha_fin) {
    return `Finalizado el ${formatPersonalArchiveDate(reading.fecha_fin)}`;
  }

  if (status === "abandonado" && reading.fecha_fin) {
    return `Abandonado el ${formatPersonalArchiveDate(reading.fecha_fin)}`;
  }

  if (reading.ultimo_progreso) {
    return `Último avance: ${formatPersonalArchiveDate(reading.ultimo_progreso)}`;
  }

  if (reading.fecha_inicio) {
    return `Empezado el ${formatPersonalArchiveDate(reading.fecha_inicio)}`;
  }

  return "";
}

export default async function ArchivoMisLecturasPage() {
  const data = await getWebsiteData();

  const archiveReadings = (data.myReadings || [])
    .slice()
    .sort((a, b) => {
      const dateA = new Date(getReadingDateForSorting(a)).getTime();
      const dateB = new Date(getReadingDateForSorting(b)).getTime();

      return dateB - dateA;
    });

  const readingsByYear = archiveReadings.reduce<Record<string, MyReadingItem[]>>(
    (acc, reading) => {
      const year = getReadingYear(reading);

      if (!acc[year]) acc[year] = [];
      acc[year].push(reading);

      return acc;
    },
    {}
  );

  const years = Object.keys(readingsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#403A36] pt-12 pb-24">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <style>
          {`
            .personal-archive-hero {
              max-width: 980px;
              margin: 0 auto 72px auto;
              background: linear-gradient(135deg, #EFE5DE 0%, #FCFAF7 100%);
              border: 1px solid #E8DED8;
              border-radius: 34px;
              padding: 42px 34px;
              box-shadow: 0 12px 30px rgba(64, 58, 54, 0.06);
              text-align: center;
            }

            .personal-archive-kicker {
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

            .personal-archive-title {
              margin: 0 0 16px 0;
              font-family: Georgia, serif;
              font-size: 46px;
              line-height: 1.05;
              color: #403A36;
            }

            .personal-archive-intro {
              max-width: 760px;
              margin: 0 auto 26px auto;
              color: #6F655F;
              font-size: 18px;
              line-height: 1.7;
            }

            .personal-archive-actions {
              display: flex;
              justify-content: center;
              gap: 12px;
              flex-wrap: wrap;
            }

            .personal-archive-button {
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

            .personal-archive-section {
              max-width: 980px;
              margin: 0 auto;
            }

            .personal-archive-years {
              display: grid;
              gap: 72px;
            }

            .personal-archive-section-title {
              margin: 0 0 24px 0;
              font-family: Georgia, serif;
              font-size: 34px;
              line-height: 1.1;
              color: #403A36;
              display: flex;
              align-items: center;
              gap: 12px;
            }

            .personal-archive-section-title span {
              width: 36px;
              height: 2px;
              background: #D8B7B0;
              display: inline-block;
            }

            .personal-archive-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
              gap: 22px;
            }

            .personal-archive-card {
              background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
              border: 1px solid #E8DED8;
              border-radius: 26px;
              padding: 22px;
              box-shadow: 0 10px 24px rgba(64, 58, 54, 0.06);
            }

            .personal-archive-card-inner {
              display: flex;
              gap: 18px;
              align-items: flex-start;
            }

            .personal-archive-cover-wrap {
              width: 90px;
              min-width: 90px;
              display: flex;
              justify-content: center;
            }

            .personal-archive-cover {
              width: 90px;
              max-width: 90px;
              height: auto;
              object-fit: cover;
              border-radius: 12px;
              border: 1px solid #E8DED8;
              box-shadow: 0 8px 18px rgba(64, 58, 54, 0.12);
              display: block;
            }

            .personal-archive-card-content {
              flex: 1;
              min-width: 0;
            }

            .personal-archive-tags {
              display: flex;
              flex-wrap: wrap;
              gap: 8px;
              margin-bottom: 10px;
            }

            .personal-archive-tag {
              background: #F7F3EE;
              border: 1px solid #E8DED8;
              color: #6F655F;
              font-size: 12px;
              padding: 6px 10px;
              border-radius: 999px;
              font-weight: 700;
            }

            .personal-archive-tag.reading {
              background: #E9F0E6;
              color: #5E755C;
              border-color: rgba(94, 117, 92, 0.18);
            }

            .personal-archive-tag.paused {
              background: #F7F3EE;
              color: #8A7C74;
            }

            .personal-archive-tag.finished {
              background: #E9F0E6;
              color: #5E755C;
              border-color: rgba(94, 117, 92, 0.18);
            }

            .personal-archive-tag.abandoned {
              background: #F3ECE7;
              color: #8A7C74;
            }

            .personal-archive-book-title {
              margin: 0 0 6px 0;
              font-family: Georgia, serif;
              font-size: 22px;
              line-height: 1.15;
              color: #403A36;
            }

            .personal-archive-author {
              margin: 0 0 10px 0;
              color: #8A7C74;
              font-size: 15px;
              font-style: italic;
            }

            .personal-archive-date {
              margin: 0 0 10px 0;
              color: #6F655F;
              font-size: 13.5px;
              line-height: 1.45;
              font-weight: 700;
            }

            .personal-archive-progress {
              margin: 0 0 14px 0;
              color: #8A7C74;
              font-size: 13px;
              line-height: 1.45;
            }

            .personal-archive-link {
              display: inline-flex;
              align-items: center;
              color: #403A36;
              font-size: 14px;
              font-weight: 700;
              text-decoration: underline;
              text-underline-offset: 4px;
              text-decoration-color: #D8B7B0;
            }

            .personal-archive-empty {
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

            @media (max-width: 600px) {
              .personal-archive-hero {
                border-radius: 28px;
                padding: 32px 22px;
                margin-bottom: 56px;
              }

              .personal-archive-title {
                font-size: 36px;
              }

              .personal-archive-intro {
                font-size: 16px;
                line-height: 1.65;
              }

              .personal-archive-actions {
                flex-direction: column;
              }

              .personal-archive-button {
                width: 100%;
              }

              .personal-archive-years {
                gap: 56px;
              }

              .personal-archive-section-title {
                font-size: 29px;
                align-items: flex-start;
              }

              .personal-archive-card {
                padding: 18px;
                border-radius: 24px;
              }

              .personal-archive-card-inner {
                gap: 14px;
              }

              .personal-archive-cover-wrap {
                width: 76px;
                min-width: 76px;
              }

              .personal-archive-cover {
                width: 76px;
                max-width: 76px;
                border-radius: 10px;
              }

              .personal-archive-book-title {
                font-size: 20px;
              }
            }
          `}
        </style>

        <section className="personal-archive-hero">
          <div className="personal-archive-kicker">📚 Archivo personal</div>

          <h1 className="personal-archive-title">Archivo de mis lecturas</h1>

          <p className="personal-archive-intro">
            Consulta mi archivo lector personal, con las lecturas actuales, terminadas,
            pausadas y abandonadas organizadas por año.
          </p>

          <div className="personal-archive-actions">
            <Link href="/mis-lecturas" className="personal-archive-button">
              ← Volver a Mis lecturas
            </Link>

            <Link href="/club-de-lectura" className="personal-archive-button">
              Ir al Club de Lectura
            </Link>
          </div>
        </section>

        <section className="personal-archive-section">
          {archiveReadings.length > 0 ? (
            <div className="personal-archive-years">
              {years.map((year) => (
                <div key={year}>
                  <h2 className="personal-archive-section-title">
                    <span />
                    Lecturas de {year}
                  </h2>

                  <div className="personal-archive-grid">
                    {readingsByYear[year].map((reading) => {
                      const status = String(reading.estado || "").toLowerCase();
                      const statusClass =
                        status === "leyendo"
                          ? "reading"
                          : status === "pausado"
                            ? "paused"
                            : status === "terminado"
                              ? "finished"
                              : status === "abandonado"
                                ? "abandoned"
                                : "";

                      return (
                        <article key={reading.id} className="personal-archive-card">
                          <div className="personal-archive-card-inner">
                            <div className="personal-archive-cover-wrap">
                              <img
                                src={reading.portada_local || reading.portada_url}
                                alt={reading.titulo}
                                className="personal-archive-cover"
                                width={220}
                                height={330}
                              />
                            </div>

                            <div className="personal-archive-card-content">
                              <div className="personal-archive-tags">
                                <span className={`personal-archive-tag ${statusClass}`}>
                                  {getStatusLabel(status)}
                                </span>

                                <span className="personal-archive-tag">
                                  {reading.formato === "fisico" ? "Físico" : "Digital"}
                                </span>
                              </div>

                              <h3 className="personal-archive-book-title">
                                {reading.titulo}
                              </h3>

                              <p className="personal-archive-author">
                                por {reading.autor}
                              </p>

                              {getMainDateLabel(reading) ? (
                                <p className="personal-archive-date">
                                  {getMainDateLabel(reading)}
                                </p>
                              ) : null}

                              <p className="personal-archive-progress">
                                {reading.formato === "fisico"
                                  ? `Progreso: página ${reading.pagina_actual || 0} de ${
                                      reading.paginas_totales || 0
                                    } · ${reading.progressPercent || 0}%`
                                  : `Progreso: ${reading.progressPercent || 0}%`}
                              </p>

                              {reading.goodreads_url ? (
                                <a
                                  href={reading.goodreads_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="personal-archive-link"
                                >
                                  Ver en Goodreads →
                                </a>
                              ) : null}
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="personal-archive-empty">
              Todavía no hay lecturas en el archivo personal.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}