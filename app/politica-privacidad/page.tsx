import { Card, SectionTitle } from "@/components/UI";

export default function PrivacyPage() {
  return (
    <main>
      <section className="section">
        <div className="container narrow-container">
          <SectionTitle
            eyebrow="Texto legal básico"
            title="Política de privacidad"
            description="Información básica sobre el tratamiento de datos personales en Bordando con Fru."
          />
          <Card>
            <div className="legal-stack">
              <section>
                <h2 className="serif">Responsable</h2>
                <p className="muted"><strong style={{ color: "var(--text)" }}>Bordando con Fru</strong></p>
                <p className="muted"><strong style={{ color: "var(--text)" }}>Correo electrónico:</strong> stitchingwithfru@gmail.com</p>
              </section>

              <section>
                <h2 className="serif">Finalidad</h2>
                <div className="list">
                  <p>• Atender consultas enviadas mediante el formulario de contacto.</p>
                  <p>• Gestionar pedidos de productos digitales.</p>
                  <p>• Comunicarnos contigo en relación con tu pedido.</p>
                  <p>• Realizar la entrega manual del producto adquirido por correo electrónico.</p>
                  <p>• Informarte sobre novedades y nuevos lanzamientos, si lo autorizas expresamente.</p>
                </div>
              </section>

              <section>
                <h2 className="serif">Datos que podemos solicitar</h2>
                <div className="list">
                  <p>• Nombre.</p>
                  <p>• Dirección de correo electrónico.</p>
                  <p>• Información necesaria para gestionar el pedido o responder a tu consulta.</p>
                </div>
                <p className="muted">No solicitamos datos bancarios ni de tarjeta a través de los formularios de esta web. Los pagos se realizan por los métodos indicados en cada pedido, fuera del propio formulario.</p>
              </section>

              <section>
                <h2 className="serif">Base para el tratamiento</h2>
                <div className="list">
                  <p>• Gestionar tu pedido y entregarte el producto digital solicitado.</p>
                  <p>• Atender una consulta enviada voluntariamente por ti.</p>
                  <p>• Enviarte información sobre novedades y nuevos lanzamientos cuando lo autorices expresamente.</p>
                </div>
              </section>

              <section>
                <h2 className="serif">Conservación de los datos</h2>
                <div className="list">
                  <p>• Durante el tiempo necesario para atender tu consulta.</p>
                  <p>• Durante el tiempo necesario para gestionar tu pedido y la entrega.</p>
                  <p>• Durante el tiempo necesario para mantener un histórico básico relacionado con compras ya realizadas, cuando sea necesario para mejoras de versión o incidencias.</p>
                </div>
              </section>

              <section>
                <h2 className="serif">Destinatarios</h2>
                <p className="muted">No cedemos tus datos a terceros.</p>
              </section>

              <section>
                <h2 className="serif">Derechos</h2>
                <p className="muted">Puedes solicitar el acceso, rectificación o supresión de tus datos, así como pedir la limitación del tratamiento u oponerte al mismo, escribiendo a <a href="mailto:stitchingwithfru@gmail.com">stitchingwithfru@gmail.com</a>.</p>
              </section>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
