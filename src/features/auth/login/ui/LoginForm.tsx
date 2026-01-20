'use client'
import { useActionState } from 'react'
import { loginAction } from '@/features/auth'
import { Input } from '@/shared/UI/Input'
import { Button } from '@/shared/UI/Button'
export const dynamic = 'force-dynamic'

export const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(loginAction, null)
  return (
    <section className="flex justify-center">
      <div className="flex flex-col items-center gap-8 rounded-3xl border border-white p-[clamp(30px,5vw,70px)] shadow-2xl">
        <form action={formAction} className="flex flex-col justify-center gap-6">
          {state?.error && <div>{state.error}</div>}
          <Input name="email" type="email" required placeholder="Почта" />
          <Input name="password" type="password" required placeholder="Пароль" />

          <Button label={isPending ? 'Входим...' : 'Войти'} disabled={isPending} type="submit" />
        </form>

        <div className="flex flex-col items-center gap-4">
          <p>Нет аккаунта?</p>
          <Button link="/register" label="Регистрация" variant="ternary" />
        </div>
      </div>
    </section>
  )
}
