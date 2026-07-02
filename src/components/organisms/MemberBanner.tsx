import { useState } from 'react'
import { CloseIcon, PinIcon } from '@/components/icons'

interface MemberBannerProps {
  onRegister?: () => void
}

/** Dismissible "become a member" call-to-action above the tab bar. */
export function MemberBanner({ onRegister }: MemberBannerProps) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <section className="flex items-center gap-3 rounded-2xl border border-brand-100 bg-brand-50/60 p-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-brand-600 shadow-soft">
        <PinIcon className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-ink">Yuk, jadi member!</p>
        <p className="truncate text-xs text-ink-soft">Dapatkan gratis ongkir & berbagai keuntungan</p>
      </div>
      <button
        type="button"
        onClick={onRegister}
        className="shrink-0 rounded-full bg-brand-600 px-4 py-2 text-xs font-bold text-white shadow-soft transition active:scale-95"
      >
        Daftar Gratis
      </button>
      <button
        type="button"
        aria-label="Tutup"
        onClick={() => setDismissed(true)}
        className="shrink-0 text-ink-muted transition hover:text-ink"
      >
        <CloseIcon className="h-4 w-4" />
      </button>
    </section>
  )
}
