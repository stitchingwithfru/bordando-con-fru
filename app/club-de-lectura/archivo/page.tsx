import Link from "next/link";
import { getWebsiteData, formatPeriod } from "@/lib/phase1-data";

export default async function ArchivoClubPage() {
  const data = await getWebsiteData();
  const { currentReading, previousReadings } = data;

  const archiveReadings = [
    ...previousReadings
        .slice()
        .reverse()
        .map((reading) => ({
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

    const readingsByYear = archiveReadings.reduce<Record<string, typeof archiveReadings>>(
    (acc, reading) => {
        const year =
        reading.fecha_inicio?.slice(0, 4) ||
        reading.fecha_fin?.slice(0, 4) ||
        "Sin fecha";

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
            .archive-hero {
              max-width: 980px;
              margin: 0 auto 72px auto;
              background: linear-gradient(135deg, #EFE5DE 0%, #FCFAF7 100%);
              border: 1px solid #E8DED8;
              border-radius: 34px;
              padding: 42px 34px;
              box-shadow: 0 12px 30px rgba(64, 58, 54, 0.06);
              text-align: center;
            }

            .archive-kicker {
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

            .archive-title {
              margin: 0 0 16px 0;
              font-family: Georgia, serif;
              font-size: 46px;
              line-height: 1.05;
              color: #403A36;
            }

            .archive-intro {
              max-width: 760px;
              margin: 0 auto 26px auto;
              color: #6F655F;
              font-size: 18px;
              line-height: 1.7;
            }

            .archive-actions {
              display: flex;
              justify-content: center;
              gap: 12px;
              flex-wrap: wrap;
            }

            .archive-button {
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

            .archive-section {
              max-width: 980px;
              margin: 0 auto;
            }

            .archive-section-title {
              margin: 0 0 24px 0;
              font-family: Georgia, serif;
              font-size: 34px;
              line-height: 1.1;
              color: #403A36;
              display: flex;
              align-items: center;
              gap: 12px;
            }

            .archive-section-title span {
              width: 36px;
              height: 2px;
              background: #D8B7B0;
              display: inline-block;
            }

            .archive-years {
                display: grid;
                gap: 72px;
                }

                .archive-year-group {
                display: block;
                }

            .archive-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
              gap: 22px;
            }

            .archive-card {
              background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
              border: 1px solid #E8DED8;
              border-radius: 26px;
              padding: 22px;
              box-shadow: 0 10px 24px rgba(64, 58, 54, 0.06);
            }

            .archive-card-inner {
              display: flex;
              gap: 18px;
              align-items: flex-start;
            }

            .archive-cover-wrap {
              width: 90px;
              min-width: 90px;
              display: flex;
              justify-content: center;
            }

            .archive-cover {
              width: 90px;
              max-width: 90px;
              height: auto;
              object-fit: cover;
              border-radius: 12px;
              border: 1px solid #E8DED8;
              box-shadow: 0 8px 18px rgba(64, 58, 54, 0.12);
              display: block;
            }

            .archive-card-content {
              flex: 1;
              min-width: 0;
            }

            .archive-tags {
              display: flex;
              flex-wrap: wrap;
              gap: 8px;
              margin-bottom: 10px;
            }

            .archive-tag {
              background: #F7F3EE;
              border: 1px solid #E8DED8;
              color: #6F655F;
              font-size: 12px;
              padding: 6px 10px;
              border-radius: 999px;
              font-weight: 600;
            }

            .archive-tag.current {
              background: #E9F0E6;
              color: #5E755C;
              font-weight: 700;
            }

            .archive-tag.recommended {
              background: #E9F0E6;
              color: #5E755C;
              font-weight: 700;
            }

            .archive-book-title {
              margin: 0 0 6px 0;
              font-family: Georgia, serif;
              font-size: 22px;
              line-height: 1.15;
              color: #403A36;
            }

            .archive-author {
              margin: 0 0 10px 0;
              color: #8A7C74;
              font-size: 15px;
              font-style: italic;
            }

            .archive-period {
              margin: 0 0 16px 0;
              color: #8A7C74;
              font-size: 13px;
            }

            .archive-link {
              display: inline-flex;
              align-items: center;
              color: #403A36;
              font-size: 14px;
              font-weight: 700;
              text-decoration: underline;
              text-underline-offset: 4px;
              text-decoration-color: #D8B7B0;
            }

            .archive-empty {
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
              .archive-hero {
                border-radius: 28px;
                padding: 32px 22px;
                margin-bottom: 56px;
              }

              .archive-title {
                font-size: 36px;
              }

              .archive-intro {
                font-size: 16px;
                line-height: 1.65;
              }

              .archive-actions {
                flex-direction: column;
              }

              .archive-button {
                width: 100%;
              }

              .archive-section-title {
                font-size: 29px;
                align-items: flex-start;
              }

              .archive-card {
                padding: 18px;
                border-radius: 24px;
              }

              .archive-card-inner {
                gap: 14px;
              }

              .archive-cover-wrap {
                width: 76px;
                min-width: 76px;
              }

              .archive-cover {
                width: 76px;
                max-width: 76px;
                border-radius: 10px;
              }

              .archive-book-title {
                font-size: 20px;
              }

              .archive-years {
                gap: 56px;
                }
            }
          `}
        </style>

        <section className="archive-hero">
          <div className="archive-kicker">📚 Archivo anual</div>

          <h1 className="archive-title">Archivo de lecturas del Club</h1>

          <p className="archive-intro">
            Consulta las lecturas que hemos compartido en el Club de Lectura,
            organizadas por año y con sus períodos, géneros y enlaces a Goodreads.
          </p>

          <div className="archive-actions">
            <Link href="/club-de-lectura" className="archive-button">
              ← Volver al Club
            </Link>

            <Link href="/club-de-lectura/como-funciona" className="archive-button">
              Cómo funciona el Club
            </Link>
          </div>
        </section>

        <section className="archive-section">
            {archiveReadings.length > 0 ? (
                <div className="archive-years">
                {years.map((year) => (
                    <div key={year} className="archive-year-group">
                    <h2 className="archive-section-title">
                        <span />
                        Lecturas de {year}
                    </h2>

                    <div className="archive-grid">
                        {readingsByYear[year].map((book) => (
                        <article key={book.id} className="archive-card">
                            <div className="archive-card-inner">
                            <div className="archive-cover-wrap">
                                <img
                                src={book.portada_url}
                                alt={book.titulo}
                                className="archive-cover"
                                />
                            </div>

                            <div className="archive-card-content">
                                <div className="archive-tags">
                                <span
                                    className={`archive-tag ${
                                    book.archiveState === "Actual" ? "current" : ""
                                    }`}
                                >
                                    {book.archiveState}
                                </span>

                                {book.generos ? (
                                    <span className="archive-tag">{book.generos}</span>
                                ) : null}

                                {book.recomendada ? (
                                    <span className="archive-tag recommended">
                                    ★ Recomendado
                                    </span>
                                ) : null}
                                </div>

                                <h3 className="archive-book-title">{book.titulo}</h3>

                                <p className="archive-author">por {book.autor}</p>

                                <p className="archive-period">
                                {formatPeriod(book.fecha_inicio, book.fecha_fin)}
                                </p>

                                {book.goodreads_url ? (
                                <a
                                    href={book.goodreads_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="archive-link"
                                >
                                    Ver en Goodreads →
                                </a>
                                ) : null}
                            </div>
                            </div>
                        </article>
                        ))}
                    </div>
                    </div>
                ))}
                </div>
            ) : (
                <div className="archive-empty">
                Todavía no hay lecturas archivadas. Cuando finalicen las primeras lecturas conjuntas,
                aparecerán aquí.
                </div>
            )}
            </section>
      </div>
    </main>
  );
}