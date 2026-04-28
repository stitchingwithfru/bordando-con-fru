import Link from "next/link";
import {
  getLatestYouTubeVideos,
  getWebsiteData,
  formatShortDate,
} from "@/lib/phase1-data";

export default async function HomeNewsSection() {
  const [videos, websiteData] = await Promise.all([
    getLatestYouTubeVideos(),
    getWebsiteData(),
  ]);

  const latestVideo = videos[0];
  const previousVideos = videos.slice(1, 3);
  const productNews = websiteData.productNews.slice(0, 2);
  const currentReading = websiteData.currentReading;
  const nextReading = websiteData.nextReading;

  return (
    <>
      <style>
        {`
          .home-news-section {
            max-width: 1120px;
            margin: 0 auto;
            padding: 72px 20px;
          }

          .home-news-header {
            text-align: center;
            margin-bottom: 34px;
          }

          .home-news-label {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #F3ECE7;
            color: #8A7C74;
            border: 1px solid #E8DED8;
            border-radius: 999px;
            padding: 7px 14px;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            margin-bottom: 14px;
          }

          .home-news-title {
            margin: 0;
            font-family: Georgia, serif;
            font-size: 42px;
            line-height: 1.08;
            color: #403A36;
          }

          .home-news-subtitle {
            max-width: 660px;
            margin: 14px auto 0 auto;
            color: #8A7C74;
            font-size: 17px;
            line-height: 1.65;
          }

          .home-news-grid {
            display: grid;
            grid-template-columns: 1.2fr 0.8fr;
            gap: 24px;
            align-items: stretch;
          }

          .home-news-card {
            background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
            border: 1px solid #E8DED8;
            border-radius: 30px;
            box-shadow: 0 10px 28px rgba(64, 58, 54, 0.07);
            overflow: hidden;
          }

          .home-news-video-main {
            padding: 24px;
          }

          .home-news-video-thumb {
            width: 100%;
            aspect-ratio: 16 / 9;
            object-fit: cover;
            border-radius: 22px;
            border: 1px solid #E8DED8;
            display: block;
            margin-bottom: 18px;
          }

          .home-news-card-label {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            background: #F3ECE7;
            color: #8A7C74;
            border-radius: 999px;
            padding: 6px 12px;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            margin-bottom: 12px;
          }

          .home-news-video-title {
            margin: 0 0 10px 0;
            font-family: Georgia, serif;
            font-size: 30px;
            line-height: 1.15;
            color: #403A36;
          }

          .home-news-meta {
            margin: 0 0 18px 0;
            color: #8A7C74;
            font-size: 14px;
          }

          .home-news-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: #403A36;
            color: #FFFFFF;
            border-radius: 999px;
            padding: 12px 20px;
            font-size: 14px;
            font-weight: 700;
            text-decoration: none;
            box-shadow: 0 8px 18px rgba(64, 58, 54, 0.14);
          }

          .home-news-side {
            display: grid;
            gap: 18px;
          }

          .home-news-box {
            padding: 22px;
          }

          .home-news-small-video {
            display: grid;
            grid-template-columns: 116px 1fr;
            gap: 14px;
            align-items: center;
            padding: 14px;
            border-radius: 22px;
            background: #F7F3EE;
            border: 1px solid #E8DED8;
            text-decoration: none;
            color: inherit;
          }

          .home-news-small-video img {
            width: 116px;
            aspect-ratio: 16 / 9;
            object-fit: cover;
            border-radius: 14px;
            display: block;
          }

          .home-news-small-video-title {
            margin: 0 0 6px 0;
            font-family: Georgia, serif;
            font-size: 17px;
            line-height: 1.2;
            color: #403A36;
          }

          .home-news-small-video-date {
            margin: 0;
            color: #8A7C74;
            font-size: 13px;
          }

          .home-news-list {
            display: grid;
            gap: 12px;
          }

          .home-news-item {
            display: block;
            background: #F7F3EE;
            border: 1px solid #E8DED8;
            border-radius: 18px;
            padding: 14px;
            text-decoration: none;
            color: inherit;
          }

          .home-news-item-title {
            margin: 0 0 6px 0;
            font-family: Georgia, serif;
            font-size: 18px;
            line-height: 1.2;
            color: #403A36;
          }

          .home-news-item-text {
            margin: 0;
            color: #8A7C74;
            font-size: 14px;
            line-height: 1.5;
          }

          .home-news-club {
            display: grid;
            grid-template-columns: 72px 1fr;
            gap: 14px;
            align-items: center;
            background: #F7F3EE;
            border: 1px solid #E8DED8;
            border-radius: 18px;
            padding: 14px;
            text-decoration: none;
            color: inherit;
          }

          .home-news-club img {
            width: 72px;
            height: 72px;
            object-fit: cover;
            border-radius: 999px;
            border: 1px solid #E8DED8;
          }

          .home-news-empty {
            color: #8A7C74;
            font-size: 14px;
            line-height: 1.5;
            margin: 0;
          }

          @media (max-width: 900px) {
            .home-news-grid {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 700px) {
            .home-news-section {
              padding: 54px 18px;
            }

            .home-news-title {
              font-size: 34px;
            }

            .home-news-subtitle {
              font-size: 16px;
            }

            .home-news-video-main {
              padding: 18px;
            }

            .home-news-video-title {
              font-size: 25px;
            }

            .home-news-box {
              padding: 18px;
            }

            .home-news-small-video {
              grid-template-columns: 92px 1fr;
              gap: 12px;
            }

            .home-news-small-video img {
              width: 92px;
            }

            .home-news-small-video-title {
              font-size: 16px;
            }
          }

          @media (max-width: 430px) {
            .home-news-section {
              padding-left: 14px;
              padding-right: 14px;
            }

            .home-news-title {
              font-size: 30px;
            }

            .home-news-small-video {
              grid-template-columns: 1fr;
            }

            .home-news-small-video img {
              width: 100%;
            }

            .home-news-club {
              grid-template-columns: 58px 1fr;
            }

            .home-news-club img {
              width: 58px;
              height: 58px;
            }
          }
        `}
      </style>

      <section className="home-news-section">
        <div className="home-news-header">
          <div className="home-news-label">✨ Novedades</div>
          <h2 className="home-news-title">Últimas novedades</h2>
          <p className="home-news-subtitle">
            Vídeos recientes, avisos del Club de Lectura y novedades de las herramientas de Bordando con Fru.
          </p>
        </div>

        <div className="home-news-grid">
          <div className="home-news-card home-news-video-main">
            {latestVideo ? (
              <>
                <img
                  src={latestVideo.thumbnail}
                  alt={latestVideo.title}
                  className="home-news-video-thumb"
                />

                <div className="home-news-card-label">▶ Último vídeo</div>

                <h3 className="home-news-video-title">
                  {latestVideo.title}
                </h3>

                <p className="home-news-meta">
                  Publicado el {formatShortDate(latestVideo.published)}
                </p>

                <a
                  href={latestVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-news-button"
                >
                  Ver vídeo →
                </a>
              </>
            ) : (
              <p className="home-news-empty">
                Todavía no se han podido cargar los vídeos recientes.
              </p>
            )}
          </div>

          <div className="home-news-side">
            <div className="home-news-card home-news-box">
              <div className="home-news-card-label">🎥 Vídeos anteriores</div>

              <div className="home-news-list">
                {previousVideos.length > 0 ? (
                  previousVideos.map((video) => (
                    <a
                      key={video.id}
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="home-news-small-video"
                    >
                      <img src={video.thumbnail} alt={video.title} />
                      <div>
                        <h3 className="home-news-small-video-title">
                          {video.title}
                        </h3>
                        <p className="home-news-small-video-date">
                          {formatShortDate(video.published)}
                        </p>
                      </div>
                    </a>
                  ))
                ) : (
                  <p className="home-news-empty">No hay vídeos anteriores disponibles.</p>
                )}
              </div>
            </div>

            <div className="home-news-card home-news-box">
              <div className="home-news-card-label">🧵 Productos</div>

              <div className="home-news-list">
                {productNews.length > 0 ? (
                  productNews.map((item) => (
                    <a
                      key={item.id}
                      href={item.url || "#"}
                      className="home-news-item"
                    >
                      <h3 className="home-news-item-title">{item.titulo}</h3>
                      <p className="home-news-item-text">{item.texto}</p>
                    </a>
                  ))
                ) : (
                  <p className="home-news-empty">
                    Próximamente aparecerán aquí novedades de productos.
                  </p>
                )}
              </div>
            </div>

            <div className="home-news-card home-news-box">
              <div className="home-news-card-label">📚 Club de Lectura</div>

              <Link href="/club-de-lectura" className="home-news-club">
                <img
                  src="/images/club-de-lectura.jpeg"
                  alt="Club de Lectura"
                />
                <div>
                  <h3 className="home-news-item-title">
                    {currentReading
                      ? `Lectura actual: ${currentReading.titulo}`
                      : nextReading
                        ? `Próxima lectura: ${nextReading.titulo}`
                        : "Club de Lectura"}
                  </h3>
                  <p className="home-news-item-text">
                    Ver lecturas, reto anual y recomendaciones →
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}