import React from 'react'
import { Page } from '@/payload-types'
import { MediaAndText } from './MediaAndText'
import { Support } from './Support'
import { PricingPlans } from './PricingPlans'

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
