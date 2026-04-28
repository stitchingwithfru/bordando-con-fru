import { getWebsiteData, formatPeriod, formatExactPeriod } from "@/lib/phase1-data";

const TELEGRAM_CLUB_URL = "https://t.me/+L60IJP_3STcwZTU0";

function getDaysLeftInYear(year: number) {
  const today = new Date();
  const endOfYear = new Date(year, 11, 31);
  const diff = endOfYear.getTime() - today.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function getChallengeMessage(completed: number, goal: number) {
  const remaining = Math.max(goal - completed, 0);

  if (!goal || goal <= 0) return "Define tu objetivo lector para empezar.";
  if (remaining === 0) return "¡Reto completado! Qué maravilla.";
  if (completed === 0) return "Todo reto empieza con una primera lectura.";
  if (remaining <= 3) return `¡Estás a punto de conseguirlo! Solo faltan ${remaining} libros.`;

  return `Llevas ${completed} lecturas completadas. Te quedan ${remaining} para alcanzar tu objetivo.`;
}

function ReadingChallengeCard({
  challenge,
}: {
  challenge: {
    year: number;
    goal: number;
    completed: number;
    progressPercent: number;
  };
}) {
  const completed = challenge?.completed || 0;
  const goal = challenge?.goal || 0;
  const year = challenge?.year || new Date().getFullYear();
  const progress = Math.min(Math.max(challenge?.progressPercent || 0, 0), 100);
  const daysLeft = getDaysLeftInYear(year);
  const message = getChallengeMessage(completed, goal);

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%)",
        border: "1px solid #E8DED8",
        borderRadius: "30px",
        padding: "28px",
        boxShadow: "0 10px 28px rgba(64, 58, 54, 0.07)",
        width: "100%",
        maxWidth: "980px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "28px",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            width: "112px",
            height: "112px",
            minWidth: "112px",
            borderRadius: "26px",
            background: "linear-gradient(145deg, #A8B8A3 0%, #7F9679 100%)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 22px rgba(64, 58, 54, 0.14)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "90px",
              height: "90px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.12)",
              right: "-24px",
              top: "-24px",
            }}
          />

          <div
            style={{
              fontSize: "30px",
              lineHeight: "1",
              fontWeight: 700,
              marginBottom: "14px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {year}
          </div>

          <div
            style={{
              width: "72px",
              height: "42px",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "4px",
                top: "6px",
                width: "32px",
                height: "28px",
                borderRadius: "18px 4px 4px 18px",
                background: "#FFF7EF",
                transform: "rotate(-8deg)",
                boxShadow: "inset -4px 0 0 rgba(64,58,54,0.08)",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: "4px",
                top: "6px",
                width: "32px",
                height: "28px",
                borderRadius: "4px 18px 18px 4px",
                background: "#FFF7EF",
                transform: "rotate(8deg)",
                boxShadow: "inset 4px 0 0 rgba(64,58,54,0.08)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "35px",
                top: "8px",
                width: "2px",
                height: "30px",
                background: "rgba(64,58,54,0.18)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "14px",
                bottom: "0",
                width: "44px",
                height: "7px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.35)",
              }}
            />
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "10px",
              padding: "6px 12px",
              borderRadius: "999px",
              background: "#F3ECE7",
              color: "#8A7C74",
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              fontWeight: 700,
            }}
          >
            📚 Objetivo lector
          </div>

          <h3
            style={{
              margin: 0,
              marginBottom: "10px",
              fontFamily: "Georgia, serif",
              fontSize: "38px",
              lineHeight: "1.05",
              color: "#2F2926",
            }}
          >
            Reto de lectura {year}
          </h3>

          <p
            style={{
              margin: 0,
              marginBottom: "28px",
              fontSize: "18px",
              lineHeight: "1.45",
              color: "#403A36",
            }}
          >
            {message}
          </p>

          <div
            style={{
              marginBottom: "18px",
              fontSize: "21px",
              lineHeight: "1.35",
              color: "#2F2926",
            }}
          >
            <strong>{completed} de {goal} libros leídos</strong>
            <span style={{ color: "#8A7C74", fontWeight: 400 }}>
              {" "} · {daysLeft} días restantes
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <div
              style={{
                flex: 1,
                height: "32px",
                border: "2px solid #D8B7B0",
                borderRadius: "999px",
                background: "#FFFFFF",
                padding: "5px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  borderRadius: "999px",
                  background: "linear-gradient(90deg, #D8B7B0 0%, #A8B8A3 100%)",
                  transition: "width 0.7s ease",
                }}
              />
            </div>

            <div
              style={{
                minWidth: "58px",
                textAlign: "right",
                fontSize: "24px",
                fontWeight: 600,
                color: "#6F655F",
              }}
            >
              {progress}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function ClubDeLecturaPage() {
  const data = await getWebsiteData();
  const { currentReading, nextReading, previousReadings, recommendedReadings, readingChallenge } = data;

  // Evitar duplicados en las recomendaciones
  const usedIds = new Set([
    currentReading?.id,
    nextReading?.id,
    ...previousReadings.map((b) => b.id),
  ].filter(Boolean));

  const uniqueRecommendations = recommendedReadings.filter((b) => !usedIds.has(b.id));

  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#403A36] pt-12 pb-24 selection:bg-[#D8B7B0] selection:text-white">
      <div className="max-w-6xl mx-auto px-5 md:px-8 space-y-16">
        
        {/* === HERO + UNIRSE AL CLUB === */}
        <section
          style={{
            background: "linear-gradient(135deg, #EFE5DE 0%, #FCFAF7 100%)",
            border: "1px solid #E8DED8",
            borderRadius: "32px",
            padding: "34px",
            boxShadow: "0 10px 28px rgba(64, 58, 54, 0.06)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "180px 1fr",
              gap: "32px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "180px",
                minWidth: "180px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src="/images/club-de-lectura.jpeg"
                alt="Club de Lectura Bordando con Fru"
                style={{
                  width: "160px",
                  height: "160px",
                  objectFit: "cover",
                  borderRadius: "999px",
                  border: "1px solid #E8DED8",
                  boxShadow: "0 10px 24px rgba(64, 58, 54, 0.14)",
                  display: "block",
                }}
              />
            </div>

            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(255,255,255,0.72)",
                  border: "1px solid #E8DED8",
                  borderRadius: "999px",
                  padding: "7px 14px",
                  marginBottom: "16px",
                  color: "#8A7C74",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                ☕ Lecturas, calma y ratitos para compartir
              </div>

              <h1
                style={{
                  margin: 0,
                  marginBottom: "14px",
                  fontFamily: "Georgia, serif",
                  fontSize: "44px",
                  lineHeight: "1.05",
                  color: "#403A36",
                }}
              >
                Club de Lectura
              </h1>

              <p
                style={{
                  margin: 0,
                  maxWidth: "760px",
                  color: "#6F655F",
                  fontSize: "19px",
                  lineHeight: "1.6",
                }}
              >
                Un espacio cálido para seguir nuestras lecturas, descubrir nuevas historias
                y disfrutar de los libros a nuestro propio ritmo.
              </p>
            </div>
          </div>
        </section>

        {/* === AVISOS Y RETO ANUAL === */}
        <section className="space-y-12">
          {/* Unirse al Club en Telegram */}
          <div
            style={{
              background: "linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%)",
              border: "1px solid #E8DED8",
              borderRadius: "30px",
              padding: "26px",
              boxShadow: "0 10px 28px rgba(64, 58, 54, 0.07)",
              width: "100%",
              maxWidth: "980px",
              margin: "0 auto 48px auto",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "18px",
                alignItems: "flex-start",
                marginBottom: "22px",
              }}
            >
              <div
                style={{
                  width: "54px",
                  height: "54px",
                  minWidth: "54px",
                  borderRadius: "18px",
                  background: "#F3ECE7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "26px",
                }}
              >
                💬
              </div>

              <div>
                <div
                  style={{
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "#8A7C74",
                    fontWeight: 700,
                    marginBottom: "8px",
                  }}
                >
                  Comunidad en Telegram
                </div>

                <h2
                  style={{
                    margin: 0,
                    fontFamily: "Georgia, serif",
                    fontSize: "34px",
                    lineHeight: "1.1",
                    color: "#403A36",
                  }}
                >
                  ¡Únete al Club de Lectura!
                </h2>
              </div>
            </div>

            <p
              style={{
                margin: 0,
                marginBottom: "24px",
                color: "#6F655F",
                fontSize: "17px",
                lineHeight: "1.65",
                maxWidth: "680px",
              }}
            >
              Recibe avisos sobre las próximas lecturas, recomendaciones, novedades del
              Club de Lectura y participa en las lecturas conjuntas que se organizan.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "12px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  background: "#F7F3EE",
                  border: "1px solid #E8DED8",
                  borderRadius: "18px",
                  padding: "14px",
                }}
              >
                <div style={{ fontSize: "22px", marginBottom: "6px" }}>📖</div>
                <div style={{ fontSize: "14px", color: "#6F655F", lineHeight: "1.35" }}>
                  Lecturas conjuntas
                </div>
              </div>

              <div
                style={{
                  background: "#F7F3EE",
                  border: "1px solid #E8DED8",
                  borderRadius: "18px",
                  padding: "14px",
                }}
              >
                <div style={{ fontSize: "22px", marginBottom: "6px" }}>✨</div>
                <div style={{ fontSize: "14px", color: "#6F655F", lineHeight: "1.35" }}>
                  Avisos y novedades
                </div>
              </div>

              <div
                style={{
                  background: "#F7F3EE",
                  border: "1px solid #E8DED8",
                  borderRadius: "18px",
                  padding: "14px",
                }}
              >
                <div style={{ fontSize: "22px", marginBottom: "6px" }}>📚</div>
                <div style={{ fontSize: "14px", color: "#6F655F", lineHeight: "1.35" }}>
                  Recomendaciones
                </div>
              </div>
            </div>

            <a
              href={TELEGRAM_CLUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                background: "#403A36",
                color: "#FFFFFF",
                borderRadius: "999px",
                padding: "13px 22px",
                fontSize: "15px",
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 8px 18px rgba(64, 58, 54, 0.14)",
              }}
            >
              Unirme al Club en Telegram →
            </a>
          </div>

          <ReadingChallengeCard challenge={readingChallenge} />
        </section>

        {/* === LECTURA ACTUAL === */}
        <section style={{ marginTop: "56px" }}>
          <div
            style={{
              maxWidth: "980px",
              margin: "0 auto",
            }}
          >
            <h2
              style={{
                margin: 0,
                marginBottom: "22px",
                fontFamily: "Georgia, serif",
                fontSize: "36px",
                lineHeight: "1.1",
                color: "#403A36",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span
                style={{
                  width: "36px",
                  height: "2px",
                  background: "#D8B7B0",
                  display: "inline-block",
                }}
              />
              Lectura actual
            </h2>

            {currentReading ? (
              <div
                style={{
                  background: "linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%)",
                  border: "1px solid #E8DED8",
                  borderRadius: "30px",
                  padding: "34px",
                  boxShadow: "0 10px 28px rgba(64, 58, 54, 0.07)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "24px",
                  }}
                >
                  <img
                    src={currentReading.portada_url}
                    alt={currentReading.titulo}
                    style={{
                      width: "165px",
                      maxWidth: "165px",
                      height: "auto",
                      objectFit: "cover",
                      borderRadius: "16px",
                      border: "1px solid #E8DED8",
                      boxShadow: "0 12px 26px rgba(64, 58, 54, 0.16)",
                      display: "block",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                    flexWrap: "wrap",
                    marginBottom: "18px",
                  }}
                >
                  <span
                    style={{
                      background: "#EFE5DE",
                      color: "#403A36",
                      fontSize: "12px",
                      padding: "7px 13px",
                      borderRadius: "999px",
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                    }}
                  >
                    Lectura en curso
                  </span>

                  {currentReading.recomendada && (
                    <span
                      style={{
                        background: "#E9F0E6",
                        color: "#5E755C",
                        fontSize: "12px",
                        padding: "7px 13px",
                        borderRadius: "999px",
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                      }}
                    >
                      ★ Recomendado
                    </span>
                  )}
                </div>

                <h3
                  style={{
                    margin: 0,
                    marginBottom: "8px",
                    fontFamily: "Georgia, serif",
                    fontSize: "34px",
                    lineHeight: "1.15",
                    color: "#403A36",
                  }}
                >
                  {currentReading.titulo}
                </h3>

                <p
                  style={{
                    margin: 0,
                    marginBottom: "18px",
                    color: "#8A7C74",
                    fontSize: "18px",
                    fontStyle: "italic",
                  }}
                >
                  por {currentReading.autor}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                    flexWrap: "wrap",
                    marginBottom: "24px",
                  }}
                >
                  <span
                    style={{
                      background: "#F7F3EE",
                      border: "1px solid #E8DED8",
                      color: "#6F655F",
                      fontSize: "14px",
                      padding: "8px 13px",
                      borderRadius: "12px",
                    }}
                  >
                    {currentReading.generos}
                  </span>

                  <span
                    style={{
                      background: "#F7F3EE",
                      border: "1px solid #E8DED8",
                      color: "#6F655F",
                      fontSize: "14px",
                      padding: "8px 13px",
                      borderRadius: "12px",
                    }}
                  >
                    {formatExactPeriod(currentReading.fecha_inicio, currentReading.fecha_fin)}
                  </span>
                </div>

                <p
                  style={{
                    maxWidth: "760px",
                    margin: "0 auto 28px auto",
                    color: "rgba(64, 58, 54, 0.82)",
                    fontSize: "16px",
                    lineHeight: "1.75",
                    textAlign: "justify",
                    hyphens: "auto",
                  }}
                >
                  {currentReading.sinopsis}
                </p>

                <a
                  href={currentReading.goodreads_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#403A36",
                    color: "#FFFFFF",
                    padding: "13px 22px",
                    borderRadius: "999px",
                    fontSize: "15px",
                    fontWeight: 700,
                    textDecoration: "none",
                    boxShadow: "0 8px 18px rgba(64, 58, 54, 0.14)",
                  }}
                >
                  Ver en Goodreads →
                </a>
              </div>
            ) : (
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E8DED8",
                  borderRadius: "24px",
                  padding: "32px",
                  textAlign: "center",
                  color: "#8A7C74",
                }}
              >
                Actualmente no hay ninguna lectura conjunta en curso. Revisa la sección de "Próxima lectura" para conocer la fecha de inicio de la próxima aventura en la que nos vamos a sumergir.
              </div>
            )}
          </div>
        </section>

        {/* === PRÓXIMA LECTURA === */}
        <section style={{ marginTop: "56px" }}>
          <div
            style={{
              maxWidth: "980px",
              margin: "0 auto",
            }}
          >
            <h2
              style={{
                margin: 0,
                marginBottom: "22px",
                fontFamily: "Georgia, serif",
                fontSize: "36px",
                lineHeight: "1.1",
                color: "#403A36",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span
                style={{
                  width: "36px",
                  height: "2px",
                  background: "#A8B8A3",
                  display: "inline-block",
                }}
              />
              Próxima lectura
            </h2>

            {nextReading ? (
              <div
                style={{
                  background: "linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%)",
                  border: "1px solid #E8DED8",
                  borderRadius: "30px",
                  padding: "30px",
                  boxShadow: "0 10px 28px rgba(64, 58, 54, 0.07)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "22px",
                  }}
                >
                  <img
                    src={nextReading.portada_url}
                    alt={nextReading.titulo}
                    style={{
                      width: "150px",
                      maxWidth: "150px",
                      height: "auto",
                      objectFit: "cover",
                      borderRadius: "16px",
                      border: "1px solid #E8DED8",
                      boxShadow: "0 12px 26px rgba(64, 58, 54, 0.13)",
                      display: "block",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                    flexWrap: "wrap",
                    marginBottom: "18px",
                  }}
                >
                  <span
                    style={{
                      background: "#E9F0E6",
                      color: "#5E755C",
                      fontSize: "12px",
                      padding: "7px 13px",
                      borderRadius: "999px",
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                    }}
                  >
                    Próximamente
                  </span>

                  {nextReading.recomendada && (
                    <span
                      style={{
                        background: "#E9F0E6",
                        color: "#5E755C",
                        fontSize: "12px",
                        padding: "7px 13px",
                        borderRadius: "999px",
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                      }}
                    >
                      ★ Recomendado
                    </span>
                  )}
                </div>

                <h3
                  style={{
                    margin: 0,
                    marginBottom: "8px",
                    fontFamily: "Georgia, serif",
                    fontSize: "32px",
                    lineHeight: "1.15",
                    color: "#403A36",
                  }}
                >
                  {nextReading.titulo}
                </h3>

                <p
                  style={{
                    margin: 0,
                    marginBottom: "18px",
                    color: "#8A7C74",
                    fontSize: "17px",
                    fontStyle: "italic",
                  }}
                >
                  por {nextReading.autor}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                    flexWrap: "wrap",
                    marginBottom: "24px",
                  }}
                >
                  <span
                    style={{
                      background: "#F7F3EE",
                      border: "1px solid #E8DED8",
                      color: "#6F655F",
                      fontSize: "14px",
                      padding: "8px 13px",
                      borderRadius: "12px",
                    }}
                  >
                    {nextReading.generos}
                  </span>

                  <span
                    style={{
                      background: "#F7F3EE",
                      border: "1px solid #E8DED8",
                      color: "#6F655F",
                      fontSize: "14px",
                      padding: "8px 13px",
                      borderRadius: "12px",
                    }}
                  >
                    {formatExactPeriod(nextReading.fecha_inicio, nextReading.fecha_fin)}
                  </span>
                </div>

                <p
                  style={{
                    maxWidth: "760px",
                    margin: "0 auto 28px auto",
                    color: "rgba(64, 58, 54, 0.82)",
                    fontSize: "16px",
                    lineHeight: "1.75",
                    textAlign: "justify",
                    hyphens: "auto",
                  }}
                >
                  {nextReading.sinopsis}
                </p>

                <a
                  href={nextReading.goodreads_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#403A36",
                    color: "#FFFFFF",
                    padding: "13px 22px",
                    borderRadius: "999px",
                    fontSize: "15px",
                    fontWeight: 700,
                    textDecoration: "none",
                    boxShadow: "0 8px 18px rgba(64, 58, 54, 0.14)",
                  }}
                >
                  Ver en Goodreads →
                </a>
              </div>
            ) : (
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E8DED8",
                  borderRadius: "24px",
                  padding: "32px",
                  textAlign: "center",
                  color: "#8A7C74",
                  boxShadow: "0 10px 28px rgba(64, 58, 54, 0.05)",
                }}
              >
                Próximamente se anunciará la siguiente lectura.
              </div>
            )}
          </div>
        </section>

        {/* === LECTURAS ANTERIORES === */}
        {previousReadings.length > 0 && (
          <section style={{ marginTop: "56px" }}>
            <div
              style={{
                maxWidth: "980px",
                margin: "0 auto",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  marginBottom: "22px",
                  fontFamily: "Georgia, serif",
                  fontSize: "36px",
                  lineHeight: "1.1",
                  color: "#403A36",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    width: "36px",
                    height: "2px",
                    background: "#E8DED8",
                    display: "inline-block",
                  }}
                />
                Lecturas anteriores
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "22px",
                }}
              >
                {previousReadings.map((book) => (
                  <div
                    key={book.id}
                    style={{
                      background: "linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%)",
                      border: "1px solid #E8DED8",
                      borderRadius: "26px",
                      padding: "22px",
                      boxShadow: "0 10px 24px rgba(64, 58, 54, 0.06)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "18px",
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          width: "90px",
                          minWidth: "90px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={book.portada_url}
                          alt={book.titulo}
                          style={{
                            width: "90px",
                            maxWidth: "90px",
                            height: "auto",
                            objectFit: "cover",
                            borderRadius: "12px",
                            border: "1px solid #E8DED8",
                            boxShadow: "0 8px 18px rgba(64, 58, 54, 0.12)",
                            display: "block",
                          }}
                        />
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "8px",
                            marginBottom: "10px",
                          }}
                        >
                          <span
                            style={{
                              background: "#F7F3EE",
                              border: "1px solid #E8DED8",
                              color: "#6F655F",
                              fontSize: "12px",
                              padding: "6px 10px",
                              borderRadius: "999px",
                              fontWeight: 600,
                            }}
                          >
                            {book.generos}
                          </span>

                          {book.recomendada && (
                            <span
                              style={{
                                background: "#E9F0E6",
                                color: "#5E755C",
                                fontSize: "12px",
                                padding: "6px 10px",
                                borderRadius: "999px",
                                fontWeight: 700,
                              }}
                            >
                              ★ Recomendado
                            </span>
                          )}
                        </div>

                        <h3
                          style={{
                            margin: 0,
                            marginBottom: "6px",
                            fontFamily: "Georgia, serif",
                            fontSize: "22px",
                            lineHeight: "1.15",
                            color: "#403A36",
                          }}
                        >
                          {book.titulo}
                        </h3>

                        <p
                          style={{
                            margin: 0,
                            marginBottom: "10px",
                            color: "#8A7C74",
                            fontSize: "15px",
                            fontStyle: "italic",
                          }}
                        >
                          por {book.autor}
                        </p>

                        <p
                          style={{
                            margin: 0,
                            marginBottom: "16px",
                            color: "#8A7C74",
                            fontSize: "13px",
                          }}
                        >
                          {formatPeriod(book.fecha_inicio, book.fecha_fin)}
                        </p>

                        <a
                          href={book.goodreads_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            color: "#403A36",
                            fontSize: "14px",
                            fontWeight: 700,
                            textDecoration: "underline",
                            textUnderlineOffset: "4px",
                            textDecorationColor: "#D8B7B0",
                          }}
                        >
                          Ver en Goodreads →
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* === RECOMENDACIONES === */}
        <section style={{ marginTop: "56px" }}>
          <div
            style={{
              maxWidth: "980px",
              margin: "0 auto",
            }}
          >
            <h2
              style={{
                margin: 0,
                marginBottom: "22px",
                fontFamily: "Georgia, serif",
                fontSize: "36px",
                lineHeight: "1.1",
                color: "#403A36",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span
                style={{
                  width: "36px",
                  height: "2px",
                  background: "#D8B7B0",
                  display: "inline-block",
                }}
              />
              Recomendaciones
            </h2>

            {uniqueRecommendations.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "22px",
                }}
              >
                {uniqueRecommendations.map((book) => (
                  <div
                    key={book.id}
                    style={{
                      background: "linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%)",
                      border: "1px solid #E8DED8",
                      borderRadius: "26px",
                      padding: "22px",
                      boxShadow: "0 10px 24px rgba(64, 58, 54, 0.06)",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "16px",
                      }}
                    >
                      <img
                        src={book.portada_url}
                        alt={book.titulo}
                        style={{
                          width: "95px",
                          maxWidth: "95px",
                          height: "auto",
                          objectFit: "cover",
                          borderRadius: "12px",
                          border: "1px solid #E8DED8",
                          boxShadow: "0 8px 18px rgba(64, 58, 54, 0.12)",
                          display: "block",
                        }}
                      />
                    </div>

                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#E9F0E6",
                        color: "#5E755C",
                        fontSize: "12px",
                        padding: "6px 11px",
                        borderRadius: "999px",
                        fontWeight: 700,
                        marginBottom: "12px",
                      }}
                    >
                      ★ Recomendado
                    </div>

                    <h3
                      style={{
                        margin: 0,
                        marginBottom: "8px",
                        fontFamily: "Georgia, serif",
                        fontSize: "22px",
                        lineHeight: "1.15",
                        color: "#403A36",
                      }}
                    >
                      {book.titulo}
                    </h3>

                    <p
                      style={{
                        margin: 0,
                        marginBottom: "10px",
                        color: "#8A7C74",
                        fontSize: "15px",
                        fontStyle: "italic",
                      }}
                    >
                      por {book.autor}
                    </p>

                    {book.generos && (
                      <div
                        style={{
                          display: "inline-flex",
                          background: "#F7F3EE",
                          border: "1px solid #E8DED8",
                          color: "#6F655F",
                          fontSize: "13px",
                          padding: "7px 11px",
                          borderRadius: "999px",
                          marginBottom: "16px",
                        }}
                      >
                        {book.generos}
                      </div>
                    )}

                    {book.goodreads_url && (
                      <div>
                        <a
                          href={book.goodreads_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            color: "#403A36",
                            fontSize: "14px",
                            fontWeight: 700,
                            textDecoration: "underline",
                            textUnderlineOffset: "4px",
                            textDecorationColor: "#D8B7B0",
                          }}
                        >
                          Ver en Goodreads →
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{
                  background: "linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%)",
                  border: "1px dashed #D8B7B0",
                  borderRadius: "26px",
                  padding: "34px",
                  boxShadow: "0 10px 24px rgba(64, 58, 54, 0.04)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "34px",
                    marginBottom: "10px",
                  }}
                >
                  📚
                </div>

                <h3
                  style={{
                    margin: 0,
                    marginBottom: "8px",
                    fontFamily: "Georgia, serif",
                    fontSize: "26px",
                    color: "#403A36",
                  }}
                >
                  Próximamente añadiré recomendaciones destacadas
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: "#8A7C74",
                    fontSize: "16px",
                    lineHeight: "1.6",
                  }}
                >
                  Aquí aparecerán libros recomendados que no formen parte de las lecturas actuales o anteriores del club.
                </p>
              </div>
            )}
          </div>
        </section>

      </div>
    </main>
  );
}