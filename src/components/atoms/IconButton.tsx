import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  /** Optional numeric badge shown at the top-right (e.g. cart count). */
  badge?: number
  label: string
}

/** Circular icon-only button with an optional notification badge. */
export function IconButton({ children, badge, label, className, ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        'relative inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition',
        'hover:bg-surface-sunken active:scale-95',
        className,
      )}
      {...props}
    >
      {children}
      {badge != null && badge > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-4 text-white">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </button>
  )
}
