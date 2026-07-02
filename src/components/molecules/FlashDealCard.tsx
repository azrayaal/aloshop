import { Badge } from '@/components/atoms/Badge'
import { Price } from '@/components/atoms/Price'
import { ProgressBar } from '@/components/atoms/ProgressBar'
import { Thumbnail } from '@/components/atoms/Thumbnail'
import type { FlashDeal } from '@/types'

interface FlashDealCardProps {
  deal: FlashDeal
}

/** Horizontal-carousel card for a time-limited flash deal. */
export function FlashDealCard({ deal }: FlashDealCardProps) {
  const isLowStock = deal.stockLeft != null
  const progress = isLowStock
    ? deal.stockLeft! / deal.stockTotal
    : (deal.soldCount ?? 0) / deal.stockTotal
  const caption = isLowStock ? `Sisa ${deal.stockLeft}` : `Terjual ${deal.soldCount}`

  return (
    <article className="flex w-40 shrink-0 flex-col overflow-hidden rounded-card bg-white shadow-card">
      <div className="relative">
        <Thumbnail glyph={deal.glyph} gradient={deal.gradient} className="aspect-[4/3] w-full" />
        <Badge tone="discount" className="absolute left-0 top-2 rounded-l-none rounded-r-md">
          -{deal.discountPct}%
        </Badge>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug text-ink">
          {deal.name}
        </h3>
        <Price amount={deal.price} original={deal.originalPrice} size="sm" />
        <div className="mt-1 space-y-1">
          <ProgressBar
            value={progress}
            trackClassName="bg-surface-sunken"
            indicatorClassName={isLowStock ? 'bg-red-500' : 'bg-amber-400'}
          />
          <span className="text-[10px] font-semibold text-ink-soft">{caption}</span>
        </div>
      </div>
    </article>
  )
}
