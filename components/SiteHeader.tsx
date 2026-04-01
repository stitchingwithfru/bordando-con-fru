import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div>
          <div className="brand-title serif">Bordando con Fru</div>
          <div className="brand-subtitle">Contenido y herramientas digitales para bordadoras</div>
        </div>
        <nav className="nav">
          <Link href="/">Inicio</Link>
          <details className="dropdown">
            <summary>Herramientas</summary>
            <div className="dropdown-menu">
              <Link className="dropdown-item" href="/herramientas/seguimiento">
                Sistema de Seguimiento de Punto de Cruz
              </Link>
              <Link className="dropdown-item" href="/herramientas/inventario">
                Sistema de Inventario Profesional
              </Link>
            </div>
          </details>
          <Link href="/faq">FAQ</Link>
          <Link href="/contacto">Contacto</Link>
        </nav>
      </div>
    </header>
  );
}
