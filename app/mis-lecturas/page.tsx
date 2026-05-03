import Link from "next/link";
import { getWebsiteData } from "@/lib/phase1-data";
import {
  ReadingChallengeCard,
  MyCurrentReadingsBlock,
  MyFinishedReadingsBlock,
} from "@/components/PersonalReadingSections";

export default async function MisLecturasPage() {
  const data = await getWebsiteData();

  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#403A36] pt-12 pb-24">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <style>
          {`
            .personal-reading-hero {
              max-width: 980px;
              margin: 0 auto 72px auto;
              background: linear-gradient(135deg, #EFE5DE 0%, #FCFAF7 100%);
              border: 1px solid #E8DED8;
              border-radius: 34px;
              padding: 42px 34px;
              box-shadow: 0 12px 30px rgba(64, 58, 54, 0.06);
              text-align: center;
            }

            .personal-reading-kicker {
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

            .personal-reading-title {
              margin: 0 0 16px 0;
              font-family: Georgia, serif;
              font-size: 46px;
              line-height: 1.05;
              color: #403A36;
            }

            .personal-reading-intro {
              max-width: 760px;
              margin: 0 auto 26px auto;
              color: #6F655F;
              font-size: 18px;
              line-height: 1.7;
            }

            .personal-reading-actions {
              display: flex;
              justify-content: center;
              gap: 12px;
              flex-wrap: wrap;
            }

            .personal-reading-button {
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

            .personal-reading-sections {
              display: grid;
              gap: 72px;
            }

            .personal-archive-link-card {
              max-width: 980px;
              margin: 0 auto;
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

            .personal-archive-link-icon {
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

            .personal-archive-link-kicker {
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

            .personal-archive-link-title {
              margin: 0 0 12px 0;
              font-family: Georgia, serif;
              font-size: 32px;
              line-height: 1.12;
              color: #403A36;
            }

            .personal-archive-link-text {
              margin: 0 0 22px 0;
              color: #6F655F;
              font-size: 16px;
              line-height: 1.7;
              max-width: 760px;
            }

            .personal-archive-link-button {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              background: #403A36;
              color: #FFFFFF;
              border-radius: 999px;
              padding: 13px 22px;
              font-size: 15px;
              font-weight: 700;
              text-decoration: none;
              box-shadow: 0 8px 18px rgba(64, 58, 54, 0.14);
            }

            @media (max-width: 600px) {
              .personal-reading-hero {
                border-radius: 28px;
                padding: 32px 22px;
                margin-bottom: 56px;
              }

              .personal-reading-title {
                font-size: 36px;
              }

              .personal-reading-intro {
                font-size: 16px;
                line-height: 1.65;
              }

              .personal-reading-actions {
                flex-direction: column;
              }

              .personal-reading-button {
                width: 100%;
              }

              .personal-reading-sections {
                gap: 56px;
              }

              .personal-archive-link-card {
                grid-template-columns: 1fr;
                text-align: center;
                border-radius: 26px;
                padding: 24px 20px;
                gap: 16px;
              }

              .personal-archive-link-icon {
                margin: 0 auto;
                width: 62px;
                height: 62px;
                border-radius: 22px;
                font-size: 30px;
              }

              .personal-archive-link-title {
                font-size: 28px;
              }

              .personal-archive-link-text {
                font-size: 15.5px;
                max-width: 100%;
              }

              .personal-archive-link-button {
                width: 100%;
              }
            }
          `}
        </style>

        <section className="personal-reading-hero">
          <div className="personal-reading-kicker">📖 Mi rincón lector</div>

          <h1 className="personal-reading-title">
            Mis lecturas
          </h1>

          <p className="personal-reading-intro">
            Un espacio personal donde comparto mi reto de lectura, los libros que estoy leyendo
            actualmente y mis últimas lecturas terminadas.
          </p>

          <div className="personal-reading-actions">
            <Link href="/club-de-lectura" className="personal-reading-button">
              ← Volver al Club de Lectura
            </Link>
          </div>
        </section>

        <div className="personal-reading-sections">
          <ReadingChallengeCard challenge={data.readingChallenge} />

          <MyCurrentReadingsBlock readings={data.myReadings || []} />

          <MyFinishedReadingsBlock readings={data.myReadings || []} />

          <section className="personal-archive-link-card">
            <div className="personal-archive-link-icon">📚</div>

            <div>
              <div className="personal-archive-link-kicker">
                Archivo personal
              </div>

              <h2 className="personal-archive-link-title">
                Todas mis lecturas
              </h2>

              <p className="personal-archive-link-text">
                Consulta mi archivo lector personal completo, con lecturas actuales,
                terminadas, pausadas y abandonadas organizadas por año.
              </p>

              <Link
                href="/mis-lecturas/archivo"
                className="personal-archive-link-button"
              >
                Ver archivo personal →
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}