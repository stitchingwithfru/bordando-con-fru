import type { Metadata } from "next";
import Link from "next/link";
import ThreadEquivalenceDownloadForm from "@/components/ThreadEquivalenceDownloadForm";

export const metadata: Metadata = {
  title: "Punto de cruz: organización, herramientas y consejos | Bordando con Fru",
  description:
    "Consejos de punto de cruz para organizar proyectos, controlar avances, ordenar hilos y disfrutar más de tus labores.",
  openGraph: {
    title: "Punto de cruz: organización, herramientas y consejos | Bordando con Fru",
    description:
      "Ideas, guías y herramientas para organizar tus proyectos de punto de cruz, tus hilos y tus avances.",
    url: "https://stitchingwithfru.com/punto-de-cruz",
    siteName: "Bordando con Fru",
    locale: "es_ES",
    type: "website",
  },
};

const articles = [
  {
    title: "Qué necesitas para empezar en punto de cruz",
    description:
      "Una guía básica para preparar tus primeras labores: tela, hilos, aguja, patrón y consejos para empezar sin agobios.",
    href: "/punto-de-cruz/empezar-punto-de-cruz",
    tag: "Primeros pasos",
  },
  {
    title: "Diferencias entre Aida, lino y Evenweave: qué tela elegir para punto de cruz",
    description:
      "Una guía sencilla para entender las telas más habituales de punto de cruz y escoger la mejor opción según tu proyecto.",
    href: "/punto-de-cruz/telas-punto-de-cruz",
    tag: "Materiales",
  },
  {
    title: "Cómo organizar tus hilos de punto de cruz sin complicarte",
    description:
      "Ideas prácticas para ordenar madejas, bobinas, restos y referencias, evitar compras repetidas y preparar mejor tus proyectos.",
    href: "/punto-de-cruz/organizar-hilos",
    tag: "Organización",
  },
  {
    title: "Cómo organizar tus proyectos de punto de cruz y no perder el seguimiento de tus avances",
    description:
      "Una guía práctica para tener claro qué estás bordando, cuánto has avanzado y cómo seguir disfrutando del proceso sin agobios.",
    href: "/punto-de-cruz/organizar-proyectos",
    tag: "Organización",
  },
  {
    title: "Errores comunes en punto de cruz y cómo evitarlos",
    description:
      "Errores frecuentes al bordar y consejos prácticos para prevenirlos sin perder el disfrute del proceso.",
    href: "/punto-de-cruz/errores-comunes-punto-de-cruz",
    tag: "Consejos",
  },
];

const tools = [
  {
    title: "Sistema de Seguimiento de Punto de Cruz",
    description:
      "Una herramienta digital para registrar tus cruces bordadas, consultar avances y llevar mejor el control de tus proyectos.",
    href: "/herramientas/seguimiento",
  },
  {
    title: "Sistema de Inventario Profesional",
    description:
      "Un sistema para organizar tus hilos y materiales de punto de cruz dentro del entorno Google.",
    href: "/herramientas/inventario",
  },
];

export default function PuntoDeCruzPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#403A36] pt-12 pb-24">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <style>
          {`
            .cross-stitch-hero {
              max-width: 980px;
              margin: 0 auto 64px auto;
              background: linear-gradient(135deg, #EFE5DE 0%, #FCFAF7 100%);
              border: 1px solid #E8DED8;
              border-radius: 34px;
              padding: 42px 34px;
              box-shadow: 0 12px 30px rgba(64, 58, 54, 0.06);
              text-align: center;
            }

            .cross-stitch-kicker {
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

            .cross-stitch-title {
              margin: 0 0 16px 0;
              font-family: Georgia, serif;
              font-size: 46px;
              line-height: 1.05;
              color: #403A36;
            }

            .cross-stitch-intro {
              max-width: 760px;
              margin: 0 auto;
              color: #6F655F;
              font-size: 18px;
              line-height: 1.7;
            }

            .cross-stitch-section {
              max-width: 980px;
              margin: 0 auto 64px auto;
            }

            .cross-stitch-section-header {
              text-align: center;
              margin-bottom: 26px;
            }

            .cross-stitch-section-title {
              margin: 0 0 10px 0;
              font-family: Georgia, serif;
              font-size: 36px;
              line-height: 1.1;
              color: #403A36;
            }

            .cross-stitch-section-text {
              max-width: 700px;
              margin: 0 auto;
              color: #6F655F;
              font-size: 16px;
              line-height: 1.65;
            }

            .cross-stitch-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
              gap: 20px;
            }

            .cross-stitch-card {
              background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
              border: 1px solid #E8DED8;
              border-radius: 28px;
              padding: 24px;
              box-shadow: 0 10px 26px rgba(64, 58, 54, 0.055);
            }

            .cross-stitch-tag {
              display: inline-flex;
              border-radius: 999px;
              padding: 6px 11px;
              background: #E9F0E6;
              color: #4D6249;
              font-size: 11px;
              font-weight: 700;
              letter-spacing: 0.1em;
              text-transform: uppercase;
              margin-bottom: 12px;
            }

            .cross-stitch-card-title {
              margin: 0 0 10px 0;
              font-family: Georgia, serif;
              font-size: 25px;
              line-height: 1.15;
              color: #403A36;
            }

            .cross-stitch-card-text {
              margin: 0 0 18px 0;
              color: #6F655F;
              font-size: 14.5px;
              line-height: 1.6;
            }

            .cross-stitch-link {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              border-radius: 999px;
              padding: 11px 16px;
              background: #403A36;
              color: #FFFFFF;
              font-size: 14px;
              font-weight: 700;
              text-decoration: none;
            }

            .cross-stitch-link.secondary {
              background: #FFFFFF;
              color: #403A36;
              border: 1px solid #E8DED8;
            }

            @media (max-width: 600px) {
              .cross-stitch-hero {
                border-radius: 28px;
                padding: 32px 22px;
                margin-bottom: 52px;
              }

              .cross-stitch-title {
                font-size: 36px;
              }

              .cross-stitch-intro {
                font-size: 16px;
                line-height: 1.65;
              }

              .cross-stitch-section {
                margin-bottom: 52px;
              }

              .cross-stitch-section-title {
                font-size: 30px;
              }

              .cross-stitch-card {
                border-radius: 24px;
                padding: 20px;
              }
            }
          `}
        </style>

        <section className="cross-stitch-hero">
          <div className="cross-stitch-kicker">🧵 Punto de cruz</div>

          <h1 className="cross-stitch-title">
            Punto de cruz: organización, herramientas y consejos
          </h1>

          <p className="cross-stitch-intro">
            Un espacio para reunir ideas prácticas sobre punto de cruz: cómo organizar tus proyectos,
            controlar tus avances, ordenar tus materiales y disfrutar más del proceso de bordado.
          </p>
        </section>

        <section className="cross-stitch-section">
          <div className="cross-stitch-section-header">
            <h2 className="cross-stitch-section-title">
              Guías y consejos de punto de cruz
            </h2>

            <p className="cross-stitch-section-text">
              Artículos pensados para ayudarte a llevar tus labores con más claridad, especialmente si tienes varios proyectos empezados o quieres controlar mejor tu progreso.
            </p>
          </div>

          <div className="cross-stitch-grid">
            {articles.map((article) => (
              <article key={article.href} className="cross-stitch-card">
                <div className="cross-stitch-tag">
                  {article.tag}
                </div>

                <h3 className="cross-stitch-card-title">
                  {article.title}
                </h3>

                <p className="cross-stitch-card-text">
                  {article.description}
                </p>

                <Link href={article.href} className="cross-stitch-link">
                  Leer artículo →
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="cross-stitch-section">
          <div className="cross-stitch-section-header">
            <h2 className="cross-stitch-section-title">
              Herramientas para organizar tus labores
            </h2>

            <p className="cross-stitch-section-text">
              Además de los consejos, también encontrarás herramientas digitales creadas para facilitar la organización de proyectos, avances y materiales.
            </p>
          </div>

          <div className="cross-stitch-grid">
            {tools.map((tool) => (
              <article key={tool.href} className="cross-stitch-card">
                <div className="cross-stitch-tag">
                  Herramienta digital
                </div>

                <h3 className="cross-stitch-card-title">
                  {tool.title}
                </h3>

                <p className="cross-stitch-card-text">
                  {tool.description}
                </p>

                <Link href={tool.href} className="cross-stitch-link secondary">
                  Ver herramienta →
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section
          style={{
            maxWidth: "920px",
            margin: "56px auto 0 auto",
            display: "grid",
            gap: "20px",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%)",
              border: "1px solid #E8DED8",
              borderRadius: "30px",
              padding: "28px",
              boxShadow: "0 10px 28px rgba(64, 58, 54, 0.06)",
            }}
          >
            <h2
              style={{
                margin: "0 0 12px 0",
                fontFamily: "Georgia, serif",
                fontSize: "30px",
                lineHeight: "1.12",
                color: "#403A36",
              }}
            >
              Recurso gratuito para preparar tus proyectos
            </h2>

            <p
              style={{
                margin: 0,
                color: "#6F655F",
                fontSize: "16px",
                lineHeight: "1.7",
              }}
            >
              Si quieres tener a mano una referencia rápida para sustituir colores y
              comparar marcas, puedes descargar gratis la guía de equivalencias de
              hilos para punto de cruz. También puede servirte como apoyo si estás
              organizando tus hilos o preparando los materiales de un nuevo proyecto.
            </p>

            <div style={{ marginTop: "18px" }}>
              <Link href="/punto-de-cruz/organizar-hilos" className="cross-stitch-link secondary">
                Ver guía para organizar hilos →
              </Link>
            </div>
          </div>

          <ThreadEquivalenceDownloadForm />
        </section>
      </div>
    </main>
  );
}