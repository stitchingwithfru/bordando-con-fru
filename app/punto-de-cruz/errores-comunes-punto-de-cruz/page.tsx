import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Errores comunes en punto de cruz y cómo evitarlos | Bordando con Fru",
  description:
    "Guía práctica con errores frecuentes en punto de cruz y consejos sencillos para evitarlos: contar mal, elegir mal la tela, tensar demasiado, perderse en el patrón y más.",
  openGraph: {
    title: "Errores comunes en punto de cruz y cómo evitarlos | Bordando con Fru",
    description:
      "Descubre errores habituales al bordar punto de cruz y cómo evitarlos para disfrutar más de tus proyectos.",
    url: "https://stitchingwithfru.com/punto-de-cruz/errores-comunes-punto-de-cruz",
    siteName: "Bordando con Fru",
    locale: "es_ES",
    type: "article",
  },
};

export default function ErroresComunesPuntoDeCruzPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#403A36] pt-12 pb-24">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <style>
          {`
            .article-hero {
              max-width: 920px;
              margin: 0 auto 56px auto;
              background: linear-gradient(135deg, #EFE5DE 0%, #FCFAF7 100%);
              border: 1px solid #E8DED8;
              border-radius: 34px;
              padding: 42px 34px;
              box-shadow: 0 12px 30px rgba(64, 58, 54, 0.06);
              text-align: center;
            }

            .article-kicker {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              background: rgba(255,255,255,0.75);
              border: 1px solid #E8DED8;
              border-radius: 999px;
              padding: 7px 14px;
              margin-bottom: 16px;
              color: #8A7C74;
              font-size: 12px;
              font-weight: 700;
              letter-spacing: 0.14em;
              text-transform: uppercase;
            }

            .article-title {
              margin: 0 0 16px 0;
              font-family: Georgia, serif;
              font-size: 46px;
              line-height: 1.05;
              color: #403A36;
            }

            .article-intro {
              max-width: 760px;
              margin: 0 auto 26px auto;
              color: #6F655F;
              font-size: 18px;
              line-height: 1.7;
            }

            .article-actions {
              display: flex;
              justify-content: center;
              gap: 12px;
              flex-wrap: wrap;
            }

            .article-button {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              border-radius: 999px;
              padding: 13px 20px;
              font-size: 15px;
              font-weight: 700;
              text-decoration: none;
              background: #403A36;
              color: #FFFFFF;
              border: 1px solid #403A36;
              box-shadow: 0 8px 18px rgba(64, 58, 54, 0.14);
            }

            .article-button.secondary {
              background: #FFFFFF;
              color: #403A36;
              border: 1px solid #E8DED8;
              box-shadow: none;
            }

            .article-content {
              max-width: 920px;
              margin: 0 auto;
              display: grid;
              gap: 24px;
            }

            .article-card {
              background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
              border: 1px solid #E8DED8;
              border-radius: 30px;
              padding: 30px;
              box-shadow: 0 10px 28px rgba(64, 58, 54, 0.06);
            }

            .article-card.soft {
              background: #FFF7EF;
            }

            .article-section-title {
              margin: 0 0 14px 0;
              font-family: Georgia, serif;
              font-size: 30px;
              line-height: 1.12;
              color: #403A36;
            }

            .article-text {
              margin: 0;
              color: #6F655F;
              font-size: 16px;
              line-height: 1.75;
            }

            .article-text + .article-text {
              margin-top: 12px;
            }

            .article-list {
              display: grid;
              gap: 12px;
              margin-top: 16px;
            }

            .article-list p {
              margin: 0;
              color: #6F655F;
              font-size: 16px;
              line-height: 1.65;
            }

            .article-callout {
              background: #F7F3EE;
              border: 1px solid #E8DED8;
              border-radius: 22px;
              padding: 18px;
              margin-top: 18px;
            }

            .article-callout-title {
              margin: 0 0 8px 0;
              font-family: Georgia, serif;
              font-size: 22px;
              line-height: 1.15;
              color: #403A36;
            }

            .article-callout-text {
              margin: 0;
              color: #6F655F;
              font-size: 15px;
              line-height: 1.65;
            }

            @media (max-width: 600px) {
              .article-hero {
                border-radius: 28px;
                padding: 32px 22px;
                margin-bottom: 46px;
              }

              .article-title {
                font-size: 36px;
              }

              .article-intro {
                font-size: 16px;
                line-height: 1.65;
              }

              .article-actions {
                flex-direction: column;
              }

              .article-button {
                width: 100%;
              }

              .article-card {
                border-radius: 26px;
                padding: 24px 20px;
              }

              .article-section-title {
                font-size: 27px;
              }
            }
          `}
        </style>

        <section className="article-hero">
          <div className="article-kicker">🪡 Consejos prácticos</div>

          <h1 className="article-title">
            Errores comunes en punto de cruz y cómo evitarlos
          </h1>

          <p className="article-intro">
            En punto de cruz es normal equivocarse, sobre todo cuando estás empezando o cuando trabajas en proyectos grandes. La buena noticia es que muchos errores frecuentes se pueden evitar con unos pocos hábitos sencillos.
          </p>

          <div className="article-actions">
            <Link href="/punto-de-cruz" className="article-button secondary">
              ← Volver a Punto de cruz
            </Link>
          </div>
        </section>

        <section className="article-content">
          <article className="article-card">
            <h2 className="article-section-title">
              Equivocarse también forma parte del proceso
            </h2>

            <p className="article-text">
              A veces pensamos que un error significa que no estamos bordando bien, pero no es así. Contar mal una zona, equivocarte con un símbolo o darte cuenta tarde de que algo no encaja le pasa a muchísimas personas que bordan.
            </p>

            <p className="article-text">
              La clave está en detectar esos fallos lo antes posible y en crear una forma de trabajar que te ayude a reducirlos sin quitarle disfrute al bordado.
            </p>
          </article>

          <article className="article-card">
            <h2 className="article-section-title">
              1. Empezar sin revisar bien el patrón
            </h2>

            <p className="article-text">
              Uno de los errores más comunes es lanzarse a bordar sin mirar con calma el diseño, los colores, el tamaño final o el punto de inicio. Esto suele provocar confusión después, cuando ya llevas unas cuantas puntadas.
            </p>

            <div className="article-callout">
              <h3 className="article-callout-title">
                Cómo evitarlo
              </h3>
              <p className="article-callout-text">
                Antes de empezar, revisa el patrón completo, comprueba el centro o la zona desde la que vas a bordar y mira si hay símbolos parecidos que puedan confundirte.
              </p>
            </div>
          </article>

          <article className="article-card">
            <h2 className="article-section-title">
              2. Elegir una tela que no encaja con el proyecto
            </h2>

            <p className="article-text">
              A veces escogemos una tela porque nos gusta mucho, pero luego resulta incómoda para el diseño, para nuestra vista o para el nivel de detalle del proyecto.
            </p>

            <div className="article-list">
              <p>• Una tela demasiado fina puede hacerte contar peor.</p>
              <p>• Un color de fondo poco adecuado puede dificultar ver los agujeros.</p>
              <p>• Un count muy pequeño puede cansarte más de la cuenta.</p>
            </div>

            <div className="article-callout">
              <h3 className="article-callout-title">
                Cómo evitarlo
              </h3>
              <p className="article-callout-text">
                Piensa no solo en el acabado final, sino también en la comodidad al bordar. Si dudas, mejor una opción clara y amable para tus ojos y tus manos.
              </p>
            </div>
          </article>

          <article className="article-card">
            <h2 className="article-section-title">
              3. Contar mal las cruces o perder la referencia
            </h2>

            <p className="article-text">
              Este es probablemente el error más típico. En proyectos grandes o zonas con mucho confeti, perder una fila o desplazar unas pocas cruces puede cambiar toda una parte del diseño.
            </p>

            <div className="article-callout">
              <h3 className="article-callout-title">
                Cómo evitarlo
              </h3>
              <p className="article-callout-text">
                Trabaja en bloques pequeños, revisa con frecuencia lo que acabas de hacer y marca el patrón si eso te ayuda. Cuanto antes detectes el error, más fácil será corregirlo.
              </p>
            </div>
          </article>

          <article className="article-card">
            <h2 className="article-section-title">
              4. Tensar demasiado el hilo o la tela
            </h2>

            <p className="article-text">
              Cuando tensas demasiado, las cruces pueden quedar apretadas, la tela deformarse un poco o el resultado perder uniformidad. También puede pasar lo contrario: dejar las puntadas demasiado flojas.
            </p>

            <div className="article-callout">
              <h3 className="article-callout-title">
                Cómo evitarlo
              </h3>
              <p className="article-callout-text">
                Intenta mantener una tensión regular. No hace falta apretar demasiado para que una cruz quede bonita; lo importante es que todas sigan un ritmo parecido.
              </p>
            </div>
          </article>

          <article className="article-card">
            <h2 className="article-section-title">
              5. No dejar margen suficiente de tela
            </h2>

            <p className="article-text">
              Este error se descubre tarde y da mucha rabia. Si cortas la tela demasiado justa, luego puede faltar espacio para montar, enmarcar o rematar el proyecto.
            </p>

            <div className="article-callout">
              <h3 className="article-callout-title">
                Cómo evitarlo
              </h3>
              <p className="article-callout-text">
                Calcula siempre el tamaño del diseño y añade margen extra alrededor antes de cortar. Es mejor que sobre tela a que falte.
              </p>
            </div>
          </article>

          <article className="article-card">
            <h2 className="article-section-title">
              6. Mezclar hilos o perder el control de los materiales
            </h2>

            <p className="article-text">
              Cuando no sabes qué hilo es cada uno, si una madeja está reservada para un proyecto o si ya tienes una referencia, es mucho más fácil equivocarte al preparar una labor.
            </p>

            <div className="article-list">
              <p>• Puedes usar un color que no tocaba.</p>
              <p>• Puedes comprar hilos repetidos sin querer.</p>
              <p>• Puedes perder tiempo buscando materiales antes de empezar.</p>
            </div>

            <div className="article-callout">
              <h3 className="article-callout-title">
                Cómo evitarlo
              </h3>
              <p className="article-callout-text">
                Mantén una organización mínima de hilos, restos y materiales. No hace falta un sistema complicado: basta con que te ayude a saber qué tienes y dónde está.
              </p>
            </div>
          </article>

          <article className="article-card">
            <h2 className="article-section-title">
              7. No revisar el avance durante proyectos largos
            </h2>

            <p className="article-text">
              En proyectos grandes, a veces seguimos bordando durante días sin parar a revisar si todo sigue cuadrando. Eso puede hacer que un error pequeño se convierta en uno mucho más grande.
            </p>

            <div className="article-callout">
              <h3 className="article-callout-title">
                Cómo evitarlo
              </h3>
              <p className="article-callout-text">
                Haz pequeñas revisiones cada cierto tiempo. Comparar lo bordado con el patrón o revisar una zona antes de seguir puede ahorrarte mucho deshacer después.
              </p>
            </div>
          </article>

          <article className="article-card soft">
            <h2 className="article-section-title">
              Cómo reducir errores sin obsesionarte
            </h2>

            <p className="article-text">
              Evitar errores no significa convertir el bordado en algo rígido. La idea no es bordar con miedo, sino crear una forma de trabajar que te dé tranquilidad.
            </p>

            <div className="article-list">
              <p>• Revisa el patrón antes de empezar.</p>
              <p>• Elige materiales cómodos para ti.</p>
              <p>• Trabaja por zonas pequeñas cuando el diseño lo pida.</p>
              <p>• Revisa el avance de vez en cuando.</p>
              <p>• Mantén una organización básica de proyectos y materiales.</p>
            </div>
          </article>

                    <article className="article-card soft">
            <h2 className="article-section-title">
              Organizar mejor tus proyectos también ayuda
            </h2>

            <p className="article-text">
              Muchos errores no vienen solo de la técnica, sino del desorden: no tener claro qué estabas bordando, no recordar el punto exacto en el que te quedaste o no saber qué materiales tienes preparados.
            </p>

            <div className="article-callout">
              <h3 className="article-callout-title">
                También te puede interesar
              </h3>

              <div className="article-list">
                <p>
                  •{" "}
                  <Link href="/punto-de-cruz/telas-punto-de-cruz">
                    Qué tela elegir para tus proyectos de punto de cruz
                  </Link>
                </p>
                <p>
                  •{" "}
                  <Link href="/punto-de-cruz/organizar-hilos">
                    Cómo organizar tus hilos de punto de cruz
                  </Link>
                </p>
                <p>
                  •{" "}
                  <Link href="/punto-de-cruz/organizar-proyectos">
                    Cómo organizar tus proyectos de punto de cruz
                  </Link>
                </p>
              </div>
            </div>

            <div className="article-actions" style={{ marginTop: 22 }}>
              <Link href="/punto-de-cruz/organizar-proyectos" className="article-button">
                Cómo organizar tus proyectos
              </Link>

              <Link href="/punto-de-cruz/organizar-hilos" className="article-button secondary">
                Cómo organizar tus hilos
              </Link>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}