import type { Block } from 'payload'

export const FinalCTA: Block = {
  slug: 'finalCta',
  labels: { singular: 'Final CTA', plural: 'Final CTAs' },
  admin: { group: 'Closing & Conversion' },
  fields: [
    {
      name: 'sectionLabel',
      type: 'text',
      admin: { description: 'Overline label above the headline. Optional — leave blank to suppress.' },
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      admin: { description: 'Primary closing headline — e.g. "If You Recognize Yourself in This, You May Already Be at the Threshold."' },
    },
    {
      name: 'body',
      type: 'textarea',
      admin: { description: 'First body paragraph. Speaks directly to the reader\'s present moment and the nature of the crossing.' },
    },
    {
      name: 'bodySecondary',
      type: 'textarea',
      admin: { description: 'Second body paragraph. Addresses the cohort timing and the application as the first step — e.g. "The April 2026 cohort is small by design..."' },
    },
    {
      name: 'tagline',
      type: 'text',
      admin: { description: 'Badge/stamp line rendered beneath the body — e.g. "APRIL 2026 · 6–12 PARTICIPANTS · APPLICATION REQUIRED". Displayed in uppercase tracking.' },
    },
    {
      name: 'ctaLabel',
      type: 'text',
      admin: { description: 'Call-to-action button label — e.g. "Begin Your Application".' },
    },
    {
      name: 'ctaUrl',
      type: 'text',
      admin: { description: 'CTA destination URL or anchor — e.g. "#apply-form".' },
    },
  ],
}
