"use client";

import SplitHeading from "@/components/SplitHeading";

interface Change {
  label: string;
  body: string;
}

interface OutcomesSectionProps {
  sectionLabel?: string;
  heading: string;
  changes?: Change[];
}

export default function OutcomesSection({
  sectionLabel = "What Tends to Change",
  heading,
  changes = [],
}: OutcomesSectionProps) {
  return (
    <section className="bg-parchment section-py px-6 md:px-14">
      <div className="max-w-6xl mx-auto">
        <p className="reveal overline text-ink/40 font-bold mb-12 flex items-center gap-6"><span className="rule-gold w-12" />{sectionLabel}</p>
        <SplitHeading className="font-heading text-ink mb-0 font-bold max-w-5xl"
          style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }} stagger={55} baseDelay={80}>
          {heading}
        </SplitHeading>
        <div className="grid md:grid-cols-2 gap-x-12 mt-14">
          {changes.map(({ label, body }, i) => (
            <div
              key={i}
              className={`reveal delay-${i + 1} group cursor-default pt-10 pb-12 md:pr-16 transition-shadow duration-500 hover:shadow-[0_0_60px_rgba(0,0,0,0.05)]`}
              style={{ borderTop: "1px solid rgba(181,168,152,0.4)" }}
            >
              {/* Hover: gold line slides in, label nudges right */}
              <div className="flex items-center gap-0 mb-5 overflow-hidden">
                <span className="w-0 h-px bg-gold group-hover:w-10 transition-[width,margin-right] duration-500 shrink-0 mr-0 group-hover:mr-5" />
                {/* Label — Cormorant italic for outcomes as lived qualities, not goals */}
                <h3
                  className="font-heading italic font-semibold text-ink group-hover:translate-x-1 transition-transform duration-300"
                  style={{ fontSize: "clamp(1.75rem, 3vw, 2.375rem)" }}
                >
                  {label}
                </h3>
              </div>
              <p className="font-body text-[0.9375rem] text-ink/58 group-hover:text-ink/78 leading-relaxed font-normal transition-colors duration-500 translate-y-1 group-hover:translate-y-0">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
