import { cn } from '@/lib/cn'

interface ThumbnailProps {
  /** Real product image URL. When set it is rendered as an <img>. */
  src?: string
  /** Alt text for the image (product name). */
  alt?: string
  /** Emoji fallback shown when no image is available. */
  glyph?: string
  /** Tailwind gradient classes for the fallback backdrop. */
  gradient?: string
  className?: string
}

/**
 * Product image. Renders the real photo when `src` is provided, otherwise falls
 * back to a soft gradient tile with an emoji glyph.
 */
export function Thumbnail({ src, alt = '', glyph, gradient = 'from-slate-100 to-slate-200', className }: ThumbnailProps) {
  if (src) {
    // The sizing className is applied to a wrapper so the <img> can safely fill
    // it (avoids h-full/h-20 utility conflicts) and rounded corners get clipped.
    return (
      <div className={cn('overflow-hidden bg-surface-sunken', className)}>
        <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
      </div>
    )
  }
  return (
    <div className={cn('flex items-center justify-center bg-gradient-to-br text-4xl', gradient, className)} aria-hidden>
      <span className="drop-shadow-sm">{glyph}</span>
    </div>
  )
}

interface ProductImageProps {
  src?: string
  glyph?: string
  alt?: string
  className?: string
}

/**
 * Small square product image used in list rows (cart, orders, checkout).
 * Shows the real photo or an emoji fallback inside a rounded tile.
 */
export function ProductImage({ src, glyph, alt = '', className }: ProductImageProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={cn('shrink-0 rounded-xl bg-surface-sunken object-cover', className)}
      />
    )
  }
  return (
    <span className={cn('flex shrink-0 items-center justify-center rounded-xl bg-surface-sunken text-xl', className)}>
      {glyph}
    </span>
  )
}
