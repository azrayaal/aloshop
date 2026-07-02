import {
  GridIcon,
  HomeIcon,
  QrIcon,
  ReceiptIcon,
  UserIcon,
  type IconProps,
} from '@/components/icons'
import { cn } from '@/lib/cn'

interface TabItem {
  id: string
  label: string
  Icon: (p: IconProps) => JSX.Element
}

const tabs: TabItem[] = [
  { id: 'home', label: 'Beranda', Icon: HomeIcon },
  { id: 'category', label: 'Kategori', Icon: GridIcon },
  { id: 'orders', label: 'Pesanan', Icon: ReceiptIcon },
  { id: 'account', label: 'Akun', Icon: UserIcon },
]

interface BottomTabBarProps {
  active?: string
  onChange?: (id: string) => void
}

/** Fixed bottom navigation with a raised central AloPay action. */
export function BottomTabBar({ active = 'home', onChange }: BottomTabBarProps) {
  const [left, right] = [tabs.slice(0, 2), tabs.slice(2)]

  const renderTab = ({ id, label, Icon }: TabItem) => {
    const isActive = id === active
    return (
      <button
        key={id}
        type="button"
        onClick={() => onChange?.(id)}
        className={cn(
          'flex flex-1 flex-col items-center gap-1 py-1 text-[11px] font-medium transition',
          isActive ? 'text-brand-600' : 'text-ink-muted',
        )}
      >
        <Icon className="h-6 w-6" />
        {label}
      </button>
    )
  }

  return (
    <nav className="relative border-t border-slate-100 bg-surface pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center px-2 pt-2">
        {left.map(renderTab)}
        <div className="w-16 shrink-0" aria-hidden />
        {right.map(renderTab)}
      </div>

      {/* Raised central AloPay button */}
      <button
        type="button"
        onClick={() => onChange?.('alopay')}
        className="absolute -top-5 left-1/2 flex -translate-x-1/2 flex-col items-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg ring-4 ring-white">
          <QrIcon className="h-7 w-7" />
        </span>
        <span className="mt-0.5 text-[11px] font-semibold text-brand-600">AloPay</span>
      </button>
    </nav>
  )
}
