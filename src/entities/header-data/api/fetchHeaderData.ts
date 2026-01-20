'use server'
import { getPayload } from 'payload'
import config from '@/payload/payload.config'

export async function fetchHeaderData() {
  const payload = await getPayload({ config })
  const headerData = await payload.findGlobal({
    slug: 'header',
  })
  return headerData
}
