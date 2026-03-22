"use client";

import SplitHeading from "@/components/SplitHeading";

interface AccompaniedSectionProps {
  sectionLabel?: string;
  heading: string;
  paragraph1?: string;
  paragraph2?: string;
  paragraph3?: string;
}

export default function AccompaniedSection({
  sectionLabel = "Guidance",
  heading,
  paragraph1,
  paragraph2,
  paragraph3,
}: AccompaniedSectionProps) {
  return (
    <section className="bg-ink section-py px-6 md:px-14">
      <div className="max-w-6xl mx-auto">

        {/* Overline — JetBrains Mono / uppercase / tracked / gold rule */}
        <p className="reveal overline text-parchment/40 font-bold mb-12 flex items-center gap-6">
          <span className="rule-gold opacity-40 w-12" />
          {sectionLabel}
        </p>

        {/* Primary heading — Cormorant italic, strikes the full container width */}
        <SplitHeading
          className="font-heading italic text-parchment font-semibold max-w-4xl"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
          stagger={70}
          baseDelay={80}
        >
          {heading}
        </SplitHeading>

        {/* Gold hairline — typographic breath between heading and prose */}
        <div
          className="reveal delay-2 mt-10 mb-14"
          style={{
            height: "1px",
            background: "linear-gradient(90deg, var(--gold) 0%, transparent 65%)",
            maxWidth: "6rem",
            opacity: 0.6,
          }}
          aria-hidden="true"
        />

        {/* Prose column — narrow reading measure for contemplative weight */}
        <div className="max-w-2xl flex flex-col gap-8">

          {/* Paragraph 1 — guides have crossed similar terrain */}
          {paragraph1 && (
            <p
              className="reveal delay-2 font-body text-parchment/62 font-normal"
              style={{ fontSize: "clamp(1rem, 1.45vw, 1.125rem)", lineHeight: "1.8" }}
            >
              {paragraph1}
            </p>
          )}

          {/* Paragraph 2 — the guide's role: holding relationship, not providing answers */}
          {paragraph2 && (
            <p
              className="reveal delay-3 font-body text-parchment/62 font-normal"
              style={{ fontSize: "clamp(1rem, 1.45vw, 1.125rem)", lineHeight: "1.8" }}
            >
              {paragraph2}
            </p>
          )}

          {/* Paragraph 3 — closing statement: presence, discernment, steadiness earned */}
          {paragraph3 && (
            <p
              className="reveal delay-4 font-body text-parchment/50 font-normal"
              style={{ fontSize: "clamp(0.9375rem, 1.35vw, 1.0625rem)", lineHeight: "1.8" }}
            >
              {paragraph3}
            </p>
          )}

        </div>
      </div>
    </section>
  );
}
