import type { Block } from 'payload'

export const WhatThisRequires: Block = {
  slug: 'whatThisRequires',
  labels: { singular: 'What This Requires', plural: 'What This Requires' },
  fields: [
    { name: 'sectionLabel', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'stats', type: 'array', fields: [{ name: 'label', type: 'text', required: true }, { name: 'value', type: 'text', required: true }, { name: 'note', type: 'text' }] },
  ],
}
