import { ContactIntake } from "@/components/ContactIntake";
import { ContactNetworkCanvas } from "@/components/ContactNetworkCanvas";
import { siteConfig } from "@/lib/site";

const steps = [
  {
    n: "01",
    title: "Discovery",
    copy: "We review the business problem, workflow, systems, data, and constraints.",
  },
  {
    n: "02",
    title: "Opportunity Map",
    copy: "We identify where AI, automation, integration, or process changes make sense.",
  },
  {
    n: "03",
    title: "Next Step",
    copy: "If there is a good fit, we define a practical path forward before implementation begins.",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="contact-hero section-grid">
        <div className="hero-stars" aria-hidden="true" />
        <div className="orbital orbital--contact" aria-hidden="true" />

        <div className="shell contact-hero__grid">
          <div className="contact-hero__copy">
            <div className="eyebrow">
              <span className="status-dot" />
              AI Integration Assessment
            </div>

            <h1>Bring us the workflow that needs to work better.</h1>

            <p className="lede">
              You do not need a finished AI plan. Tell us what is slow,
              repetitive, disconnected, difficult to search, expensive, or hard
              to scale. We will start there.
            </p>

            <div className="contact-hero__direct">
              <span>DIRECT CONTACT</span>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </div>
          </div>

          <ContactNetworkCanvas />
        </div>
      </section>

      <section className="contact-main">
        <div className="shell contact-main__grid">
          <aside className="contact-sidebar">
            <div className="contact-sidebar__sticky">
              <div className="eyebrow">WHAT HAPPENS NEXT</div>

              <div className="next-steps">
                {steps.map((step) => (
                  <article className="next-step" key={step.n}>
                    <span>{step.n}</span>
                    <div>
                      <strong>{step.title}</strong>
                      <p>{step.copy}</p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="privacy-card">
                <div className="privacy-card__icon">
                  <span />
                </div>
                <div>
                  <strong>Keep credentials out of the form.</strong>
                  <p>
                    Do not send passwords, API secrets, regulated records, or
                    other sensitive credentials through the public intake form.
                  </p>
                </div>
              </div>

              <div className="contact-fit">
                <span>GOOD STARTING POINTS</span>
                <ul>
                  <li>Too much manual data movement</li>
                  <li>Disconnected AI tools</li>
                  <li>Information employees cannot find</li>
                  <li>Repetitive reporting or operations</li>
                  <li>Need for secure human-approved automation</li>
                </ul>
              </div>
            </div>
          </aside>

          <ContactIntake />
        </div>
      </section>

      <section className="contact-bottom-strip">
        <div className="shell">
          <span>STRATEGY</span>
          <i />
          <span>SYSTEMS</span>
          <i />
          <span>DATA</span>
          <i />
          <span>AI</span>
          <i />
          <span>AUTOMATION</span>
          <i />
          <span>SECURITY</span>
        </div>
      </section>
    </>
  );
}
