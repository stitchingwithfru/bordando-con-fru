import { SectionTitle } from "@/components/UI";
import { InventoryOrderForm } from "@/components/forms";

export default function PedidoInventarioPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Formulario de pedido" title="Sistema de Inventario Profesional" description="Versión inicial funcional del formulario, preparada para integrarse después con correo, pagos y registro de pedidos." />
          <InventoryOrderForm />
        </div>
      </section>
    </main>
  );
}
