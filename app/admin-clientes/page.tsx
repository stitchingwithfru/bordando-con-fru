import AdminClientesPanel from "./AdminClientesPanel";

export const metadata = {
  title: "Admin clientes | Bordando con Fru",
  description: "Panel privado para gestionar accesos de clientas.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminClientesPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#403A36] pt-12 pb-24 px-5">
      <div className="max-w-5xl mx-auto">
        <AdminClientesPanel />
      </div>
    </main>
  );
}