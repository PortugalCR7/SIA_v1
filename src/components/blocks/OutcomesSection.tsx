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
        <div className="grid md:grid-cols-2 gap-x-12 mt-12">
          {changes.map(({ label, body }, i) => (
            <div key={i} className={`reveal delay-${i + 1} group border-t border-ink/[0.1] pt-10 pb-12 md:pr-16 cursor-default transition-shadow duration-500 hover:shadow-[0_0_60px_rgba(0,0,0,0.06)]`}>
              <div className="flex items-center gap-0 mb-6 overflow-hidden"><span className="w-0 h-px bg-ink group-hover:w-12 transition-[width,margin-right] duration-500 shrink-0 mr-0 group-hover:mr-6" />
                <h3 className="font-heading text-[2rem] md:text-[2.5rem] text-ink group-hover:translate-x-2 transition-transform duration-300 font-bold">{label}</h3>
              </div>
              <p className="font-body text-[1rem] text-ink/60 group-hover:text-ink/80 leading-relaxed font-medium transition-colors duration-500 translate-y-1 group-hover:translate-y-0">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
