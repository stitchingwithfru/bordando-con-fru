import type { Metadata } from "next";
import { Card, SectionTitle } from "@/components/UI";

export const metadata: Metadata = {
  title: "Condiciones de compra | Bordando con Fru",
  description:
    "Condiciones generales aplicables a la compra de productos digitales ofrecidos en Bordando con Fru.",
};

export default function ConditionsPage() {
  return (
    <main>
      <section className="section">
        <div className="container narrow-container">
          <SectionTitle
            eyebrow=""
            title="Condiciones de compra"
            description="Condiciones generales aplicables a la compra de productos digitales ofrecidos en Bordando con Fru."
          />

          <Card>
            <div className="legal-stack">
              <section>
                <h2 className="serif">1. Productos</h2>
                <p className="muted">
                  Los productos ofrecidos en esta web son productos digitales relacionados con herramientas desarrolladas en el entorno Google para organización y seguimiento de labores y materiales de punto de cruz.
                </p>
                <div className="list">
                  <p>• Acceso a Google Sheets.</p>
                  <p>• App Forms en determinadas versiones.</p>
                  <p>• Vídeo tutorial.</p>
                  <p>• Manual en PDF cuando así se indique expresamente en la página del producto.</p>
                  <p>• Acceso a los recursos adquiridos desde la zona privada de la web.</p>
                </div>
              </section>

              <section>
                <h2 className="serif">2. Proceso de compra</h2>
                <div className="list">
                  <p>• Completar el formulario correspondiente.</p>
                  <p>• Indicar el email al que se asociará el producto adquirido.</p>
                  <p>• Seleccionar la versión o complemento deseado.</p>
                  <p>• Elegir el método de pago indicado.</p>
                  <p>• Aceptar las condiciones aplicables al pedido.</p>
                </div>
              </section>

              <section>
                <h2 className="serif">3. Precio</h2>
                <p className="muted">
                  El precio de cada producto, versión o complemento se muestra en la web. En los formularios, el importe total se calcula según las opciones seleccionadas.
                </p>
              </section>

              <section>
                <h2 className="serif">4. Forma de pago</h2>
                <p className="muted">
                  El pago se realiza por los medios indicados en el proceso de compra, actualmente Bizum o PayPal, según corresponda.
                </p>
                <p className="muted">
                  La web no solicita ni almacena datos bancarios o de tarjeta dentro del formulario de pedido.
                </p>
              </section>

              <section>
                <h2 className="serif">5. Entrega</h2>
                <p className="muted">
                  La entrega es manual. Una vez comprobado el pago, el producto adquirido se asociará al email indicado en el formulario de pedido.
                </p>
                <p className="muted">
                  La clienta recibirá una invitación por correo electrónico para crear su acceso a la zona privada de la web, desde donde podrá consultar y utilizar los recursos digitales asociados a su compra.
                </p>
                <p className="muted">
                  La entrega se realizará normalmente en un plazo aproximado de 24 a 48 horas desde la comprobación del pago.
                </p>
              </section>

              <section>
                <h2 className="serif">6. Naturaleza digital del producto</h2>
                <p className="muted">
                  La persona compradora reconoce que está adquiriendo un contenido digital y que la entrega consiste en facilitar acceso a los recursos digitales correspondientes dentro de la zona privada de la web.
                </p>
                <p className="muted">
                  Estos recursos pueden incluir, según el producto adquirido, enlaces a Google Sheets, App Forms, vídeo tutorial, manual en PDF u otros materiales digitales indicados en la página del producto.
                </p>
              </section>

              <section>
                <h2 className="serif">7. Devoluciones y desistimiento</h2>
                <p className="muted">
                  Dado que se trata de contenido digital entregado de forma no material, y siempre que la persona compradora haya solicitado expresamente la entrega y aceptado esta condición durante el pedido, una vez asignado el acceso al contenido digital no se aceptan devoluciones.
                </p>
              </section>

              <section>
                <h2 className="serif">8. Mejoras de versión</h2>
                <p className="muted">
                  Si en el futuro se realiza una mejora significativa de una versión adquirida, la actualización podrá incorporarse a la zona privada de la clienta.
                </p>
                <p className="muted">
                  En ese caso, podrá enviarse un aviso por correo electrónico para informar de la existencia de una nueva versión disponible, de modo que la clienta pueda acceder a su espacio personal, consultar qué ha cambiado y descargar o utilizar los recursos actualizados.
                </p>
                <p className="muted">
                  Cuando proceda, se incluirá una opción para migrar datos desde la versión anterior.
                </p>
              </section>

              <section>
                <h2 className="serif">9. Complementos y módulos nuevos</h2>
                <p className="muted">
                  Los complementos o módulos nuevos desarrollados de forma independiente no se consideran incluidos automáticamente en compras anteriores, salvo que se indique expresamente lo contrario. En esos casos, se adquirirán por separado.
                </p>
              </section>

              <section>
                <h2 className="serif">10. Comunicaciones sobre novedades y lanzamientos</h2>
                <p className="muted">
                  Si la persona usuaria lo autoriza expresamente, Bordando con Fru podrá enviar comunicaciones por correo electrónico sobre novedades, mejoras, actualizaciones y nuevos lanzamientos relacionados con la actividad de la marca.
                </p>
                <p className="muted">
                  La persona interesada podrá retirar su consentimiento en cualquier momento escribiendo a{" "}
                  <a href="mailto:stitchingwithfru@gmail.com">
                    stitchingwithfru@gmail.com
                  </a>.
                </p>
              </section>

              <section>
                <h2 className="serif">11. Acceso a la zona privada</h2>
                <p className="muted">
                  El acceso a la zona privada está vinculado al email indicado en el pedido. La clienta será responsable de utilizar un correo electrónico correcto y de mantener protegida su contraseña de acceso.
                </p>
                <p className="muted">
                  Si la clienta pierde el acceso o necesita cambiar su contraseña, podrá solicitar ayuda escribiendo a{" "}
                  <a href="mailto:stitchingwithfru@gmail.com">
                    stitchingwithfru@gmail.com
                  </a>.
                </p>
              </section>

              <section>
                <h2 className="serif">12. Contacto</h2>
                <p className="muted">
                  Para cualquier duda relacionada con un pedido, puedes escribir a{" "}
                  <a href="mailto:stitchingwithfru@gmail.com">
                    stitchingwithfru@gmail.com
                  </a>.
                </p>
              </section>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}