"use client";

import SplitHeading from "@/components/SplitHeading";

interface Testimonial {
  id?: string;
  quote: string;
  name?: string | null;
  role?: string | null;
}

interface TestimonialsSectionProps {
  sectionLabel?: string;
  heading: string;
  testimonials?: Testimonial[];
}

// Explicit arrays — keeps Tailwind and globals.css delay classes statically determinable
const DELAYS = ["delay-1", "delay-2", "delay-3"] as const;
// Card 2 drops on desktop for organic staggered rhythm
const OFFSETS = ["", "md:mt-10", ""] as const;

export default function TestimonialsSection({
  sectionLabel = "Participants",
  heading,
  testimonials = [],
}: TestimonialsSectionProps) {
  return (
    <section className="bg-cream section-py px-6 md:px-14">
      <div className="max-w-6xl mx-auto">

        {/* Overline — JetBrains Mono / tracked / gold rule */}
        <p className="reveal overline text-ink/40 font-bold mb-12 flex items-center gap-6">
          <span className="rule-gold w-10" />
          {sectionLabel}
        </p>

        {/* Section heading — Cormorant bold, word-by-word reveal */}
        <SplitHeading
          className="font-heading text-ink font-bold mb-20"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
          }}
          stagger={70}
          baseDelay={80}
        >
          {heading}
        </SplitHeading>

        {/* Quote grid — 3 columns on md+, single column on mobile */}
        <div className="grid md:grid-cols-3 gap-8 md:items-start">
          {testimonials.map(({ quote, name, role }, i) => {
            const hasAttribution = Boolean(name);
            return (
              <div
                key={i}
                className={`t-card group reveal ${DELAYS[i] ?? "delay-1"} relative overflow-hidden bg-parchment ${OFFSETS[i] ?? ""}`}
                style={{
                  padding: "clamp(2rem, 3.5vw, 2.75rem)",
                  border: "1px solid rgba(181,168,152,0.28)",
                }}
              >
                {/* Ghost opening quotation mark — typographic depth, never competes with copy */}
                <span
                  aria-hidden="true"
                  className="absolute -top-3 -left-2 font-heading text-ink/[0.055] group-hover:text-ink/[0.1] transition-colors duration-500 leading-none pointer-events-none select-none"
                  style={{ fontSize: "clamp(5rem, 10vw, 9rem)" }}
                >
                  &ldquo;
                </span>

                {/* Quote body — the primary typographic act: Cormorant italic, reads slowly */}
                <p
                  className="relative font-heading italic font-normal text-ink"
                  style={{
                    fontSize: "clamp(1.25rem, 2vw, 1.625rem)",
                    lineHeight: 1.45,
                    marginTop: "2.25rem",
                    marginBottom: hasAttribution ? "2rem" : 0,
                  }}
                >
                  {quote}
                </p>

                {/* Attribution — conditionally rendered; hidden for anonymous testimonials */}
                {hasAttribution && (
                  <div className="flex items-center gap-4">
                    <span className="rule-gold opacity-35 w-8" />
                    <p className="overline text-ink/38 font-bold">
                      {name}{role ? ` \u2014 ${role}` : ""}
                    </p>
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
