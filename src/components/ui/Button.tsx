import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'

const variants: Record<Variant, string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 active:scale-[0.98] shadow-soft',
  secondary: 'border border-brand-200 bg-white text-brand-700 hover:bg-brand-50 active:scale-[0.98]',
  ghost: 'text-ink-soft hover:bg-surface-sunken',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  icon?: ReactNode
  fullWidth?: boolean
  children: ReactNode
}

/** Primary storefront button with variants. */
export function Button({ variant = 'primary', icon, fullWidth, children, className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition',
        variants[variant],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  )
}
