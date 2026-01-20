'use server'
import { getPayload } from 'payload'
import config from '@/payload-config' 
import { headers as getHeaders } from 'next/headers'

export async function fetchUser() {
  const headers = getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })
  return user
}
