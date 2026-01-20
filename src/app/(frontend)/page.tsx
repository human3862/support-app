import React from 'react'
import { RenderBlocks } from '@/widgets/render-blocks/ui/RenderBlocks'
import { getPayload } from 'payload'
import config from '@/payload/payload.config'
import { notFound } from 'next/navigation'
export const dynamic = 'force-dynamic'
export default async function Page() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'home' },
    },
  })

  const page = result.docs[0]

  if (!page) return notFound()

  const cleanBlocks = JSON.parse(JSON.stringify(page.layout || []))

  return (
    <>
      <RenderBlocks blocks={cleanBlocks} />
    </>
  )
}
