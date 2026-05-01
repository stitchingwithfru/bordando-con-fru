import Link from "next/link";
import { getWebsiteData, formatPeriod, formatExactPeriod, type ClubStatus } from "@/lib/phase1-data";
import ReadingProposalForm from "@/components/ReadingProposalForm";
import ShareClubBlock from "@/components/ShareClubBlock";

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
    <>
      <style>
        {`
          .reading-challenge-card {
            background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
            border: 1px solid #E8DED8;
            border-radius: 30px;
            padding: 28px;
            box-shadow: 0 10px 28px rgba(64, 58, 54, 0.07);
            width: 100%;
            max-width: 980px;
            margin: 0 auto;
          }

          .reading-challenge-inner {
            display: flex;
            gap: 28px;
            align-items: flex-start;
          }

          .reading-challenge-icon {
            width: 112px;
            height: 112px;
            min-width: 112px;
            border-radius: 26px;
            background: linear-gradient(145deg, #A8B8A3 0%, #7F9679 100%);
            color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            box-shadow: 0 10px 22px rgba(64, 58, 54, 0.14);
            position: relative;
            overflow: hidden;
          }

          .reading-challenge-icon-glow {
            position: absolute;
            width: 80px;
            height: 80px;
            border-radius: 999px;
            background: rgba(255,255,255,0.12);
            right: -22px;
            top: -22px;
          }

          .reading-challenge-year {
            font-size: 28px;
            line-height: 1;
            font-weight: 700;
            margin-bottom: 12px;
            position: relative;
            z-index: 1;
          }

          .reading-challenge-book {
            width: 62px;
            height: 36px;
            position: relative;
            z-index: 1;
          }

          .reading-challenge-book-left {
            position: absolute;
            left: 3px;
            top: 5px;
            width: 28px;
            height: 25px;
            border-radius: 16px 4px 4px 16px;
            background: #FFF7EF;
            transform: rotate(-8deg);
            box-shadow: inset -4px 0 0 rgba(64,58,54,0.08);
          }

          .reading-challenge-book-right {
            position: absolute;
            right: 3px;
            top: 5px;
            width: 28px;
            height: 25px;
            border-radius: 4px 16px 16px 4px;
            background: #FFF7EF;
            transform: rotate(8deg);
            box-shadow: inset 4px 0 0 rgba(64,58,54,0.08);
          }

          .reading-challenge-book-line {
            position: absolute;
            left: 30px;
            top: 7px;
            width: 2px;
            height: 27px;
            background: rgba(64,58,54,0.18);
          }

          .reading-challenge-book-shadow {
            position: absolute;
            left: 12px;
            bottom: 0;
            width: 38px;
            height: 6px;
            border-radius: 999px;
            background: rgba(255,255,255,0.35);
          }

          .reading-challenge-content {
            flex: 1;
            min-width: 0;
          }

          .reading-challenge-label {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 10px;
            padding: 6px 12px;
            border-radius: 999px;
            background: #F3ECE7;
            color: #8A7C74;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-weight: 700;
          }

          .reading-challenge-title {
            margin: 0 0 10px 0;
            font-family: Georgia, serif;
            font-size: 38px;
            line-height: 1.05;
            color: #2F2926;
          }

          .reading-challenge-message {
            margin: 0 0 24px 0;
            font-size: 18px;
            line-height: 1.45;
            color: #403A36;
          }

          .reading-challenge-count {
            margin-bottom: 18px;
            font-size: 20px;
            line-height: 1.35;
            color: #2F2926;
          }

          .reading-challenge-count span {
            color: #8A7C74;
            font-weight: 400;
          }

          .reading-challenge-progress-row {
            display: flex;
            align-items: center;
            gap: 14px;
          }

          .reading-challenge-progress-outer {
            flex: 1;
            height: 32px;
            border: 2px solid #D8B7B0;
            border-radius: 999px;
            background: #FFFFFF;
            padding: 5px;
            overflow: hidden;
          }

          .reading-challenge-progress-inner {
            height: 100%;
            border-radius: 999px;
            background: linear-gradient(90deg, #D8B7B0 0%, #A8B8A3 100%);
            transition: width 0.7s ease;
          }

          .reading-challenge-percent {
            min-width: 58px;
            text-align: right;
            font-size: 24px;
            font-weight: 600;
            color: #6F655F;
          }

          @media (max-width: 700px) {
            .reading-challenge-card {
              border-radius: 26px;
              padding: 24px 20px;
            }

            .reading-challenge-inner {
              flex-direction: column;
              align-items: center;
              text-align: center;
              gap: 20px;
            }

            .reading-challenge-icon {
              width: 100px;
              height: 100px;
              min-width: 100px;
              border-radius: 24px;
            }

            .reading-challenge-year {
              font-size: 26px;
              margin-bottom: 10px;
            }

            .reading-challenge-label {
              font-size: 11px;
              letter-spacing: 0.1em;
            }

            .reading-challenge-title {
              font-size: 31px;
              line-height: 1.08;
            }

            .reading-challenge-message {
              font-size: 16px;
              line-height: 1.55;
              margin-bottom: 22px;
            }

            .reading-challenge-count {
              font-size: 17px;
              line-height: 1.45;
            }

            .reading-challenge-count strong {
              display: block;
              margin-bottom: 4px;
            }

            .reading-challenge-count span {
              display: block;
            }

            .reading-challenge-progress-row {
              gap: 10px;
            }

            .reading-challenge-progress-outer {
              height: 28px;
              padding: 4px;
            }

            .reading-challenge-percent {
              min-width: 48px;
              font-size: 20px;
            }
          }

          @media (max-width: 430px) {
            .reading-challenge-title {
              font-size: 28px;
            }

            .reading-challenge-message {
              font-size: 15.5px;
            }

            .reading-challenge-icon {
              width: 92px;
              height: 92px;
              min-width: 92px;
            }

            .reading-challenge-year {
              font-size: 24px;
            }
          }
        `}
      </style>

      <div className="reading-challenge-card">
        <div className="reading-challenge-inner">
          <div className="reading-challenge-icon">
            <div className="reading-challenge-icon-glow" />

            <div className="reading-challenge-year">
              {year}
            </div>

            <div className="reading-challenge-book">
              <div className="reading-challenge-book-left" />
              <div className="reading-challenge-book-right" />
              <div className="reading-challenge-book-line" />
              <div className="reading-challenge-book-shadow" />
            </div>
          </div>

          <div className="reading-challenge-content">
            <div className="reading-challenge-label">
              📚 Objetivo lector
            </div>

            <h3 className="reading-challenge-title">
              Reto de lectura {year}
            </h3>

            <p className="reading-challenge-message">
              {message}
            </p>

            <div className="reading-challenge-count">
              <strong>{completed} de {goal} libros leídos</strong>
              <span> · {daysLeft} días restantes</span>
            </div>

            <div className="reading-challenge-progress-row">
              <div className="reading-challenge-progress-outer">
                <div
                  className="reading-challenge-progress-inner"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="reading-challenge-percent">
                {progress}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function formatDisplayDate(date?: string) {
  if (!date) return "";

  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function ClubStatusPanel({ status }: { status: ClubStatus }) {
  const readingDate =
    status.reading.state === "next" && status.reading.date
      ? `Empieza el ${formatDisplayDate(status.reading.date)}`
      : status.reading.state === "current"
        ? "En curso"
        : "";

  const topicDate =
    status.topic.closeDate && status.topic.state === "open"
      ? `Abierto hasta el ${formatDisplayDate(status.topic.closeDate)}`
      : status.topic.closeDate && status.topic.state === "closed"
        ? `Cerrado desde el ${formatDisplayDate(status.topic.closeDate)}`
        : "";

  const surveyDate =
    status.survey.state === "open" && status.survey.endDate
      ? `Puedes votar hasta el ${formatDisplayDate(status.survey.endDate)}`
      : status.survey.state === "upcoming" && status.survey.startDate
        ? `Empieza el ${formatDisplayDate(status.survey.startDate)}`
        : status.survey.state === "closed" && status.survey.endDate
          ? `Finalizó el ${formatDisplayDate(status.survey.endDate)}`
          : "";

  return (
    <>
      <style>
        {`
          .club-status-wrap {
            max-width: 980px;
            margin: 0 auto 56px auto;
          }

          .club-status-header {
            margin-bottom: 18px;
            text-align: center;
          }

          .club-status-kicker {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #F3ECE7;
            color: #8A7C74;
            border: 1px solid #E8DED8;
            border-radius: 999px;
            padding: 7px 14px;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            margin-bottom: 12px;
          }

          .club-status-title {
            margin: 0;
            font-family: Georgia, serif;
            font-size: 34px;
            line-height: 1.1;
            color: #403A36;
          }

          .club-status-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 16px;
          }

          .club-status-card {
            background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
            border: 1px solid #E8DED8;
            border-radius: 24px;
            padding: 20px;
            box-shadow: 0 10px 24px rgba(64, 58, 54, 0.06);
            min-height: 190px;
            display: flex;
            flex-direction: column;
          }

          .club-status-icon {
            width: 46px;
            height: 46px;
            border-radius: 17px;
            background: #F3ECE7;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            margin-bottom: 14px;
          }

          .club-status-card-title {
            margin: 0 0 8px 0;
            font-family: Georgia, serif;
            font-size: 21px;
            line-height: 1.15;
            color: #403A36;
          }

          .club-status-card-text {
            margin: 0;
            color: #6F655F;
            font-size: 14px;
            line-height: 1.5;
          }

          .club-status-card-date {
            margin-top: auto;
            padding-top: 14px;
            color: #8A7C74;
            font-size: 13px;
            line-height: 1.45;
          }

          .club-status-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-top: 12px;
            background: #403A36;
            color: #FFFFFF;
            border-radius: 999px;
            padding: 9px 13px;
            font-size: 13px;
            font-weight: 700;
            text-decoration: none;
          }

          @media (max-width: 900px) {
            .club-status-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }

          @media (max-width: 560px) {
            .club-status-wrap {
              margin-bottom: 48px;
            }

            .club-status-title {
              font-size: 29px;
            }

            .club-status-grid {
              grid-template-columns: 1fr;
              gap: 14px;
            }

            .club-status-card {
              min-height: auto;
              padding: 18px;
            }

            .club-status-card {
              display: grid;
              grid-template-columns: 48px 1fr;
              gap: 14px;
              align-items: flex-start;
            }

            .club-status-icon {
              margin-bottom: 0;
            }

            .club-status-card-content {
              min-width: 0;
            }

            .club-status-card-date {
              margin-top: 10px;
              padding-top: 0;
            }
          }
        `}
      </style>

      <section className="club-status-wrap">
        <div className="club-status-header">
          <div className="club-status-kicker">📌 Estado del Club</div>
          <h2 className="club-status-title">Qué está pasando ahora</h2>
        </div>

        <div className="club-status-grid">
          <article className="club-status-card">
            <div className="club-status-icon">📖</div>
            <div className="club-status-card-content">
              <h3 className="club-status-card-title">{status.reading.title}</h3>
              <p className="club-status-card-text">{status.reading.text}</p>
              {readingDate ? <div className="club-status-card-date">{readingDate}</div> : null}
            </div>
          </article>

          <article className="club-status-card">
            <div className="club-status-icon">💬</div>
            <div className="club-status-card-content">
              <h3 className="club-status-card-title">{status.topic.title}</h3>
              <p className="club-status-card-text">{status.topic.text}</p>
              {topicDate ? <div className="club-status-card-date">{topicDate}</div> : null}
            </div>
          </article>

          <article className="club-status-card">
            <div className="club-status-icon">🗳️</div>
            <div className="club-status-card-content">
              <h3 className="club-status-card-title">{status.survey.title}</h3>
              <p className="club-status-card-text">{status.survey.text}</p>
              {surveyDate ? <div className="club-status-card-date">{surveyDate}</div> : null}
              {status.survey.url ? (
                <a
                  href={status.survey.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="club-status-button"
                >
                  Ver encuesta →
                </a>
              ) : null}
            </div>
          </article>
        </div>
      </section>
    </>
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
        
        {/* === HERO CLUB DE LECTURA === */}
        <style>
          {`
            .club-hero {
              background: linear-gradient(135deg, #EFE5DE 0%, #FCFAF7 100%);
              border: 1px solid #E8DED8;
              border-radius: 32px;
              padding: 34px;
              box-shadow: 0 10px 28px rgba(64, 58, 54, 0.06);
              overflow: hidden;
            }

            .club-hero-inner {
              display: grid;
              grid-template-columns: 180px 1fr;
              gap: 32px;
              align-items: center;
            }

            .club-hero-image-wrap {
              width: 180px;
              min-width: 180px;
              display: flex;
              justify-content: center;
            }

            .club-hero-image {
              width: 160px;
              height: 160px;
              object-fit: cover;
              border-radius: 999px;
              border: 1px solid #E8DED8;
              box-shadow: 0 10px 24px rgba(64, 58, 54, 0.14);
              display: block;
            }

            .club-hero-label {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              background: rgba(255,255,255,0.72);
              border: 1px solid #E8DED8;
              border-radius: 999px;
              padding: 7px 14px;
              margin-bottom: 16px;
              color: #8A7C74;
              font-size: 14px;
              font-weight: 600;
            }

            .club-hero-title {
              margin: 0 0 14px 0;
              font-family: Georgia, serif;
              font-size: 44px;
              line-height: 1.05;
              color: #403A36;
            }

            .club-hero-text {
              margin: 0;
              max-width: 760px;
              color: #6F655F;
              font-size: 19px;
              line-height: 1.6;
            }

            @media (max-width: 700px) {
              .club-hero {
                border-radius: 26px;
                padding: 24px 20px;
              }

              .club-hero-inner {
                display: flex;
                flex-direction: column;
                gap: 20px;
                text-align: center;
              }

              .club-hero-image-wrap {
                width: 100%;
                min-width: 0;
              }

              .club-hero-image {
                width: 122px;
                height: 122px;
              }

              .club-hero-label {
                font-size: 12px;
                padding: 7px 12px;
                margin-bottom: 14px;
                justify-content: center;
              }

              .club-hero-title {
                font-size: 38px;
                line-height: 1.05;
                margin-bottom: 14px;
              }

              .club-hero-text {
                font-size: 17px;
                line-height: 1.55;
                max-width: 100%;
              }
            }

            @media (max-width: 430px) {
              .club-hero-title {
                font-size: 34px;
              }

              .club-hero-text {
                font-size: 16px;
              }

              .club-hero-image {
                width: 112px;
                height: 112px;
              }
            }
          `}
        </style>

        <section className="club-hero">
          <div className="club-hero-inner">
            <div className="club-hero-image-wrap">
              <img
                src="/images/club-de-lectura.jpeg"
                alt="Club de Lectura Bordando con Fru"
                className="club-hero-image"
              />
            </div>

            <div>
              <div className="club-hero-label">
                ☕ Lecturas, calma y ratitos para compartir
              </div>

              <h1 className="club-hero-title">
                Club de Lectura
              </h1>

              <p className="club-hero-text">
                Un espacio cálido para seguir nuestras lecturas, descubrir nuevas historias
                y disfrutar de los libros a nuestro propio ritmo.
              </p>
            </div>
          </div>
        </section>

        {/* === AVISOS Y RETO ANUAL === */}
        <section className="space-y-12">
          {/* Unirse al Club en Telegram */}
          <style>
            {`
              .telegram-club-card {
                background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
                border: 1px solid #E8DED8;
                border-radius: 30px;
                padding: 26px;
                box-shadow: 0 10px 28px rgba(64, 58, 54, 0.07);
                width: 100%;
                max-width: 980px;
                margin: 0 auto 64px auto;
              }

              .telegram-club-header {
                display: flex;
                gap: 18px;
                align-items: flex-start;
                margin-bottom: 22px;
              }

              .telegram-club-icon {
                width: 54px;
                height: 54px;
                min-width: 54px;
                border-radius: 18px;
                background: #F3ECE7;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 26px;
              }

              .telegram-club-label {
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.16em;
                color: #8A7C74;
                font-weight: 700;
                margin-bottom: 8px;
              }

              .telegram-club-title {
                margin: 0;
                font-family: Georgia, serif;
                font-size: 34px;
                line-height: 1.1;
                color: #403A36;
              }

              .telegram-club-text {
                margin: 0 0 24px 0;
                color: #6F655F;
                font-size: 17px;
                line-height: 1.65;
                max-width: 680px;
              }

              .telegram-club-features {
                display: grid;
                grid-template-columns: repeat(3, minmax(0, 1fr));
                gap: 12px;
                margin-bottom: 24px;
              }

              .telegram-club-feature {
                background: #F7F3EE;
                border: 1px solid #E8DED8;
                border-radius: 18px;
                padding: 14px;
              }

              .telegram-club-feature-icon {
                font-size: 22px;
                margin-bottom: 6px;
              }

              .telegram-club-feature-text {
                font-size: 14px;
                color: #6F655F;
                line-height: 1.35;
              }
              
              .telegram-club-actions {
                display: flex;
                gap: 12px;
                flex-wrap: wrap;
                align-items: center;
              }

              .telegram-club-button {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                background: #403A36;
                color: #FFFFFF;
                border-radius: 999px;
                padding: 13px 22px;
                font-size: 15px;
                font-weight: 700;
                text-decoration: none;
                box-shadow: 0 8px 18px rgba(64, 58, 54, 0.14);
              }
              
              .telegram-club-button.secondary {
                background: #FFFFFF;
                color: #403A36;
                border: 1px solid #E8DED8;
                box-shadow: none;
              }

              @media (max-width: 700px) {
                .telegram-club-card {
                  padding: 24px 20px;
                  border-radius: 26px;
                  margin-bottom: 56px;
                }

                .telegram-club-header {
                  flex-direction: column;
                  align-items: center;
                  text-align: center;
                  gap: 14px;
                }

                .telegram-club-icon {
                  width: 48px;
                  height: 48px;
                  min-width: 48px;
                  font-size: 23px;
                }

                .telegram-club-label {
                  font-size: 11px;
                  letter-spacing: 0.12em;
                }

                .telegram-club-title {
                  font-size: 30px;
                  line-height: 1.12;
                }

                .telegram-club-text {
                  font-size: 16px;
                  line-height: 1.6;
                  text-align: center;
                  max-width: 100%;
                }

                .telegram-club-features {
                  grid-template-columns: 1fr;
                }

                .telegram-club-feature {
                  display: flex;
                  align-items: center;
                  gap: 12px;
                  padding: 14px 16px;
                }

                .telegram-club-feature-icon {
                  margin-bottom: 0;
                }
                
                .telegram-club-actions {
                  flex-direction: column;
                  width: 100%;
                }

                .telegram-club-button {
                  width: 100%;
                  padding: 14px 18px;
                  font-size: 15px;
                }
              }

              @media (max-width: 430px) {
                .telegram-club-title {
                  font-size: 27px;
                }

                .telegram-club-text {
                  font-size: 15.5px;
                }
              }
            `}
          </style>

          <div className="telegram-club-card">
            <div className="telegram-club-header">
              <div className="telegram-club-icon">
                💬
              </div>

              <div>
                <div className="telegram-club-label">
                  Comunidad en Telegram
                </div>

                <h2 className="telegram-club-title">
                  ¡Únete al Club de Lectura!
                </h2>
              </div>
            </div>

            <p className="telegram-club-text">
              Recibe avisos sobre las próximas lecturas, recomendaciones, novedades del Club de Lectura y participa en las lecturas conjuntas que se organizan.
            </p>

            <div className="telegram-club-features">
              <div className="telegram-club-feature">
                <div className="telegram-club-feature-icon">📖</div>
                <div className="telegram-club-feature-text">Lecturas conjuntas</div>
              </div>

              <div className="telegram-club-feature">
                <div className="telegram-club-feature-icon">✨</div>
                <div className="telegram-club-feature-text">Avisos y novedades</div>
              </div>

              <div className="telegram-club-feature">
                <div className="telegram-club-feature-icon">📚</div>
                <div className="telegram-club-feature-text">Recomendaciones</div>
              </div>
            </div>

            <div className="telegram-club-actions">
              <a
                href={TELEGRAM_CLUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="telegram-club-button"
              >
                Unirme al Club en Telegram →
              </a>

              <Link
                href="/club-de-lectura/como-funciona"
                className="telegram-club-button secondary"
              >
                Cómo funciona el Club
              </Link>
            </div>
          </div>

          <ClubStatusPanel status={data.clubStatus} />

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

        {/* === ARCHIVO DE LECTURAS === */}
        <section style={{ marginTop: "56px" }}>
          <div
            style={{
              maxWidth: "980px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%)",
                border: "1px solid #E8DED8",
                borderRadius: "30px",
                padding: "30px",
                boxShadow: "0 10px 28px rgba(64, 58, 54, 0.06)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "68px",
                  height: "68px",
                  borderRadius: "24px",
                  background: "#F3ECE7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "32px",
                  margin: "0 auto 18px auto",
                }}
              >
                📚
              </div>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#F7F3EE",
                  border: "1px solid #E8DED8",
                  color: "#8A7C74",
                  fontSize: "12px",
                  padding: "7px 13px",
                  borderRadius: "999px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "14px",
                }}
              >
                Archivo anual
              </div>

              <h2
                style={{
                  margin: 0,
                  marginBottom: "12px",
                  fontFamily: "Georgia, serif",
                  fontSize: "34px",
                  lineHeight: "1.12",
                  color: "#403A36",
                }}
              >
                Archivo de lecturas del Club
              </h2>

              <p
                style={{
                  maxWidth: "680px",
                  margin: "0 auto 24px auto",
                  color: "#6F655F",
                  fontSize: "16px",
                  lineHeight: "1.7",
                }}
              >
                Consulta las lecturas que ya hemos compartido en el Club, organizadas por año,
                con sus períodos, géneros y enlaces a Goodreads.
              </p>

              <Link
                href="/club-de-lectura/archivo"
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
                Ver archivo de lecturas →
              </Link>
            </div>
          </div>
        </section>

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

        <ReadingProposalForm />

        <ShareClubBlock />

      </div>
    </main>
  );
}