import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site";

export function Nav() {
  return (
    <header className="site-header">
      <div className="shell nav-shell">
        <Link className="brand brand--cysi" href="/" aria-label="CYSI home">
          <Image
            src="/cysi-header-logo.png"
            alt="CYSI"
            width={260}
            height={48}
            priority
            className="cysi-header-logo"
          />
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="button button--small button--outline nav-cta" href="/contact">
          Start an AI Assessment
        </Link>

        <details className="mobile-menu">
          <summary aria-label="Open navigation">
            <span />
            <span />
            <span />
          </summary>
          <div className="mobile-menu__panel">
            {siteConfig.nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href="/contact">Start an AI Assessment</Link>
          </div>
        </details>
      </div>
    </header>
  );
}
