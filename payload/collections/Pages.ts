import { MediaAndTextBlock } from '../blocks/MediaAndTextBlock'
import { PricingPlansBlock } from '../blocks/PricingPlansBlock'
import { SupportBlock } from '../blocks/SupportBlock'
import { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [MediaAndTextBlock, SupportBlock, PricingPlansBlock],
    },
  ],
}
