import type { Metadata } from "next";
import { Card, SectionTitle } from "@/components/UI";

export const metadata: Metadata = {
  title: "Política de privacidad | Bordando con Fru",
  description:
    "Información sobre el tratamiento de datos personales en Bordando con Fru, pedidos digitales, zona privada y comunicaciones.",
};

export default function PrivacyPage() {
  return (
    <main>
      <section className="section">
        <div className="container narrow-container">
          <SectionTitle
            eyebrow=""
            title="Política de privacidad"
            description="Información básica sobre el tratamiento de datos personales en Bordando con Fru."
          />

          <Card>
            <div className="legal-stack">
              <section>
                <h2 className="serif">Responsable</h2>
                <p className="muted">
                  <strong style={{ color: "var(--text)" }}>
                    Bordando con Fru
                  </strong>
                </p>
                <p className="muted">
                  <strong style={{ color: "var(--text)" }}>
                    Correo electrónico:
                  </strong>{" "}
                  <a href="mailto:stitchingwithfru@gmail.com">
                    stitchingwithfru@gmail.com
                  </a>
                </p>
              </section>

              <section>
                <h2 className="serif">Finalidad</h2>
                <div className="list">
                  <p>• Atender consultas enviadas mediante la web.</p>
                  <p>• Gestionar pedidos de productos digitales.</p>
                  <p>• Comunicarnos contigo en relación con tu pedido.</p>
                  <p>• Asociar los productos adquiridos al email indicado en el pedido.</p>
                  <p>• Crear y gestionar el acceso a la zona privada de clientas.</p>
                  <p>• Permitir el acceso a plantillas, manuales, vídeos y otros recursos digitales adquiridos.</p>
                  <p>• Enviar invitaciones de acceso, recuperación de contraseña y avisos relacionados con tu cuenta.</p>
                  <p>• Informarte sobre actualizaciones de productos que tengas asociados a tu cuenta.</p>
                  <p>• Informarte sobre novedades y nuevos lanzamientos, si lo autorizas expresamente.</p>
                </div>
              </section>

              <section>
                <h2 className="serif">Datos que podemos solicitar</h2>
                <div className="list">
                  <p>• Nombre.</p>
                  <p>• Dirección de correo electrónico.</p>
                  <p>• Producto, versión o complemento solicitado.</p>
                  <p>• Método de pago elegido.</p>
                  <p>• Información necesaria para gestionar el pedido o responder a tu consulta.</p>
                  <p>• Datos técnicos necesarios para crear y mantener tu acceso a la zona privada.</p>
                </div>

                <p className="muted">
                  No solicitamos datos bancarios ni de tarjeta a través de los formularios de esta web. Los pagos se realizan por los métodos indicados en cada pedido, fuera del propio formulario.
                </p>
              </section>

              <section>
                <h2 className="serif">Base para el tratamiento</h2>
                <div className="list">
                  <p>• La gestión de tu pedido y la entrega del producto digital solicitado.</p>
                  <p>• La creación y mantenimiento de tu acceso a la zona privada.</p>
                  <p>• La atención de consultas enviadas voluntariamente por ti.</p>
                  <p>• El consentimiento, cuando aceptas recibir comunicaciones sobre novedades, actualizaciones o nuevos lanzamientos.</p>
                </div>
              </section>

              <section>
                <h2 className="serif">Zona privada de clientas</h2>
                <p className="muted">
                  Cuando compras un producto digital, el acceso se asocia al email indicado en el pedido. Ese email se utiliza para crear o gestionar tu cuenta de acceso a la zona privada.
                </p>

                <p className="muted">
                  Desde la zona privada podrás consultar los productos digitales asociados a tu cuenta, acceder a sus recursos y ver avisos de actualización cuando correspondan.
                </p>

                <p className="muted">
                  La persona usuaria es responsable de facilitar un email correcto y de mantener protegida su contraseña de acceso.
                </p>
              </section>

              <section>
                <h2 className="serif">Comunicaciones por email</h2>
                <p className="muted">
                  Podemos enviarte correos relacionados con tu pedido, invitaciones para crear tu acceso, recuperación de contraseña, avisos de actualizaciones de productos adquiridos o comunicaciones necesarias para el funcionamiento de la zona privada.
                </p>

                <p className="muted">
                  Si además aceptas recibir comunicaciones comerciales, podremos enviarte información sobre novedades, mejoras y nuevos lanzamientos de Bordando con Fru.
                </p>
              </section>

              <section>
                <h2 className="serif">Herramientas y servicios utilizados</h2>
                <p className="muted">
                  Para gestionar la web, los formularios, la zona privada, los accesos y los envíos de correo electrónico, podemos utilizar herramientas externas necesarias para prestar el servicio.
                </p>

                <div className="list">
                  <p>• Supabase, para autenticación, gestión de accesos y almacenamiento de información necesaria para la zona privada.</p>
                  <p>• Brevo, para el envío de correos transaccionales, invitaciones, recuperación de contraseña y avisos de actualización.</p>
                  <p>• Google Drive o Google Sheets, para alojar o entregar determinados recursos digitales vinculados a los productos.</p>
                  <p>• Netlify, para el alojamiento y funcionamiento técnico de la web.</p>
                </div>
              </section>

              <section>
                <h2 className="serif">Conservación de los datos</h2>
                <div className="list">
                  <p>• Durante el tiempo necesario para atender tu consulta.</p>
                  <p>• Durante el tiempo necesario para gestionar tu pedido y la entrega del producto digital.</p>
                  <p>• Mientras mantengas productos asociados a tu zona privada.</p>
                  <p>• Durante el tiempo necesario para conservar un histórico básico de compras, accesos, actualizaciones e incidencias relacionadas con productos adquiridos.</p>
                  <p>• Hasta que retires tu consentimiento, en el caso de comunicaciones comerciales.</p>
                </div>
              </section>

              <section>
                <h2 className="serif">Destinatarios</h2>
                <p className="muted">
                  No vendemos tus datos ni los cedemos a terceros para fines comerciales.
                </p>

                <p className="muted">
                  Tus datos podrán ser tratados por proveedores técnicos necesarios para prestar el servicio, como herramientas de alojamiento web, autenticación, envío de correos o gestión de recursos digitales.
                </p>
              </section>

              <section>
                <h2 className="serif">Derechos</h2>
                <p className="muted">
                  Puedes solicitar el acceso, rectificación o supresión de tus datos, así como pedir la limitación del tratamiento u oponerte al mismo, escribiendo a{" "}
                  <a href="mailto:stitchingwithfru@gmail.com">
                    stitchingwithfru@gmail.com
                  </a>.
                </p>

                <p className="muted">
                  También puedes solicitar la baja de comunicaciones comerciales escribiendo a ese mismo correo.
                </p>
              </section>

              <section>
                <h2 className="serif">Contacto</h2>
                <p className="muted">
                  Para cualquier duda sobre esta política de privacidad o sobre el tratamiento de tus datos, puedes escribir a{" "}
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