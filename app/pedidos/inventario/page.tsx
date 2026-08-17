import type { Metadata } from "next";
import { SectionTitle } from "@/components/UI";
import { InventoryOrderForm } from "@/components/forms";

export const metadata: Metadata = {
  title: "Pedido Inventario Profesional | Bordando con Fru",
  description:
    "Formulario para adquirir Inventario Profesional o añadir módulos a una licencia existente.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PedidoInventarioPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Formulario de pedido"
            title="Pedir Inventario Profesional"
            description="Completa el formulario con el email que utilizarás para gestionar tu compra y acceder a tus recursos en la zona privada. Tras comprobar el pago, se preparará la información necesaria para activar tu licencia de Inventario Profesional."
          />

          <InventoryOrderForm />
        </div>
      </section>
    </main>
  );
}