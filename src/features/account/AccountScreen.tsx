import { useNavigate } from 'react-router-dom'
import {
  BankIcon,
  ChevronRightIcon,
  GiftIcon,
  HeadsetIcon,
  HeartIcon,
  LogoutIcon,
  PinIcon,
  ReceiptIcon,
  ShieldIcon,
  StarIcon,
  UserIcon,
  type IconProps,
} from '@/components/icons'
import { useAuth } from '@/context/AuthContext'
import { useOrders } from '@/context/OrdersContext'
import { formatNumber } from '@/lib/format'
import { rewards } from '@/data/home'

interface MenuRow {
  id: string
  label: string
  Icon: (p: IconProps) => JSX.Element
  onClick?: () => void
}

/** "Akun" tab — profile, loyalty summary and account menu. */
export function AccountScreen() {
  const { user, logout } = useAuth()
  const { orders } = useOrders()
  const navigate = useNavigate()

  const menu: MenuRow[] = [
    { id: 'orders', label: 'Pesanan Saya', Icon: ReceiptIcon, onClick: () => navigate('/orders') },
    { id: 'address', label: 'Alamat Pengiriman', Icon: PinIcon },
    { id: 'payment', label: 'Metode Pembayaran', Icon: BankIcon },
    { id: 'wishlist', label: 'Wishlist', Icon: HeartIcon },
    { id: 'points', label: 'AloPoints & Voucher', Icon: GiftIcon },
    { id: 'security', label: 'Keamanan Akun', Icon: ShieldIcon },
    { id: 'help', label: 'Bantuan', Icon: HeadsetIcon },
  ]

  return (
    <div className="flex h-full flex-col bg-surface-subtle">
      <div className="bg-gradient-to-br from-brand-600 to-brand-800 px-5 pb-8 pt-6 text-white">
        <div className="flex items-center gap-3">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-2xl">
            <UserIcon className="h-8 w-8" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-lg font-bold">{user?.name ?? 'Sahabat Aloshop'}</p>
            <p className="truncate text-sm text-white/80">{user?.email}</p>
          </div>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
            <StarIcon className="h-3.5 w-3.5" />
            {user?.tier ?? rewards.tier}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-3 divide-x divide-white/20 rounded-2xl bg-white/10 py-3 text-center">
          <div>
            <p className="text-lg font-extrabold">{formatNumber(rewards.points)}</p>
            <p className="text-xs text-white/70">AloPoints</p>
          </div>
          <div>
            <p className="text-lg font-extrabold">{orders.length}</p>
            <p className="text-xs text-white/70">Pesanan</p>
          </div>
          <div>
            <p className="text-lg font-extrabold">3</p>
            <p className="text-xs text-white/70">Voucher</p>
          </div>
        </div>
      </div>

      <div className="no-scrollbar flex-1 space-y-4 overflow-y-auto p-4 pb-24">
        <section className="overflow-hidden rounded-card bg-white shadow-soft">
          {menu.map((row, i) => (
            <button
              key={row.id}
              type="button"
              onClick={row.onClick}
              className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition hover:bg-surface-subtle ${
                i > 0 ? 'border-t border-slate-50' : ''
              }`}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <row.Icon className="h-5 w-5" />
              </span>
              <span className="flex-1 text-sm font-medium text-ink">{row.label}</span>
              <ChevronRightIcon className="h-5 w-5 text-ink-muted" />
            </button>
          ))}
        </section>

        <button
          type="button"
          onClick={() => {
            logout()
            navigate('/')
          }}
          className="flex w-full items-center justify-center gap-2 rounded-card bg-white px-4 py-3.5 text-sm font-bold text-red-500 shadow-soft transition active:scale-[0.99]"
        >
          <LogoutIcon className="h-5 w-5" />
          Keluar
        </button>

        <p className="text-center text-xs text-ink-muted">Aloshop v0.1.0 — Demo</p>
      </div>
    </div>
  )
}
