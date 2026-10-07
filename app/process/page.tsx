import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

const steps = [
  {
    n: "01",
    title: "Understand the business problem",
    copy:
      "We start with what you are trying to improve — cost, time, access to information, service quality, reporting, decision support, or another operational outcome.",
    signal: "BUSINESS",
  },
  {
    n: "02",
    title: "Review systems and data",
    copy:
      "We map the applications, databases, documents, APIs, permissions, users, and infrastructure involved in the current process.",
    signal: "ENVIRONMENT",
  },
  {
    n: "03",
    title: "Identify AI and automation opportunities",
    copy:
      "We decide what should use AI, what should use conventional automation, what needs integration work, and what should stay human-controlled.",
    signal: "OPPORTUNITY",
  },
  {
    n: "04",
    title: "Design the integration",
    copy:
      "Models, APIs, databases, applications, automation, permissions, security controls, and human approval paths are designed as one system.",
    signal: "ARCHITECTURE",
  },
  {
    n: "05",
    title: "Test real-world workflows",
    copy:
      "A demo is not a production system. We test with representative data, real users, edge cases, failure conditions, and the actual workflow.",
    signal: "VALIDATION",
  },
  {
    n: "06",
    title: "Deploy, measure, and improve",
    copy:
      "We measure adoption, accuracy, time saved, cost, failure rates, and business outcomes — then improve the implementation based on actual use.",
    signal: "OPERATIONS",
  },
];

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="PROCESS"
        title="A practical path from AI interest to operational value."
        description="The process is designed to stop companies from buying AI first and searching for a problem second."
      />

      <section className="section-pad process-page">
        <div className="shell process-stack">
          {steps.map((step) => (
            <article className="process-row" key={step.n}>
              <div className="process-row__n">{step.n}</div>
              <div className="process-row__signal">{step.signal}</div>
              <div className="process-row__content">
                <h2>{step.title}</h2>
                <p>{step.copy}</p>
              </div>
              <div className="process-row__status">
                <span />
                REVIEW
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="principle section-pad">
        <div className="shell principle-grid">
          <div className="principle-number">+</div>
          <div>
            <div className="eyebrow">DESIGN RULE</div>
            <h2>Human approval is a system feature, not a failure of automation.</h2>
          </div>
          <div className="principle-copy">
            <p>
              Some tasks can be fully automated. Others need review because of
              cost, risk, customer impact, compliance, or uncertainty.
            </p>
            <p>
              We design the level of human control around the consequence of the
              decision, not around how impressive the AI demo looks.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="shell cta-band__inner">
          <div>
            <div className="eyebrow">BEGIN WITH DISCOVERY</div>
            <h2>Bring us the workflow that is costing you time.</h2>
          </div>
          <Link className="button button--light" href="/contact">
            Start an AI Assessment <span>↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
