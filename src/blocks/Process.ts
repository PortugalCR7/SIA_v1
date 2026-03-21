import type { Block } from 'payload'

export const Process: Block = {
  slug: 'process',
  labels: { singular: 'Process', plural: 'Processes' },
  fields: [
    { name: 'sectionLabel', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'text' },
    { name: 'phases', type: 'array', fields: [{ name: 'numeral', type: 'text', required: true }, { name: 'name', type: 'text', required: true }, { name: 'body', type: 'text' }] },
  ],
}
