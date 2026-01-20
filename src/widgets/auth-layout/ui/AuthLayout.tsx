import React from 'react'
import { Header } from '@/widgets/header'
import { fetchHeaderData } from '@/entities/header-data'
import { fetchUser } from '@/entities/user'

export default async function AuthLayoutWidget({ children }: { children: React.ReactNode }) {
  const user = await fetchUser()
  const headerData = await fetchHeaderData()
  return (
    <html lang="en">
      <body>
        <Header user={user} data={headerData} variant="onlyLogo" />
        <main>{children}</main>
      </body>
    </html>
  )
}
