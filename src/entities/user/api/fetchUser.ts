'use server'

import { getPayload } from 'payload'
import config from '@/payload/payload.config'
import { headers as getHeaders } from 'next/headers'

export async function fetchUser() {
  const nextHeaders = await getHeaders()
  const headers = new Headers(nextHeaders)
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })
  return user
}
