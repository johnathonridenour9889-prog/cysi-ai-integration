import { PageHeader } from "@/components/PageHeader";

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="LEGAL"
        title="Website Terms"
        description="Starter website terms for Cyber Systems. Review with legal counsel before production use."
      />
      <section className="section-pad">
        <div className="shell legal-copy">
          <h2>Informational use</h2>
          <p>
            Content on this website describes Cyber Systems services and general
            technology concepts. It does not create a consulting engagement or
            guarantee a particular business result.
          </p>

          <h2>Project scope</h2>
          <p>
            Specific deliverables, responsibilities, pricing, security requirements,
            and service levels are defined in the applicable written agreement for
            each engagement.
          </p>

          <h2>Third-party platforms</h2>
          <p>
            AI models, cloud services, software vendors, and other third-party
            systems are governed by their own terms, availability, pricing, and
            security controls.
          </p>

          <h2>Intellectual property</h2>
          <p>
            Cyber Systems branding and original website content may not be copied
            or represented as another organization’s work without permission.
          </p>
        </div>
      </section>
    </>
  );
}
