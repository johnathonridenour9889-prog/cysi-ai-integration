import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SiteBoot } from "@/components/SiteBoot";
import { siteConfig } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CYSI | AI Integration Consulting",
    template: "%s | CYSI",
  },
  description: siteConfig.description,
  keywords: [
    "AI integration consulting",
    "AI implementation",
    "AI readiness assessment",
    "workflow automation",
    "business process automation",
    "AI systems integration",
    "AI governance",
    "AI security",
    "RAG integration",
    "AI agents",
    "data integration",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/cysi-favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: "CYSI | AI Integration Consulting",
    description: siteConfig.description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "CYSI — Cyber Systems Integration",
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.email,
    areaServed: "United States",
    serviceType: [
      "AI Integration Consulting",
      "AI Readiness Assessments",
      "Business Process Automation",
      "Data Integration",
      "AI Governance and Security Planning",
    ],
  };

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${plexMono.variable}`}>
        <SiteBoot />
        <div className="ambient ambient--one" aria-hidden="true" />
        <div className="ambient ambient--two" aria-hidden="true" />
        <Nav />
        <main>{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
