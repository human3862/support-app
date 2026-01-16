'use client'

import React from 'react'
import { useState, useActionState } from 'react'
import { Input } from '@/components/UI/Input'
import { Button } from '@/components/UI/Button'
import { updateProfileAction } from '@/actions/auth'
import type { User, Media } from '@/payload-types'
import Image from 'next/image'

export const ProfileForm = ({ user }: { user: User }) => {
  const [state, formAction, isPending] = useActionState(updateProfileAction, null)
  const avatarData = user?.avatar as Media | null
  const [previewUrl, setPreviewUrl] = useState<string | null>(avatarData?.url || null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)

      return () => URL.revokeObjectURL(objectUrl)
    }
  }
  return (
    <section className="flex justify-center">
      <form action={formAction} className="flex flex-col items-start justify-center gap-8">
        <div>
          <p>Аватар</p>
          <div className="flex gap-4">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border-none">
              {previewUrl ? (
                <Image src={previewUrl} alt={user.full_name} fill className="object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-blue-500 text-xs font-bold text-white">
                  {user.full_name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <label className="flex cursor-pointer items-center">
              <Input
                placeholder="Изменить аватар"
                type="file"
                name="avatar"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <div>
                <span>Загрузить фото</span>
              </div>
            </label>
          </div>
        </div>
        <div>
          <p>Почта</p>
          <Input placeholder="Email (нельзя изменить)" value={user.email} disabled />
        </div>
        <div>
          <p>Имя</p>
          <Input placeholder="Ваше имя" name="full_name" defaultValue={user.full_name} required />
        </div>
        <Button label={isPending ? 'Сохраняем...' : 'Сохранить изменения'} type="submit" />
        {state?.success && <p>{state.success}</p>}
        {state?.error && <p>{state.error}</p>}
      </form>
    </section>
  )
}
