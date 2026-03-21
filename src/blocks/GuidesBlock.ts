import type { Block } from 'payload'

export const GuidesBlock: Block = {
  slug: 'guides',
  labels: { singular: 'Guides Section', plural: 'Guides Sections' },
  fields: [
    { name: 'sectionLabel', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'guides', type: 'relationship', relationTo: 'guides', hasMany: true },
  ],
}
