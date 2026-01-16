import React from 'react'
import '../global.css'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import config from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'

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
