import { RenderBlocks } from '@/widgets/render-blocks'
import config from '@/payload/payload.config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'

export default async function HomePage() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'home' },
    },
  })

  const page = result.docs[0]

  if (!page) return notFound()

  return (
    <>
      <RenderBlocks blocks={page.layout || []} />
    </>
  )
}
