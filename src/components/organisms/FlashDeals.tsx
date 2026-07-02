import { CountdownPill } from '@/components/molecules/CountdownPill'
import { FlashDealCard } from '@/components/molecules/FlashDealCard'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import type { FlashDeal } from '@/types'

interface FlashDealsProps {
  deals: FlashDeal[]
  countdownSeconds: number
}

/** Flash-deal section: countdown header + horizontally scrolling cards. */
export function FlashDeals({ deals, countdownSeconds }: FlashDealsProps) {
  return (
    <section className="space-y-3">
      <SectionHeader
        title="Flash Deals"
        actionLabel="Lihat semua"
        subtitle={<CountdownPill seconds={countdownSeconds} />}
      />
      <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
        {deals.map((deal) => (
          <FlashDealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </section>
  )
}
