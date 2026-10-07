"use client";

import { FormEvent, useMemo, useState } from "react";
import { siteConfig } from "@/lib/site";

const goals = [
  "AI Strategy",
  "Systems Integration",
  "Workflow Automation",
  "Internal Assistant",
  "Data / RAG",
  "Security & Governance",
];

type SubmissionResult = {
  success?: boolean;
  reference?: string;
  confirmationSent?: boolean;
  supportEmail?: string;
  message?: string;
};

export function ContactIntake() {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [status, setStatus] = useState("");
  const [stage, setStage] = useState("Exploring");
  const [submitting, setSubmitting] = useState(false);

  const progress = useMemo(() => {
    let score = 28;
    if (selectedGoals.length) score += 22;
    if (stage !== "Exploring") score += 10;
    return Math.min(score, 60);
  }, [selectedGoals, stage]);

  function toggleGoal(goal: string) {
    setSelectedGoals((current) =>
      current.includes(goal)
        ? current.filter((item) => item !== goal)
        : [...current, goal]
    );
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const name = String(form.get("name") || "");
    const company = String(form.get("company") || "");
    const email = String(form.get("email") || "");
    const challenge = String(form.get("challenge") || "");
    const systems = String(form.get("systems") || "");
    const website = String(form.get("website") || "");

    setSubmitting(true);
    setStatus("Submitting your assessment…");

    try {
      const response = await fetch("/api/assessment.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          company,
          email,
          challenge,
          systems,
          stage,
          goals: selectedGoals,
          website,
          source: "CYSI assessment page",
        }),
      });

      const result = (await response.json().catch(() => ({}))) as SubmissionResult;
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Submission failed.");
      }

      const reference = result.reference ? ` Reference: ${result.reference}.` : "";
      const confirmation = result.confirmationSent
        ? ` A confirmation email was sent to ${email}.`
        : ` Your request was received successfully.${reference}`;

      setStatus(
        result.confirmationSent
          ? `Request received.${reference}${confirmation}`
          : `Request received.${reference} If you need to add anything, email ${siteConfig.email}.`
      );

      formElement.reset();
      setSelectedGoals([]);
      setStage("Exploring");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Submission failed.";
      setStatus(`${message} You can also contact us directly at ${siteConfig.email}.`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="intake-shell">
      <div className="intake-shell__bar">
        <div>
          <span className="intake-kicker">ASSESSMENT INTAKE</span>
          <strong>CYSI / DISCOVERY-01</strong>
        </div>
        <div className="intake-status">
          <i />
          SECURE INTAKE
        </div>
      </div>

      <form className="contact-intake" onSubmit={submitForm}>
        <div className="intake-section">
          <div className="intake-section__head">
            <span>01</span>
            <div>
              <strong>WHO ARE WE TALKING TO?</strong>
              <small>Basic contact information</small>
            </div>
          </div>

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

          <label className="cysi-honeypot" aria-hidden="true">
            <span>Website</span>
            <input name="website" type="text" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="intake-section">
          <div className="intake-section__head">
            <span>02</span>
            <div>
              <strong>WHAT ARE YOU EVALUATING?</strong>
              <small>Select any areas that apply</small>
            </div>
          </div>

          <div className="goal-grid">
            {goals.map((goal) => {
              const active = selectedGoals.includes(goal);
              return (
                <button
                  key={goal}
                  className={`goal-chip ${active ? "goal-chip--active" : ""}`}
                  type="button"
                  onClick={() => toggleGoal(goal)}
                  aria-pressed={active}
                  disabled={submitting}
                >
                  <span>{active ? "✓" : "+"}</span>
                  {goal}
                </button>
              );
            })}
          </div>

          <label className="stage-field">
            <span>Where are you right now?</span>
            <select
              value={stage}
              onChange={(event) => setStage(event.target.value)}
              disabled={submitting}
            >
              <option>Exploring</option>
              <option>Planning a project</option>
              <option>Already using AI tools</option>
              <option>Need to fix an existing implementation</option>
            </select>
          </label>
        </div>

        <div className="intake-section">
          <div className="intake-section__head">
            <span>03</span>
            <div>
              <strong>MAP THE ENVIRONMENT</strong>
              <small>No technical perfection required</small>
            </div>
          </div>

          <label>
            <span>Current systems / tools</span>
            <input
              name="systems"
              type="text"
              placeholder="Example: Microsoft 365, SQL Server, Salesforce, QuickBooks, internal software"
              disabled={submitting}
            />
          </label>

          <label>
            <span>What are you trying to improve?</span>
            <textarea
              name="challenge"
              rows={6}
              placeholder="Tell us what is slow, repetitive, disconnected, difficult to search, expensive, or hard to scale."
              disabled={submitting}
              required
            />
          </label>
        </div>

        <div className="intake-readiness">
          <div className="intake-readiness__top">
            <span>DISCOVERY SIGNAL</span>
            <strong>{progress}%</strong>
          </div>
          <div className="intake-readiness__track">
            <i style={{ width: `${progress}%` }} />
          </div>
          <p>
            You do not need a finished requirements document. This simply gives us
            enough context to start a useful conversation.
          </p>
        </div>

        <button className="button button--primary intake-submit" type="submit" disabled={submitting}>
          {submitting ? "Submitting…" : "Start an AI Assessment"}
          <span aria-hidden="true">↗</span>
        </button>

        <div className="intake-trust">
          <span>NO GENERIC AI PITCH</span>
          <i />
          <span>NO OBLIGATION</span>
          <i />
          <span>START WITH THE BUSINESS PROBLEM</span>
        </div>

        {status ? <p className="form-status" role="status" aria-live="polite">{status}</p> : null}
      </form>
    </div>
  );
}
