import { CategoryTile } from '@/components/molecules/CategoryTile'
import type { QuickAction } from '@/types'

interface QuickActionsProps {
  actions: QuickAction[]
}

/** 4-column grid of category / service shortcuts. */
export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <section className="grid grid-cols-4 gap-x-2 gap-y-4">
      {actions.map((action) => (
        <CategoryTile key={action.id} action={action} />
      ))}
    </section>
  )
}
