import type { Block } from 'payload'

export const Offer: Block = {
  slug: 'offer',
  labels: { singular: 'Offer', plural: 'Offers' },
  fields: [
    { name: 'sectionLabel', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'text' },
    { name: 'stepsHeading', type: 'text', defaultValue: 'The next step' },
    { name: 'steps', type: 'array', fields: [{ name: 'label', type: 'text', required: true }, { name: 'body', type: 'text' }] },
    { name: 'investmentLabel', type: 'text', defaultValue: 'Investment' },
    { name: 'investmentHeadline', type: 'text' },
    { name: 'investmentBody', type: 'textarea' },
    { name: 'ctaLabel', type: 'text' },
    { name: 'ctaUrl', type: 'text' },
  ],
}
