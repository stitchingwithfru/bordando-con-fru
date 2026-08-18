import type { Metadata } from "next";
import InventoryLaunchBanner from "@/components/InventoryLaunchBanner";
import {
  Card,
  InfoBadge,
  PrimaryLink,
  SecondaryLink,
  SectionTitle,
} from "@/components/UI";


export const metadata: Metadata = {
  title: "Inventario Profesional para punto de cruz | Bordando con Fru",
  description:
    "Aplicación web privada y modular para organizar hilos, movimientos, pedidos, ubicaciones, telas, kits, gráficos y materiales de punto de cruz.",
  alternates: {
    canonical:
      "https://stitchingwithfru.com/herramientas/inventario",
  },
  openGraph: {
    title: "Inventario Profesional para punto de cruz | Bordando con Fru",
    description:
      "Aplicación web privada y modular para organizar hilos, movimientos, pedidos, ubicaciones, telas, kits, gráficos y materiales de punto de cruz.",
    url: "https://stitchingwithfru.com/herramientas/inventario",
    siteName: "Bordando con Fru",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Inventario Profesional para punto de cruz | Bordando con Fru",
    description:
      "Aplicación web privada y modular para organizar hilos, movimientos, pedidos, ubicaciones, telas, kits, gráficos y materiales de punto de cruz.",
  },
};

export default function InventarioPage() {
  const items = [
    {
      name: "Inventario Profesional — edición base",
      price: "16,00 €",
      kind: "Edición base",
      text: "Incluye inventario de hilos, movimientos y control del stock, lista de compra automática, pedidos, ubicaciones, migración y copias de seguridad.",
    },
    {
      name: "Módulo de Telas",
      price: "+4,00 €",
      kind: "Módulo opcional",
      text: "Añade la gestión de telas a tu Inventario Profesional.",
    },
    {
      name: "Módulo de Kits y gráficos",
      price: "+4,00 €",
      kind: "Módulo opcional",
      text: "Añade la gestión de kits y gráficos junto al resto de tus materiales.",
    },
    {
      name: "Módulo de Calculadora",
      price: "+4,00 €",
      kind: "Módulo opcional",
      text: "Añade la calculadora de tela e hilos y el carrito de proyectos.",
    },
  ];

  const faqs = [
    {
      q: "¿Necesito Google Sheets para utilizar Inventario Profesional?",
      a: "No. La versión actual funciona como una aplicación web privada. Google Sheets solo interviene si quieres migrar los datos de una versión anterior.",
    },
    {
      q: "¿Puedo comprar únicamente la edición base?",
      a: "Sí. La edición base incluye hilos, movimientos, control del stock, lista de compra, pedidos, ubicaciones, migración y copias de seguridad.",
    },
    {
      q: "¿Puedo añadir módulos más adelante?",
      a: "Sí. Puedes incorporar posteriormente Telas, Kits y gráficos o Calculadora, según lo que necesites.",
    },
    {
      q: "¿Qué pasa si ya tengo Inventario Profesional y quiero ampliarlo?",
      a: "El formulario de pedido distingue entre compra nueva y ampliación, de manera que podrás solicitar únicamente los módulos que quieras añadir a tu licencia.",
    },
    {
      q: "¿Cómo recibo el acceso?",
      a: "Tras comprobar el pago se generará un código de activación de un solo uso. Encontrarás en tu zona privada la información de tu compra, los datos de la licencia, los módulos incluidos, el código necesario para la primera activación y el acceso a la aplicación. En Inventario Profesional deberás elegir «Primera activación» para crear tu cuenta y activar la licencia mediante ese código.",
    },
    {
      q: "¿Puedo utilizarlo en varios dispositivos?",
      a: "Sí. Puedes mantener la sesión iniciada en un máximo de tres dispositivos personales.",
    },
    {
      q: "¿Puedo migrar mi antiguo inventario?",
      a: "Sí. Si utilizabas la versión anterior de Inventario Profesional en Google Sheets, podrás importar el archivo Excel obtenido de esa versión. También puedes importar una lista sencilla de hilos desde Excel, CSV o TSV.",
    },
  ];

  return (
    <main>
      <InventoryLaunchBanner
        href="#inventario-detalles"
        priority
      />

      <section
        id="inventario-detalles"
        className="section"
        style={{ scrollMarginTop: 90 }}
      >
        <div className="container">
          <SectionTitle
            eyebrow="Sistema de Inventario Profesional"
            title="Tu taller de punto de cruz, ordenado y bajo control"
            description="Una aplicación web privada y modular para organizar tus hilos, movimientos, pedidos, ubicaciones, telas, kits, gráficos y materiales desde el navegador."
          />

          <div style={{ marginBottom: 28 }}>
            <Card>
              <h2 className="serif">
                Organiza tus materiales de bordado sin perderte
              </h2>

              <div className="list">
                <p>
                  El Sistema de Inventario Profesional te ayuda a saber qué
                  materiales tienes, dónde están guardados, qué necesitas comprar
                  y cómo cambia tu stock con cada compra, uso, ajuste o recepción
                  de pedido.
                </p>

                <p>
                  Puedes empezar con la edición base y añadir únicamente los
                  módulos que necesites. La aplicación muestra automáticamente
                  las funciones incluidas en tu licencia.
                </p>
              </div>
            </Card>
          </div>

          <div
            className="grid-2"
            style={{ gridTemplateColumns: "1.1fr 0.9fr" }}
          >
            <Card>
              <h2 className="serif">Qué incluye la edición base</h2>

              <div className="list">
                <p>• Inventario de hilos.</p>
                <p>• Movimientos y control del stock.</p>
                <p>• Lista de compra automática.</p>
                <p>• Creación y recepción de pedidos.</p>
                <p>• Ubicaciones.</p>
                <p>• Migración desde Google Sheets, Excel, CSV o TSV.</p>
                <p>• Copias de seguridad y recuperación.</p>
              </div>
            </Card>

            <Card soft>
              <InfoBadge tone="sage">Entrega manual</InfoBadge>

              <h2 className="serif">Cómo lo recibirás</h2>

              <div className="list">
                <p>1. Realiza el pedido desde el formulario de la web.</p>

                <p>
                  2. Al terminar verás el importe y las instrucciones para pagar
                  mediante PayPal o Bizum.
                </p>

                <p>
                  3. Tras comprobar el pago, se generará tu código de activación
                  de un solo uso.
                </p>

                <p>
                  4. En tu zona privada podrás consultar la información de tu
                  compra, el tipo de licencia, los módulos incluidos, el código
                  de activación, el manual y el acceso directo a Inventario
                  Profesional.
                </p>

                <p>
                  5. En la aplicación deberás elegir «Primera activación», crear
                  tu cuenta y utilizar el código para activar tu licencia.
                </p>
              </div>

              <div className="button-row" style={{ marginTop: 24 }}>
                <PrimaryLink href="/pedidos/inventario">
                  Hacer pedido
                </PrimaryLink>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionTitle
            eyebrow="Edición base y módulos"
            title="Una estructura modular y flexible"
            description="Puedes empezar con la edición base y añadir posteriormente únicamente los módulos que necesites."
          />

          <div className="grid-2">
            {items.map((item) => (
              <Card key={item.name}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 16,
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <InfoBadge>{item.kind}</InfoBadge>
                    <h3 className="serif">{item.name}</h3>
                  </div>

                  <span className="badge badge-sage price-pill">
                    {item.price}
                  </span>
                </div>

                <p className="muted">{item.text}</p>
              </Card>
            ))}
          </div>

          <div style={{ marginTop: 28 }}>
            <Card>
              <h2 className="serif">Módulos opcionales</h2>

              <div className="list">
                <p>• Telas.</p>
                <p>• Kits y gráficos.</p>
                <p>• Calculadora de tela e hilos y carrito de proyectos.</p>
              </div>

              <p className="muted" style={{ marginTop: 18 }}>
                No necesitas adquirir todos los módulos desde el principio.
                Puedes añadirlos posteriormente si cambian tus necesidades.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <Card>
            <InfoBadge tone="soft">Acceso y licencia</InfoBadge>

            <h2 className="serif">Una licencia vinculada a tu cuenta</h2>

            <div className="list">
              <p>
                Cada compra genera un código de activación de un solo uso.
              </p>

              <p>
                Durante la primera activación crearás tu cuenta en Inventario
                Profesional y utilizarás ese código para activar la licencia.
              </p>

              <p>
                Una vez activada, la licencia queda vinculada a la cuenta creada
                durante ese proceso.
              </p>

              <p>
                Desde la propia aplicación podrás consultar la edición adquirida
                y los módulos incluidos en tu licencia.
              </p>

              <p>
                Puedes mantener la sesión iniciada en un máximo de tres
                dispositivos personales.
              </p>
            </div>
          </Card>

          <Card>
            <InfoBadge tone="sage">Tu zona privada</InfoBadge>

            <h2 className="serif">Tus recursos y accesos en un mismo lugar</h2>

            <div className="list">
              <p>
                La zona privada de Bordando con Fru seguirá siendo tu espacio de
                referencia para consultar los recursos asociados a la compra.
              </p>

              <p>
                Allí podrás encontrar los datos de tu licencia, el código de
                activación de un solo uso, los módulos incluidos, el manual y
                otros recursos disponibles.
              </p>

              <p>
                También tendrás un enlace directo para abrir Inventario
                Profesional.
              </p>
            </div>

            <div className="button-row" style={{ marginTop: 24 }}>
              <SecondaryLink
                href="https://inventario.stitchingwithfru.com"
                newTab
              >
                Acceder a Inventario Profesional
              </SecondaryLink>
            </div>
          </Card>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container grid-2">
          <Card>
            <InfoBadge tone="sage">Dispositivos y conexión</InfoBadge>

            <h2 className="serif">Utilízalo desde el navegador</h2>

            <div className="list">
              <p>
                Puedes utilizar la aplicación desde el navegador de un
                ordenador, una tableta o un teléfono.
              </p>

              <p>
                Si la aplicación ya estaba cargada, podrás consultar parte de la
                información cuando pierdas temporalmente la conexión.
              </p>

              <p>
                Las operaciones que modifican datos requieren conexión.
              </p>
            </div>
          </Card>

          <Card>
            <InfoBadge tone="soft">Migración</InfoBadge>

            <h2 className="serif">Trae contigo tu inventario anterior</h2>

            <div className="list">
              <p>
                Si ya utilizabas la versión anterior de Inventario Profesional
                en Google Sheets, podrás importar tu inventario mediante el
                archivo Excel obtenido de esa versión.
              </p>

              <p>
                También puedes importar una lista sencilla de hilos desde Excel,
                CSV o TSV.
              </p>
            </div>
          </Card>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <Card>
            <InfoBadge tone="soft">Copias y recuperación</InfoBadge>

            <h2 className="serif">Protege la información de tu inventario</h2>

            <div className="list">
              <p>
                La aplicación permite descargar copias de seguridad en formato
                .ihcopia.
              </p>

              <p>
                Puedes comprobar una copia antes de restaurarla y recuperar todo
                el inventario o únicamente determinadas partes.
              </p>
            </div>
          </Card>

          <Card>
            <InfoBadge tone="sage">Actualizaciones</InfoBadge>

            <h2 className="serif">Mejoras de la aplicación</h2>

            <div className="list">
              <p>
                Las correcciones y mejoras compatibles con tu edición podrán
                incorporarse directamente a la aplicación.
              </p>

              <p>
                Si una actualización requiere alguna actuación por tu parte,
                recibirás las instrucciones correspondientes.
              </p>

              <p>
                Los módulos nuevos que no formen parte de la edición adquirida
                podrán ofrecerse por separado.
              </p>
            </div>
          </Card>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionTitle
            eyebrow="FAQ"
            title="Preguntas frecuentes sobre Inventario Profesional"
          />

          <div className="list">
            {faqs.map((item) => (
              <Card key={item.q}>
                <h3 className="serif">{item.q}</h3>
                <p className="muted">{item.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}