import { CheckCircleIcon } from '@/components/icons'
import { cn } from '@/lib/cn'
import type { StoreInfo } from '@/types'

interface StoreCardProps {
  store: StoreInfo
  className?: string
}

/** Nearest-store card showing distance, stock status and delivery partners. */
export function StoreCard({ store, className }: StoreCardProps) {
  return (
    <div className={cn('flex items-center gap-3 rounded-2xl bg-white p-3 shadow-soft', className)}>
      {/* <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
        🏬
      </span> */}
      <img src="/store.png" className='h-10' alt="" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-ink">
          {store.name} <span className="font-normal text-ink-muted">• {store.distanceKm} km</span>
        </p>
        {store.stockAvailable && (
          <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-brand-600">
            <CheckCircleIcon className="h-3.5 w-3.5" />
            Stock Available
          </p>
        )}
      </div>
      <div className="shrink-0 text-right">
        <p className="text-[11px] text-ink-muted">Delivery via</p>
        <p className="text-xs font-semibold text-brand-600">{store.couriers.join(' • ')}</p>
      </div>
    </div>
  )
}
