'use client'

import { useState } from 'react'

const faqs = [
  {
    question: 'Is this a coaching program?',
    answer:
      'No. Coaching optimises who you already are. Soul Initiation is a crossing — from the self you have been performing to the self that has always been there beneath it. The orientation is fundamentally different.',
  },
  {
    question: 'What makes this different from a retreat or workshop?',
    answer:
      'A retreat is a pause. This is a process. Six months of sustained, intentional work — sessions, integration, and a container that holds you as you move through the gates. Transformation at depth requires time and consistency.',
  },
  {
    question: 'Do I need prior experience with transformational work?',
    answer:
      'Yes. This program is not for beginners. It is for those who have already done significant inner work — therapy, retreat, ceremony, mentorship — and are now at the threshold that those modalities cannot take them through.',
  },
  {
    question: 'How are initiates selected?',
    answer:
      'Every application is reviewed personally. We are looking for genuine readiness — not credentials, achievements, or a particular background. The question we are asking is: is this person truly at the threshold?',
  },
  {
    question: 'What is the time commitment?',
    answer:
      'One 90-minute group session per week, one 60-minute 1:1 per month, and the integration work that naturally unfolds between sessions. Expect to give this the weight it deserves.',
  },
  {
    question: 'Are payment plans available?',
    answer:
      'Yes. We offer a three-payment and six-payment plan. Details are shared during the application conversation. The investment is $12,000 in full.',
  },
]

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="space-y-0">
      {faqs.map((faq, i) => (
        <div key={i} className="border-b border-obsidian-moss/12">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-start justify-between gap-6 py-7 text-left"
          >
            <span className="font-body text-base text-obsidian-moss leading-snug">
              {faq.question}
            </span>
            <span className="font-heading text-2xl text-dried-sage mt-0.5 leading-none shrink-0">
              {open === i ? '−' : '+'}
            </span>
          </button>
          {open === i && (
            <p className="font-body text-sm text-obsidian-moss/65 leading-relaxed pb-7 max-w-2xl">
              {faq.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
