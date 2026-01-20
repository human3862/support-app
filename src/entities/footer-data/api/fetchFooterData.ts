import { getPayload } from 'payload'
import config from '@/payload/payload.config'

export async function fetchFooterData() {
  const payload = await getPayload({ config })
  const footerData = await payload.findGlobal({ slug: 'footer' })
  return footerData
}
