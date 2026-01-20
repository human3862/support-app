'use client'
import { useActionState } from 'react'
import { sendToTelegram } from '@/features/subscribe-by-email'
import { Header as HeaderType, Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/shared/UI/Button'
import { Input } from '@/shared/UI/Input'

interface FooterProps {
  data: HeaderType
}

export const Footer: React.FC<FooterProps> = ({ data }) => {
  const { logo, logoName, navItems } = data
  const logoData = logo as Media
  const [state, formAction, isPending] = useActionState(sendToTelegram, null)
  return (
    <footer>
      <div className="text-white">
        <div className="bg-grey-light flex flex-col items-center gap-5 py-[clamp(40px,5vw,200px)]">
          <h3 className="p-0.5 text-center text-[clamp(24px,3vw,36px)] font-semibold">
            Subscribe to get notified about update
          </h3>
          <p className="mb-[clamp(12px,3vw,24px)] text-center text-gray-400">
            By subscribing with your mail, you will accept our privacy policy
          </p>
          <div>
            <form action={formAction} className="flex flex-wrap justify-center gap-4">
              <Input
                placeholder="Enter your email"
                variant="secondary"
                type="email"
                name="email"
                required
              />
              <Button
                label={isPending ? '...' : 'Subscribe us'}
                variant="secondary"
                type="submit"
              />
            </form>
            {state?.success && <p className="p-1 text-center text-green-500">{state.success}</p>}
            {state?.error && <p className="p-1 text-center text-red-500">{state.error}</p>}
          </div>
        </div>
        <div className="bg-grey-black flex flex-col items-center justify-between p-[clamp(10px,3vw,31px)] px-[clamp(20px,10vw,400px)] md:flex-row">
          <div className="mb-8 flex items-center gap-4 md:mb-0">
            {logoData?.url && (
              <Image src={logoData.url} alt={logoData.alt || 'Logo'} height={40} width={30} />
            )}
            <h2 className="text-[20px] font-bold">{logoName}</h2>
          </div>
          <nav>
            <ul className="flex flex-wrap justify-center gap-8">
              {navItems?.map((item, index) => (
                <li key={index} className="hover:text-gray-400">
                  {item?.link ? (
                    <Link href={item.link}>{item.label}</Link>
                  ) : (
                    <Link href="">{item.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
