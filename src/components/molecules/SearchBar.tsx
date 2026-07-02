import { ScanIcon, SearchIcon } from '@/components/icons'

interface SearchBarProps {
  placeholder?: string
  onScan?: () => void
}

/** Rounded search field with a trailing barcode-scan action. */
export function SearchBar({ placeholder = 'Search products', onScan }: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-soft">
      <SearchIcon className="h-5 w-5 text-ink-muted" />
      <input
        type="search"
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted"
        aria-label="Cari produk"
      />
      <button
        type="button"
        onClick={onScan}
        aria-label="Pindai barcode"
        className="text-ink-soft transition hover:text-brand-600"
      >
        <ScanIcon className="h-5 w-5" />
      </button>
    </div>
  )
}
