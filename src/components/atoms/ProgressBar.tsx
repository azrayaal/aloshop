import { cn } from '@/lib/cn'

interface ProgressBarProps {
  /** Completion ratio 0–1. */
  value: number
  className?: string
  trackClassName?: string
  indicatorClassName?: string
}

/** Thin rounded progress track used for rewards tiers and stock levels. */
export function ProgressBar({
  value,
  className,
  trackClassName,
  indicatorClassName,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, value * 100))
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn('h-1.5 w-full overflow-hidden rounded-full bg-white/25', trackClassName, className)}
    >
      <div
        className={cn('h-full rounded-full bg-brand-400 transition-[width]', indicatorClassName)}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
