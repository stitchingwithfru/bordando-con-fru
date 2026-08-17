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
                  <a href="mailto:soporte@stitchingwithfru.com">
                    soporte@stitchingwithfru.com
                  </a>
                </p>
              </section>

              <section>
                <h2 className="serif">Finalidad</h2>
                <div className="list">
                  <p>• Atender consultas enviadas mediante la web.</p>
                  <p>• Gestionar pedidos de productos digitales.</p>
                  <p>• Comunicarnos contigo en relación con tu pedido.</p>
                  <p>• Gestionar la información y los recursos asociados a las compras realizadas.</p>
                  <p>• Crear y gestionar el acceso a la zona privada de clientas.</p>
                  <p>• Gestionar la creación y administración de cuentas de Inventario Profesional.</p>
                  <p>• Gestionar la activación, estado y módulos incluidos en las licencias de Inventario Profesional.</p>
                  <p>• Permitir la recuperación del acceso a Inventario Profesional.</p>
                  <p>• Prestar soporte técnico relacionado con la aplicación.</p>
                  <p>• Gestionar la seguridad de las sesiones y los dispositivos asociados a una cuenta.</p>
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
                  <p>• Datos necesarios para crear y mantener una cuenta de Inventario Profesional, como el email y los datos técnicos de autenticación y sesión.</p>
                  <p>• Información relacionada con la licencia adquirida, su activación, los módulos incluidos y su estado.</p>
                  <p>• Información técnica relacionada con las sesiones y dispositivos utilizados para acceder a la aplicación.</p>
                  <p>• Los datos que introduzcas y gestiones dentro de Inventario Profesional, como hilos, telas, kits, gráficos, ubicaciones, movimientos, pedidos, proyectos y demás información de inventario.</p>
                  <p>• Información técnica necesaria para realizar importaciones, exportaciones, copias de seguridad, restauraciones y prestar soporte.</p>
                </div>

                <p className="muted">
                  No solicitamos datos bancarios ni de tarjeta a través de los formularios de esta web. Los pagos se realizan por los métodos indicados en cada pedido, fuera del propio formulario.
                </p>
              </section>

              <section>
                <h2 className="serif">Base jurídica del tratamiento</h2>

                <div className="list">
                  <p>
                    • La ejecución de la relación contractual y la aplicación de
                    medidas solicitadas antes de contratar, para gestionar los
                    pedidos, entregar los productos adquiridos, mantener la zona
                    privada, gestionar las cuentas y licencias de Inventario
                    Profesional y prestar las funciones y el soporte asociados a
                    los productos contratados.
                  </p>

                  <p>
                    • El cumplimiento de las obligaciones legales que resulten
                    aplicables a la gestión de las compras, la prestación del
                    servicio y la protección de los datos personales.
                  </p>

                  <p>
                    • El consentimiento de la persona interesada para el envío
                    de comunicaciones comerciales sobre novedades,
                    actualizaciones y nuevos lanzamientos cuando haya aceptado
                    expresamente recibirlas.
                  </p>
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
                <h2 className="serif">Inventario Profesional</h2>

                <p className="muted">
                  Inventario Profesional funciona mediante una aplicación web privada independiente de la zona privada de Bordando con Fru.
                </p>

                <p className="muted">
                  Durante la primera activación, la clienta crea una cuenta en la aplicación y utiliza un código de activación de un solo uso. Una vez canjeado correctamente, la licencia queda vinculada a esa cuenta y el código deja de ser reutilizable.
                </p>

                <p className="muted">
                  La aplicación trata la información necesaria para autenticar la cuenta, comprobar la licencia y los módulos adquiridos, mantener las sesiones personales y prestar las funciones contratadas.
                </p>

                <p className="muted">
                  También almacena los datos de inventario introducidos por la propia clienta y la información necesaria para realizar operaciones como movimientos, pedidos, importaciones, exportaciones, copias de seguridad y restauraciones.
                </p>

                <p className="muted">
                  La aplicación limita las sesiones personales activas a un máximo de tres dispositivos.
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
                  <p>• Netlify, para el alojamiento y funcionamiento técnico de la web principal de Bordando con Fru.</p>
                  <p>• Supabase, para servicios de autenticación y gestión de accesos. Inventario Profesional utiliza un proyecto dedicado para la autenticación de sus cuentas.</p>
                  <p>• Brevo, para el envío de correos transaccionales, confirmaciones, recuperación de acceso y otras comunicaciones necesarias para la prestación del servicio.</p>
                  <p>• Cloudflare, para el alojamiento y funcionamiento técnico de Inventario Profesional, su API, la base de datos de la aplicación y determinados mecanismos de protección frente a usos automatizados o abusivos.</p>
                  <p>• Google, mediante servicios como Drive, Sheets o Apps Script, para determinadas funciones de la web, gestión de pedidos, recursos digitales y productos que continúan utilizando el entorno Google.</p>
                </div>
              </section>

              <section>
                <h2 className="serif">Transferencias internacionales</h2>

                <p className="muted">
                  Algunos de los proveedores técnicos utilizados para prestar
                  los servicios de Bordando con Fru pueden tratar datos
                  personales desde países situados fuera del Espacio Económico
                  Europeo.
                </p>

                <p className="muted">
                  Cuando resulte aplicable una transferencia internacional de
                  datos personales, se utilizarán los mecanismos y garantías
                  reconocidos por la normativa de protección de datos que
                  correspondan en cada caso, como decisiones de adecuación,
                  cláusulas contractuales tipo u otros mecanismos legalmente
                  válidos.
                </p>
              </section>

              <section>
                <h2 className="serif">Conservación de los datos</h2>

                <p className="muted">
                  Los datos personales se conservarán únicamente durante el
                  tiempo necesario para cumplir las finalidades para las que
                  fueron recogidos y, posteriormente, durante los plazos que
                  resulten necesarios para atender obligaciones legales o
                  posibles responsabilidades derivadas de la relación
                  contractual y del tratamiento realizado.
                </p>

                <div className="list">
                  <p>
                    • Los datos de consultas se conservarán durante el tiempo
                    necesario para atenderlas y gestionar las posibles
                    incidencias relacionadas.
                  </p>

                  <p>
                    • Los datos relativos a pedidos, compras, entregas y
                    aceptaciones se conservarán durante el tiempo necesario para
                    gestionar la relación contractual y cumplir las obligaciones
                    legales aplicables.
                  </p>

                  <p>
                    • Los datos de acceso a la zona privada se conservarán
                    mientras sea necesario mantener los productos y recursos
                    asociados a la cuenta.
                  </p>

                  <p>
                    • En Inventario Profesional, los datos de cuenta, licencia e
                    inventario se conservarán mientras sean necesarios para
                    prestar el servicio. Cuando proceda su supresión, los datos
                    que ya no resulten necesarios se eliminarán o bloquearán
                    según corresponda, sin perjuicio de aquellos que deban
                    conservarse temporalmente por una obligación legal o para la
                    formulación, el ejercicio o la defensa de reclamaciones.
                  </p>

                  <p>
                    • Los datos utilizados para comunicaciones comerciales se
                    conservarán hasta que retires tu consentimiento.
                  </p>

                  <p>
                    • Los archivos brutos utilizados durante una importación de
                    Inventario Profesional podrán conservarse hasta 30 días
                    después de finalizarla.
                  </p>

                  <p>
                    • Las exportaciones generadas para descarga tendrán una
                    disponibilidad temporal de hasta 24 horas.
                  </p>

                  <p>
                    • Los registros de auditoría de seguridad de Inventario
                    Profesional podrán conservarse durante 12 meses.
                  </p>

                  <p>
                    • Los logs técnicos de diagnóstico podrán conservarse
                    durante 30 días o durante el período mínimo disponible en el
                    proveedor técnico correspondiente.
                  </p>

                  <p>
                    • Las copias administrativas de seguridad de Inventario
                    Profesional, cuando se generen, podrán conservarse durante
                    los períodos definidos para el sistema de copias de
                    seguridad y estarán sujetas a medidas de acceso y protección
                    adecuadas.
                  </p>
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
                  Puedes solicitar el acceso, rectificación o supresión de tus datos, así como pedir la limitación de su tratamiento, oponerte al mismo o solicitar la portabilidad cuando corresponda, escribiendo a{" "}
                  <a href="mailto:soporte@stitchingwithfru.com">
                    soporte@stitchingwithfru.com
                  </a>.
                </p>

                <p className="muted">
                  Cuando un tratamiento se base en tu consentimiento, puedes retirarlo en cualquier momento sin que ello afecte a la licitud del tratamiento realizado anteriormente.
                </p>

                <p className="muted">
                  También puedes solicitar la baja de las comunicaciones comerciales escribiendo a ese mismo correo.
                </p>

                <p className="muted">
                  Si consideras que el tratamiento de tus datos no se ajusta a la normativa aplicable, puedes presentar una reclamación ante la autoridad de control competente.
                </p>
              </section>

              <section>
                <h2 className="serif">Contacto</h2>
                <p className="muted">
                  Para cualquier duda sobre esta política de privacidad o sobre el tratamiento de tus datos, puedes escribir a{" "}
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