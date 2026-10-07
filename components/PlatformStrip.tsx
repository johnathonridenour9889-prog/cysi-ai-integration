const platforms = [
  {
    name: "OpenAI",
    type: "LLM & AI",
    logo: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/openai.svg",
    theme: "lightmark",
    logoClass: "logo-openai",
  },
  {
    name: "Microsoft",
    type: "ENTERPRISE AI",
    logo: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/microsoft.svg",
    theme: "plain",
    logoClass: "logo-microsoft",
  },
  {
    name: "Azure",
    type: "CLOUD AI",
    logo: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/microsoft-azure.svg",
    theme: "plain",
    logoClass: "logo-azure",
  },
  {
    name: "Anthropic",
    type: "LLM & AI",
    logo: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/anthropic.svg",
    theme: "plain",
    logoClass: "logo-anthropic",
  },
  {
    name: "Google",
    type: "CLOUD AI",
    logo: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/google.svg",
    theme: "plain",
    logoClass: "logo-google",
  },
  { name: "AWS", type: "CLOUD", logo: null, kind: "aws", theme: "plain", logoClass: "logo-aws" },
  {
    name: "Salesforce",
    type: "BUSINESS PLATFORM",
    logo: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/salesforce.svg",
    theme: "plain",
    logoClass: "logo-salesforce",
  },
  { name: "SQL", type: "DATA", logo: null, kind: "sql", theme: "plain", logoClass: "logo-sql" },
  { name: "REST APIs", type: "INTEGRATION", logo: null, kind: "rest", theme: "plain", logoClass: "logo-rest" },
] as const;

function GenericTechIcon({ kind }: { kind: "aws" | "sql" | "rest" }) {
  if (kind === "aws") {
    return (
      <svg viewBox="0 0 80 64" aria-hidden="true">
        <text
          x="40"
          y="26"
          textAnchor="middle"
          fontSize="28"
          fontWeight="700"
          letterSpacing="0.01em"
          fill="#F7FAFF"
          fontFamily="Arial, Helvetica, sans-serif"
        >
          aws
        </text>
        <path
          d="M23 36.5c8.5 5.1 24.8 5.4 34.1 1.5"
          stroke="#FF9900"
          strokeWidth="4.2"
          strokeLinecap="round"
        />
        <path
          d="m51.5 35.6 5.7 1.4-1.5 5"
          stroke="#FF9900"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (kind === "sql") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <defs>
          <linearGradient id="sqlTopV14" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#9BE7FF" />
            <stop offset="1" stopColor="#68CEFF" />
          </linearGradient>
          <linearGradient id="sqlUpperV14" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#63CCFF" />
            <stop offset="1" stopColor="#25AEEB" />
          </linearGradient>
          <linearGradient id="sqlLowerV14" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#34B9F5" />
            <stop offset="1" stopColor="#1192D2" />
          </linearGradient>
        </defs>
        <g filter="drop-shadow(0 4px 8px rgba(0,0,0,.28))">
          <ellipse cx="32" cy="16" rx="15.5" ry="6.8" fill="url(#sqlTopV14)" />
          <path d="M16.5 16v8.5c0 3.8 7 6.8 15.5 6.8s15.5-3 15.5-6.8V16" fill="url(#sqlUpperV14)" />
          <ellipse cx="32" cy="24.5" rx="15.5" ry="6.8" fill="#66D0FF" />
          <path d="M16.5 24.5V33c0 3.8 7 6.8 15.5 6.8s15.5-3 15.5-6.8v-8.5" fill="url(#sqlLowerV14)" />
          <ellipse cx="32" cy="33" rx="15.5" ry="6.8" fill="#41C0F5" />
          <path d="M16.5 33v7.2c0 3.8 7 6.8 15.5 6.8s15.5-3 15.5-6.8V33" fill="#1588C8" />
          <ellipse cx="32" cy="40.2" rx="15.5" ry="6.8" fill="#33B3EA" />
          <path d="M20 21.4c1.7 1.2 6.5 2.5 12 2.5 5.8 0 10.4-1.2 12-2.5" stroke="#D7F6FF" strokeOpacity=".6" strokeWidth="1.2" fill="none" />
          <path d="M20 29.8c1.7 1.2 6.5 2.5 12 2.5 5.8 0 10.4-1.2 12-2.5" stroke="#D7F6FF" strokeOpacity=".5" strokeWidth="1.2" fill="none" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="apiStroke" x1="10" y1="12" x2="54" y2="52">
          <stop offset="0" stopColor="#A9E1FF" />
          <stop offset=".58" stopColor="#52BFFF" />
          <stop offset="1" stopColor="#76E3C0" />
        </linearGradient>
      </defs>
      <path d="M22 16 10 32l12 16" fill="none" stroke="url(#apiStroke)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m42 16 12 16-12 16" fill="none" stroke="url(#apiStroke)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m36 12-8 40" fill="none" stroke="#D3F1FF" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function PlatformStrip() {
  return (
    <section className="platform-strip" aria-label="Technologies we work with">
      <div className="shell platform-strip__inner">
        <div className="platform-strip__label">
          <span className="status-dot" />
          <div>
            <strong>TECHNOLOGIES WE WORK WITH</strong>
            <small>Selected based on business fit — not vendor loyalty.</small>
          </div>
        </div>

        <div className="platform-modules">
          {platforms.map((platform, index) => (
            <div className="platform-module platform-module--logo" key={platform.name}>
              <span className="platform-module__index">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className={`platform-module__logo platform-module__logo--${platform.theme} ${platform.logoClass}`}>
                {platform.logo ? (
                  <img
                    src={platform.logo}
                    alt=""
                    width="48"
                    height="48"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <GenericTechIcon kind={platform.kind} />
                )}
              </div>

              <strong>{platform.name}</strong>
              <small>{platform.type}</small>
              <i aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
