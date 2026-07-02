import { CategoryTile } from '@/components/molecules/CategoryTile'
import type { QuickAction } from '@/types'

interface QuickActionsProps {
  actions: QuickAction[]
  onSelect?: (action: QuickAction) => void
}

/** 4-column grid of category / service shortcuts. */
export function QuickActions({ actions, onSelect }: QuickActionsProps) {
  return (
    <section className="grid grid-cols-4 gap-x-2 gap-y-4">
      {actions.map((action) => (
        <CategoryTile key={action.id} action={action} onClick={() => onSelect?.(action)} />
      ))}
    </section>
  )
}
