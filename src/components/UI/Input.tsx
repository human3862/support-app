'use client'

interface inputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClick?: () => void
  variant?: 'primary' | 'secondary'
}

export const Input: React.FC<inputProps> = ({ onClick, variant = `primary`, ...props }) => {
  const baseStyle = ' inline-block rounded-[10px] px-6 py-3  '
  const variants = {
    primary: ' bg-white-blue text-gray-500',
    secondary: ' bg-gray-700 text-white',
  }
  const className = `${baseStyle} ${variants[variant]}`
  return <input className={className} onClick={onClick} {...props} />
}
