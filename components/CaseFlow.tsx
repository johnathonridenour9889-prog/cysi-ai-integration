const beforeSteps = [
  "AD PLATFORMS",
  "SPREADSHEETS",
  "MANUAL REVIEW",
  "REPORT",
  "INVOICE",
];

const afterSteps = [
  "APIs",
  "DATA LOGIC",
  "AUTOMATION",
  "OUTPUT",
];

const pipelineSteps = [
  "COLLECT",
  "VALIDATE",
  "AUTOMATE",
  "DELIVER",
];

export function CaseFlow() {
  return (
    <div className="case-flow" aria-label="Manual versus integrated reporting workflow">
      <div className="case-flow__track">
        <div className="case-flow__label">BEFORE</div>
        <div className="case-flow__nodes">
          {beforeSteps.map((item, index) => (
            <div className="case-flow__node case-flow__node--manual" key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="case-flow__bridge">
        <div className="case-flow__label">INTEGRATION LAYER</div>

        <div className="case-flow__pipeline">
          <div className="case-flow__pipeline-track">
            <i />
          </div>

          <div className="case-flow__pipeline-steps">
            {pipelineSteps.map((step, index) => (
              <div className="case-flow__pipeline-step" key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>

          <p className="case-flow__caption">
            Manual handoffs are pulled into one connected workflow that validates data,
            automates processing, and delivers output faster.
          </p>
        </div>
      </div>

      <div className="case-flow__track">
        <div className="case-flow__label">AFTER</div>
        <div className="case-flow__nodes case-flow__nodes--after">
          {afterSteps.map((item, index) => (
            <div
              className="case-flow__node case-flow__node--integrated"
              key={item}
              style={{ animationDelay: `${index * 220}ms` }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
