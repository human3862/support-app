'use client'

import Link from 'next/link'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary' | 'ternary'
  onClick?: () => void
  link?: string
}

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  type = 'button',
  onClick,
  link,
  ...props
}) => {
  const baseStyles = 'px-6 py-3  rounded-[10px] font-medium cursor-pointer inline-block '
  const variants = {
    primary: 'text-white bg-yellow-light',
    secondary: 'text-black bg-yellow-light',
    ternary: 'text-orange-light bg-white-light',
  }

  const className = `${baseStyles} ${variants[variant]}`

  if (link) {
    return (
      <Link href={link}>
        <button type={type} className={className} onClick={onClick} {...props}>
          {label}
        </button>
      </Link>
    )
  }

  return (
    <button type={type} className={className} onClick={onClick} {...props}>
      {label}
    </button>
  )
}
