import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Diferencias entre Aida, lino y Evenweave | Bordando con Fru",
  description:
    "Guía para elegir tela de punto de cruz: diferencias entre Aida, lino y Evenweave, consejos para principiantes y cómo escoger la mejor opción para cada proyecto.",
  openGraph: {
    title: "Diferencias entre Aida, lino y Evenweave | Bordando con Fru",
    description:
      "Aprende qué tela elegir para punto de cruz según tu nivel, el tipo de proyecto y el acabado que buscas.",
    url: "https://stitchingwithfru.com/punto-de-cruz/telas-punto-de-cruz",
    siteName: "Bordando con Fru",
    locale: "es_ES",
    type: "article",
  },
};

export default function TelasPuntoDeCruzPage() {
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

            .article-comparison {
              display: grid;
              grid-template-columns: repeat(3, minmax(0, 1fr));
              gap: 16px;
              margin-top: 18px;
            }

            .article-comparison-card {
              background: #F7F3EE;
              border: 1px solid #E8DED8;
              border-radius: 22px;
              padding: 18px;
            }

            .article-comparison-title {
              margin: 0 0 8px 0;
              font-family: Georgia, serif;
              font-size: 22px;
              line-height: 1.15;
              color: #403A36;
            }

            .article-comparison-text {
              margin: 0;
              color: #6F655F;
              font-size: 14.5px;
              line-height: 1.55;
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

            .article-count-visual {
                display: grid;
                grid-template-columns: repeat(2, minmax(0, 1fr));
                gap: 16px;
                margin: 22px 0;
                }

                .article-count-box {
                background: #F7F3EE;
                border: 1px solid #E8DED8;
                border-radius: 22px;
                padding: 18px;
                }

                .article-count-title {
                margin: 0 0 12px 0;
                font-family: Georgia, serif;
                font-size: 22px;
                line-height: 1.15;
                color: #403A36;
                }

                .article-count-text {
                margin: 12px 0 0 0;
                color: #6F655F;
                font-size: 14.5px;
                line-height: 1.55;
                }

                .count-grid {
                display: grid;
                width: 148px;
                height: 148px;
                background: #FFFFFF;
                border: 1px solid #E8DED8;
                border-radius: 16px;
                padding: 8px;
                gap: 3px;
                }

                .count-grid span {
                display: block;
                background: #D8B7B0;
                border-radius: 3px;
                }

                .count-grid-14 {
                grid-template-columns: repeat(7, 1fr);
                }

                .count-grid-18 {
                grid-template-columns: repeat(9, 1fr);
                }

                .article-equivalence-card {
                background: #F7F3EE;
                border: 1px solid #E8DED8;
                border-radius: 22px;
                padding: 18px;
                margin: 22px 0;
                }

                .article-equivalence-table {
                display: grid;
                gap: 8px;
                margin-top: 14px;
                }

                .article-equivalence-row {
                display: grid;
                grid-template-columns: 1.1fr 0.9fr 1fr;
                gap: 10px;
                align-items: center;
                background: #FFFFFF;
                border: 1px solid #E8DED8;
                border-radius: 14px;
                padding: 11px 12px;
                color: #6F655F;
                font-size: 14px;
                line-height: 1.4;
                }

                .article-equivalence-row.header {
                background: #E9F0E6;
                color: #4D6249;
                font-weight: 700;
                }

                .article-equivalence-row span:first-child {
                font-weight: 700;
                color: #403A36;
                }

            @media (max-width: 800px) {
              .article-comparison {
                grid-template-columns: 1fr;
              }

              .article-count-visual {
                grid-template-columns: 1fr;
                }

                .article-equivalence-row {
                grid-template-columns: 1fr;
                gap: 5px;
                }
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
          <div className="article-kicker">🧵 Telas para bordar</div>

          <h1 className="article-title">
            Diferencias entre Aida, lino y Evenweave: qué tela elegir para punto de cruz
          </h1>

          <p className="article-intro">
            Elegir tela puede cambiar mucho la experiencia de bordar. Aida, lino y Evenweave son opciones muy habituales en punto de cruz, pero cada una tiene una forma distinta de trabajarse y un acabado diferente.
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
              Por qué es importante elegir bien la tela
            </h2>

            <p className="article-text">
              La tela es la base de cualquier proyecto de punto de cruz. No solo influye en el aspecto final de la labor, también afecta a la comodidad al bordar, a la facilidad para contar las puntadas y al nivel de concentración que necesitarás.
            </p>

            <p className="article-text">
              Si estás empezando, una tela clara y fácil de contar puede hacer que disfrutes mucho más. Si ya tienes experiencia, quizá te apetezca probar telas con un acabado más delicado o con una textura diferente.
            </p>
          </article>

          <article className="article-card">
            <h2 className="article-section-title">
              Aida: la opción más sencilla para empezar
            </h2>

            <p className="article-text">
              La tela Aida es una de las más utilizadas en punto de cruz, especialmente cuando estás aprendiendo. Tiene una cuadrícula muy visible, con agujeros claros que facilitan mucho contar las puntadas.
            </p>

            <div className="article-list">
              <p>• Es fácil de ver y de contar.</p>
              <p>• Ayuda a mantener las cruces regulares.</p>
              <p>• Es cómoda para principiantes.</p>
              <p>• Suele usarse bordando una cruz por cada cuadrito.</p>
              <p>• Es muy práctica para diseños sencillos, regalos y primeras labores.</p>
            </div>

            <div className="article-callout">
              <h3 className="article-callout-title">
                Cuándo elegir Aida
              </h3>

              <p className="article-callout-text">
                Elige Aida si estás empezando, si quieres bordar sin complicarte o si buscas una tela clara, cómoda y fácil de seguir.
              </p>
            </div>
          </article>

          <article className="article-card">
            <h2 className="article-section-title">
              Lino: un acabado más delicado y natural
            </h2>

            <p className="article-text">
              El lino tiene un acabado muy bonito, natural y elegante, pero puede resultar más complicado al principio. A diferencia de la Aida, la trama no siempre es tan uniforme visualmente, y normalmente se borda contando hilos.
            </p>

            <p className="article-text">
              Muchas personas lo eligen cuando buscan un resultado más fino o más artesanal. Eso sí, requiere más atención al contar y algo más de práctica para sentirse cómoda.
            </p>

            <div className="article-list">
              <p>• Tiene un aspecto más natural y menos cuadriculado.</p>
              <p>• Puede presentar pequeñas irregularidades en la trama.</p>
              <p>• Suele bordarse contando dos hilos de tela.</p>
              <p>• Requiere más atención que la Aida.</p>
              <p>• Da un acabado muy especial en diseños delicados.</p>
            </div>

            <div className="article-callout">
              <h3 className="article-callout-title">
                Cuándo elegir lino
              </h3>

              <p className="article-callout-text">
                El lino puede ser una buena opción si ya tienes algo de experiencia y quieres un acabado más natural, elegante o tradicional.
              </p>
            </div>
          </article>

          <article className="article-card">
            <h2 className="article-section-title">
              Evenweave: una alternativa uniforme y versátil
            </h2>

            <p className="article-text">
              Evenweave es una tela de trama uniforme. Visualmente puede parecer más delicada que la Aida, pero suele ser más regular que algunos linos. Por eso muchas bordadoras la ven como un punto intermedio entre la comodidad y el acabado fino.
            </p>

            <div className="article-list">
              <p>• Tiene una trama más uniforme.</p>
              <p>• Permite un acabado más fino que la Aida.</p>
              <p>• Suele bordarse contando dos hilos.</p>
              <p>• Es versátil para muchos tipos de diseños.</p>
              <p>• Puede ser una buena transición antes de probar lino.</p>
            </div>

            <div className="article-callout">
              <h3 className="article-callout-title">
                Cuándo elegir Evenweave
              </h3>

              <p className="article-callout-text">
                Elige Evenweave si quieres probar una tela más fina que Aida, pero buscas una trama más regular y cómoda que algunos linos.
              </p>
            </div>
          </article>

          <article className="article-card soft">
            <h2 className="article-section-title">
              Comparativa rápida: Aida, lino y Evenweave
            </h2>

            <p className="article-text">
              Si tienes dudas, esta comparación puede ayudarte a decidir qué tela encaja mejor con tu proyecto y con tu nivel de experiencia.
            </p>

            <div className="article-comparison">
              <div className="article-comparison-card">
                <h3 className="article-comparison-title">Aida</h3>
                <p className="article-comparison-text">
                  Ideal para empezar. Fácil de contar, cómoda y muy práctica para proyectos sencillos o cuando quieres bordar sin complicarte.
                </p>
              </div>

              <div className="article-comparison-card">
                <h3 className="article-comparison-title">Lino</h3>
                <p className="article-comparison-text">
                  Más delicado y natural. Requiere más práctica, pero ofrece un acabado elegante y especial.
                </p>
              </div>

              <div className="article-comparison-card">
                <h3 className="article-comparison-title">Evenweave</h3>
                <p className="article-comparison-text">
                  Trama uniforme y acabado fino. Buena opción intermedia para seguir avanzando después de Aida.
                </p>
              </div>
            </div>
          </article>

          <article className="article-card">
            <h2 className="article-section-title">
                Qué significa el count de una tela
            </h2>

            <p className="article-text">
                El <strong>count</strong> indica cuántos cuadritos o hilos hay en una pulgada de tela. En punto de cruz, este número es importante porque determina el tamaño final de las cruces y, por tanto, el tamaño final del diseño bordado.
            </p>

            <p className="article-text">
                Cuanto más alto es el count, más pequeñas quedan las cruces. Por ejemplo, una Aida 14 ct tiene 14 cruces por pulgada, mientras que una Aida 18 ct tiene 18 cruces por pulgada. Eso significa que, con el mismo patrón, el bordado quedará más pequeño en 18 ct que en 14 ct.
            </p>

            <div className="article-count-visual">
                <div className="article-count-box">
                <h3 className="article-count-title">Aida 14 ct</h3>
                <div className="count-grid count-grid-14">
                    {Array.from({ length: 49 }).map((_, index) => (
                    <span key={index} />
                    ))}
                </div>
                <p className="article-count-text">
                    Cruces más grandes y fáciles de ver. Muy cómoda para empezar.
                </p>
                </div>

                <div className="article-count-box">
                <h3 className="article-count-title">Aida 18 ct</h3>
                <div className="count-grid count-grid-18">
                    {Array.from({ length: 81 }).map((_, index) => (
                    <span key={index} />
                    ))}
                </div>
                <p className="article-count-text">
                    Cruces más pequeñas. El diseño ocupa menos espacio y se ve más fino.
                </p>
                </div>
            </div>

            <p className="article-text">
                En lino y Evenweave suele aparecer una pequeña diferencia: muchas veces no se borda sobre un solo hilo, sino <strong>sobre dos hilos de tela</strong>. Por eso, una tela de 28 ct bordada sobre dos hilos equivale aproximadamente a una Aida 14 ct.
            </p>

            <div className="article-equivalence-card">
                <h3 className="article-callout-title">
                Equivalencias habituales
                </h3>

                <div className="article-equivalence-table">
                <div className="article-equivalence-row header">
                    <span>Tela</span>
                    <span>Cómo se borda</span>
                    <span>Equivalencia aproximada</span>
                </div>

                <div className="article-equivalence-row">
                    <span>Aida 14 ct</span>
                    <span>1 cuadrito</span>
                    <span>14 cruces por pulgada</span>
                </div>

                <div className="article-equivalence-row">
                    <span>Aida 16 ct</span>
                    <span>1 cuadrito</span>
                    <span>16 cruces por pulgada</span>
                </div>

                <div className="article-equivalence-row">
                    <span>Aida 18 ct</span>
                    <span>1 cuadrito</span>
                    <span>18 cruces por pulgada</span>
                </div>

                <div className="article-equivalence-row">
                    <span>Evenweave / lino 28 ct</span>
                    <span>sobre 2 hilos</span>
                    <span>como Aida 14 ct</span>
                </div>

                <div className="article-equivalence-row">
                    <span>Evenweave / lino 32 ct</span>
                    <span>sobre 2 hilos</span>
                    <span>como Aida 16 ct</span>
                </div>

                <div className="article-equivalence-row">
                    <span>Evenweave / lino 36 ct</span>
                    <span>sobre 2 hilos</span>
                    <span>como Aida 18 ct</span>
                </div>

                <div className="article-equivalence-row">
                    <span>Evenweave / lino 40 ct</span>
                    <span>sobre 2 hilos</span>
                    <span>como Aida 20 ct</span>
                </div>
                </div>
            </div>

            <div className="article-callout">
                <h3 className="article-callout-title">
                Cómo calcular el tamaño final de un bordado
                </h3>

                <p className="article-callout-text">
                    Divide el número de cruces del patrón entre el count efectivo de la tela, es decir, entre el número de cruces que caben en una pulgada. Después convierte las pulgadas a centímetros y recuerda añadir margen extra alrededor del diseño para poder rematar, enmarcar o montar la labor. Por ejemplo, si un diseño mide 140 cruces de ancho y lo bordas en Aida 14 ct, el ancho bordado será aproximadamente 10 pulgadas, es decir, unos 25,4 cm, sin contar márgenes.
                    </p>
            </div>

            <div className="article-list">
                <p>• 140 cruces ÷ 14 ct = 10 pulgadas.</p>
                <p>• 10 pulgadas × 2,54 = 25,4 cm.</p>
                <p>• En Aida 18 ct, ese mismo diseño mediría 140 ÷ 18 = 7,7 pulgadas, unos 19,7 cm.</p>
            </div>

            <div className="article-callout">
                <h3 className="article-callout-title">
                    Si quieres calcularlo sin hacer cuentas
                </h3>

                <p className="article-callout-text">
                    Cuando empiezas a trabajar con distintos counts, márgenes de tela y tamaños de patrón, puede resultar más cómodo usar una calculadora preparada para ello. Dentro del Sistema de Inventario Profesional existe un complemento de Calculadora de Tela e Hilos pensado para ayudarte a calcular medidas y materiales antes de empezar un proyecto.
                </p>

                <div className="article-actions" style={{ marginTop: 18 }}>
                    <Link href="/herramientas/inventario" className="article-button secondary">
                    Ver complemento de Calculadora de Tela e Hilos
                    </Link>
                </div>
                </div>

            <div className="article-callout">
                <h3 className="article-callout-title">
                Consejo práctico
                </h3>

                <p className="article-callout-text">
                Si estás empezando, no te compliques demasiado con los counts. Elige una tela cómoda para tus ojos y tus manos. Una Aida 14 ct o 16 ct suele ser una opción muy amable para primeras labores.
                </p>
            </div>
            </article>

          <article className="article-card">
            <h2 className="article-section-title">
              Cómo elegir la tela según tu proyecto
            </h2>

            <p className="article-text">
              No todos los proyectos piden la misma tela. Un diseño pequeño y sencillo puede quedar genial en Aida, mientras que un diseño más delicado puede lucir mucho en lino o Evenweave.
            </p>

            <div className="article-list">
              <p>• Para empezar: Aida clara y de count cómodo.</p>
              <p>• Para regalos rápidos: Aida o Evenweave fácil de trabajar.</p>
              <p>• Para diseños delicados: lino o Evenweave.</p>
              <p>• Para proyectos grandes: una tela que puedas ver bien durante muchas horas.</p>
              <p>• Para bordar con poca luz: mejor evitar telas demasiado pequeñas o difíciles de contar.</p>
            </div>
          </article>

          <article className="article-card">
            <h2 className="article-section-title">
              Errores comunes al elegir tela
            </h2>

            <p className="article-text">
              A veces elegimos una tela porque nos parece preciosa, pero luego resulta incómoda para el proyecto o para nuestro nivel de experiencia. No pasa nada: también se aprende probando.
            </p>

            <div className="article-list">
              <p>• Elegir una tela demasiado pequeña o difícil de ver.</p>
              <p>• No comprobar el tamaño final del diseño antes de cortar la tela.</p>
              <p>• No dejar margen suficiente alrededor del bordado.</p>
              <p>• Empezar con lino muy fino sin tener práctica contando hilos.</p>
              <p>• Escoger un color de tela que dificulta ver los agujeros.</p>
            </div>
          </article>

                    <article className="article-card soft">
            <h2 className="article-section-title">
              Qué tela elegir si estás empezando
            </h2>

            <p className="article-text">
              Si estás empezando en punto de cruz, mi recomendación es sencilla: empieza con Aida. Te permitirá ver bien dónde colocar cada puntada, ganar confianza y terminar tus primeras labores con menos frustración.
            </p>

            <p className="article-text">
              Más adelante, cuando ya te sientas cómoda leyendo patrones y contando puntos, puedes probar Evenweave o lino para descubrir otros acabados.
            </p>

            <div className="article-callout">
              <h3 className="article-callout-title">
                También te puede interesar
              </h3>

              <div className="article-list">
                <p>
                  •{" "}
                  <Link href="/punto-de-cruz/empezar-punto-de-cruz">
                    Qué necesitas para empezar en punto de cruz
                  </Link>
                </p>
                <p>
                  •{" "}
                  <Link href="/punto-de-cruz/errores-comunes-punto-de-cruz">
                    Errores comunes al hacer punto de cruz y cómo evitarlos
                  </Link>
                </p>
                <p>
                  •{" "}
                  <Link href="/herramientas/inventario">
                    Sistema de inventario y calculadora de tela e hilos
                  </Link>
                </p>
              </div>
            </div>

            <div className="article-actions" style={{ marginTop: 22 }}>
              <Link href="/punto-de-cruz/empezar-punto-de-cruz" className="article-button">
                Guía para empezar en punto de cruz
              </Link>

              <Link href="/punto-de-cruz" className="article-button secondary">
                Ver más contenidos
              </Link>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}