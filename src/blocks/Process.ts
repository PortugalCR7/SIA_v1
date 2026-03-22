import type { Block } from 'payload'

export const Process: Block = {
  slug: 'process',
  labels: { singular: 'Arc of Initiation', plural: 'Arc of Initiation Sections' },
  admin: { group: 'How It Works' },
  fields: [
    {
      name: 'sectionLabel',
      type: 'text',
      admin: { description: 'Overline label that appears above the heading. Default: "How It Works".' },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      admin: { description: 'Primary section heading — e.g. "The Arc of Initiation".' },
    },
    {
      name: 'subheading',
      type: 'textarea',
      admin: { description: 'Introductory paragraph displayed beneath the heading.' },
    },
    {
      name: 'phases',
      type: 'array',
      admin: { description: 'Each phase of the arc. Add exactly four: Separation, Descent, Threshold, Return.' },
      fields: [
        {
          name: 'numeral',
          type: 'text',
          required: true,
          admin: { description: 'Phase number as displayed — e.g. "1", "2", "3", "4".' },
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: { description: 'Phase name — e.g. "Separation", "Descent", "Threshold", "Return".' },
        },
        {
          name: 'body',
          type: 'textarea',
          admin: { description: 'Description of what happens in this phase. One to three sentences.' },
        },
      ],
    },
  ],
}
