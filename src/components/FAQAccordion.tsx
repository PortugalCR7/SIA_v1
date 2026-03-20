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
    <div className="space-y-0">
      {faqs.map(({ q, a }, i) => (
        <div key={i} className="border-t border-obsidian-moss/15">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-start justify-between gap-6 py-7 text-left group"
            aria-expanded={open === i}
          >
            <span className="font-heading text-xl md:text-2xl text-obsidian-moss leading-snug group-hover:text-dried-sage transition-colors duration-200">
              {q}
            </span>
            <span className="font-heading text-2xl text-dried-sage mt-0.5 flex-shrink-0 transition-transform duration-200">
              {open === i ? "−" : "+"}
            </span>
          </button>
          {open === i && (
            <p className="font-body text-base text-obsidian-moss/75 leading-relaxed pb-8 max-w-2xl">
              {a}
            </p>
          )}
        </div>
      ))}
      <div className="border-t border-obsidian-moss/15" />
    </div>
  );
}
