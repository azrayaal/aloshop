import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { SubHeader } from '@/components/ui/SubHeader'
import { Button } from '@/components/ui/Button'
import { Barcode } from '@/components/ui/Barcode'
import { BarcodeIcon, CheckIcon, DownloadIcon, PinIcon, TruckIcon, UserIcon } from '@/components/icons'
import { ProductImage } from '@/components/atoms/Thumbnail'
import { useAuth } from '@/context/AuthContext'
import { useOrders } from '@/context/OrdersContext'
import { formatIDR } from '@/lib/format'
import { cn } from '@/lib/cn'
import { downloadOrderReceipt } from '@/lib/orderReceipt'

/** Order detail with a step-by-step delivery tracking timeline. */
export function OrderTrackingScreen() {
  const { orderId } = useParams()
  const { getOrder } = useOrders()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [showBarcode, setShowBarcode] = useState(false)

  const order = orderId ? getOrder(orderId) : undefined
  if (!order) return <Navigate to="/orders" replace />

  const paymentLabel =
    order.paymentMethod === 'qris' ? 'QRIS / AloPay' : `${order.bank} Virtual Account`

  // Prefer the order's stored buyer; fall back to the current account for older orders.
  const customer =
    order.customer ?? (user ? { name: user.name, email: user.email, phone: user.phone } : undefined)
  const orderForDownload = { ...order, customer }

  return (
    <div className="flex h-full flex-col bg-surface-subtle">
      <SubHeader
        title="Lacak Pesanan"
        onBack={() => navigate('/orders')}
        action={
          <button
            type="button"
            aria-label="Unduh pesanan"
            onClick={() => downloadOrderReceipt(orderForDownload)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition hover:bg-surface-sunken"
          >
            <DownloadIcon className="h-5 w-5" />
          </button>
        }
      />

      <main className="no-scrollbar flex-1 space-y-4 overflow-y-auto p-4 pb-4">
        {/* Status banner */}
        <div className="flex items-center gap-3 rounded-card bg-gradient-to-br from-brand-600 to-brand-800 p-4 text-white">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
            <TruckIcon className="h-6 w-6" />
          </span>
          <div>
            <p className="text-sm font-bold text-white/80">Order {order.id}</p>
            {/* <p className="text-lg font-bold">{meta.label}</p> */}
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

    
        {/* Customer / orderer */}
        {customer && (
          <section className="rounded-card bg-white p-4 shadow-soft">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <UserIcon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-ink">Data Pemesan</p>
                <p className="mt-0.5 truncate text-sm text-ink-soft">{customer.name}</p>
                {customer.phone && <p className="text-xs text-ink-muted">{customer.phone}</p>}
                {customer.email && <p className="truncate text-xs text-ink-muted">{customer.email}</p>}
              </div>
            </div>
          </section>
        )}

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
                  <div className={cn('flex-1', last ? 'pb-0' : 'pb-6')}>
                    <p className={cn('text-sm font-semibold', step.done ? 'text-ink' : 'text-ink-muted')}>
                      {step.label}
                    </p>
                    <p className="text-xs text-ink-muted">{step.description}</p>
                    <p className="mt-0.5 text-xs text-ink-muted">{step.time}</p>

                    {step.key === 'validated' && order.status !== 'awaiting_payment' && (
                      <div className="mt-2">
                        {showBarcode ? (
                          <div className="rounded-xl border border-brand-100 bg-brand-50/60 p-3">
                            <Barcode value={order.id} />
                            <button
                              type="button"
                              onClick={() => setShowBarcode(false)}
                              className="mt-2 w-full text-center text-xs font-semibold text-ink-muted"
                            >
                              Sembunyikan
                            </button>
                          </div>
                        ) : (
                          <Button
                            variant="secondary"
                            icon={<BarcodeIcon className="h-4 w-4" />}
                            onClick={() => setShowBarcode(true)}
                            className="px-4 py-2 text-xs"
                          >
                            Tampilkan Barcode
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        </section>


        <Button
          fullWidth
          variant="secondary"
          icon={<DownloadIcon className="h-5 w-5" />}
          onClick={() => downloadOrderReceipt(orderForDownload)}
        >
          Unduh Pesanan (PDF)
        </Button>
      </main>
    </div>
  )
}
