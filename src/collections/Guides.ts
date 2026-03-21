import type { CollectionConfig } from 'payload'

export const Guides: CollectionConfig = {
  slug: 'guides',
  access: { read: () => true },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'role', 'order'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'role', type: 'text', admin: { description: 'e.g. "Orientation Guide"' } },
    { name: 'body', type: 'textarea' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
