import Link from "next/link";
import { getWebsiteData } from "@/lib/phase1-data";
import PersonalAnnualStatsSection from "@/components/PersonalAnnualStatsSection";

export const metadata = {
  title: "Estadísticas lectoras | Bordando con Fru",
  description:
    "Resumen anual de mis lecturas personales: reto lector, libros terminados, formatos, estados y páginas registradas.",
};

export default async function MisLecturasEstadisticasPage() {
  const data = await getWebsiteData();

  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#403A36] pt-12 pb-24">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <style>
          {`
            .stats-page-actions {
              max-width: 1040px;
              margin: 0 auto 28px auto;
              display: flex;
              justify-content: flex-start;
            }

            .stats-back-link {
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
              .stats-page-actions {
                margin-bottom: 24px;
              }

              .stats-back-link {
                width: 100%;
              }
            }
          `}
        </style>

        <div className="stats-page-actions">
          <Link href="/mis-lecturas" className="stats-back-link">
            ← Volver a Mis lecturas
          </Link>
        </div>

        <PersonalAnnualStatsSection
          readings={data.myReadings}
          challenge={data.readingChallenge}
        />
      </div>
    </main>
  );
}