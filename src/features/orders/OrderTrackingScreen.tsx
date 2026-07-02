import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { SubHeader } from '@/components/ui/SubHeader'
import { Button } from '@/components/ui/Button'
import { CheckIcon, PinIcon, TruckIcon } from '@/components/icons'
import { ProductImage } from '@/components/atoms/Thumbnail'
import { useOrders } from '@/context/OrdersContext'
import { formatIDR } from '@/lib/format'
import { cn } from '@/lib/cn'
import { orderStatusMeta } from '@/features/orders/orderStatus'

/** Order detail with a step-by-step delivery tracking timeline. */
export function OrderTrackingScreen() {
  const { orderId } = useParams()
  const { getOrder } = useOrders()
  const navigate = useNavigate()

  const order = orderId ? getOrder(orderId) : undefined
  if (!order) return <Navigate to="/orders" replace />

  const meta = orderStatusMeta[order.status]
  const paymentLabel =
    order.paymentMethod === 'qris' ? 'QRIS / AloPay' : `${order.bank} Virtual Account`

  return (
    <div className="flex h-full flex-col bg-surface-subtle">
      <SubHeader title="Lacak Pesanan" onBack={() => navigate('/orders')} />

      <main className="no-scrollbar flex-1 space-y-4 overflow-y-auto p-4 pb-4">
        {/* Status banner */}
        <div className="flex items-center gap-3 rounded-card bg-gradient-to-br from-brand-600 to-brand-800 p-4 text-white">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
            <TruckIcon className="h-6 w-6" />
          </span>
          <div>
            <p className="text-sm text-white/80">Order {order.id}</p>
            <p className="text-lg font-bold">{meta.label}</p>
          </div>
          <span className="ml-auto text-right text-xs text-white/80">
            Kurir
            <br />
            <b className="text-white">{order.courier}</b>
          </span>
        </div>

        {order.status === 'awaiting_payment' && (
          <Button fullWidth onClick={() => navigate(`/payment/${order.id}`)}>
            Selesaikan Pembayaran
          </Button>
        )}

        {/* Timeline */}
        <section className="rounded-card bg-white p-4 shadow-soft">
          <h2 className="mb-4 text-sm font-bold text-ink">Status Pengiriman</h2>
          <ol>
            {order.tracking.map((step, i) => {
              const last = i === order.tracking.length - 1
              return (
                <li key={step.key} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span
                      className={cn(
                        'flex h-7 w-7 items-center justify-center rounded-full border-2 transition',
                        step.done
                          ? 'border-brand-600 bg-brand-600 text-white'
                          : 'border-slate-300 bg-white text-transparent',
                      )}
                    >
                      <CheckIcon className="h-4 w-4" />
                    </span>
                    {!last && (
                      <span className={cn('w-0.5 flex-1', step.done ? 'bg-brand-500' : 'bg-slate-200')} />
                    )}
                  </div>
                  <div className={cn('pb-6', last && 'pb-0')}>
                    <p className={cn('text-sm font-semibold', step.done ? 'text-ink' : 'text-ink-muted')}>
                      {step.label}
                    </p>
                    <p className="text-xs text-ink-muted">{step.description}</p>
                    <p className="mt-0.5 text-xs text-ink-muted">{step.time}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </section>

        {/* Address */}
        <section className="rounded-card bg-white p-4 shadow-soft">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <PinIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-ink">Alamat Pengiriman</p>
              <p className="mt-0.5 text-sm text-ink-soft">{order.address}</p>
            </div>
          </div>
        </section>

        {/* Items */}
        <section className="rounded-card bg-white p-4 shadow-soft">
          <h2 className="mb-3 text-sm font-bold text-ink">Detail Pesanan</h2>
          <ul className="space-y-3">
            {order.items.map((it) => (
              <li key={it.id} className="flex items-center gap-3">
                <ProductImage src={it.image} glyph={it.glyph} alt={it.name} className="h-10 w-10" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{it.name}</p>
                  <p className="text-xs text-ink-muted">
                    {it.qty} × {formatIDR(it.price)}
                  </p>
                </div>
                <span className="text-sm font-semibold text-ink">{formatIDR(it.price * it.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2 border-t border-slate-100 pt-3 text-sm">
            <div className="flex justify-between">
              <span className="text-ink-soft">Metode Pembayaran</span>
              <span className="font-medium text-ink">{paymentLabel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-soft">Subtotal</span>
              <span className="font-medium text-ink">{formatIDR(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-soft">Ongkir</span>
              <span className="font-medium text-ink">{formatIDR(order.shippingFee)}</span>
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-2">
              <span className="font-bold text-ink">Total</span>
              <span className="font-extrabold text-brand-700">{formatIDR(order.total)}</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
