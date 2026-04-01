import { SectionTitle } from "@/components/UI";
import { TrackingOrderForm } from "@/components/forms";

export default function PedidoSeguimientoPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Formulario de pedido" title="Sistema de Seguimiento de Punto de Cruz" description="Versión inicial funcional del formulario, preparada para integrarse después con correo, pagos y registro de pedidos." />
          <TrackingOrderForm />
        </div>
      </section>
    </main>
  );
}
