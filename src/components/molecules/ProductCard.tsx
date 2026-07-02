import { useState } from 'react'
import { HeartIcon, PlusIcon } from '@/components/icons'
import { Badge } from '@/components/atoms/Badge'
import { Price } from '@/components/atoms/Price'
import { Rating } from '@/components/atoms/Rating'
import { Thumbnail } from '@/components/atoms/Thumbnail'
import { cn } from '@/lib/cn'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  onAdd?: (product: Product) => void
}

/** Grid product card with discount badge, wishlist toggle and add button. */
export function ProductCard({ product, onAdd }: ProductCardProps) {
  const [wished, setWished] = useState(Boolean(product.favorite))

  return (
    <article className="flex flex-col overflow-hidden rounded-card bg-white shadow-card">
      <div className="relative">
        <Thumbnail
          src={product.image}
          alt={product.name}
          glyph={product.glyph}
          gradient={product.gradient}
          className="aspect-square w-full"
        />
        {product.discountPct != null && (
          <Badge tone="success" className="absolute left-2 top-2">
            Diskon {product.discountPct}%
          </Badge>
        )}
        <button
          type="button"
          aria-label={wished ? 'Hapus dari wishlist' : 'Tambah ke wishlist'}
          aria-pressed={wished}
          onClick={() => setWished((v) => !v)}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-soft backdrop-blur"
        >
          <HeartIcon className={cn('h-4 w-4', wished ? 'fill-red-500 text-red-500' : 'text-ink-soft')} />
        </button>
        <Rating value={product.rating} className="absolute bottom-2 left-2" />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug text-ink">
          {product.name}
        </h3>
        <div className="mt-auto flex items-end justify-between">
          <Price amount={product.price} original={product.originalPrice} />
          <button
            type="button"
            aria-label={`Tambah ${product.name} ke keranjang`}
            onClick={() => onAdd?.(product)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white shadow-soft transition active:scale-90"
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </article>
  )
}
