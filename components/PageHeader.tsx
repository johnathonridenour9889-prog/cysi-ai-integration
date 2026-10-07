type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="page-header section-grid">
      <div className="orbital orbital--page" aria-hidden="true" />
      <div className="shell page-header__inner">
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p className="lede">{description}</p>
      </div>
    </section>
  );
}
