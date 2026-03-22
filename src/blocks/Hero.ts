import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    // ─── COPY ────────────────────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: 'Copy',
      admin: { initCollapsed: false },
      fields: [
        {
          name: 'sectionLabel',
          type: 'text',
          defaultValue: 'Soul Initiation Academy',
          admin: { description: 'Overline label shown above the headline. Default: "Soul Initiation Academy"' },
        },
        {
          name: 'headline',
          type: 'text',
          required: true,
          admin: { description: 'Primary H1. Use \\n to split onto two lines. E.g. "You\'ve Done the Work."' },
        },
        {
          name: 'subheadline',
          type: 'text',
          admin: { description: 'Italic line rendered directly below the headline. E.g. "But Something in You Knows You Haven\'t Crossed Yet."' },
        },
        {
          name: 'tagline',
          type: 'textarea',
          admin: {
            description: 'Short descriptive paragraph beneath the subheadline, before the stat bar. E.g. "A six-month initiation for people at a real threshold in their life — not seeking more insight, but a way to move through."',
          },
        },
      ],
    },
    // ─── PROGRAM STATS ───────────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: 'Program Stats',
      admin: { initCollapsed: false },
      fields: [
        {
          name: 'statBar',
          type: 'array',
          admin: { description: 'Key program facts shown as label/value pairs (e.g. label: "Duration", value: "6 Months"). Displayed as an editorial stat bar.' },
          fields: [
            { name: 'label', type: 'text', required: true, admin: { description: 'Descriptor, e.g. "Duration" or "A full container for real transition"' } },
            { name: 'value', type: 'text', required: true, admin: { description: 'The prominent value, e.g. "6 Months" or "6–12 max"' } },
          ],
        },
        {
          name: 'bottomCaption',
          type: 'text',
          admin: {
            description: 'Small italic caption below the stat bar. E.g. "Begins April 2026 · Small cohort (6–12) · Group + 1:1 mentoring · Application required"',
          },
        },
      ],
    },
    // ─── CALL TO ACTION ───────────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: 'Call to Action',
      admin: { initCollapsed: false },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'ctaLabel',
              type: 'text',
              admin: { description: 'Button text. E.g. "Begin Your Application"', width: '50%' },
            },
            {
              name: 'ctaUrl',
              type: 'text',
              admin: { description: 'Button destination. E.g. "#apply" or "/apply"', width: '50%' },
            },
          ],
        },
      ],
    },
    // ─── BACKGROUND MEDIA ────────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: 'Background Media',
      admin: { initCollapsed: true },
      fields: [
        { name: 'backgroundImage', type: 'upload', relationTo: 'media', admin: { description: 'Fallback image shown before the video loads, and on devices that do not support video.' } },
        { name: 'backgroundVideoMp4', type: 'upload', relationTo: 'media', admin: { description: 'Optional MP4 hero background video (autoplay, muted, looped).' } },
        { name: 'backgroundVideoWebm', type: 'upload', relationTo: 'media', admin: { description: 'Optional WebM hero background video — served to browsers that support it for better compression.' } },
      ],
    },
  ],
}
