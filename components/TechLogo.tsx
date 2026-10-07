type TechLogoName =
  | "openai"
  | "microsoft"
  | "azure"
  | "anthropic"
  | "google"
  | "aws"
  | "salesforce"
  | "sql"
  | "rest";

export function TechLogo({ name }: { name: TechLogoName }) {
  const common = {
    width: 42,
    height: 42,
    viewBox: "0 0 42 42",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
  } as const;

  switch (name) {
    case "microsoft":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="15" height="15" rx="2" fill="#F25022" />
          <rect x="23" y="4" width="15" height="15" rx="2" fill="#7FBA00" />
          <rect x="4" y="23" width="15" height="15" rx="2" fill="#00A4EF" />
          <rect x="23" y="23" width="15" height="15" rx="2" fill="#FFB900" />
        </svg>
      );

    case "azure":
      return (
        <svg {...common}>
          <path d="M22.5 4 9.8 29.7h9.1L32.2 4H22.5Z" fill="#0089D6" />
          <path d="M23.4 4 37 37.5H26.7l-3.2-8.1-6.2.1L23.4 4Z" fill="#32B0E7" />
          <path d="M16.3 29.6h8.2l-5.8-14.5-2.4 4.8 0 9.7Z" fill="#185A97" opacity=".95" />
        </svg>
      );

    case "anthropic":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="34" height="34" rx="10" fill="#D6B38A" fillOpacity=".18" />
          <path d="M21 8 31.5 34h-5l-2.3-5.9h-6.4L15.5 34h-5L21 8Zm1.2 15.5-3.2-8.3-3.2 8.3h6.4Z" fill="#D6B38A" />
        </svg>
      );

    case "google":
      return (
        <svg {...common} viewBox="0 0 42 42">
          <path d="M37.4 21.5c0-1.2-.1-2.1-.3-3H21v6h9.3c-.2 1.5-1.4 3.8-4 5.3l-.1.4 5.8 4.5.4.1c3.7-3.4 5-8.4 5-13.3Z" fill="#4285F4"/>
          <path d="M21 38.2c4.6 0 8.5-1.5 11.3-4.1l-6.1-4.8c-1.6 1.1-3.7 1.9-5.2 1.9-4.5 0-8.2-2.9-9.5-7l-.4.1-6 4.7-.1.4A17.1 17.1 0 0 0 21 38.2Z" fill="#34A853"/>
          <path d="M11.5 24.2A10.3 10.3 0 0 1 11 21c0-1.1.2-2.2.5-3.2l-.1-.4-6.2-4.8-.2.1A17.2 17.2 0 0 0 3 21c0 2.7.6 5.2 1.9 7.4l6.6-4.2Z" fill="#FBBC05"/>
          <path d="M21 10.8c2.4 0 4.5.8 6.2 2.4l4.6-4.5C29.4 6.4 25.6 4.8 21 4.8A17.1 17.1 0 0 0 5 13l6.5 5a10.2 10.2 0 0 1 9.5-7.2Z" fill="#EA4335"/>
        </svg>
      );

    case "aws":
      return (
        <svg {...common}>
          <text x="21" y="18" textAnchor="middle" fontSize="12" fontWeight="700" fill="#F7F8FA" fontFamily="Inter, Arial, sans-serif">aws</text>
          <path d="M11 24.2c5.2 3.8 14.8 4.1 20.1 1.5" stroke="#FF9900" strokeWidth="2.6" strokeLinecap="round"/>
          <path d="m28.2 23.2 3.4 1-.9 3.1" stroke="#FF9900" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );

    case "salesforce":
      return (
        <svg {...common}>
          <path d="M14 28.6a5.6 5.6 0 0 1 .4-11.2c.8-3.7 4-6.4 7.9-6.4 3.1 0 5.9 1.8 7.1 4.6A6.5 6.5 0 0 1 28 28.6H14Z" fill="#00A1E0"/>
          <text x="21" y="24" textAnchor="middle" fontSize="7.8" fontWeight="700" fill="#fff" fontFamily="Inter, Arial, sans-serif">salesforce</text>
        </svg>
      );

    case "sql":
      return (
        <svg {...common}>
          <ellipse cx="21" cy="10" rx="10.5" ry="4.5" fill="#39B6FF" />
          <path d="M10.5 10v7.2c0 2.5 4.7 4.5 10.5 4.5s10.5-2 10.5-4.5V10" fill="#0D5B87" />
          <path d="M10.5 17.2v7.1c0 2.5 4.7 4.5 10.5 4.5s10.5-2 10.5-4.5v-7.1" fill="#0A729C" />
          <ellipse cx="21" cy="17.2" rx="10.5" ry="4.5" fill="#63CFFF" />
          <ellipse cx="21" cy="24.3" rx="10.5" ry="4.5" fill="#39B6FF" />
        </svg>
      );

    case "rest":
      return (
        <svg {...common}>
          <path d="M9 13 16 21 9 29" stroke="#53B2FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M33 13 26 21 33 29" stroke="#53B2FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M23.6 10 18.4 32" stroke="#9EDCFF" strokeWidth="2.4" strokeLinecap="round"/>
        </svg>
      );

    case "openai":
      return (
        <svg {...common}>
          <g transform="translate(21 21)">
            <path d="M0-11.2a6.3 6.3 0 0 1 5.4 3.1l3.7-2.1A10.5 10.5 0 0 0-10-4.7l3.7 2.1A6.3 6.3 0 0 1 0-11.2Z" fill="#8EE7C5"/>
            <path d="M9.7-5.6a6.3 6.3 0 0 1-.1 6.2l3.7 2.1a10.5 10.5 0 0 0 .1-11l-3.7 2.1Z" fill="#B5F4DD"/>
            <path d="M9.7 5.6a6.3 6.3 0 0 1-5.3 3.2v4.2A10.5 10.5 0 0 0 13.4 7.7L9.7 5.6Z" fill="#54D6A8"/>
            <path d="M0 11.2a6.3 6.3 0 0 1-5.4-3.1l-3.7 2.1A10.5 10.5 0 0 0 0 15.4v-4.2Z" fill="#7DE1BD"/>
            <path d="M-9.7 5.6a6.3 6.3 0 0 1 .1-6.2l-3.7-2.1a10.5 10.5 0 0 0-.1 11l3.7-2.1Z" fill="#C8F8E8"/>
            <path d="M-9.7-5.6a6.3 6.3 0 0 1 5.3-3.2V-13A10.5 10.5 0 0 0-13.4-7.7l3.7 2.1Z" fill="#66DBB1"/>
            <circle cx="0" cy="0" r="4.4" fill="#EAF9F3"/>
          </g>
        </svg>
      );

    default:
      return null;
  }
}
