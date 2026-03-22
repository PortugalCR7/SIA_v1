import type { Block } from 'payload'

export const Offer: Block = {
  slug: 'offer',
  labels: { singular: 'Offer', plural: 'Offers' },
  fields: [
    // ─── Section Label ──────────────────────────────────────────────────────
    {
      name: 'sectionLabel',
      type: 'text',
      admin: { description: 'Overline above the heading — e.g. "Investment & Application".' },
    },

    // ─── Investment ─────────────────────────────────────────────────────────
    {
      name: 'heading',
      type: 'text',
      required: true,
      admin: { description: 'Primary section heading — e.g. "Founding Cohort Rate".' },
    },
    {
      name: 'investmentLabel',
      type: 'text',
      defaultValue: 'Investment',
      admin: { description: 'Small overline inside the dark investment card — e.g. "Investment".' },
    },
    {
      name: 'investmentHeadline',
      type: 'text',
      admin: { description: 'The price or rate displayed large — e.g. "$2,500".' },
    },
    {
      name: 'investmentNote',
      type: 'text',
      admin: { description: 'Short note beneath the price — e.g. "Payment plans available upon request."' },
    },
    {
      name: 'investmentBody',
      type: 'textarea',
      admin: { description: 'Supporting commitment statement — e.g. "This is a serious commitment…"' },
    },

    // ─── Next Steps ─────────────────────────────────────────────────────────
    {
      name: 'stepsHeading',
      type: 'text',
      defaultValue: 'What The Next Step Looks Like',
      admin: { description: 'Heading above the numbered steps list.' },
    },
    {
      name: 'steps',
      type: 'array',
      admin: { description: 'Each numbered step. Label = bold title; Body = description.' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'body', type: 'text' },
      ],
    },

    // ─── CTA ────────────────────────────────────────────────────────────────
    {
      name: 'ctaLabel',
      type: 'text',
      admin: { description: 'Button text — e.g. "Begin Your Application".' },
    },
    {
      name: 'ctaUrl',
      type: 'text',
      admin: { description: 'Button destination — e.g. "#apply-form" or an absolute URL.' },
    },

    // ─── Deprecated ─────────────────────────────────────────────────────────
    {
      name: 'subheading',
      type: 'text',
      admin: { description: '(Unused in current layout — leave blank.)' },
    },
  ],
}
