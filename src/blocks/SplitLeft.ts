import type { Block } from 'payload'

export const SplitLeft: Block = {
  slug: 'splitLeft',
  labels: { singular: 'Split Left — Recognition', plural: 'Split Left — Recognition' },
  fields: [
    {
      name: 'sectionLabel',
      type: 'text',
      admin: {
        description: 'Overline label shown above the heading — e.g. "Do You Recognize This?"',
        placeholder: 'Do You Recognize This?',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      admin: {
        description: 'Large display heading (Cormorant Garamond, ~4.5rem). Keep to one strong, complete sentence.',
        placeholder: 'There are moments in life when something begins to shift beneath the surface.',
      },
    },
    {
      name: 'body',
      type: 'textarea',
      admin: {
        description: 'Supporting paragraph below the heading — rendered in Cormorant italic. Continues the thought from the heading.',
        placeholder: 'From the outside, things may still look intact. But internally, the structure that once held you no longer quite does — and you know it, even if you can\'t yet name it.',
      },
    },
    {
      name: 'items',
      type: 'array',
      admin: {
        description: 'Recognition points — each rendered as a bordered row with a ghost numeral, bold label, and supporting description. Typically 3–5 items.',
      },
      fields: [
        {
          name: 'num',
          type: 'text',
          required: true,
          admin: {
            description: 'Display numeral used as ghost background element and mono overline (e.g. "01", "02").',
            placeholder: '01',
            width: '20%',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'Bold recognition statement — rendered in Cormorant italic at 1.44rem.',
            placeholder: 'You\'ve outgrown something',
            width: '80%',
          },
        },
        {
          name: 'body',
          type: 'text',
          admin: {
            description: 'Supporting detail for this recognition point — rendered in Jost at 0.94rem, muted tone.',
            placeholder: 'A way of working, relating, or living that once fit — and no longer does.',
          },
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional — left-panel image with parallax effect. If empty, the default ritual image (/images/ritual.png) is used.',
      },
    },
  ],
}
