import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div>
          <Link className="brand brand--footer brand--cysi-footer" href="/" aria-label="CYSI home">
            <Image
              src="/cysi-header-logo.png"
              alt="CYSI"
              width={205}
              height={48}
              className="cysi-footer-logo"
            />
          </Link>
          <p className="footer-copy">
            AI integration consulting built around real systems, real workflows,
            measurable business value, and responsible implementation.
          </p>
        </div>

        <div className="footer-links">
          <span className="footer-label">Explore</span>
          <Link href="/services">Services</Link>
          <Link href="/process">Process</Link>
          <Link href="/case-studies">Case Studies</Link>
          <Link href="/about">About</Link>
        </div>

        <div className="footer-links">
          <span className="footer-label">Contact</span>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <Link href="/contact">Start an AI Assessment</Link>
        </div>
      </div>

      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} CYSI. All rights reserved.</span>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
