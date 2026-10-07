import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { ArchitectureMap } from "@/components/ArchitectureMap";
import { SectionIntro } from "@/components/SectionIntro";

const groups = [
  {
    id: "strategy",
    number: "01",
    title: "AI Strategy & Readiness",
    intro:
      "Before integrating anything, we establish what the business is trying to improve and whether AI is the right tool.",
    items: [
      "AI readiness assessments",
      "Use-case identification",
      "Opportunity prioritization",
      "AI roadmap development",
      "Vendor and model selection",
      "Cost and ROI analysis",
      "Risk and dependency review",
    ],
    flow: ["BUSINESS GOAL", "SYSTEM REVIEW", "PRIORITIES", "ROADMAP"],
  },
  {
    id: "integration",
    number: "02",
    title: "AI Integration & Implementation",
    intro:
      "We connect selected AI capabilities to the software, data, and processes that already run the company.",
    items: [
      "Generative AI / LLM integration",
      "REST API integration",
      "CRM / ERP connectivity",
      "Internal software integration",
      "Cloud application integration",
      "AI-assisted reporting",
      "Human-in-the-loop controls",
    ],
    flow: ["SYSTEMS", "APIs", "MODELS", "WORKFLOWS"],
  },
  {
    id: "automation",
    number: "03",
    title: "Automation & Agentic Workflows",
    intro:
      "Where appropriate, we design workflows that let AI perform bounded tasks while keeping business rules and human oversight in place.",
    items: [
      "Business process automation",
      "Workflow automation",
      "AI agents and agentic workflows",
      "Python automation",
      "PowerShell automation",
      "Approval workflows",
      "Operational monitoring",
    ],
    flow: ["TRIGGERS", "LOGIC", "APPROVAL", "EXECUTION"],
  },
  {
    id: "knowledge",
    number: "04",
    title: "Knowledge, Data & Analytics",
    intro:
      "AI is only useful when it can safely reach the information required to do its job.",
    items: [
      "Internal AI assistants",
      "AI knowledge bases",
      "RAG architecture",
      "SQL and data integration",
      "Data pipelines",
      "Data science and analytics",
      "Business intelligence",
      "Custom analytics",
    ],
    flow: ["SOURCES", "INDEXING", "RETRIEVAL", "INSIGHT"],
  },
  {
    id: "security",
    number: "05",
    title: "Governance & Security Planning",
    intro:
      "AI changes how information moves through a company. We design the controls that need to move with it.",
    items: [
      "Data access planning",
      "Permission boundaries",
      "Human approval requirements",
      "AI usage policies",
      "Logging and audit planning",
      "Vendor risk considerations",
      "Sensitive-data handling",
    ],
    flow: ["ACCESS", "CONTROL", "LOGGING", "APPROVAL"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="SERVICES"
        title="Build the integration layer around AI."
        description="Cyber Systems does not build foundation models. We help companies choose proven AI technology and make it useful inside existing business systems."
      />


      <section className="services-architecture section-grid">
        <div className="shell">
          <SectionIntro
            eyebrow="REFERENCE ARCHITECTURE"
            title="See where AI fits before you build around it."
            copy="The model is only one layer. Useful implementation depends on connected systems, controlled data access, workflow logic, security, human approval, and measurable outcomes."
          />
          <ArchitectureMap />
        </div>
      </section>

      <section className="section-pad service-detail-section">
        <div className="shell service-detail-list">
          {groups.map((group) => (
            <article className="service-detail" id={group.id} key={group.title}>
              <div className="service-detail__number">{group.number}</div>

              <div className="service-detail__main">
                <h2>{group.title}</h2>
                <p>{group.intro}</p>

                <div className="service-detail__visual" aria-hidden="true">
                  {group.flow.map((step, index) => (
                    <div className="service-mini-flow" key={step}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <strong>{step}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <ul className="service-detail__items">
                {group.items.map((item) => (
                  <li key={item}>
                    <span />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div className="shell cta-band__inner">
          <div>
            <div className="eyebrow">NOT SURE WHERE TO START?</div>
            <h2>Start with an AI Assessment.</h2>
          </div>
          <Link className="button button--light" href="/contact">
            Start an AI Assessment <span>↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
