import React from 'react'
import { fetchHeaderData } from '@/entities/header-data'
import { fetchFooterData } from '@/entities/footer-data'
import { fetchUser } from '@/entities/user'
import { Header } from '@/widgets/header'
import { Footer } from '@/widgets/footer'

export default async function GlobalLayout({ children }: { children: React.ReactNode }) {
  const headerData = await fetchHeaderData()
  const footerData = await fetchFooterData()
  const user = await fetchUser()

  return (
    <html lang="en">
      <body>
        <Header data={headerData} user={user} />
        <main>{children}</main>
        <Footer data={footerData} />
      </body>
    </html>
  )
}
