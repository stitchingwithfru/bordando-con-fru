import type { Metadata } from "next";
import { SectionTitle } from "@/components/UI";
import { TrackingOrderForm } from "@/components/forms";

export const metadata: Metadata = {
  title: "Pedido Sistema de Seguimiento de Punto de Cruz | Bordando con Fru",
  description:
    "Formulario para pedir el Sistema de Seguimiento de Punto de Cruz. El acceso se asignará al email indicado y podrás entrar desde tu zona privada.",
};

export default function PedidoSeguimientoPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Formulario de pedido"
            title="Pedir el Sistema de Seguimiento de Punto de Cruz"
            description="Completa el formulario con el email al que quieres asociar tu compra. Tras comprobar el pago, te enviaré una invitación para acceder a tu zona privada y consultar tus recursos."
          />

          <TrackingOrderForm />
        </div>
      </section>
    </main>
  );
}