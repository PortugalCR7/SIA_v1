import type { Block } from 'payload'

export const Outcomes: Block = {
  slug: 'outcomes',
  labels: { singular: 'Outcomes', plural: 'Outcomes' },
  fields: [
    { name: 'sectionLabel', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'changes', type: 'array', fields: [{ name: 'label', type: 'text', required: true }, { name: 'body', type: 'text' }] },
  ],
}
