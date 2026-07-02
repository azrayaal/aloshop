import {
  AppleIcon,
  BasketIcon,
  CupIcon,
  GridIcon,
  ReceiptIcon,
  StarIcon,
  TagIcon,
  TruckIcon,
  type IconProps,
} from '@/components/icons'
import { cn } from '@/lib/cn'
import type { QuickAction } from '@/types'

const iconRegistry: Record<QuickAction['icon'], (p: IconProps) => JSX.Element> = {
  receipt: ReceiptIcon,
  tag: TagIcon,
  star: StarIcon,
  truck: TruckIcon,
  basket: BasketIcon,
  apple: AppleIcon,
  cup: CupIcon,
  grid: GridIcon,
}

const toneStyles: Record<NonNullable<QuickAction['tone']>, string> = {
  brand: 'bg-brand-50 text-brand-600',
  red: 'bg-red-50 text-red-500',
  amber: 'bg-amber-50 text-amber-500',
  slate: 'bg-surface-sunken text-ink-soft',
}

interface CategoryTileProps {
  action: QuickAction
  onClick?: () => void
}

/** A single quick-action / category shortcut in the grid. */
export function CategoryTile({ action, onClick }: CategoryTileProps) {
  const Icon = iconRegistry[action.icon]
  return (
    <button type="button" onClick={onClick} className="flex flex-col items-center gap-1.5 text-center">
      <span
        className={cn(
          'flex h-14 w-14 items-center justify-center rounded-2xl shadow-soft',
          toneStyles[action.tone ?? 'slate'],
        )}
      >
        <Icon className="h-6 w-6" />
      </span>
      <span className="text-[11px] font-medium leading-tight text-ink">{action.label}</span>
      {action.caption && (
        <span className="text-[10px] font-semibold text-brand-600">{action.caption}</span>
      )}
    </button>
  )
}
