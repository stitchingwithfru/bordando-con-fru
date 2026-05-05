import { cookies } from "next/headers";
import AdminClientesPanel from "./AdminClientesPanel";
import AdminPanelGate from "./AdminPanelGate";
import {
  ADMIN_PANEL_COOKIE,
  isValidAdminPanelToken,
} from "@/lib/admin-panel-auth";

export const metadata = {
  title: "Gestión | Bordando con Fru",
  description: "Panel privado para gestionar accesos.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminClientesPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_PANEL_COOKIE)?.value;
  const isUnlocked = isValidAdminPanelToken(token);

  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#403A36] pt-12 pb-24 px-5">
      <div className={isUnlocked ? "max-w-5xl mx-auto" : "max-w-xl mx-auto"}>
        {isUnlocked ? <AdminClientesPanel /> : <AdminPanelGate />}
      </div>
    </main>
  );
}