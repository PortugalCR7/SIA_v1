import type { CollectionConfig } from 'payload'

export const Offers: CollectionConfig = {
  slug: 'offers',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'tagline',
      type: 'text',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'price',
      type: 'number',
      admin: {
        description: 'Leave blank if price is not public',
      },
    },
    {
      name: 'ctaLabel',
      type: 'text',
      defaultValue: 'Apply Now',
    },
    {
      name: 'ctaUrl',
      type: 'text',
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        { name: 'item', type: 'text' },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
