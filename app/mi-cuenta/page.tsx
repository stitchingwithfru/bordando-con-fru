import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./LogoutButton";
import CopyActivationCodeButton from "./CopyActivationCodeButton";

export const metadata = {
  title: "Mi espacio | Bordando con Fru",
  description:
    "Zona privada para consultar tus productos, recursos y accesos de Bordando con Fru.",
};

type ProductResource = {
  id: string;
  type:
    | "google_sheet_copy"
    | "pdf"
    | "video"
    | "link";
  label: string;
  description: string | null;
  url: string | null;
  file_path: string | null;
  version: string | null;
  sort_order: number;
};

type Product = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  current_version: string | null;
  instructions: string | null;
  product_resources: ProductResource[];
};

type ProductUpdate = {
  id: string;
  title: string;
  description: string | null;
  version: string | null;
  published_at: string;
};

type ProductUpdateItem = {
  id: string;
  product_id: string;
  updated_template_url: string | null;
  updated_pdf_file_path: string | null;
  updated_video_url: string | null;
  notes: string | null;
  sort_order: number;
  product_updates:
    | ProductUpdate[]
    | ProductUpdate
    | null;
};

type InventoryDelivery = {
  id: string;
  customer_email: string;
  license_variant: string;
  activation_code: string;
  activation_status:
    | "ready"
    | "redeemed"
    | "revoked";
  created_at: string;
  updated_at: string;
  redeemed_at: string | null;
  notes: string | null;
};

type InventoryVariantDetails = {
  label: string;
  modules: string[];
};

const INVENTORY_VARIANTS: Record<
  string,
  InventoryVariantDetails
> = {
  "inventario-base": {
    label: "Edición base",
    modules: [],
  },

  "inventario-base-calculadora": {
    label: "Base + Calculadora",
    modules: [
      "Calculadora y carrito de proyectos",
    ],
  },

  "inventario-base-kits": {
    label: "Base + Kits y gráficos",
    modules: ["Kits y gráficos"],
  },

  "inventario-base-kits-calculadora": {
    label:
      "Base + Kits y gráficos + Calculadora",
    modules: [
      "Kits y gráficos",
      "Calculadora y carrito de proyectos",
    ],
  },

  "inventario-base-telas": {
    label: "Base + Telas",
    modules: ["Telas"],
  },

  "inventario-base-telas-calculadora": {
    label: "Base + Telas + Calculadora",
    modules: [
      "Telas",
      "Calculadora y carrito de proyectos",
    ],
  },

  "inventario-base-telas-kits": {
    label: "Base + Telas + Kits y gráficos",
    modules: ["Telas", "Kits y gráficos"],
  },

  "inventario-base-telas-kits-calculadora": {
    label:
      "Base + Telas + Kits y gráficos + Calculadora",
    modules: [
      "Telas",
      "Kits y gráficos",
      "Calculadora y carrito de proyectos",
    ],
  },
};

function getUpdateFromItem(
  item: ProductUpdateItem
) {
  if (Array.isArray(item.product_updates)) {
    return item.product_updates[0] || null;
  }

  return item.product_updates;
}

function getInventoryVariantDetails(
  variant: string
) {
  return (
    INVENTORY_VARIANTS[variant] || {
      label: "Inventario Profesional",
      modules: [],
    }
  );
}

export default async function MiCuentaPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/acceso-clientes");
  }

  const { data: products, error } =
    await supabase
      .from("products")
      .select(`
        id,
        slug,
        name,
        description,
        current_version,
        instructions,
        product_resources (
          id,
          type,
          label,
          description,
          url,
          file_path,
          version,
          sort_order
        )
      `)
      .order("name", {
        ascending: true,
      })
      .order("sort_order", {
        referencedTable: "product_resources",
        ascending: true,
      });

  const {
    data: updateItems,
    error: updatesError,
  } = await supabase
    .from("product_update_items")
    .select(`
      id,
      product_id,
      updated_template_url,
      updated_pdf_file_path,
      updated_video_url,
      notes,
      sort_order,
      product_updates (
        id,
        title,
        description,
        version,
        published_at
      )
    `);

  let inventoryDelivery:
    | InventoryDelivery
    | null = null;

  let inventoryError = false;

  if (user.email) {
    const {
      data: delivery,
      error: deliveryError,
    } = await supabase
      .from(
        "inventory_activation_deliveries"
      )
      .select(`
        id,
        customer_email,
        license_variant,
        activation_code,
        activation_status,
        created_at,
        updated_at,
        redeemed_at,
        notes
      `)
      .eq(
        "customer_email",
        user.email.trim().toLowerCase()
      )
      .maybeSingle();

    inventoryDelivery =
      (delivery as InventoryDelivery | null) ||
      null;

    inventoryError =
      Boolean(deliveryError);
  }

  const typedProducts =
    (products || []) as Product[];

  const legacyInventoryProducts =
    typedProducts.filter((product) =>
      product.slug.startsWith("inventario-")
    );

  const standardProducts =
    typedProducts.filter(
      (product) =>
        !product.slug.startsWith("inventario-")
    );

  const hasLegacyInventoryAccess =
    legacyInventoryProducts.length > 0;

  const inventoryDetails =
    inventoryDelivery
      ? getInventoryVariantDetails(
          inventoryDelivery.license_variant
        )
      : null;

  const typedUpdateItems =
    (updateItems ||
      []) as unknown as ProductUpdateItem[];

  const updatesByProductId =
    typedUpdateItems.reduce<
      Record<string, ProductUpdateItem[]>
    >((acc, item) => {
      if (!acc[item.product_id]) {
        acc[item.product_id] = [];
      }

      acc[item.product_id].push(item);

      return acc;
    }, {});

  Object.values(
    updatesByProductId
  ).forEach((items) => {
    items.sort((a, b) => {
      const updateA =
        getUpdateFromItem(a);

      const updateB =
        getUpdateFromItem(b);

      const dateA = new Date(
        updateA?.published_at || 0
      ).getTime();

      const dateB = new Date(
        updateB?.published_at || 0
      ).getTime();

      return dateB - dateA;
    });
  });

  function getResourceTypeLabel(
    type: ProductResource["type"]
  ) {
    if (type === "google_sheet_copy") {
      return "Plantilla";
    }

    if (type === "pdf") {
      return "PDF";
    }

    if (type === "video") {
      return "Vídeo";
    }

    return "Enlace";
  }

  const hasVisibleContent =
    standardProducts.length > 0 ||
    Boolean(inventoryDelivery) ||
    hasLegacyInventoryAccess;

  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#403A36] pt-12 pb-24 px-5">
      <div className="max-w-5xl mx-auto">
        <style>
          {`
            .account-header {
              text-align: center;
              margin-bottom: 34px;
            }

            .account-kicker {
              display: inline-flex;
              align-items: center;
              background: #F3ECE7;
              color: #5f544f;
              border: 1px solid #E8DED8;
              border-radius: 999px;
              padding: 7px 14px;
              font-size: 12px;
              font-weight: 700;
              letter-spacing: 0.14em;
              text-transform: uppercase;
              margin-bottom: 14px;
            }

            .account-title {
              margin: 0 0 10px 0;
              font-family: Georgia, serif;
              font-size: 44px;
              line-height: 1.08;
              color: #403A36;
            }

            .account-text {
              margin: 0 auto;
              max-width: 680px;
              color: #6F655F;
              font-size: 16px;
              line-height: 1.65;
            }

            .account-actions {
              display: flex;
              justify-content: center;
              gap: 12px;
              flex-wrap: wrap;
              margin-top: 20px;
            }

            .account-secondary-link {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              border-radius: 999px;
              padding: 12px 18px;
              font-size: 14px;
              font-weight: 700;
              text-decoration: none;
              background: #FFFFFF;
              color: #403A36;
              border: 1px solid #E8DED8;
            }

            .account-grid {
              display: grid;
              grid-template-columns: repeat(
                auto-fit,
                minmax(280px, 1fr)
              );
              gap: 20px;
            }

            .account-product-card {
              background: linear-gradient(
                135deg,
                #FFFFFF 0%,
                #FCFAF7 100%
              );
              border: 1px solid #E8DED8;
              border-radius: 28px;
              padding: 24px;
              box-shadow: 0 10px 26px
                rgba(64, 58, 54, 0.055);
            }

            .account-inventory-card {
              margin-bottom: 20px;
              border-color: #D8B7B0;
            }

            .account-product-version {
              display: inline-flex;
              align-items: center;
              background: #E9F0E6;
              color: #4D6249;
              border-radius: 999px;
              padding: 6px 11px;
              font-size: 11px;
              font-weight: 700;
              letter-spacing: 0.1em;
              text-transform: uppercase;
              margin-bottom: 12px;
            }

            .account-product-title {
              margin: 0 0 10px 0;
              font-family: Georgia, serif;
              font-size: 25px;
              line-height: 1.15;
              color: #403A36;
            }

            .account-product-description {
              margin: 0 0 16px 0;
              color: #6F655F;
              font-size: 14px;
              line-height: 1.6;
            }

            .account-product-instructions {
              margin: 0;
              background: #F7F3EE;
              border: 1px solid #E8DED8;
              border-radius: 18px;
              padding: 14px;
              color: #5f544f;
              font-size: 13.5px;
              line-height: 1.55;
            }

            .inventory-details {
              display: grid;
              gap: 14px;
              margin-top: 18px;
            }

            .inventory-detail-box {
              background: #F7F3EE;
              border: 1px solid #E8DED8;
              border-radius: 18px;
              padding: 15px;
            }

            .inventory-detail-label {
              margin: 0 0 7px 0;
              color: #6F655F;
              font-size: 12px;
              font-weight: 700;
              letter-spacing: 0.08em;
              text-transform: uppercase;
            }

            .inventory-detail-value {
              margin: 0;
              color: #403A36;
              font-size: 15px;
              font-weight: 700;
              line-height: 1.45;
            }

            .inventory-modules {
              display: flex;
              flex-wrap: wrap;
              gap: 8px;
              margin-top: 10px;
            }

            .inventory-module {
              display: inline-flex;
              align-items: center;
              border-radius: 999px;
              padding: 7px 11px;
              background: #FFFFFF;
              border: 1px solid #E8DED8;
              color: #5f544f;
              font-size: 12px;
              font-weight: 700;
            }

            .inventory-code {
              display: block;
              width: 100%;
              margin-top: 10px;
              padding: 13px 14px;
              background: #FFFFFF;
              border: 1px solid #D8B7B0;
              border-radius: 14px;
              color: #403A36;
              font-family: ui-monospace,
                SFMono-Regular,
                Menlo,
                Monaco,
                Consolas,
                monospace;
              font-size: 16px;
              font-weight: 700;
              line-height: 1.4;
              letter-spacing: 0.04em;
              overflow-wrap: anywhere;
            }

            .inventory-actions {
              display: flex;
              flex-wrap: wrap;
              gap: 10px;
              margin-top: 14px;
            }

            .account-resources {
              display: grid;
              gap: 12px;
              margin-top: 18px;
            }

            .account-resource-card {
              background: #F7F3EE;
              border: 1px solid #E8DED8;
              border-radius: 18px;
              padding: 14px;
            }

            .account-resource-top {
              display: flex;
              align-items: flex-start;
              justify-content: space-between;
              gap: 12px;
              margin-bottom: 8px;
            }

            .account-resource-title {
              margin: 0;
              color: #403A36;
              font-size: 15px;
              font-weight: 700;
              line-height: 1.35;
            }

            .account-resource-type {
              display: inline-flex;
              flex-shrink: 0;
              border-radius: 999px;
              padding: 5px 9px;
              background: #FFFFFF;
              border: 1px solid #E8DED8;
              color: #5f544f;
              font-size: 11px;
              font-weight: 700;
              letter-spacing: 0.08em;
              text-transform: uppercase;
            }

            .account-resource-description {
              margin: 0 0 12px 0;
              color: #6F655F;
              font-size: 13.5px;
              line-height: 1.55;
            }

            .account-resource-button {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              border: 0;
              border-radius: 999px;
              padding: 10px 15px;
              background: #403A36;
              color: #FFFFFF;
              font-size: 13px;
              font-weight: 700;
              text-decoration: none;
              cursor: pointer;
              font-family: inherit;
            }

            .account-empty {
              background: linear-gradient(
                135deg,
                #FFFFFF 0%,
                #FCFAF7 100%
              );
              border: 1px dashed #D8B7B0;
              border-radius: 26px;
              padding: 28px;
              color: #5f544f;
              text-align: center;
              line-height: 1.6;
            }

            .account-error {
              background: #F7E4E1;
              color: #8A3C35;
              border-radius: 18px;
              padding: 14px;
              font-size: 14px;
              line-height: 1.45;
              margin-bottom: 20px;
            }

            .account-updates {
              display: grid;
              gap: 12px;
              margin-top: 18px;
            }

            .account-update-card {
              background: #FFF7EF;
              border: 1px solid #E8DED8;
              border-radius: 18px;
              padding: 14px;
            }

            .account-update-kicker {
              display: inline-flex;
              border-radius: 999px;
              padding: 5px 9px;
              background: #E9F0E6;
              color: #4D6249;
              font-size: 11px;
              font-weight: 700;
              letter-spacing: 0.08em;
              text-transform: uppercase;
              margin-bottom: 9px;
            }

            .account-update-title {
              margin: 0 0 7px 0;
              font-family: Georgia, serif;
              color: #403A36;
              font-size: 19px;
              line-height: 1.18;
            }

            .account-update-description {
              margin: 0 0 10px 0;
              color: #6F655F;
              font-size: 13.5px;
              line-height: 1.55;
            }

            .account-update-meta {
              margin: 0;
              color: #5f544f;
              font-size: 12.5px;
              line-height: 1.45;
              font-weight: 700;
            }

            .account-update-note {
              margin: 10px 0 0 0;
              background: #FFFFFF;
              border: 1px solid #E8DED8;
              border-radius: 14px;
              padding: 11px;
              color: #6F655F;
              font-size: 13px;
              line-height: 1.5;
            }

            .account-user-email {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              margin-top: 14px;
              background: #FFFFFF;
              border: 1px solid #E8DED8;
              border-radius: 999px;
              padding: 8px 13px;
              color: #5f544f;
              font-size: 13px;
              line-height: 1.3;
            }

            .account-section-note {
              margin: 0 0 18px 0;
              background: #FFFFFF;
              border: 1px solid #E8DED8;
              border-radius: 20px;
              padding: 16px;
              color: #6F655F;
              font-size: 14px;
              line-height: 1.55;
            }

            .account-empty-title {
              margin: 0 0 8px 0;
              font-family: Georgia, serif;
              color: #403A36;
              font-size: 22px;
              line-height: 1.2;
            }

            .account-empty-text {
              margin: 0;
              color: #6F655F;
              font-size: 14px;
              line-height: 1.6;
            }

            @media (max-width: 700px) {
              .account-title {
                font-size: 34px;
              }

              .account-grid {
                grid-template-columns: 1fr;
              }

              .account-product-card {
                border-radius: 24px;
                padding: 20px;
              }

              .inventory-actions {
                flex-direction: column;
                align-items: stretch;
              }

              .inventory-actions
                .account-resource-button {
                width: 100%;
              }
            }
          `}
        </style>

        <header className="account-header">
          <div className="account-kicker">
            🔐 Zona privada
          </div>

          <h1 className="account-title">
            Mi espacio
          </h1>

          <p className="account-text">
            Aquí encontrarás tus productos,
            recursos y accesos disponibles. Si
            tienes Inventario Profesional, los
            datos necesarios para acceder a la
            aplicación y realizar la primera
            activación aparecerán aquí.
          </p>

          {user.email ? (
            <div className="account-user-email">
              Sesión iniciada con:
              <strong
                style={{ marginLeft: 5 }}
              >
                {user.email}
              </strong>
            </div>
          ) : null}

          <div className="account-actions">
            <Link
              href="/"
              className="account-secondary-link"
            >
              ← Volver a la web
            </Link>

            <LogoutButton />
          </div>
        </header>

        {error ? (
          <div className="account-error">
            No se han podido cargar todos tus
            productos. Inténtalo de nuevo más
            tarde.
          </div>
        ) : null}

        {updatesError ? (
          <div className="account-error">
            No se han podido cargar las
            actualizaciones. Inténtalo de nuevo
            más tarde.
          </div>
        ) : null}

        {inventoryError ? (
          <div className="account-error">
            No se ha podido consultar tu acceso
            de Inventario Profesional. Inténtalo
            de nuevo más tarde.
          </div>
        ) : null}

        {hasVisibleContent ? (
          <>
            <div className="account-section-note">
              Guarda esta página como referencia:
              desde aquí podrás acceder a tus
              productos y recursos siempre que lo
              necesites. Las actualizaciones
              disponibles aparecerán en el
              producto correspondiente.
            </div>

            {inventoryDelivery &&
            inventoryDetails ? (
              <article className="account-product-card account-inventory-card">
                <div className="account-product-version">
                  Aplicación web privada
                </div>

                <h2 className="account-product-title">
                  Inventario Profesional
                </h2>

                <p className="account-product-description">
                  Accede a tu inventario desde
                  cualquier navegador compatible.
                  La aplicación utiliza una única
                  licencia por cuenta y habilita
                  sus funciones según la variante
                  adquirida.
                </p>

                <div className="inventory-details">
                  <div className="inventory-detail-box">
                    <p className="inventory-detail-label">
                      Tu variante
                    </p>

                    <p className="inventory-detail-value">
                      {inventoryDetails.label}
                    </p>

                    <div className="inventory-modules">
                      <span className="inventory-module">
                        Edición base
                      </span>

                      {inventoryDetails.modules.map(
                        (module) => (
                          <span
                            key={module}
                            className="inventory-module"
                          >
                            {module}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  {inventoryDelivery.activation_status ===
                  "ready" ? (
                    <div className="inventory-detail-box">
                      <p className="inventory-detail-label">
                        Primera activación
                      </p>

                      <p className="account-product-description">
                        Este código es de un solo
                        uso. Abre Inventario
                        Profesional, selecciona
                        <strong>
                          {" "}
                          “Primera activación”
                        </strong>
                        , crea tu cuenta y utiliza
                        el código. Al canjearlo,
                        la licencia quedará
                        vinculada a la cuenta
                        creada en la aplicación.
                      </p>

                      <code className="inventory-code">
                        {
                          inventoryDelivery.activation_code
                        }
                      </code>

                      <div className="inventory-actions">
                        <CopyActivationCodeButton
                          code={
                            inventoryDelivery.activation_code
                          }
                        />

                        <a
                          href="https://inventario.stitchingwithfru.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="account-resource-button"
                        >
                          Abrir Inventario
                          Profesional →
                        </a>
                      </div>
                    </div>
                  ) : null}

                  {inventoryDelivery.activation_status ===
                  "redeemed" ? (
                    <div className="inventory-detail-box">
                      <p className="inventory-detail-label">
                        Código de activación
                      </p>

                      <p className="account-product-description">
                        El código de esta entrega
                        está marcado como
                        utilizado. Para continuar,
                        abre Inventario
                        Profesional e inicia
                        sesión con la cuenta que
                        utilizaste durante la
                        primera activación.
                      </p>

                      <div className="inventory-actions">
                        <a
                          href="https://inventario.stitchingwithfru.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="account-resource-button"
                        >
                          Abrir Inventario
                          Profesional →
                        </a>
                      </div>
                    </div>
                  ) : null}

                  {inventoryDelivery.activation_status ===
                  "revoked" ? (
                    <div className="inventory-detail-box">
                      <p className="inventory-detail-label">
                        Código de activación
                      </p>

                      <p className="account-product-description">
                        El código de esta entrega
                        está marcado como
                        revocado. Si necesitas
                        ayuda con tu acceso,
                        contacta con soporte.
                      </p>

                      <div className="inventory-actions">
                        <a
                          href="mailto:soporte@stitchingwithfru.com"
                          className="account-resource-button"
                        >
                          Contactar con soporte
                        </a>
                      </div>
                    </div>
                  ) : null}
                </div>
              </article>
            ) : null}

            {!inventoryDelivery &&
            hasLegacyInventoryAccess &&
            !inventoryError ? (
              <article className="account-product-card account-inventory-card">
                <div className="account-product-version">
                  Preparación en curso
                </div>

                <h2 className="account-product-title">
                  Inventario Profesional
                </h2>

                <p className="account-product-description">
                  Estamos preparando tu acceso a
                  la nueva aplicación web privada
                  de Inventario Profesional.
                </p>

                <p className="account-product-instructions">
                  Cuando esté preparado, aquí
                  aparecerán tu variante, el
                  código de activación de un solo
                  uso y el acceso directo a la
                  aplicación. Ya no necesitas
                  crear una nueva copia de la
                  antigua plantilla desde esta
                  zona privada.
                </p>
              </article>
            ) : null}

            {standardProducts.length > 0 ? (
              <section className="account-grid">
                {standardProducts.map(
                  (product) => (
                    <article
                      key={product.id}
                      className="account-product-card"
                    >
                      {product.current_version ? (
                        <div className="account-product-version">
                          Versión{" "}
                          {
                            product.current_version
                          }
                        </div>
                      ) : null}

                      <h2 className="account-product-title">
                        {product.name}
                      </h2>

                      {product.description ? (
                        <p className="account-product-description">
                          {
                            product.description
                          }
                        </p>
                      ) : null}

                      {product.instructions ? (
                        <p className="account-product-instructions">
                          {
                            product.instructions
                          }
                        </p>
                      ) : null}

                      {product.product_resources &&
                      product.product_resources
                        .length > 0 ? (
                        <div className="account-resources">
                          {product.product_resources.map(
                            (resource) => (
                              <div
                                key={
                                  resource.id
                                }
                                className="account-resource-card"
                              >
                                <div className="account-resource-top">
                                  <p className="account-resource-title">
                                    {
                                      resource.label
                                    }
                                  </p>

                                  <span className="account-resource-type">
                                    {getResourceTypeLabel(
                                      resource.type
                                    )}
                                  </span>
                                </div>

                                {resource.description ? (
                                  <p className="account-resource-description">
                                    {
                                      resource.description
                                    }
                                  </p>
                                ) : null}

                                {resource.type ===
                                  "google_sheet_copy" &&
                                resource.url ? (
                                  <a
                                    href={
                                      resource.url
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="account-resource-button"
                                  >
                                    Crear mi copia
                                    →
                                  </a>
                                ) : null}

                                {resource.type ===
                                  "video" &&
                                resource.url ? (
                                  <a
                                    href={
                                      resource.url
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="account-resource-button"
                                  >
                                    Ver vídeo
                                    tutorial →
                                  </a>
                                ) : null}

                                {resource.type ===
                                "pdf" ? (
                                  <a
                                    href={`/api/customer/resources/${resource.id}/download`}
                                    className="account-resource-button"
                                  >
                                    Descargar
                                    manual PDF →
                                  </a>
                                ) : null}

                                {resource.type ===
                                  "link" &&
                                resource.url ? (
                                  <a
                                    href={
                                      resource.url
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="account-resource-button"
                                  >
                                    Abrir recurso
                                    →
                                  </a>
                                ) : null}
                              </div>
                            )
                          )}
                        </div>
                      ) : null}

                      {updatesByProductId[
                        product.id
                      ]?.length ? (
                        <div className="account-updates">
                          {updatesByProductId[
                            product.id
                          ].map((item) => {
                            const update =
                              getUpdateFromItem(
                                item
                              );

                            if (!update) {
                              return null;
                            }

                            return (
                              <div
                                key={item.id}
                                className="account-update-card"
                              >
                                <div className="account-update-kicker">
                                  Actualización
                                  disponible
                                </div>

                                <h3 className="account-update-title">
                                  {
                                    update.title
                                  }
                                </h3>

                                {update.description ? (
                                  <p className="account-update-description">
                                    {
                                      update.description
                                    }
                                  </p>
                                ) : null}

                                <p className="account-update-meta">
                                  {update.version
                                    ? `Versión ${update.version}`
                                    : "Nueva actualización"}{" "}
                                  ·{" "}
                                  {new Intl.DateTimeFormat(
                                    "es-ES",
                                    {
                                      day: "numeric",
                                      month:
                                        "long",
                                      year: "numeric",
                                    }
                                  ).format(
                                    new Date(
                                      update.published_at
                                    )
                                  )}
                                </p>

                                {item.notes ? (
                                  <p className="account-update-note">
                                    {
                                      item.notes
                                    }
                                  </p>
                                ) : null}
                              </div>
                            );
                          })}
                        </div>
                      ) : null}
                    </article>
                  )
                )}
              </section>
            ) : null}
          </>
        ) : (
          <div className="account-empty">
            <h2 className="account-empty-title">
              Todavía no hay productos
              disponibles
            </h2>

            <p className="account-empty-text">
              Si acabas de hacer un pedido, es
              posible que todavía esté pendiente
              de comprobar el pago y preparar tu
              acceso. Cuando esté listo,
              aparecerá aquí automáticamente.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}