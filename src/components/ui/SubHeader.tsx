import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeftIcon } from '@/components/icons'

interface SubHeaderProps {
  title: string
  /** Optional element rendered on the right (e.g. an action). */
  action?: ReactNode
  /** Override the default "go back" behaviour. */
  onBack?: () => void
}

/** Sticky header for sub-pages with a back button and centered title. */
export function SubHeader({ title, action, onBack }: SubHeaderProps) {
  const navigate = useNavigate()
  return (
    <header className="sticky top-0 z-20 flex items-center gap-2 border-b border-slate-100 bg-surface px-3 py-3">
      <button
        type="button"
        aria-label="Kembali"
        onClick={onBack ?? (() => navigate(-1))}
        className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition hover:bg-surface-sunken"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      <h1 className="flex-1 truncate text-base font-bold text-ink">{title}</h1>
      {action}
    </header>
  )
}
