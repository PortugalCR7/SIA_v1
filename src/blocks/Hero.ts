import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    { name: 'sectionLabel', type: 'text', defaultValue: 'Soul Initiation Academy', admin: { description: 'Overline label shown above the headline. Default: "Soul Initiation Academy"' } },
    { name: 'headline', type: 'text', required: true, admin: { description: 'Primary H1. Use \\n to split onto two lines. E.g. "You\'ve Done the Work."' } },
    { name: 'subheadline', type: 'text', admin: { description: 'Italic line rendered directly below the headline. E.g. "But Something in You Knows You Haven\'t Crossed Yet."' } },
    {
      name: 'tagline',
      type: 'textarea',
      admin: {
        description: 'Short descriptive paragraph displayed beneath the subheadline, before the stat bar. E.g. "A six-month initiation for people at a real threshold in their life — not seeking more insight, but a way to move through."',
      },
    },
    { name: 'statBar', type: 'array', admin: { description: 'Key program facts shown as label/value pairs (e.g. Duration / 6 Months).' }, fields: [{ name: 'label', type: 'text', required: true }, { name: 'value', type: 'text', required: true }] },
    {
      name: 'bottomCaption',
      type: 'text',
      admin: {
        description: 'Small italic caption rendered below the stat bar. E.g. "Begins April 2026 · Small cohort (6–12) · Group + 1:1 mentoring · Application required"',
      },
    },
    { name: 'ctaLabel', type: 'text' },
    { name: 'ctaUrl', type: 'text' },
    { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
    { name: 'backgroundVideoMp4', type: 'upload', relationTo: 'media', admin: { description: 'Optional MP4 video for hero background' } },
    { name: 'backgroundVideoWebm', type: 'upload', relationTo: 'media', admin: { description: 'Optional WebM video for hero background' } },
  ],
}
