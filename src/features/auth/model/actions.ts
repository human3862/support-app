'use server'

import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import configPromise from '@/payload-config'

export type ActionState = {
  error?: string
  success?: string
} | null

export async function registerAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const payload = await getPayload({ config: configPromise })

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const full_name = formData.get('full_name') as string

  let isSuccess = false

  try {
    await payload.create({
      collection: 'users',
      data: {
        email,
        password,
        full_name,
        role: 'user',
      },
    })

    isSuccess = true
  } catch (error) {
    console.error('Ошибка Payload:', error)
    return { error: 'Ошибка регистрации, попробуйте еще раз или проверьте email' }
  }

  if (isSuccess) {
    revalidatePath('/admin', 'layout')
    redirect('/login')
  }

  return null
}

export async function loginAction(prevState: ActionState, formData: FormData) {
  const payload = await getPayload({ config: configPromise })
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    const result = await payload.login({
      collection: 'users',
      data: { email, password },
    })

    if (result.token) {
      const cookieStore = await cookies()

      cookieStore.set('payload-token', result.token, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 1 день
      })
    }

    revalidatePath('/', 'layout')
  } catch (_) {
    return { error: 'Неверный логин или пароль' }
  }

  redirect('/')
}

export async function logoutAction() {
  ;(await cookies()).delete('payload-token')
  redirect('/')
}
