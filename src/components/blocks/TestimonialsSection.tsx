"use client";

import SplitHeading from "@/components/SplitHeading";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

interface TestimonialsSectionProps {
  sectionLabel?: string;
  heading: string;
  testimonials?: Testimonial[];
}

export default function TestimonialsSection({
  sectionLabel = "Participants",
  heading,
  testimonials = [],
}: TestimonialsSectionProps) {
  // Staggered vertical rhythm: card 2 drops 24px, card 3 returns to baseline
  const offsets = ["", "md:mt-6", ""];

  return (
    <section className="bg-cream section-py px-6 md:px-14">
      <div className="max-w-6xl mx-auto">
        <p className="reveal overline text-ink/40 font-bold mb-12 flex items-center gap-6"><span className="rule-gold w-10" />{sectionLabel}</p>
        <SplitHeading className="font-heading text-ink mb-20 font-bold"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }} stagger={70} baseDelay={80}>
          {heading}
        </SplitHeading>
        <div className="grid md:grid-cols-3 gap-8 md:items-start">
          {testimonials.map(({ quote, name, role }, i) => (
            <div key={i} className={`t-card group reveal delay-${i + 1} relative overflow-hidden bg-parchment p-10 md:p-12 border border-ink/[0.08] hover:border-ink/[0.18] transition-colors duration-500 shadow-sm ${offsets[i] ?? ""}`}>
              {/* Full-bleed typographic gesture — absolute behind content */}
              <span aria-hidden="true" className="absolute -top-6 -left-3 font-heading text-[9rem] text-ink/[0.07] group-hover:text-ink/[0.13] transition-colors duration-500 leading-none pointer-events-none select-none">&ldquo;</span>
              <p className="relative font-heading text-[1.5rem] md:text-[1.75rem] text-ink italic leading-snug mb-10 font-bold mt-10">{quote}</p>
              <div className="flex items-center gap-4"><span className="rule-gold opacity-40 w-8" /><p className="overline text-ink/40 font-bold">{name} {"\u2014"} {role}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
