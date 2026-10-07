import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { CaseFlow } from "@/components/CaseFlow";

export default function CaseStudiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="CASE STUDIES"
        title="Operational results matter more than AI theater."
        description="We highlight measurable systems work and keep AI claims separate from projects that were solved with conventional integration and automation."
      />

      <section className="section-pad">
        <div className="shell">
          <article className="case-study-full">
            <div className="case-study-full__header">
              <div>
                <span className="case-kicker">AUTOMATION / ANALYTICS / API INTEGRATION</span>
                <h2>Reporting and invoicing workflow integration</h2>
              </div>
              <span className="case-index">CS-001</span>
            </div>

            <div className="case-metrics">
              <div>
                <span>BEFORE</span>
                <strong>3–4 days</strong>
                <small>Multi-platform manual process</small>
              </div>
              <div className="metric-vector">→</div>
              <div>
                <span>AFTER</span>
                <strong>Minutes</strong>
                <small>Integrated operational workflow</small>
              </div>
            </div>

            <div className="case-study-flow-wrap">
              <div className="case-study-flow-label">WORKFLOW TRANSFORMATION</div>
              <CaseFlow />
            </div>

            <div className="case-body-grid">
              <div>
                <h3>The problem</h3>
                <p>
                  Reporting and invoicing required information to be collected
                  across multiple advertising and business systems, then organized
                  manually before it could be used.
                </p>
              </div>
              <div>
                <h3>The system</h3>
                <p>
                  APIs, reporting logic, data handling, and workflow automation
                  were connected into a repeatable process that reduced the
                  operational workload dramatically.
                </p>
              </div>
              <div>
                <h3>Why it matters now</h3>
                <p>
                  This is the same integration discipline AI projects require:
                  understanding business logic, connecting data sources, handling
                  edge cases, and building around the way people actually work.
                </p>
              </div>
            </div>

            <div className="case-note">
              <span>NOTE</span>
              This project is presented as integration and automation work — not
              retroactively labeled as an AI project.
            </div>
          </article>

          <div className="case-placeholder-grid">
            <article>
              <span>CS-002</span>
              <h3>AI Integration Case Study</h3>
              <p>
                Reserved for the first verified production AI integration project.
                We will document the problem, architecture, controls, and measured result.
              </p>
            </article>
            <article>
              <span>CS-003</span>
              <h3>Internal Knowledge / RAG Case Study</h3>
              <p>
                Reserved for a verified knowledge integration project with clear
                data access, security, adoption, and accuracy metrics.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="shell cta-band__inner">
          <div>
            <div className="eyebrow">BUILD THE NEXT ONE</div>
            <h2>Have a process that should take minutes instead of days?</h2>
          </div>
          <Link className="button button--light" href="/contact">
            Start an AI Assessment <span>↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
