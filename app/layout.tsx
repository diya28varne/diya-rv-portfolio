import type { Metadata } from "next";
import { Anton, IBM_Plex_Mono, Instrument_Serif, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const title = "Diya R V — Software Engineer";
const description =
  "Final-year Information Science student in Bangalore. Security tools, an explainable intrusion-detection prototype, and a crime-intelligence console built for a state police datathon.";

export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: "Diya R V" }],
  keywords: [
    "Diya R V",
    "software engineer",
    "Bangalore",
    "information science",
    "intrusion detection",
    "ThreatLens",
    "CrimeLens",
    "RefMind",
    "portfolio",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Diya R V",
  jobTitle: "Software Engineer",
  email: "mailto:diyavarne28@gmail.com",
  telephone: "+91-6366100546",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bangalore",
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "MVJ College of Engineering",
  },
  sameAs: [
    "https://github.com/diya28varne",
    "https://www.linkedin.com/in/diya-varne-375422351",
  ],
  knowsLanguage: ["en", "hi", "kn"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
        lang="en"
        suppressHydrationWarning
        className={`${outfit.variable} ${instrument.variable} ${plex.variable} ${anton.variable}`}
      >
      <body className="antialiased">
        <Script id="js-flag" strategy="beforeInteractive">
          {`document.documentElement.classList.add("js")`}
        </Script>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-ivory focus:px-4 focus:py-2 focus:text-night"
        >
          Skip to content
        </a>
        <div className="atmosphere" aria-hidden="true">
          <span className="atmosphere-beam atmosphere-beam--main" />
          <span className="atmosphere-beam atmosphere-beam--soft" />
        </div>
        <div className="grain" aria-hidden="true" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
