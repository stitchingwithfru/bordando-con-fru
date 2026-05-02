import { getWebsiteData } from "@/lib/phase1-data";
import ReadingProgressApp from "@/components/ReadingProgressApp";

export default async function MiProgresoPage() {
  const data = await getWebsiteData();

  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#403A36] pt-8 pb-16 px-5">
      <ReadingProgressApp readings={data.myReadings || []} />
    </main>
  );
}