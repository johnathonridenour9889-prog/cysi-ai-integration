import { PageHeader } from "@/components/PageHeader";

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="LEGAL"
        title="Privacy Policy"
        description="A simple starter privacy policy for the Cyber Systems website. Review with legal counsel before production use."
      />
      <section className="section-pad">
        <div className="shell legal-copy">
          <h2>Information you provide</h2>
          <p>
            When you contact Cyber Systems, you may provide information such as
            your name, company, email address, and details about your business or
            technical requirements. We use that information to respond to your inquiry.
          </p>

          <h2>Website information</h2>
          <p>
            Hosting and analytics providers may process technical information such
            as IP address, browser type, device information, and page activity.
            Configure this section to match the analytics and hosting tools you deploy.
          </p>

          <h2>Business information</h2>
          <p>
            Do not submit passwords, API secrets, regulated records, or other
            sensitive credentials through the public contact form.
          </p>

          <h2>Changes</h2>
          <p>
            This policy may be updated as the website and service providers change.
          </p>
        </div>
      </section>
    </>
  );
}
