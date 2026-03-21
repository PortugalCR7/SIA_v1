import type { GlobalConfig } from 'payload'

export const SiteConfig: GlobalConfig = {
  slug: 'site-config',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'siteTitle', type: 'text', required: true, defaultValue: 'Soul Initiation Academy' },
    { name: 'contactEmail', type: 'text', required: true },
    { name: 'copyrightText', type: 'text' },
    { name: 'establishedLine', type: 'text', admin: { description: 'Decorative text e.g. "444 · EST. MMXXIV"' } },
    { name: 'brandTagline', type: 'textarea' },
    {
      name: 'navLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
        { name: 'isExternal', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Twitter', value: 'twitter' },
            { label: 'YouTube', value: 'youtube' },
          ],
        },
        { name: 'url', type: 'text', required: true },
      ],
    },
    { name: 'marqueeRow1', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
    { name: 'marqueeRow2', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
  ],
}
