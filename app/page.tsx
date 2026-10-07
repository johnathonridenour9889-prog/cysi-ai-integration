import Link from "next/link";
import { SectionIntro } from "@/components/SectionIntro";
import { PlatformStrip } from "@/components/PlatformStrip";
import { CaseFlow } from "@/components/CaseFlow";
import { ScrollReveal } from "@/components/ScrollReveal";
import { NetworkCanvas } from "@/components/NetworkCanvas";
import { BusinessFlow } from "@/components/BusinessFlow";

const services = [
  {
    number: "01",
    title: "AI Strategy & Readiness",
    copy: "Identify practical use cases, requirements, risks, and priorities before buying tools.",
    tags: ["READINESS", "ROADMAP", "ROI"],
  },
  {
    number: "02",
    title: "AI Integration",
    copy: "Connect proven AI platforms to your software, APIs, databases, and existing workflows.",
    tags: ["APIs", "LLMs", "SYSTEMS"],
  },
  {
    number: "03",
    title: "Automation & Workflows",
    copy: "Combine AI, business rules, automation, and human approval to reduce repetitive work.",
    tags: ["AUTOMATION", "AGENTS", "HITL"],
  },
  {
    number: "04",
    title: "Data, Security & Governance",
    copy: "Make company information usable while defining access, permissions, controls, and measurement.",
    tags: ["DATA", "SECURITY", "CONTROL"],
  },
];

export default function Home() {
  return (
    <>
      <section className="hero hero--v7 section-grid">
        <div className="hero-stars" aria-hidden="true" />
        <div className="orbital orbital--hero" aria-hidden="true" />
        <div className="coordinate coordinate--two" aria-hidden="true">SYS-INT / REV 07</div>

        <div className="shell hero-grid hero-grid--v7">
          <div className="hero-copy hero-copy--v7">
            <div className="eyebrow">
              <span className="status-dot" />
              AI Integration Consulting
            </div>

            <h1>
              <span className="hero-line">Make AI work</span>
              <span className="hero-line hero-line--silver">with the systems</span>
              <span className="hero-line hero-line--silver">you already use.</span>
            </h1>

            <p className="lede">
              Cyber Systems helps businesses identify where AI creates real value,
              connect it to existing systems and data, automate repetitive processes,
              and deploy solutions employees can actually use.
            </p>

            <div className="hero-actions">
              <Link className="button button--primary" href="/contact">
                Start an AI Assessment
                <span aria-hidden="true">↗</span>
              </Link>
              <Link className="button button--ghost" href="/services">
                Explore Services
              </Link>
            </div>

            <div className="hero-meta">
              <span>STRATEGY</span><i />
              <span>INTEGRATION</span><i />
              <span>AUTOMATION</span><i />
              <span>SECURITY</span>
            </div>
          </div>

          <NetworkCanvas />
        </div>

        <div className="hero-edge-label" aria-hidden="true">
          CS / CONNECTED BUSINESS SYSTEMS / 007
        </div>
      </section>

      <PlatformStrip />

      <section className="decision-section section-grid">
        <div className="shell decision-section__grid">
          <ScrollReveal>
            <div className="decision-section__headline">
              <div className="eyebrow">THE REAL QUESTION</div>
              <h2>Companies know they need AI.</h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={70}>
            <div className="decision-section__answer">
              <strong>What should we actually do with it?</strong>
              <p>
                Most businesses do not need to build AI. They need to choose the right
                technology, connect it to existing systems and data, define controls,
                and make it useful inside real workflows.
              </p>
            </div>
          </ScrollReveal>
        </div>

        <div className="shell decision-principles">
          <span>BUSINESS-FIRST</span>
          <span>EXISTING SYSTEMS</span>
          <span>HUMAN APPROVAL</span>
          <span>MEASURABLE OUTCOMES</span>
          <Link href="/case-studies">
            PROOF POINT: 3–4 DAYS → MINUTES
          </Link>
        </div>
      </section>

      <section className="services services--v7 section-grid" id="services">
        <div className="shell">
          <ScrollReveal>
            <SectionIntro
              eyebrow="WHAT WE DO"
              title="Build the system around the AI."
              copy="We focus on the integration layer between business operations and the AI platforms already on the market."
            />
          </ScrollReveal>

          <div className="service-grid service-grid--four service-grid--v7">
            {services.map((service, index) => (
              <ScrollReveal delay={index * 50} key={service.title}>
                <article className="service-card service-card--compact">
                  <div className="service-card__top">
                    <span>{service.number}</span>
                    <span className="service-card__cross">+</span>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                  <div className="tag-row">
                    {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <div className="section-link">
            <Link href="/services">See all capabilities <span>→</span></Link>
          </div>
        </div>
      </section>

      <BusinessFlow />

      <section className="case-preview case-preview--v7 section-grid">
        <div className="shell">
          <ScrollReveal>
            <div className="case-preview__intro-v7">
              <div>
                <div className="eyebrow">PROOF BEFORE HYPE</div>
                <h2>3–4 days reduced to minutes.</h2>
              </div>
              <p>
                A real integration and automation project showing the kind of
                operational improvement we design systems around.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={70}>
            <div className="case-visual case-visual--v7">
              <div className="case-visual__headline">
                <div className="case-feature__metric case-feature__metric--before">
                  <span>FROM</span>
                  <strong>3–4 DAYS</strong>
                </div>
                <div className="case-feature__arrow">→</div>
                <div className="case-feature__metric case-feature__metric--after">
                  <span>TO</span>
                  <strong>MINUTES</strong>
                </div>
                <div className="case-feature__copy">
                  <span>AUTOMATION / DATA / REPORTING</span>
                  <h3>Reporting and invoicing workflow integration</h3>
                  <p>APIs, reporting logic, and automation replaced a multi-day manual process.</p>
                </div>
              </div>

              <CaseFlow />

              <div className="case-visual__footer">
                <span>MEASURED OPERATIONAL OUTCOME</span>
                <Link href="/case-studies">View case study →</Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="cta-band cta-band--v7">
        <div className="shell cta-band__inner">
          <div>
            <div className="eyebrow">START WITH THE PROBLEM</div>
            <h2>Find where AI can actually create value in your business.</h2>
          </div>
          <Link className="button button--light" href="/contact">
            Start an AI Assessment <span>↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
