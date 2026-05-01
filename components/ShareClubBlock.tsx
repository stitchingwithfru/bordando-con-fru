"use client";

import { useState } from "react";

const CLUB_URL = "https://www.stitchingwithfru.com/club-de-lectura";
const SHARE_TEXT = "Únete al Club de Lectura de Bordando con Fru";

export default function ShareClubBlock() {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(CLUB_URL);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2500);
    } catch {
      setCopied(false);
    }
  }

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT}: ${CLUB_URL}`)}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(CLUB_URL)}&text=${encodeURIComponent(SHARE_TEXT)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(CLUB_URL)}`;

  return (
    <>
      <style>
        {`
          .share-club-card {
            max-width: 980px;
            margin: 72px auto 0 auto;
            background: linear-gradient(135deg, #FFFFFF 0%, #FCFAF7 100%);
            border: 1px solid #E8DED8;
            border-radius: 30px;
            padding: 30px;
            box-shadow: 0 10px 28px rgba(64, 58, 54, 0.06);
          }

          .share-club-inner {
            display: grid;
            grid-template-columns: 70px 1fr;
            gap: 22px;
            align-items: start;
          }

          .share-club-icon {
            width: 70px;
            height: 70px;
            border-radius: 24px;
            background: #F3ECE7;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            box-shadow: 0 8px 18px rgba(64, 58, 54, 0.08);
          }

          .share-club-kicker {
            display: inline-flex;
            align-items: center;
            background: #E9F0E6;
            color: #5E755C;
            border-radius: 999px;
            padding: 7px 13px;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            margin-bottom: 12px;
          }

          .share-club-title {
            margin: 0 0 10px 0;
            font-family: Georgia, serif;
            font-size: 32px;
            line-height: 1.12;
            color: #403A36;
          }

          .share-club-text {
            margin: 0 0 22px 0;
            color: #6F655F;
            font-size: 16px;
            line-height: 1.7;
            max-width: 760px;
          }

          .share-club-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }

          .share-club-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 999px;
            padding: 12px 17px;
            font-size: 14px;
            font-weight: 700;
            text-decoration: none;
            border: 1px solid #E8DED8;
            background: #F7F3EE;
            color: #403A36;
            cursor: pointer;
          }

          .share-club-button.primary {
            background: #403A36;
            color: #FFFFFF;
            border-color: #403A36;
            box-shadow: 0 8px 18px rgba(64, 58, 54, 0.14);
          }

          .share-club-message {
            margin-top: 14px;
            color: #5E755C;
            font-size: 14px;
            font-weight: 700;
          }

          @media (max-width: 700px) {
            .share-club-card {
              border-radius: 26px;
              padding: 24px 20px;
              margin-top: 56px;
            }

            .share-club-inner {
              grid-template-columns: 1fr;
              text-align: center;
              gap: 16px;
            }

            .share-club-icon {
              margin: 0 auto;
              width: 62px;
              height: 62px;
              border-radius: 22px;
              font-size: 30px;
            }

            .share-club-title {
              font-size: 28px;
            }

            .share-club-text {
              font-size: 15.5px;
              max-width: 100%;
            }

            .share-club-actions {
              flex-direction: column;
            }

            .share-club-button {
              width: 100%;
            }
          }
        `}
      </style>

      <section className="share-club-card">
        <div className="share-club-inner">
          <div className="share-club-icon">📣</div>

          <div>
            <div className="share-club-kicker">
              Comparte el Club
            </div>

            <h2 className="share-club-title">
              ¿Conoces a alguien que también disfrute leyendo?
            </h2>

            <p className="share-club-text">
              Puedes compartir esta página para que más personas descubran el Club de Lectura,
              se unan a Telegram y participen en próximas lecturas conjuntas.
            </p>

            <div className="share-club-actions">
              <button
                type="button"
                onClick={copyLink}
                className="share-club-button primary"
              >
                Copiar enlace
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="share-club-button"
              >
                WhatsApp
              </a>

              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="share-club-button"
              >
                Telegram
              </a>

              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="share-club-button"
              >
                Facebook
              </a>
            </div>

            {copied ? (
              <div className="share-club-message">
                Enlace copiado correctamente.
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}