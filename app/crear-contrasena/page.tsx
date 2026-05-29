import CreatePasswordForm from "./CreatePasswordForm";

export const metadata = {
  title: "Crear o cambiar contraseña | Bordando con Fru",
  description: "Crea o cambia tu contraseña para acceder a tu espacio privado de Bordando con Fru.",
};

export default function CrearContrasenaPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#403A36] pt-12 pb-24 px-5">
      <div className="max-w-xl mx-auto">
        <CreatePasswordForm />
      </div>
    </main>
  );
}