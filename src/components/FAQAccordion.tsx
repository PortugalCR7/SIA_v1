"use client";

import { useState } from "react";

interface FAQ {
  question: string;
  answer: string[];
}

interface FAQAccordionProps {
  faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      {faqs.map(({ question, answer }, i) => (
        <div key={i} className="border-t border-ink/[0.08]">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-start justify-between gap-8 py-7 text-left group cursor-pointer"
            aria-expanded={open === i}
          >
            <span className="font-heading text-[1.25rem] md:text-[1.4375rem] text-ink leading-snug group-hover:text-sage transition-colors duration-300">
              {question}
            </span>
            <span className="relative flex-shrink-0 mt-2 w-4 h-4" aria-hidden>
              <span className="absolute top-1/2 left-0 w-full h-px bg-gold -translate-y-1/2 opacity-50 group-hover:opacity-90 transition-opacity" />
              <span
                className="absolute top-1/2 left-1/2 w-px h-full bg-gold -translate-x-1/2 -translate-y-1/2 transition-[opacity,transform] duration-300 opacity-50 group-hover:opacity-90"
                style={{ transform: open === i ? "translate(-50%,-50%) scaleY(0)" : "translate(-50%,-50%) scaleY(1)" }}
              />
            </span>
          </button>
          <div
            className="overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ maxHeight: open === i ? "480px" : "0px", opacity: open === i ? 1 : 0 }}
          >
            <div className="border-l-2 border-gold/25 pl-6 pb-8 max-w-2xl space-y-3">
              {answer.map((para, j) => (
                <p key={j} className="font-body text-[0.9375rem] text-ink/60 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div className="border-t border-ink/[0.08]" />
    </div>
  );
}
