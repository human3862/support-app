'use client'

import React, { useState, useEffect } from 'react'
import type { Header as HeaderType, Media } from '@/payload-types'
import type { User } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/shared/UI/Button'
import { logoutAction } from '@/features/auth'
import { ProfileForm } from '@/entities/user/ui/ProfileForm'

interface HeaderProps {
  data: HeaderType
  user: User | null
  variant?: 'full' | 'onlyLogo'
}

export const Header: React.FC<HeaderProps> = ({ data, user, variant = 'full' }) => {
  const { logo, logoName, navItems } = data
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const logoData = logo as Media
  const avatarData = user?.avatar as Media | null | undefined
  const avatarUrl = avatarData?.url

  const isFull = variant === 'full'

  useEffect(() => {
    if (isOpen || isProfileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, isProfileOpen])

  return (
    <header className="mb-[clamp(35px,6vw,120px)] px-[clamp(10px,8vw,250px)] py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[clamp(20px,3vw,64px)]">
          <Link href="/">
            <div className="flex items-center gap-3">
              {logoData?.url && (
                <Image src={logoData.url} alt={logoData.alt || 'Logo'} height={40} width={30} />
              )}
              <h2 className="font-bold">{logoName}</h2>
            </div>
          </Link>

          {isFull && (
            <nav className="hidden md:flex">
              <ul className="flex flex-wrap items-center gap-[clamp(20px,2vw,40px)]">
                {navItems?.map((item, index) => (
                  <li key={index} className="hover:text-gray-400">
                    <Link href={item?.link || ''}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        {isFull && (
          <div className="flex items-center gap-6">
            {user ? (
              <div className="flex items-center gap-6">
                <button onClick={() => setIsProfileOpen(true)} className="cursor-pointer">
                  <div className="flex items-center gap-4">
                    <p className="hidden font-semibold sm:block">{user?.full_name}</p>
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border-none bg-gray-100">
                      {avatarUrl ? (
                        <Image src={avatarUrl} alt={user.full_name} fill className="object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-blue-500 text-xs font-bold text-white">
                          {user.full_name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-8">
                <Link href="/login" className="flex items-center gap-4 text-sm font-medium">
                  <Image src="/lock.png" alt="Войти" width={18} height={23} />
                  Login
                </Link>
                <div className="hidden sm:block">
                  <Button label="Get Started" variant="ternary" link="/register" />
                </div>
              </div>
            )}

            <button
              className="z-50 flex flex-col gap-1.5 md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span
                className={`h-0.5 w-6 bg-black transition-all ${isOpen ? 'translate-y-2 rotate-45' : ''}`}
              />
              <span className={`h-0.5 w-6 bg-black transition-all ${isOpen ? 'opacity-0' : ''}`} />
              <span
                className={`h-0.5 w-6 bg-black transition-all ${isOpen ? '-translate-y-2 -rotate-45' : ''}`}
              />
            </button>
          </div>
        )}
      </div>

      {/* мобильное навигационное меню */}
      <div
        className={`fixed top-0 right-0 z-40 flex h-full flex-col bg-white p-10 shadow-2xl transition-transform duration-300 md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'} w-full sm:w-1/2`}
      >
        <nav className="mt-20">
          <ul className="flex flex-col items-center gap-8 text-2xl font-bold">
            {navItems?.map((item, index) => (
              <li key={index} onClick={() => setIsOpen(false)}>
                <Link href={item?.link || ''}>{item.label}</Link>
              </li>
            ))}
            {!user && (
              <li className="mt-4 border-t border-gray-100 pt-8" onClick={() => setIsOpen(false)}>
                <Button label="Get Started" variant="ternary" link="/register" />
              </li>
            )}
          </ul>
        </nav>
      </div>

      {/* Панель профиля */}
      <div
        className={`fixed top-0 right-0 z-101 h-full w-full transform bg-white shadow-2xl transition-transform duration-300 sm:max-w-[50vw] xl:max-w-[30vw] ${
          isProfileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col p-6">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-center text-2xl font-bold">Профиль</h2>
            <button onClick={() => setIsProfileOpen(false)} className="cursor-pointer p-2 text-2xl">
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {isProfileOpen && user && <ProfileForm user={user} />}
          </div>

          <div>
            <form action={logoutAction}>
              <button
                type="submit"
                className="w-full rounded-xl bg-gray-100 py-4 font-bold text-red-500 transition-colors hover:bg-red-50"
              >
                Выйти из аккаунта
              </button>
            </form>
          </div>
        </div>
      </div>

      {isProfileOpen && (
        <div className="fixed inset-0 z-100 bg-black/50" onClick={() => setIsProfileOpen(false)} />
      )}
    </header>
  )
}
