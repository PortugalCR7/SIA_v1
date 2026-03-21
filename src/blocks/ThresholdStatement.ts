import type { Block } from 'payload'

export const ThresholdStatement: Block = {
  slug: 'thresholdStatement',
  labels: { singular: 'Threshold Statement', plural: 'Threshold Statements' },
  fields: [
    { name: 'sectionLabel', type: 'text' },
    { name: 'headline', type: 'text', required: true },
    { name: 'emphasisWord', type: 'text', admin: { description: 'The word that gets gold emphasis, e.g. "Threshold."' } },
    { name: 'quote', type: 'textarea' },
    { name: 'quoteCaption', type: 'text' },
    { name: 'collapseLabel', type: 'text', defaultValue: 'The Modern Collapse:' },
    { name: 'collapseItems', type: 'array', fields: [{ name: 'label', type: 'text', required: true }, { name: 'body', type: 'text' }] },
  ],
}
