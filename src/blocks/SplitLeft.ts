import type { Block } from 'payload'

export const SplitLeft: Block = {
  slug: 'splitLeft',
  labels: { singular: 'Split Left', plural: 'Split Lefts' },
  fields: [
    { name: 'sectionLabel', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'body', type: 'textarea' },
    { name: 'items', type: 'array', fields: [{ name: 'num', type: 'text', required: true }, { name: 'label', type: 'text', required: true }, { name: 'body', type: 'text' }] },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
}
