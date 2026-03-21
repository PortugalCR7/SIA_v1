import type { Block } from 'payload'

export const WhoItsFor: Block = {
  slug: 'whoItsFor',
  labels: { singular: "Who It's For", plural: "Who It's For" },
  fields: [
    { name: 'sectionLabel', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'items', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
}
