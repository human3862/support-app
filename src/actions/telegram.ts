'use server'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
export type ActionState = {
  success?: string
  error?: string
} | null

export async function sendToTelegram(prevState: ActionState, formData: FormData) {
  const email = formData.get('email') as string
  const payload = await getPayload({ config: configPromise })
  const token = process.env.TELEGRAM_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!email) return { error: 'введите почту' }

  try {
    const message = `новая подписвка ${email}`
    const url = `https://api.telegram.org/bot${token}/sendMessage`
    await payload.create({
      collection: 'subscribers',
      data: { email },
    })

    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message }),
    })

    return { success: 'Успешно отправлено!' }
  } catch (_) {
    return { error: 'ошибка' }
  }
}
