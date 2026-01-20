import React from 'react'
import { Page } from '@/shared/types/payload-types'
import { MediaAndText } from '@/widgets/media-and-text'
import { Support } from '@/widgets/support'
import { PricingPlans } from '@/widgets/pricing-plans'

type Block = NonNullable<Page['layout']>[number]

const blockComponents: Record<string, React.FC<any>> = {
  mediaAndText: MediaAndText,
  supportBlock: Support,
  pricingPlansBlock: PricingPlans,
}

export const RenderBlocks = ({ blocks }: { blocks: Block[] | null | undefined }) => {
  if (!blocks || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block, index) => {
        const { blockType } = block

        if (blockType in blockComponents) {
          const Component = blockComponents[blockType]
          return <Component key={block.id || index} {...block} />
        }

        return null
      })}
    </>
  )
}
