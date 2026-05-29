import LoginClientForm from "./LoginClientForm";

export const metadata = {
  title: "Mi espacio | Bordando con Fru",
  description: "Accede a tu zona privada para consultar tus recursos digitales de Bordando con Fru.",
};

export default function AccesoClientesPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#403A36] pt-12 pb-24 px-5">
      <div className="max-w-xl mx-auto">
        <LoginClientForm />
      </div>
    </main>
  );
}