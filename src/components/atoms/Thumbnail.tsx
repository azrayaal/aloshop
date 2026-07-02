import { cn } from '@/lib/cn'

interface ThumbnailProps {
  /** Emoji or short glyph used as a stand-in for product imagery. */
  glyph: string
  /** Tailwind gradient classes for the backdrop, e.g. "from-brand-100 to-brand-200". */
  gradient?: string
  className?: string
}

/**
 * Product image placeholder. In a real build this would be an <img>; here it
 * renders a soft gradient tile with an emoji so the layout reads clearly
 * without shipping binary assets.
 */
export function Thumbnail({ glyph, gradient = 'from-slate-100 to-slate-200', className }: ThumbnailProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center bg-gradient-to-br text-4xl',
        gradient,
        className,
      )}
      aria-hidden
    >
      <span className="drop-shadow-sm">{glyph}</span>
    </div>
  )
}
