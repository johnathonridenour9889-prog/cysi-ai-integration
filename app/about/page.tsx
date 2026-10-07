import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="ABOUT"
        title="Technology is only useful when it fits the business."
        description="Cyber Systems combines experience across data, automation, analytics, software, marketing technology, and business systems to help companies integrate AI without losing sight of the operational problem."
      />

      <section className="section-pad">
        <div className="shell about-grid">
          <div className="about-statement">
            <span className="large-index">CS</span>
            <h2>Built for the integration gap.</h2>
          </div>

          <div className="about-copy">
            <p className="lead-paragraph">
              Companies are being told to adopt AI quickly. Most do not need a
              research lab. They need someone who can look across the business,
              understand the existing technology, and build a practical path from
              opportunity to implementation.
            </p>
            <p>
              Our work sits between business operations and technical execution.
              We help identify useful AI opportunities, select appropriate
              platforms, connect data and applications, automate processes, plan
              security controls, and make the result understandable to the people
              expected to use it.
            </p>
            <p>
              Our team has worked with companies through Upwork and direct
              consulting engagements across data science, automation, analytics,
              software, marketing technology, and business systems.
            </p>
          </div>
        </div>
      </section>

      <section className="experience section-pad">
        <div className="shell experience-grid">
          <div>
            <div className="eyebrow">EXPERIENCE</div>
            <h2>A broad technical base for cross-system work.</h2>
            <p>
              AI implementation touches multiple disciplines at once. That is why
              integration experience matters as much as knowing how to call a model API.
            </p>
          </div>

          <div className="capability-list">
            {[
              "Software & API integration",
              "Python / C# / JavaScript",
              "PowerShell automation",
              "SQL & database integration",
              "Data science & analytics",
              "Machine learning",
              "Business intelligence",
              "Cloud applications",
              "Marketing technology",
              "Digital analytics",
              "Business systems",
              "Workflow automation",
            ].map((item, index) => (
              <div key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="shell cta-band__inner">
          <div>
            <div className="eyebrow">WORK WITH US</div>
            <h2>Bring the problem. We will help map the system.</h2>
          </div>
          <Link className="button button--light" href="/contact">
            Start an AI Assessment <span>↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
