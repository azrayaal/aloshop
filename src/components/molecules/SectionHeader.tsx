import type { ReactNode } from 'react'
import { ChevronRightIcon } from '@/components/icons'

interface SectionHeaderProps {
  title: string
  /** Optional right-aligned action, e.g. "Lihat semua". */
  actionLabel?: string
  onAction?: () => void
  /** Extra node rendered under the title (e.g. a countdown). */
  subtitle?: ReactNode
}

/** Consistent section heading with an optional "see all" link. */
export function SectionHeader({ title, actionLabel, onAction, subtitle }: SectionHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <h2 className="text-lg font-bold text-ink">{title}</h2>
        {subtitle && <div className="mt-1">{subtitle}</div>}
      </div>
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex shrink-0 items-center gap-0.5 text-sm font-semibold text-brand-600"
        >
          {actionLabel}
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
