import Link from "next/link";
import { getWebsiteData } from "@/lib/phase1-data";
import ClubReadingStatsSection from "@/components/ClubReadingStatsSection";

export const metadata = {
  title: "Estadísticas del Club de Lectura | Bordando con Fru",
  description:
    "Resumen de las lecturas conjuntas del Club de Lectura: libros compartidos, géneros, recomendaciones y evolución por año.",
};

export default async function ClubLecturaEstadisticasPage() {
  const data = await getWebsiteData();

  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#403A36] pt-12 pb-24">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <style>
          {`
            .club-stats-page-actions {
              max-width: 1040px;
              margin: 0 auto 28px auto;
              display: flex;
              justify-content: flex-start;
            }

            .club-stats-back-link {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              border-radius: 999px;
              padding: 12px 18px;
              font-size: 14px;
              font-weight: 700;
              text-decoration: none;
              background: #FFFFFF;
              color: #403A36;
              border: 1px solid #E8DED8;
              box-shadow: 0 8px 18px rgba(64, 58, 54, 0.06);
            }

            @media (max-width: 700px) {
              .club-stats-page-actions {
                margin-bottom: 24px;
              }

              .club-stats-back-link {
                width: 100%;
              }
            }
          `}
        </style>

        <div className="club-stats-page-actions">
          <Link href="/club-de-lectura" className="club-stats-back-link">
            ← Volver al Club de Lectura
          </Link>
        </div>

        <ClubReadingStatsSection
          previousReadings={data.previousReadings}
          currentReading={data.currentReading}
          nextReading={data.nextReading}
        />
      </div>
    </main>
  );
}