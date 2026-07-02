import { cn } from '@/lib/cn'
import { formatIDR } from '@/lib/format'

interface PriceProps {
  amount: number
  /** Original price shown with a strikethrough when discounted. */
  original?: number
  className?: string
  size?: 'sm' | 'md'
}

/** Displays the selling price with an optional struck-through original price. */
export function Price({ amount, original, className, size = 'md' }: PriceProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      {original != null && original > amount && (
        <span className="text-[11px] font-medium text-ink-muted line-through">
          {formatIDR(original)}
        </span>
      )}
      <span
        className={cn(
          'font-extrabold text-brand-700',
          size === 'md' ? 'text-base' : 'text-sm',
        )}
      >
        {formatIDR(amount)}
      </span>
    </div>
  )
}
