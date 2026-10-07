const sources = ["SQL / DATA", "CRM / ERP", "DOCUMENTS", "APIs"];
const outputs = ["AUTOMATION", "ASSISTANTS", "REPORTING", "DECISIONS"];

export function SystemDiagram() {
  return (
    <div className="system-diagram" aria-label="AI integration system diagram">
      <div className="system-diagram__scan" aria-hidden="true" />
      <div className="system-column">
        <span className="system-label">YOUR ENVIRONMENT</span>
        {sources.map((item) => (
          <div className="system-node" key={item}>
            <span className="node-dot" />
            {item}
          </div>
        ))}
      </div>

      <div className="system-core">
        <div className="system-core__ring system-core__ring--one" />
        <div className="system-core__ring system-core__ring--two" />
        <div className="system-core__center">
          <span>CYBER</span>
          <strong>SYSTEMS</strong>
          <small>INTEGRATION LAYER</small>
        </div>
      </div>

      <div className="system-column system-column--right">
        <span className="system-label">BUSINESS OUTCOMES</span>
        {outputs.map((item) => (
          <div className="system-node" key={item}>
            {item}
            <span className="node-dot" />
          </div>
        ))}
      </div>
    </div>
  );
}
