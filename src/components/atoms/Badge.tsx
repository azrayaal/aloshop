import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type BadgeTone = 'brand' | 'discount' | 'neutral' | 'warning' | 'success'

const toneStyles: Record<BadgeTone, string> = {
  brand: 'bg-brand-600 text-white',
  discount: 'bg-red-500 text-white',
  neutral: 'bg-surface-sunken text-ink-soft',
  warning: 'bg-amber-100 text-amber-700',
  success: 'bg-brand-100 text-brand-700',
}

interface BadgeProps {
  children: ReactNode
  tone?: BadgeTone
  className?: string
}

/** Small pill label used for discounts, statuses and tags. */
export function Badge({ children, tone = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold leading-tight',
        toneStyles[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
