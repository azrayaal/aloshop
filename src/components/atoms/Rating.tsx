import { StarIcon } from '@/components/icons'
import { cn } from '@/lib/cn'

interface RatingProps {
  value: number
  className?: string
}

/** Compact star + numeric rating chip shown on product cards. */
export function Rating({ value, className }: RatingProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md bg-white/90 px-1.5 py-0.5 text-xs font-semibold text-ink shadow-soft backdrop-blur',
        className,
      )}
    >
      <StarIcon className="h-3.5 w-3.5 text-amber-400" />
      {value.toFixed(1)}
    </span>
  )
}
