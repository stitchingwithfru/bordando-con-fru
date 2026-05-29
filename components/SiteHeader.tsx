import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div>
          <div className="brand-title serif">Bordando con Fru</div>
          <div className="brand-subtitle">
            Contenido y herramientas digitales para punto de cruz
          </div>
        </div>

        <nav className="nav nav-desktop">
          <Link href="/">Inicio</Link>

          <div className="dropdown">
            <button className="dropdown-trigger" type="button">
              Contenidos
            </button>

            <div className="dropdown-menu">
              <Link className="dropdown-item" href="/punto-de-cruz">
                Punto de cruz
              </Link>
              <Link className="dropdown-item" href="/club-de-lectura">
                Club de Lectura
              </Link>
              <Link className="dropdown-item" href="/mis-lecturas">
                Mis lecturas
              </Link>
            </div>
          </div>

          <div className="dropdown">
            <button className="dropdown-trigger" type="button">
              Herramientas
            </button>

            <div className="dropdown-menu">
              <Link className="dropdown-item" href="/herramientas/seguimiento">
                Sistema de Seguimiento de Punto de Cruz
              </Link>
              <Link className="dropdown-item" href="/herramientas/inventario">
                Sistema de Inventario Profesional
              </Link>
            </div>
          </div>

          <Link href="/acceso-clientes">Mi espacio</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contacto">Contacto</Link>
          <Link href="/admin-clientes">Gestión</Link>
        </nav>

        <details className="mobile-nav">
          <summary>Menú</summary>
          <div className="mobile-nav-menu">
            <Link href="/">Inicio</Link>

            <div className="mobile-nav-section-title">Contenidos</div>
            <Link href="/punto-de-cruz">Punto de cruz</Link>
            <Link href="/club-de-lectura">Club de Lectura</Link>
            <Link href="/mis-lecturas">Mis lecturas</Link>

            <div className="mobile-nav-section-title">Herramientas</div>
            <Link href="/herramientas/seguimiento">
              Sistema de Seguimiento de Punto de Cruz
            </Link>
            <Link href="/herramientas/inventario">
              Sistema de Inventario Profesional
            </Link>

            <div className="mobile-nav-section-title">Cuenta</div>
            <Link href="/acceso-clientes">Mi espacio</Link>

            <div className="mobile-nav-section-title">Información</div>
            <Link href="/faq">FAQ</Link>
            <Link href="/contacto">Contacto</Link>
            <Link href="/admin-clientes">Gestión</Link>
          </div>
        </details>
      </div>
    </header>
  );
}