import { ChevronDownIcon, PinIcon } from '@/components/icons'

interface LocationBarProps {
  label: string
  address: string
}

/** "Kirim ke <store>" selector shown under the header. */
export function LocationBar({ label, address }: LocationBarProps) {
  return (
    <button type="button" className="flex w-full items-center gap-2 text-left">
      <PinIcon className="h-5 w-5 shrink-0 text-brand-600" />
      <div className="flex min-w-0 items-center gap-2">
        <span className="shrink-0 text-sm text-ink-soft">{label}</span>
        <span className="truncate text-sm font-semibold text-ink">{address}</span>
      </div>
      <ChevronDownIcon className="h-4 w-4 shrink-0 text-ink-soft" />
    </button>
  )
}
