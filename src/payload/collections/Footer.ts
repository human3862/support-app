import { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  fields: [
    { name: 'logo', type: 'upload', relationTo: 'media', required: true },
    { name: 'logoName', type: 'text' },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'link', type: 'text' },
      ],
    },
  ],
}
