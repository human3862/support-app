import React from 'react'
import '../global.css'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Header } from '@/components/layout/Header'
import { headers as getHeaders } from 'next/headers'
export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const payload = await getPayload({ config })
  const headerData = await payload.findGlobal({
    slug: 'header',
  })
  const headers = await getHeaders()

  const { user } = await payload.auth({ headers })

  return (
    <html lang="en">
      <body>
        <Header data={headerData} user={user} variant="onlyLogo" />
        <main>{children}</main>
      </body>
    </html>
  )
}
