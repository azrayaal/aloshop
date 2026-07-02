import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { SubHeader } from '@/components/ui/SubHeader'
import { Button } from '@/components/ui/Button'
import { QrCode } from '@/components/ui/QrCode'
import { CheckCircleIcon, ClockIcon, CopyIcon } from '@/components/icons'
import { useOrders } from '@/context/OrdersContext'
import { useCart } from '@/context/CartContext'
import { useCountdown } from '@/hooks/useCountdown'
import { formatIDR, pad2 } from '@/lib/format'

const PAYMENT_WINDOW_SECONDS = 15 * 60

/** Payment instructions for QRIS or Virtual Account, with a payment timer. */
export function PaymentScreen() {
  const { orderId } = useParams()
  const { getOrder, markPaid } = useOrders()
  const { clear } = useCart()
  const navigate = useNavigate()
  const { minutes, seconds } = useCountdown(PAYMENT_WINDOW_SECONDS)
  const [copied, setCopied] = useState(false)

  const order = orderId ? getOrder(orderId) : undefined
  if (!order) return <Navigate to="/orders" replace />

  const copyVa = async () => {
    if (!order.vaNumber) return
    try {
      await navigator.clipboard.writeText(order.vaNumber.replace(/\s/g, ''))
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  const confirmPaid = () => {
    markPaid(order.id)
    clear()
    navigate(`/orders/${order.id}`, { replace: true })
  }

  const isQris = order.paymentMethod === 'qris'

  return (
    <div className="flex h-full flex-col bg-surface-subtle">
      <SubHeader title="Pembayaran" onBack={() => navigate('/orders')} />

      <main className="no-scrollbar flex-1 space-y-4 overflow-y-auto p-4">
        {/* Countdown */}
        <div className="flex items-center justify-center gap-2 rounded-2xl bg-amber-50 px-4 py-3 text-amber-700">
          <ClockIcon className="h-5 w-5" />
          <span className="text-sm">Selesaikan pembayaran dalam</span>
          <span className="font-bold tabular-nums">
            {pad2(minutes)}:{pad2(seconds)}
          </span>
        </div>

        {/* Amount */}
        <div className="rounded-card bg-white p-4 text-center shadow-soft">
          <p className="text-sm text-ink-soft">Total Pembayaran</p>
          <p className="mt-1 text-3xl font-extrabold text-ink">{formatIDR(order.total)}</p>
          <p className="mt-1 text-xs text-ink-muted">Order {order.id}</p>
        </div>

        {isQris ? (
          <div className="flex flex-col items-center rounded-card bg-white p-5 shadow-soft">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink">
              <span className="text-lg">🔳</span> QRIS / AloPay
            </div>
            <div className="mt-4 rounded-2xl border border-slate-100 p-3">
              <QrCode value={order.id + order.total} size={200} />
            </div>
            <p className="mt-4 text-center text-sm text-ink-soft">
              Buka aplikasi e-wallet / m-banking, pilih <b>Scan QRIS</b>, lalu arahkan ke kode di atas.
            </p>
          </div>
        ) : (
          <div className="rounded-card bg-white p-5 shadow-soft">
            <p className="text-sm font-semibold text-ink">{order.bank} Virtual Account</p>
            <div className="mt-3 flex items-center justify-between rounded-2xl bg-surface-sunken px-4 py-3">
              <span className="text-lg font-extrabold tracking-wide tabular-nums text-ink">
                {order.vaNumber}
              </span>
              <button
                type="button"
                onClick={copyVa}
                className="flex items-center gap-1 text-sm font-semibold text-brand-600"
              >
                <CopyIcon className="h-4 w-4" />
                {copied ? 'Tersalin' : 'Salin'}
              </button>
            </div>
            <ol className="mt-4 space-y-2 text-sm text-ink-soft">
              <li>1. Buka aplikasi m-Banking {order.bank}.</li>
              <li>2. Pilih menu <b>Transfer → Virtual Account</b>.</li>
              <li>3. Masukkan nomor VA di atas.</li>
              <li>4. Pastikan nominal sesuai, lalu konfirmasi.</li>
            </ol>
          </div>
        )}

        <div className="flex items-start gap-2 rounded-2xl border border-brand-100 bg-brand-50 px-4 py-3 text-sm text-brand-700">
          <CheckCircleIcon className="h-5 w-5 shrink-0" />
          Pembayaran akan terverifikasi otomatis. Untuk demo, tekan tombol di bawah.
        </div>
      </main>

      <div className="border-t border-slate-100 bg-surface p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <Button fullWidth onClick={confirmPaid}>
          Saya Sudah Bayar
        </Button>
      </div>
    </div>
  )
}
