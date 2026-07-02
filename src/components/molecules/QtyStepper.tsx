import { MinusIcon, PlusIcon } from '@/components/icons'

interface QtyStepperProps {
  qty: number
  onChange: (qty: number) => void
  min?: number
}

/** Compact -/+ quantity control used in the cart. */
export function QtyStepper({ qty, onChange, min = 0 }: QtyStepperProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label="Kurangi"
        onClick={() => onChange(qty - 1)}
        disabled={qty <= min}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-ink transition disabled:opacity-40 active:scale-90"
      >
        <MinusIcon className="h-4 w-4" />
      </button>
      <span className="w-6 text-center text-sm font-bold tabular-nums text-ink">{qty}</span>
      <button
        type="button"
        aria-label="Tambah"
        onClick={() => onChange(qty + 1)}
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white transition active:scale-90"
      >
        <PlusIcon className="h-4 w-4" />
      </button>
    </div>
  )
}
