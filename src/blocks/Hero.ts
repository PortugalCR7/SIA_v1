import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    { name: 'sectionLabel', type: 'text', defaultValue: 'Soul Initiation Academy' },
    { name: 'headline', type: 'text', required: true },
    { name: 'subheadline', type: 'text' },
    { name: 'statBar', type: 'array', fields: [{ name: 'label', type: 'text', required: true }, { name: 'value', type: 'text', required: true }] },
    { name: 'ctaLabel', type: 'text' },
    { name: 'ctaUrl', type: 'text' },
    { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
    { name: 'backgroundVideoMp4', type: 'upload', relationTo: 'media', admin: { description: 'Optional MP4 video for hero background' } },
    { name: 'backgroundVideoWebm', type: 'upload', relationTo: 'media', admin: { description: 'Optional WebM video for hero background' } },
  ],
}
