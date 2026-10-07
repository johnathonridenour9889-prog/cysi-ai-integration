import Link from "next/link";

const steps = [
  {
    n: "01",
    title: "DEFINE",
    kicker: "BUSINESS PROBLEM",
    copy: "Start with the workflow, cost, bottleneck, or information problem the business actually needs to improve.",
  },
  {
    n: "02",
    title: "CONNECT",
    kicker: "SYSTEMS + DATA",
    copy: "Map the applications, APIs, databases, documents, permissions, and people already involved.",
  },
  {
    n: "03",
    title: "APPLY",
    kicker: "AI + AUTOMATION",
    copy: "Use AI where it adds value, conventional automation where it does not, and human approval where consequences matter.",
  },
  {
    n: "04",
    title: "MEASURE",
    kicker: "OPERATIONAL RESULT",
    copy: "Track time, cost, quality, adoption, and failure points so the system earns its place in the business.",
  },
];

export function BusinessFlow() {
  return (
    <section className="business-flow section-grid">
      <div className="shell business-flow__grid">
        <div className="business-flow__intro">
          <div className="eyebrow">HOW WE THINK ABOUT IMPLEMENTATION</div>
          <h2>Start with the business. Build only what earns its place.</h2>
          <p>
            The goal is not to force AI into every process. The goal is to create a
            better operating system around the work your company already does.
          </p>
          <Link className="text-link" href="/process">
            See the full process <span>→</span>
          </Link>
        </div>

        <div className="business-flow__map">
          <div className="business-flow__rail" aria-hidden="true">
            <i />
          </div>

          {steps.map((step) => (
            <article className="business-flow__step" key={step.n}>
              <div className="business-flow__step-head">
                <span>{step.n}</span>
                <strong>{step.title}</strong>
              </div>
              <small>{step.kicker}</small>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
