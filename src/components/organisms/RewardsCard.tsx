import { StarIcon } from '@/components/icons'
import { ProgressBar } from '@/components/atoms/ProgressBar'
import { formatNumber } from '@/lib/format'
import type { Rewards } from '@/types'

interface RewardsCardProps {
  rewards: Rewards
}

/** Dark loyalty card showing the points balance and progress to next tier. */
export function RewardsCard({ rewards }: RewardsCardProps) {
  return (
    <section className="relative overflow-hidden rounded-card bg-night p-5 text-white shadow-card">
      {/* Decorative plus-pattern wash */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(currentColor 1px, transparent 1px), radial-gradient(currentColor 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          backgroundPosition: '0 0, 11px 11px',
        }}
      />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-white/60">
            Aloshop Rewards
          </p>
          <p className="mt-1 text-3xl font-extrabold">
            {formatNumber(rewards.points)} <span className="text-lg font-semibold text-brand-300">pts</span>
          </p>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-500 text-white">
          <StarIcon className="h-6 w-6" />
        </span>
      </div>

      <div className="relative mt-5 space-y-2">
        <div className="flex items-center justify-between text-xs font-medium">
          <span className="text-white/80">{rewards.tier}</span>
          <span className="text-white/60">
            {rewards.pointsToNextTier} pts to {rewards.nextTier}
          </span>
        </div>
        <ProgressBar value={rewards.progress} />
      </div>
    </section>
  )
}
