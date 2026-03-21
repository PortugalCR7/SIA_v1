"use client";

import SplitHeading from "@/components/SplitHeading";
import FAQAccordion from "@/components/FAQAccordion";

interface FAQ {
  question: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Lexical richText JSON
  answer: any;
}

interface FAQSectionProps {
  sectionLabel?: string;
  heading: string;
  faqs?: FAQ[];
}

export default function FAQSection({
  sectionLabel = "FAQ",
  heading,
  faqs = [],
}: FAQSectionProps) {
  return (
    <section className="bg-cream section-py px-6 md:px-14">
      <div className="max-w-4xl mx-auto">
        <p className="reveal overline text-ink/40 font-bold mb-12 flex items-center gap-6"><span className="rule-gold w-10" />{sectionLabel}</p>
        <SplitHeading className="font-heading text-ink mb-16 font-bold"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }} stagger={70} baseDelay={80}>
          {heading}
        </SplitHeading>
        <FAQAccordion faqs={faqs} />
      </div>
    </section>
  );
}
