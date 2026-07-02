import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { SubHeader } from '@/components/ui/SubHeader'
import { Button } from '@/components/ui/Button'
import { CheckIcon, PinIcon } from '@/components/icons'
import { ProductImage } from '@/components/atoms/Thumbnail'
import { useCart } from '@/context/CartContext'
import { useOrders } from '@/context/OrdersContext'
import { formatIDR } from '@/lib/format'
import { DEFAULT_ADDRESS, SHIPPING_FEE, paymentOptions } from '@/lib/constants'
import { cn } from '@/lib/cn'

/** Checkout: address, order summary, payment method selection. */
export function CheckoutScreen() {
  const { lines, subtotal, count } = useCart()
  const { createOrder } = useOrders()
  const navigate = useNavigate()
  const [selected, setSelected] = useState(paymentOptions[0].id)

  // Guard: nothing to check out.
  if (lines.length === 0) return <Navigate to="/cart" replace />

  const total = subtotal + SHIPPING_FEE

  const handlePay = () => {
    const option = paymentOptions.find((o) => o.id === selected)!
    const order = createOrder({
      lines,
      subtotal,
      shippingFee: SHIPPING_FEE,
      paymentMethod: option.method,
      bank: option.bank,
      address: DEFAULT_ADDRESS,
    })
    navigate(`/payment/${order.id}`, { replace: true })
  }

  return (
    <div className="flex h-full flex-col bg-surface-subtle">
      <SubHeader title="Checkout" />

      <main className="no-scrollbar flex-1 space-y-4 overflow-y-auto p-4">
        {/* Address */}
        <section className="rounded-card bg-white p-4 shadow-soft">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <PinIcon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-ink">Alamat Pengiriman</p>
              <p className="mt-0.5 text-sm text-ink-soft">{DEFAULT_ADDRESS}</p>
            </div>
            <button type="button" className="shrink-0 text-sm font-semibold text-brand-600">
              Ubah
            </button>
          </div>
        </section>

        {/* Order summary */}
        <section className="rounded-card bg-white p-4 shadow-soft">
          <h2 className="mb-3 text-sm font-bold text-ink">Ringkasan Pesanan ({count} item)</h2>
          <ul className="space-y-3">
            {lines.map((line) => (
              <li key={line.product.id} className="flex items-center gap-3">
                <ProductImage
                  src={line.product.image}
                  glyph={line.product.glyph}
                  alt={line.product.name}
                  className="h-10 w-10"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{line.product.name}</p>
                  <p className="text-xs text-ink-muted">
                    {line.qty} × {formatIDR(line.product.price)}
                  </p>
                </div>
                <span className="text-sm font-semibold text-ink">{formatIDR(line.product.price * line.qty)}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Payment method */}
        <section className="rounded-card bg-white p-4 shadow-soft">
          <h2 className="mb-3 text-sm font-bold text-ink">Metode Pembayaran</h2>
          <div className="space-y-2">
            {paymentOptions.map((o) => {
              const active = o.id === selected
              return (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setSelected(o.id)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition',
                    active ? 'border-brand-500 bg-brand-50' : 'border-slate-200 bg-white',
                  )}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-sunken text-xl">
                    {o.glyph}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-ink">{o.label}</p>
                    <p className="text-xs text-ink-muted">{o.caption}</p>
                  </div>
                  <span
                    className={cn(
                      'flex h-5 w-5 items-center justify-center rounded-full border-2 transition',
                      active ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-300',
                    )}
                  >
                    {active && <CheckIcon className="h-3 w-3" />}
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        {/* Price breakdown */}
        <section className="rounded-card bg-white p-4 shadow-soft">
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-soft">Subtotal</span>
            <span className="font-medium text-ink">{formatIDR(subtotal)}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-ink-soft">Ongkos kirim</span>
            <span className="font-medium text-ink">{formatIDR(SHIPPING_FEE)}</span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
            <span className="font-bold text-ink">Total</span>
            <span className="text-lg font-extrabold text-brand-700">{formatIDR(total)}</span>
          </div>
        </section>
      </main>

      <div className="border-t border-slate-100 bg-surface p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <Button fullWidth onClick={handlePay}>
          Bayar {formatIDR(total)}
        </Button>
      </div>
    </div>
  )
}
