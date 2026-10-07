"use client";

import { useState } from "react";

type Node = {
  id: string;
  label: string;
  detail: string;
};

const leftNodes: Node[] = [
  { id: "sql", label: "SQL / DATA", detail: "Databases, structured data, analytics stores, and operational records." },
  { id: "crm", label: "CRM / ERP", detail: "Customer, finance, operations, and business-system data." },
  { id: "docs", label: "DOCUMENTS", detail: "PDFs, policies, procedures, knowledge bases, and internal files." },
  { id: "apps", label: "BUSINESS APPS", detail: "Internal software, SaaS platforms, support systems, and workflows." },
];

const aiNodes: Node[] = [
  { id: "openai", label: "OPENAI", detail: "Commercial language and reasoning models selected when they fit the use case." },
  { id: "anthropic", label: "ANTHROPIC", detail: "Claude models evaluated for capability, controls, and business fit." },
  { id: "google", label: "GOOGLE", detail: "Gemini and Google Cloud AI capabilities when appropriate." },
  { id: "microsoft", label: "MICROSOFT", detail: "Copilot and Azure AI services for Microsoft-centered environments." },
];

const outcomeNodes: Node[] = [
  { id: "automate", label: "AUTOMATE", detail: "Reduce repetitive work with controlled business-process automation." },
  { id: "assist", label: "ASSIST", detail: "Give employees access to useful AI inside the tools and data they already use." },
  { id: "analyze", label: "ANALYZE", detail: "Turn connected data into reporting, summaries, detection, and decision support." },
  { id: "act", label: "ACT", detail: "Allow bounded, permissioned actions with rules and human approval where required." },
];

export function ArchitectureMap() {
  const [active, setActive] = useState<Node | null>(null);

  function NodeButton({ node }: { node: Node }) {
    return (
      <button
        className={`arch-node ${active?.id === node.id ? "arch-node--active" : ""}`}
        onMouseEnter={() => setActive(node)}
        onFocus={() => setActive(node)}
        onMouseLeave={() => setActive(null)}
        onBlur={() => setActive(null)}
        type="button"
      >
        <span className="arch-node__dot" />
        <span>{node.label}</span>
      </button>
    );
  }

  return (
    <div className="architecture">
      <div className="architecture__grid" aria-hidden="true" />
      <div className="architecture__orbit architecture__orbit--one" aria-hidden="true" />
      <div className="architecture__orbit architecture__orbit--two" aria-hidden="true" />

      <div className="architecture__column">
        <span className="architecture__label">BUSINESS SYSTEMS</span>
        {leftNodes.map((node) => <NodeButton node={node} key={node.id} />)}
      </div>

      <div className="architecture__bus" aria-hidden="true">
        <span className="packet packet--one" />
        <span className="packet packet--two" />
        <span className="packet packet--three" />
      </div>

      <div className="architecture__core">
        <div className="architecture__core-ring architecture__core-ring--outer" />
        <div className="architecture__core-ring architecture__core-ring--inner" />
        <div className="architecture__core-body">
          <span className="architecture__core-kicker">CYBER SYSTEMS</span>
          <strong>INTEGRATION</strong>
          <span>STRATEGY · DATA · APIs · CONTROL</span>
        </div>
      </div>

      <div className="architecture__bus architecture__bus--right" aria-hidden="true">
        <span className="packet packet--one" />
        <span className="packet packet--two" />
        <span className="packet packet--three" />
      </div>

      <div className="architecture__column">
        <span className="architecture__label">AI PLATFORMS</span>
        {aiNodes.map((node) => <NodeButton node={node} key={node.id} />)}
      </div>

      <div className="architecture__outcomes">
        <span className="architecture__label">BUSINESS OUTCOMES</span>
        <div className="architecture__outcome-grid">
          {outcomeNodes.map((node) => <NodeButton node={node} key={node.id} />)}
        </div>
      </div>

      <div className="architecture__control">
        <span>HUMAN CONTROL</span>
        <i />
        <span>SECURITY</span>
        <i />
        <span>MEASUREMENT</span>
      </div>

      <div className={`architecture__detail ${active ? "architecture__detail--active" : ""}`}>
        <span>{active ? "NODE ACTIVE" : "HOVER A NODE"}</span>
        <strong>{active?.label ?? "EXPLORE THE ARCHITECTURE"}</strong>
        <p>
          {active?.detail ??
            "The integration layer connects business systems, approved AI platforms, security controls, and measurable operational outcomes."}
        </p>
      </div>
    </div>
  );
}
