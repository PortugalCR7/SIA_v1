import type { Block } from 'payload'

export const AccompaniedBlock: Block = {
  slug: 'accompanied',
  labels: { singular: 'You Are Accompanied, Not Led', plural: 'You Are Accompanied Sections' },
  admin: { group: 'Guides & Accompaniment' },
  fields: [
    {
      name: 'sectionLabel',
      type: 'text',
      admin: { description: 'Overline label above the heading. Optional — leave blank to suppress.' },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      admin: { description: 'Primary section heading — e.g. "You Are Accompanied, Not Led".' },
    },
    {
      name: 'paragraph1',
      type: 'textarea',
      admin: {
        description:
          'First paragraph. Opens with the nature of the guides — presence from shared experience.',
      },
    },
    {
      name: 'paragraph2',
      type: 'textarea',
      admin: {
        description:
          'Second paragraph. Describes the guide\'s role — not to provide answers, but to hold relationship with what is unfolding.',
      },
    },
    {
      name: 'paragraph3',
      type: 'textarea',
      admin: {
        description:
          'Third paragraph. Closes the section — presence, discernment, and steadiness earned through passage.',
      },
    },
  ],
}
