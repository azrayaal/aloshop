import { useNavigate } from 'react-router-dom'
import { SubHeader } from '@/components/ui/SubHeader'
import { QrCode } from '@/components/ui/QrCode'
import {
  BankIcon,
  GiftIcon,
  PlusIcon,
  ReceiptIcon,
  StarIcon,
  WalletIcon,
  type IconProps,
} from '@/components/icons'
import { useAuth } from '@/context/AuthContext'
import { formatIDR, formatNumber } from '@/lib/format'
import { rewards } from '@/data/home'

interface Action {
  id: string
  label: string
  Icon: (p: IconProps) => JSX.Element
  onClick?: () => void
}

/** AloPay wallet — balance, pay QR, points and quick actions. */
export function AloPayScreen() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const actions: Action[] = [
    { id: 'topup', label: 'Top Up', Icon: PlusIcon },
    { id: 'transfer', label: 'Transfer', Icon: BankIcon },
    { id: 'history', label: 'Riwayat', Icon: ReceiptIcon, onClick: () => navigate('/orders') },
    { id: 'rewards', label: 'Rewards', Icon: GiftIcon },
  ]

  return (
    <div className="flex h-full flex-col bg-surface-subtle">
      <SubHeader title="AloPay" onBack={() => navigate('/')} />

      <main className="no-scrollbar flex-1 space-y-4 overflow-y-auto p-4 pb-24">
        {/* Balance */}
        <section className="rounded-card bg-gradient-to-br from-brand-600 to-brand-800 p-5 text-white shadow-card">
          <div className="flex items-center gap-2 text-sm text-white/80">
            <WalletIcon className="h-5 w-5" /> Saldo AloPay
          </div>
          <p className="mt-1 text-3xl font-extrabold">{formatIDR(250000)}</p>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <StarIcon className="h-4 w-4 text-amber-300" />
            {formatNumber(rewards.points)} AloPoints · {user?.tier ?? rewards.tier}
          </div>
        </section>

        {/* Quick actions */}
        <section className="grid grid-cols-4 gap-2">
          {actions.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={a.onClick}
              className="flex flex-col items-center gap-1.5 rounded-2xl bg-white p-3 text-center shadow-soft"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <a.Icon className="h-5 w-5" />
              </span>
              <span className="text-[11px] font-medium text-ink">{a.label}</span>
            </button>
          ))}
        </section>

        {/* Pay QR */}
        <section className="flex flex-col items-center rounded-card bg-white p-5 shadow-soft">
          <p className="text-sm font-bold text-ink">Bayar di Kasir</p>
          <p className="text-xs text-ink-muted">Tunjukkan QR ini ke kasir untuk membayar</p>
          <div className="mt-4 rounded-2xl border border-slate-100 p-3">
            <QrCode value={`alopay-${user?.email ?? 'guest'}`} size={200} />
          </div>
          <p className="mt-3 text-xs text-ink-muted">Berlaku untuk semua merchant QRIS</p>
        </section>
      </main>
    </div>
  )
}
