'use server'

import { getPayload } from 'payload'
import { revalidatePath } from 'next/cache'
import configPromise from '@/payload-config'
import { headers as getHeaders } from 'next/headers'

export type ActionState = {
  error?: string
  success?: string
} | null

export async function upDateProfileAction(prevState: ActionState, formData: FormData) {
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers: await getHeaders() })

  if (!user) return { error: 'Не авторизован' }

  const full_name = formData.get('full_name') as string
  const avatarFile = formData.get('avatar') as File

  try {
    let avatarId = user.avatar

    if (avatarFile && avatarFile.size > 0) {
      const media = await payload.create({
        collection: 'media',
        data: { alt: `Avatar for ${full_name}` },
        file: {
          data: Buffer.from(await avatarFile.arrayBuffer()),
          name: avatarFile.name,
          size: avatarFile.size,
          mimetype: avatarFile.type,
        },
      })
      avatarId = media.id
    }
    await payload.update({
      collection: 'users',
      id: user.id,
      data: { full_name, avatar: avatarId },
    })
    revalidatePath('/profile')
    return { success: 'Данные обновлены!' }
  } catch (_) {
    return { error: 'Ошибка при обновлении' }
  }
}
