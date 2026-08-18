import Image from "next/image";
import Link from "next/link";

type InventoryLaunchBannerProps = {
  href: string;
  priority?: boolean;
};

export default function InventoryLaunchBanner({
  href,
  priority = false,
}: InventoryLaunchBannerProps) {
  return (
    <section
      aria-label="Inventario Profesional v1.0.0"
      className="inventory-launch-banner"
    >
      <style>
        {`
          .inventory-launch-banner {
            width: 100%;
            background: #F7F3EE;
          }

          .inventory-banner-desktop {
            display: block;
          }

          .inventory-banner-mobile {
            display: none;
          }

          .inventory-banner-cta-wrap {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 18px 20px 24px;
          }

          .inventory-banner-cta {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 240px;
            padding: 13px 28px;
            border-radius: 999px;
            background: #8A3C62;
            color: #FFFFFF;
            font-size: 15px;
            font-weight: 700;
            line-height: 1.2;
            text-decoration: none;
            text-align: center;
          }

          @media (max-width: 600px) {
            .inventory-banner-desktop {
              display: none;
            }

            .inventory-banner-mobile {
              display: block;
              width: 100%;
              height: 210px;
              overflow: hidden;
            }

            .inventory-banner-cta-wrap {
              padding: 17px 16px 22px;
            }

            .inventory-banner-cta {
              width: min(100%, 280px);
              min-width: 0;
              padding: 13px 20px;
            }
          }
        `}
      </style>

      <div className="inventory-banner-desktop">
        <Image
          src="/images/inventario/banner-inventario-profesional-v1-0-0.png"
          alt="Banner de Inventario Profesional v1.0.0 con logo de Bordando con Fru, hilos organizados y el lema Tu inventario evoluciona contigo."
          width={1920}
          height={600}
          priority={priority}
          sizes="100vw"
          style={{
            display: "block",
            width: "100%",
            height: "auto",
          }}
        />
      </div>

      <div className="inventory-banner-mobile">
        <Image
            src="/images/inventario/banner-inventario-profesional-v1-0-0.png"
            alt="Banner de Inventario Profesional v1.0.0 con logo de Bordando con Fru, hilos organizados y el lema Tu inventario evoluciona contigo."
            width={1920}
            height={600}
            priority={priority}
            sizes="672px"
            style={{
            display: "block",
            width: "auto",
            height: "210px",
            maxWidth: "none",
            }}
        />
        </div>

      <div className="inventory-banner-cta-wrap">
        <Link
          href={href}
          className="inventory-banner-cta"
        >
          Descubrir la aplicación
        </Link>
      </div>
    </section>
  );
}