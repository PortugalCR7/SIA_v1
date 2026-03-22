import type { Block } from 'payload'

export const WhoItsFor: Block = {
  slug: 'whoItsFor',
  labels: { singular: "Who It's For", plural: "Who It's For" },
  fields: [
    { name: 'sectionLabel', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    {
      name: 'body',
      type: 'textarea',
      admin: { description: 'Introductory paragraph displayed beneath the heading.' },
    },
    {
      name: 'fitsHeading',
      type: 'text',
      admin: { description: 'Sub-heading for the "fits" list (e.g. "This Tends To Be A Fit For People Who:")' },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Fit Items',
      admin: { description: 'Each item describes someone who is a good fit for the program.' },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'notFitHeading',
      type: 'text',
      admin: { description: 'Sub-heading for the "not a fit" list (e.g. "This Is Likely Not A Fit If You:")' },
    },
    {
      name: 'notFitItems',
      type: 'array',
      label: 'Not A Fit Items',
      admin: { description: 'Each item describes someone who is likely NOT a fit for the program.' },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
}
