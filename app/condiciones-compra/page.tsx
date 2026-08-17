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
                  Los productos ofrecidos en esta web son productos digitales
                  relacionados con herramientas para la organización y el
                  seguimiento de labores y materiales de punto de cruz.
                </p>

                <p className="muted">
                  La naturaleza y forma de acceso depende del producto adquirido:
                </p>

                <div className="list">
                  <p>
                    • El Sistema de Seguimiento de Punto de Cruz se entrega y
                    utiliza mediante Google Sheets.
                  </p>

                  <p>
                    • Inventario Profesional se presta mediante una aplicación
                    web privada. El acceso a sus funciones depende de la licencia
                    y de los módulos adquiridos.
                  </p>

                  <p>
                    • La zona privada de Bordando con Fru permite consultar los
                    recursos asociados a cada compra, que pueden incluir
                    plantillas, manuales, vídeos, datos de licencia, códigos de
                    activación, enlaces de acceso u otros materiales digitales
                    indicados en la página del producto.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="serif">2. Proceso de compra</h2>

                <div className="list">
                  <p>• Completar el formulario correspondiente.</p>

                  <p>
                    • Indicar un email válido para gestionar el pedido y el
                    acceso a los recursos asociados a la compra.
                  </p>

                  <p>
                    • Seleccionar la versión, edición, complemento o módulo
                    deseado, según el producto.
                  </p>

                  <p>• Elegir el método de pago indicado.</p>

                  <p>
                    • Aceptar las condiciones aplicables al pedido.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="serif">3. Precio</h2>

                <p className="muted">
                  El precio de cada producto, versión, complemento o módulo se
                  muestra en la web. En los formularios, el importe total se
                  calcula según las opciones seleccionadas.
                </p>
              </section>

              <section>
                <h2 className="serif">4. Forma de pago</h2>

                <p className="muted">
                  El pago se realiza por los medios indicados en el proceso de
                  compra, actualmente Bizum o PayPal, según corresponda.
                </p>

                <p className="muted">
                  La web no solicita ni almacena datos bancarios o de tarjeta
                  dentro del formulario de pedido.
                </p>
              </section>

              <section>
                <h2 className="serif">5. Entrega</h2>

                <p className="muted">
                  La entrega es manual y se realiza después de comprobar el pago.
                </p>

                <p className="muted">
                  En el Sistema de Seguimiento de Punto de Cruz, los recursos
                  correspondientes a la versión adquirida se pondrán a
                  disposición de la clienta mediante el sistema de entrega
                  previsto para este producto y su zona privada.
                </p>

                <p className="muted">
                  En Inventario Profesional, tras comprobar el pago se generará
                  un código de activación de un solo uso correspondiente a la
                  licencia adquirida. En la zona privada de la web podrán
                  consultarse los datos de la compra, el tipo de licencia, los
                  módulos incluidos, el código de activación y los recursos
                  disponibles.
                </p>

                <p className="muted">
                  Para empezar a utilizar Inventario Profesional, la clienta
                  deberá acceder a la aplicación, elegir la opción «Primera
                  activación», crear su cuenta y utilizar el código de activación
                  de un solo uso para activar su licencia.
                </p>

                <p className="muted">
                  Una vez utilizado correctamente, el código de activación no
                  podrá volver a utilizarse y la licencia quedará vinculada a la
                  cuenta creada durante la primera activación.
                </p>

                <p className="muted">
                  La entrega se realizará normalmente en un plazo aproximado de
                  24 a 48 horas desde la comprobación del pago.
                </p>
              </section>

              <section>
                <h2 className="serif">
                  6. Naturaleza y acceso a los productos
                </h2>

                <p className="muted">
                  El Sistema de Seguimiento de Punto de Cruz se entrega y utiliza
                  mediante Google Sheets.
                </p>

                <p className="muted">
                  Inventario Profesional se presta mediante una aplicación web
                  privada. El acceso requiere una cuenta y una licencia activada
                  mediante el código de un solo uso correspondiente a la compra.
                  La aplicación muestra únicamente las funciones y módulos
                  incluidos en la licencia adquirida.
                </p>

                <p className="muted">
                  Inventario Profesional puede utilizarse desde el navegador de
                  un ordenador, una tableta o un teléfono. La clienta puede
                  mantener la sesión iniciada en un máximo de tres dispositivos
                  personales.
                </p>

                <p className="muted">
                  Las operaciones de Inventario Profesional que modifican datos
                  requieren conexión a Internet. Si la aplicación ya estaba
                  cargada, puede existir una disponibilidad limitada de consulta
                  durante una pérdida temporal de conexión.
                </p>

                <p className="muted">
                  Inventario Profesional permite descargar copias de seguridad
                  de los datos en formato .ihcopia y dispone de funciones de
                  comprobación y recuperación de la información según las
                  opciones disponibles en la aplicación.
                </p>

                <p className="muted">
                  La zona privada de Bordando con Fru funciona como espacio de
                  consulta de los recursos asociados a las compras. En el caso
                  de Inventario Profesional, la aplicación se utiliza de forma
                  independiente desde su propia dirección web.
                </p>
              </section>

              <section>
                <h2 className="serif">
                  7. Derecho de desistimiento
                </h2>

                <p className="muted">
                  Con carácter general, la persona consumidora dispone del plazo
                  legal de desistimiento aplicable a los contratos celebrados a
                  distancia, salvo que concurra alguna de las excepciones
                  previstas legalmente.
                </p>

                <p className="muted">
                  En el Sistema de Seguimiento de Punto de Cruz, el suministro
                  se realiza como contenido digital sin soporte material. Si la
                  persona compradora consiente expresamente que el suministro
                  comience durante el plazo de desistimiento y reconoce que con
                  ese comienzo pierde su derecho de desistimiento, el derecho
                  dejará de resultar aplicable cuando haya comenzado el
                  suministro conforme a los requisitos legalmente establecidos.
                </p>

                <p className="muted">
                  Inventario Profesional se presta como un servicio digital. Si
                  la persona compradora solicita expresamente que su prestación
                  comience durante el plazo de desistimiento, el servicio podrá
                  comenzar antes de que dicho plazo haya finalizado.
                </p>

                <p className="muted">
                  Si se ejerce el derecho de desistimiento después de haber
                  solicitado expresamente el comienzo de la prestación de
                  Inventario Profesional durante ese plazo, podrá corresponder,
                  cuando resulte legalmente aplicable, el abono de un importe
                  proporcional a la parte del servicio ya prestada.
                </p>

                <p className="muted">
                  En los contratos de servicios, una vez que el servicio haya
                  sido completamente ejecutado, el derecho de desistimiento
                  dejará de resultar aplicable cuando la ejecución haya
                  comenzado con el consentimiento previo de la persona
                  consumidora y con su conocimiento de que perderá ese derecho
                  tras la ejecución íntegra del contrato.
                </p>

                <p className="muted">
                  Para ejercer un derecho de desistimiento que resulte aplicable,
                  la persona compradora puede comunicar su decisión a{" "}
                  <a href="mailto:soporte@stitchingwithfru.com">
                    soporte@stitchingwithfru.com
                  </a>.
                </p>
              </section>

              <section>
                <h2 className="serif">8. Actualizaciones y mejoras</h2>

                <p className="muted">
                  En el Sistema de Seguimiento de Punto de Cruz, si en el futuro
                  se realiza una mejora significativa de una versión adquirida,
                  los recursos correspondientes podrán incorporarse a la zona
                  privada de la clienta.
                </p>

                <p className="muted">
                  Cuando proceda, podrán facilitarse instrucciones o herramientas
                  para migrar datos desde una versión anterior del Sistema de
                  Seguimiento.
                </p>

                <p className="muted">
                  En Inventario Profesional, las correcciones y mejoras
                  compatibles con la edición adquirida podrán incorporarse
                  directamente a la aplicación.
                </p>

                <p className="muted">
                  Si una actualización de Inventario Profesional requiere alguna
                  actuación por parte de la clienta, se facilitarán las
                  instrucciones correspondientes.
                </p>
              </section>

              <section>
                <h2 className="serif">9. Complementos y módulos nuevos</h2>

                <p className="muted">
                  Los complementos o módulos nuevos desarrollados de forma
                  independiente no se consideran incluidos automáticamente en
                  compras anteriores, salvo que se indique expresamente lo
                  contrario.
                </p>

                <p className="muted">
                  En Inventario Profesional, la licencia permite utilizar
                  únicamente la edición y los módulos adquiridos. Los módulos
                  adicionales podrán adquirirse posteriormente cuando estén
                  disponibles comercialmente.
                </p>
              </section>

              <section>
                <h2 className="serif">
                  10. Comunicaciones sobre novedades y lanzamientos
                </h2>

                <p className="muted">
                  Si la persona usuaria lo autoriza expresamente, Bordando con
                  Fru podrá enviar comunicaciones por correo electrónico sobre
                  novedades, mejoras, actualizaciones y nuevos lanzamientos
                  relacionados con la actividad de la marca.
                </p>

                <p className="muted">
                  La persona interesada podrá retirar su consentimiento en
                  cualquier momento escribiendo a{" "}
                  <a href="mailto:soporte@stitchingwithfru.com">
                    soporte@stitchingwithfru.com
                  </a>.
                </p>
              </section>

              <section>
                <h2 className="serif">
                  11. Zona privada, cuenta y acceso
                </h2>

                <p className="muted">
                  El acceso a la zona privada de Bordando con Fru está vinculado
                  al email utilizado para gestionar la compra. La clienta será
                  responsable de utilizar un correo electrónico correcto y de
                  mantener protegidas sus credenciales de acceso.
                </p>

                <p className="muted">
                  La cuenta utilizada en Inventario Profesional es independiente
                  del acceso a la zona privada de Bordando con Fru. En la primera
                  activación, la clienta crea su cuenta en la aplicación y
                  utiliza el código de activación de un solo uso para vincular a
                  ella la licencia adquirida.
                </p>

                <p className="muted">
                  La clienta es responsable de mantener protegidas sus
                  credenciales de acceso y de utilizar las sesiones abiertas
                  únicamente en sus dispositivos personales.
                </p>

                <p className="muted">
                  Si necesita ayuda relacionada con el acceso a la zona privada
                  de la web, puede escribir a{" "}
                  <a href="mailto:soporte@stitchingwithfru.com">
                    soporte@stitchingwithfru.com
                  </a>.
                </p>

                <p className="muted">
                  Para soporte técnico relacionado con Inventario Profesional,
                  puede escribir a{" "}
                  <a href="mailto:soporte@stitchingwithfru.com">
                    soporte@stitchingwithfru.com
                  </a>.
                </p>
              </section>

              <section>
                <h2 className="serif">12. Contacto</h2>

                <p className="muted">
                  Para cualquier duda relacionada con un pedido o con los
                  productos de Bordando con Fru, puedes escribir a{" "}
                  <a href="mailto:soporte@stitchingwithfru.com">
                    soporte@stitchingwithfru.com
                  </a>.
                </p>

                <p className="muted">
                  Para soporte técnico de Inventario Profesional, el canal de
                  contacto es{" "}
                  <a href="mailto:soporte@stitchingwithfru.com">
                    soporte@stitchingwithfru.com
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