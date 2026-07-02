import type { QuickAction } from '@/types'

/**
 * PNG artwork for each quick-action shortcut. Kept local to the tile so the
 * shared SVG icon set (used for ratings, tab bar, etc.) stays untouched.
 */
const iconArt: Record<QuickAction['icon'], string> = {
  receipt: '/topup.png',
  tag: '/promo.png',
  star: '/alopoints.png',
  truck: '/gratisongkir.png',
  basket: '/groceries.png',
  apple: '/fruits.png',
  cup: '/beverages.png',
  grid: '/categories.png',
}

interface CategoryTileProps {
  action: QuickAction
  onClick?: () => void
}

/** A single quick-action / category shortcut in the grid. */
export function CategoryTile({ action, onClick }: CategoryTileProps) {
  return (
    <button type="button" onClick={onClick} className="flex flex-col items-center gap-1.5 text-center">
      <img src={iconArt[action.icon]} alt="" className="h-14 w-14 object-contain" />
      <span className="text-[11px] font-medium leading-tight text-ink">{action.label}</span>
      {action.caption && (
        <span className="text-[10px] font-semibold text-brand-600">{action.caption}</span>
      )}
    </button>
  )
}
