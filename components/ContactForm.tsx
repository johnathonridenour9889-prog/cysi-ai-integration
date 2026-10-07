"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "@/lib/site";

type SubmissionResult = {
  success?: boolean;
  reference?: string;
  confirmationSent?: boolean;
  message?: string;
};

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const name = String(form.get("name") || "");
    const company = String(form.get("company") || "");
    const email = String(form.get("email") || "");
    const challenge = String(form.get("challenge") || "");
    const website = String(form.get("website") || "");

    setSubmitting(true);
    setStatus("Submitting your assessment…");

    try {
      const response = await fetch("/api/assessment.php", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          company,
          email,
          challenge,
          website,
          stage: "Exploring",
          goals: [],
          systems: "",
          source: "CYSI contact form",
        }),
      });

      const result = (await response.json().catch(() => ({}))) as SubmissionResult;
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Submission failed.");
      }

      const reference = result.reference ? ` Reference: ${result.reference}.` : "";
      setStatus(
        result.confirmationSent
          ? `Request received.${reference} A confirmation email was sent to ${email}.`
          : `Request received.${reference} If you need to add anything, email ${siteConfig.email}.`
      );
      formElement.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Submission failed.";
      setStatus(`${message} You can also contact us directly at ${siteConfig.email}.`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={submitForm}>
      <div className="form-grid">
        <label>
          <span>Name</span>
          <input name="name" type="text" placeholder="Your name" autoComplete="name" required />
        </label>
        <label>
          <span>Company</span>
          <input name="company" type="text" placeholder="Company name" autoComplete="organization" required />
        </label>
      </div>

      <label>
        <span>Work email</span>
        <input name="email" type="email" placeholder="you@company.com" autoComplete="email" required />
      </label>

      <label>
        <span>What are you trying to improve?</span>
        <textarea
          name="challenge"
          rows={7}
          placeholder="Tell us about the workflow, system, data problem, or AI opportunity you want to evaluate."
          required
        />
      </label>

      <label className="cysi-honeypot" aria-hidden="true">
        <span>Website</span>
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <button className="button button--primary" type="submit" disabled={submitting}>
        {submitting ? "Submitting…" : "Start an AI Assessment"}
        <span aria-hidden="true">↗</span>
      </button>

      <p className="form-note">
        No sales funnel. No generic AI pitch. Start with the business problem.
      </p>

      {status ? <p className="form-status" role="status" aria-live="polite">{status}</p> : null}
    </form>
  );
}
