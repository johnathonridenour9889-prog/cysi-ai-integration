type SectionIntroProps = {
  eyebrow: string;
  title: string;
  copy?: string;
  centered?: boolean;
};

export function SectionIntro({
  eyebrow,
  title,
  copy,
  centered = false,
}: SectionIntroProps) {
  return (
    <div className={centered ? "section-intro section-intro--center" : "section-intro"}>
      <div className="eyebrow">{eyebrow}</div>
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </div>
  );
}
