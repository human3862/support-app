import React from 'react'
import { GlobalLayoutWidget } from '@/widgets/global-layout'
import '../global.css'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  return <GlobalLayoutWidget>{props.children}</GlobalLayoutWidget>
}
