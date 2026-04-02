import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <div className="brand-title serif" style={{ fontSize: 24 }}>Bordando con Fru</div>
          <p className="footer-note">Contenido y herramientas digitales para bordadoras.</p>
        </div>
        <nav className="footer-links" aria-label="Enlaces legales">
          <Link href="/politica-privacidad">Política de privacidad</Link>
          <Link href="/condiciones-compra">Condiciones de compra</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contacto">Contacto</Link>
        </nav>
      </div>
    </footer>
  );
}
