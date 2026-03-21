import type { Block } from 'payload'

export const SplitRight: Block = {
  slug: 'splitRight',
  labels: { singular: 'Split Right', plural: 'Split Rights' },
  fields: [
    { name: 'sectionLabel', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'body', type: 'textarea' },
    { name: 'notItems', type: 'array', admin: { description: '"This is not" items' }, fields: [{ name: 'text', type: 'text', required: true }] },
    { name: 'isItems', type: 'array', admin: { description: '"This is" items' }, fields: [{ name: 'text', type: 'text', required: true }] },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
}
