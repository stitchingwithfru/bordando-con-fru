import { Card, SectionTitle } from "@/components/UI";

export default function ConditionsPage() {
  return (
    <main>
      <section className="section">
        <div className="container narrow-container">
          <SectionTitle
            eyebrow="Texto legal básico"
            title="Condiciones de compra"
            description="Condiciones generales aplicables a la compra de productos digitales ofrecidos en Bordando con Fru."
          />
          <Card>
            <div className="legal-stack">
              <section>
                <h2 className="serif">1. Productos</h2>
                <p className="muted">Los productos ofrecidos en esta web son productos digitales relacionados con herramientas desarrolladas en el entorno Google para organización y seguimiento de labores y materiales de punto de cruz.</p>
                <div className="list">
                  <p>• Acceso a Google Sheets.</p>
                  <p>• App Forms en determinadas versiones.</p>
                  <p>• Vídeo tutorial.</p>
                  <p>• Manual en PDF cuando así se indique expresamente en la página del producto.</p>
                </div>
              </section>

              <section>
                <h2 className="serif">2. Proceso de compra</h2>
                <div className="list">
                  <p>• Completar el formulario correspondiente.</p>
                  <p>• Seleccionar la versión o complemento deseado.</p>
                  <p>• Elegir el método de pago indicado.</p>
                  <p>• Aceptar las condiciones aplicables al pedido.</p>
                </div>
              </section>

              <section>
                <h2 className="serif">3. Precio</h2>
                <p className="muted">El precio de cada producto, versión o complemento se muestra en la web. En los formularios, el importe total se calcula según las opciones seleccionadas.</p>
              </section>

              <section>
                <h2 className="serif">4. Forma de pago</h2>
                <p className="muted">El pago se realiza por los medios indicados en el proceso de compra, actualmente Bizum o PayPal, según corresponda.</p>
                <p className="muted">La web no solicita ni almacena datos bancarios o de tarjeta dentro del formulario de pedido.</p>
              </section>

              <section>
                <h2 className="serif">5. Entrega</h2>
                <p className="muted">La entrega es manual. Una vez comprobado el pago, el pedido se enviará al correo electrónico facilitado por la clienta, normalmente en un plazo aproximado de 24 a 48 horas.</p>
              </section>

              <section>
                <h2 className="serif">6. Naturaleza digital del producto</h2>
                <p className="muted">La persona compradora reconoce que está adquiriendo un contenido digital y que la entrega consiste en facilitar acceso al sistema o al material digital correspondiente por correo electrónico.</p>
              </section>

              <section>
                <h2 className="serif">7. Devoluciones y desistimiento</h2>
                <p className="muted">Dado que se trata de contenido digital entregado de forma no material, y siempre que la persona compradora haya solicitado expresamente la entrega y aceptado esta condición durante el pedido, una vez realizada la entrega no se aceptan devoluciones.</p>
              </section>

              <section>
                <h2 className="serif">8. Mejoras de versión</h2>
                <p className="muted">Si en el futuro se realiza una mejora significativa de una versión adquirida, podrá enviarse por correo electrónico la versión actualizada correspondiente, incluyendo una opción para migrar datos desde la versión anterior cuando proceda.</p>
              </section>

              <section>
                <h2 className="serif">9. Complementos y módulos nuevos</h2>
                <p className="muted">Los complementos o módulos nuevos desarrollados de forma independiente no se consideran incluidos automáticamente en compras anteriores, salvo que se indique expresamente lo contrario. En esos casos, se adquirirán por separado.</p>
              </section>

              <section>
                <h2 className="serif">10. Comunicaciones sobre novedades y lanzamientos</h2>
                <p className="muted">Si la persona usuaria lo autoriza expresamente, Bordando con Fru podrá enviar comunicaciones por correo electrónico sobre novedades, mejoras, actualizaciones y nuevos lanzamientos relacionados con la actividad de la marca. La persona interesada podrá retirar su consentimiento en cualquier momento escribiendo a <a href="mailto:stitchingwithfru@gmail.com">stitchingwithfru@gmail.com</a>.</p>
              </section>

              <section>
                <h2 className="serif">11. Contacto</h2>
                <p className="muted">Para cualquier duda relacionada con un pedido, puedes escribir a <a href="mailto:stitchingwithfru@gmail.com">stitchingwithfru@gmail.com</a>.</p>
              </section>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
