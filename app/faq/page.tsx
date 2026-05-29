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
      "Debes indicar el email al que quieres que se asocie tu compra. Ese será el correo que usaré para darte acceso a tu zona privada y donde recibirás la invitación para crear tu contraseña.",
    ],
    [
      "¿Cómo recibo mi pedido?",
      "La entrega es manual. Una vez comprobado el pago, asignaré el producto al email indicado en el pedido y recibirás una invitación para crear tu acceso a la zona privada de la web.",
    ],
    [
      "¿Dónde estarán mis recursos?",
      "Tus recursos estarán disponibles en tu zona privada, en el apartado “Mi espacio”. Desde ahí podrás acceder a la plantilla, al vídeo tutorial y, cuando corresponda, al manual en PDF.",
    ],
    [
      "¿Cuánto tarda la entrega?",
      "La entrega se realiza normalmente en un plazo aproximado de 24 a 48 horas tras comprobar el pago.",
    ],
    [
      "¿Qué necesito para usar las herramientas?",
      "Las herramientas están desarrolladas en el entorno Google, así que normalmente necesitarás disponer de una cuenta de Google para poder utilizar correctamente las plantillas de Google Sheets y crear tu propia copia.",
    ],
    [
      "¿Se pueden usar desde el móvil?",
      "Sí, algunas partes se pueden usar también desde móvil mediante App Forms, según la herramienta o la versión adquirida.",
    ],
    [
      "¿Puedo mejorar mi versión más adelante?",
      "Sí. Durante el proceso de compra puedes indicar qué versión tienes actualmente para ver solo las mejoras posibles desde esa versión.",
    ],
    [
      "¿Los complementos del inventario se pueden comprar más adelante?",
      "Sí. El Sistema de Inventario Profesional está pensado de forma modular, de modo que puedes empezar por la base y añadir complementos más adelante.",
    ],
    [
      "¿Las mejoras futuras están incluidas?",
      "Si se produce una mejora significativa de la versión que has adquirido, la actualización se añadirá a tu zona privada. Además, recibirás un aviso por email para que puedas entrar, ver qué ha cambiado y acceder a los recursos actualizados. Los complementos o módulos nuevos que se desarrollen aparte se adquirirían por separado.",
    ],
    [
      "¿Qué pasa si pierdo el email original?",
      "No pasa nada. La idea de la zona privada es que puedas acceder a tus recursos desde la web aunque pierdas el correo original de entrega.",
    ],
    [
      "¿Qué pasa si olvido mi contraseña?",
      "Podrás solicitar una recuperación de contraseña. Si tienes cualquier problema con el acceso, puedes escribirme desde la página de contacto.",
    ],
    [
      "¿Se aceptan devoluciones?",
      "No. Al tratarse de un producto digital con entrega manual y acceso al contenido, una vez asignado el acceso al producto digital no se aceptan devoluciones.",
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