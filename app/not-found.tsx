import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-header section-grid">
      <div className="shell page-header__inner">
        <div className="eyebrow">404 / SIGNAL LOST</div>
        <h1>That route does not exist.</h1>
        <p className="lede">
          The requested page is outside the current Cyber Systems map.
        </p>
        <div className="hero-actions">
          <Link className="button button--primary" href="/">
            Return Home
          </Link>
        </div>
      </div>
    </section>
  );
}
