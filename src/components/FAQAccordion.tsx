"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How is this different from other coaching or transformation programs?",
    a: "Most programs work on the level of behavior, mindset, or strategy. Soul Initiation works at the level of identity and soul. We are not here to optimize who you are — we are here to help you discover who you actually are beneath the roles, the achievements, and the constructed self.",
  },
  {
    q: "Is this a spiritual or religious program?",
    a: "Soul Initiation Academy is not affiliated with any religion. We draw on the archetypal wisdom present across many traditions — but the work is experiential, not doctrinal. You bring your own cosmology. We simply create the depth of container for it to be lived.",
  },
  {
    q: "Do I need to have done therapy or previous inner work?",
    a: "This program is designed for people who have already done meaningful inner work — therapy, retreat, ceremony, mentorship. This is not an entry-level offering. If you are new to personal development, we recommend beginning there first. This is for those who have already been walking the path.",
  },
  {
    q: "What is the time commitment?",
    a: "Weekly group sessions run 90 minutes. We recommend an additional 1–2 hours per week for reflection, journaling, and integration. Depth requires space. The program runs for six months.",
  },
  {
    q: "What happens after I apply?",
    a: "We will reach out within 3 business days to schedule a conversation. This call is not a sales call — it is a genuine exploration of whether this program and cohort are the right fit for you at this moment. Mutual discernment matters to us.",
  },
  {
    q: "Why only 8 initiates per cohort?",
    a: "The depth this work requires cannot happen in a large group. Eight people is deliberate — it creates the intimacy, safety, and collective field necessary for genuine initiation. Every cohort becomes its own sacred container.",
  },
];

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      {faqs.map(({ q, a }, i) => (
        <div key={i} className="border-t border-obsidian-moss/10">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-start justify-between gap-8 py-7 text-left group cursor-pointer"
            aria-expanded={open === i}
          >
            <span className="font-heading text-[1.25rem] md:text-[1.4375rem] text-obsidian-moss leading-snug group-hover:text-dried-sage transition-colors duration-300">
              {q}
            </span>
            {/* Animated plus/minus */}
            <span
              className="relative flex-shrink-0 mt-1.5 w-5 h-5"
              aria-hidden="true"
            >
              {/* Horizontal bar (always visible) */}
              <span className="absolute top-1/2 left-0 w-full h-px bg-warm-gold -translate-y-1/2 opacity-60 group-hover:opacity-100 transition-opacity duration-200" />
              {/* Vertical bar (rotates to 0 on open) */}
              <span
                className="absolute top-1/2 left-1/2 w-px h-full bg-warm-gold -translate-x-1/2 -translate-y-1/2 opacity-60 group-hover:opacity-100 transition-all duration-300"
                style={{
                  transform: `translate(-50%, -50%) scaleY(${open === i ? 0 : 1})`,
                  opacity: open === i ? 0 : undefined,
                }}
              />
            </span>
          </button>
          <div
            className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              maxHeight: open === i ? "480px" : "0px",
              opacity: open === i ? 1 : 0,
            }}
          >
            <p className="font-body text-[0.9375rem] text-obsidian-moss/65 leading-relaxed pb-8 max-w-2xl border-l-2 border-warm-gold/30 pl-6 ml-0">
              {a}
            </p>
          </div>
        </div>
      ))}
      <div className="border-t border-obsidian-moss/10" />
    </div>
  );
}
