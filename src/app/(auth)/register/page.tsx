'use client'

import { Input } from '@/components/UI/Input'
import { useActionState } from 'react'
import { Button } from '@/components/UI/Button'
import { ActionState, registerAction } from '@/actions/auth'

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(registerAction, null)
  return (
    <section className="flex justify-center">
      <div className="flex flex-col items-center justify-center gap-6 rounded-3xl border border-white p-[clamp(30px,5vw,70px)] shadow-2xl">
        <form action={formAction} className="flex flex-col gap-6">
          {state?.error && <div>{state.error}</div>}
          <Input name="full_name" required placeholder="Имя" />
          <Input name="email" required placeholder="Почта" />
          <Input name="password" type="password" minLength={8} required placeholder="Пароль" />

          <Button
            label={isPending ? 'Загрузка...' : 'Зарегестрироваться'}
            disabled={isPending}
            type="submit"
          />
        </form>
        <div className="flex flex-col items-center gap-4">
          <p>У вас уже есть аккаунт?</p>
          <Button link="/login" label="Войти" variant="ternary" />
        </div>
      </div>
    </section>
  )
}
