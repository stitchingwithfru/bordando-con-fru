import type { Metadata } from "next";
import { Card, InfoBadge, SecondaryLink, SectionTitle } from "@/components/UI";

export const metadata: Metadata = {
  title: "Preguntas frecuentes | Bordando con Fru",
  description:
    "Preguntas frecuentes sobre pedidos, entrega digital, zona privada, herramientas de punto de cruz, actualizaciones y devoluciones.",
};

export default function FAQPage() {
  const questions = [
    [
      "¿Cómo se realiza un pedido?",
      "Eliges la herramienta que te interesa, completas el formulario correspondiente desde la web y, al finalizar, verás las instrucciones de pago por Bizum o PayPal.",
    ],
    [
      "¿Qué email debo poner en el pedido?",
      "Debes indicar un email válido para gestionar tu pedido y el acceso a los recursos asociados a tu compra en la zona privada de Bordando con Fru.",
    ],
    [
      "¿Cómo recibo mi pedido?",
      "La entrega es manual una vez comprobado el pago. La forma de acceso depende de la herramienta adquirida: el Sistema de Seguimiento de Punto de Cruz se utiliza mediante Google Sheets, mientras que Inventario Profesional funciona como una aplicación web privada con su propio proceso de primera activación.",
    ],
    [
      "¿Dónde estarán mis recursos?",
      "Los recursos asociados a tu compra estarán disponibles en tu zona privada, en el apartado “Mi espacio”. Según el producto, podrás encontrar plantillas, manuales, vídeos, datos de licencia, códigos de activación y enlaces de acceso.",
    ],
    [
      "¿Cuánto tarda la entrega?",
      "La entrega se realiza normalmente en un plazo aproximado de 24 a 48 horas tras comprobar el pago.",
    ],
    [
      "¿Necesito Google Sheets para utilizar las herramientas?",
      "El Sistema de Seguimiento de Punto de Cruz continúa utilizándose mediante Google Sheets. Inventario Profesional no necesita Google Sheets para funcionar: la versión actual es una aplicación web privada. Google Sheets solo interviene en Inventario Profesional si quieres migrar datos desde una versión anterior.",
    ],
    [
      "¿Se pueden usar desde el móvil?",
      "Sí. El Sistema de Seguimiento dispone de las opciones móviles correspondientes a la versión adquirida. Inventario Profesional puede utilizarse desde el navegador de un ordenador, una tableta o un teléfono.",
    ],
    [
      "¿Puedo mejorar mi versión del Sistema de Seguimiento más adelante?",
      "Sí. Durante el proceso de compra puedes indicar qué versión tienes actualmente para ver solo las mejoras posibles desde esa versión.",
    ],
    [
      "¿Puedo comprar únicamente la edición base de Inventario Profesional?",
      "Sí. La edición base incluye inventario de hilos, movimientos y control del stock, lista de compra automática, pedidos, ubicaciones, migración y copias de seguridad.",
    ],
    [
      "¿Los módulos de Inventario Profesional se pueden comprar más adelante?",
      "Sí. Inventario Profesional está planteado de forma modular, de modo que puedes empezar por la edición base y añadir posteriormente Telas, Kits y gráficos o Calculadora.",
    ],
    [
      "¿Cómo activo Inventario Profesional?",
      "Tras comprobar el pago se generará un código de activación de un solo uso. Desde la aplicación deberás elegir «Primera activación», crear tu cuenta e introducir ese código. Una vez utilizado correctamente, la licencia quedará vinculada a la cuenta creada.",
    ],
    [
      "¿Puedo utilizar Inventario Profesional en varios dispositivos?",
      "Sí. Puedes mantener la sesión iniciada en un máximo de tres dispositivos personales.",
    ],
    [
      "¿Las mejoras futuras están incluidas?",
      "Las actualizaciones dependen del producto. En Inventario Profesional, las correcciones y mejoras compatibles con tu edición podrán incorporarse directamente a la aplicación. Los módulos nuevos que no formen parte de la licencia adquirida podrán ofrecerse por separado.",
    ],
    [
      "¿Qué pasa si pierdo el email original del pedido?",
      "La zona privada permite consultar los recursos asociados a tus compras sin depender del correo original de entrega. Si necesitas ayuda con tu acceso, puedes contactar con soporte.",
    ],
    [
      "¿Qué pasa si olvido mi contraseña?",
      "Podrás utilizar las opciones de recuperación disponibles para el acceso correspondiente. Si tienes cualquier problema, puedes contactar con soporte.",
    ],
    [
      "¿Se aceptan devoluciones o puedo ejercer el derecho de desistimiento?",
      "El derecho de desistimiento depende de la herramienta adquirida y del momento en que haya comenzado su suministro o prestación. El Sistema de Seguimiento se suministra como contenido digital, mientras que Inventario Profesional se presta como servicio digital. Puedes consultar las condiciones aplicables a cada caso en la página de Condiciones de compra.",
    ],
  ];

  return (
    <main>
      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="FAQ"
            title="Preguntas frecuentes"
            description="Respuestas claras sobre pedidos, entrega digital, zona privada, herramientas, actualizaciones y acceso a tus recursos."
          />

          <div className="list">
            {questions.map(([q, a]) => (
              <Card key={q}>
                <h2 className="serif">{q}</h2>
                <p className="muted">{a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <Card>
            <InfoBadge>¿Sigues teniendo dudas?</InfoBadge>
            <h2 className="serif">Puedes escribirme antes de hacer tu pedido</h2>
            <p className="muted">
              Si no encuentras aquí la respuesta que necesitas, puedes utilizar la página de contacto para escribirme antes de hacer tu pedido o para consultar cualquier duda sobre tu acceso.
            </p>
            <SecondaryLink href="/contacto">Ir a contacto</SecondaryLink>
          </Card>
        </div>
      </section>
    </main>
  );
}