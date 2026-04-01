import Link from "next/link";
import { ReactNode } from "react";

export function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-title">
      <div className="eyebrow">{eyebrow}</div>
      <h1 className="serif">{title}</h1>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

export function Card({ children, soft = false }: { children: ReactNode; soft?: boolean }) {
  return <div className={`card${soft ? " card-soft" : ""}`}>{children}</div>;
}

export function PrimaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link className="btn-primary" href={href}>
      {children}
    </Link>
  );
}

export function SecondaryLink({
  href,
  children,
  newTab = false,
}: {
  href: string;
  children: ReactNode;
  newTab?: boolean;
}) {
  const isExternal = href.startsWith("http://") || href.startsWith("https://");

  if (isExternal) {
    return (
      <a
        className="btn-secondary"
        href={href}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link className="btn-secondary" href={href}>
      {children}
    </Link>
  );
}

export function InfoBadge({ children, tone = "rose" }: { children: ReactNode; tone?: "rose" | "sage" | "soft" }) {
  const className = tone === "sage" ? "badge badge-sage" : tone === "soft" ? "badge badge-soft" : "badge";
  return <div className={className}>{children}</div>;
}
