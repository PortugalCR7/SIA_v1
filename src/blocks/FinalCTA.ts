import type { Block } from 'payload'

export const FinalCTA: Block = {
  slug: 'finalCta',
  labels: { singular: 'Final CTA', plural: 'Final CTAs' },
  fields: [
    { name: 'sectionLabel', type: 'text' },
    { name: 'headline', type: 'text', required: true },
    { name: 'body', type: 'textarea' },
    { name: 'ctaLabel', type: 'text' },
    { name: 'ctaUrl', type: 'text' },
  ],
}
