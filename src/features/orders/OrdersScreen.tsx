import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { ChevronRightIcon } from '@/components/icons'
import { ProductImage } from '@/components/atoms/Thumbnail'
import { useOrders } from '@/context/OrdersContext'
import { formatIDR } from '@/lib/format'
import { cn } from '@/lib/cn'
import { orderStatusMeta } from '@/features/orders/orderStatus'

/** "Pesanan" tab — list of the customer's orders with quick actions. */
export function OrdersScreen() {
  const { orders } = useOrders()
  const navigate = useNavigate()

  return (
    <div className="flex h-full flex-col bg-surface-subtle">
      <header className="sticky top-0 z-20 bg-surface px-4 py-4 shadow-soft">
        <h1 className="text-lg font-bold text-ink">Pesanan Saya</h1>
      </header>

      {orders.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
          <span className="text-6xl">📦</span>
          <p className="text-lg font-bold text-ink">Belum ada pesanan</p>
          <p className="text-sm text-ink-soft">Pesanan yang kamu buat akan muncul di sini.</p>
          <Button onClick={() => navigate('/category')} className="mt-2">
            Mulai Belanja
          </Button>
        </div>
      ) : (
        <main className="no-scrollbar flex-1 space-y-3 overflow-y-auto p-4 pb-24">
          {orders.map((order) => {
            const meta = orderStatusMeta[order.status]
            const preview = order.items.slice(0, 4)
            const extra = order.items.length - preview.length
            return (
              <article key={order.id} className="rounded-card bg-white p-4 shadow-soft">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-ink">{order.id}</p>
                    <p className="text-xs text-ink-muted">{order.createdAt}</p>
                  </div>
                  <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-semibold', meta.className)}>
                    {meta.label}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  {preview.map((it) => (
                    <ProductImage
                      key={it.id}
                      src={it.image}
                      glyph={it.glyph}
                      alt={it.name}
                      className="h-11 w-11"
                    />
                  ))}
                  {extra > 0 && (
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-sunken text-xs font-semibold text-ink-soft">
                      +{extra}
                    </span>
                  )}
                  <div className="ml-auto text-right">
                    <p className="text-xs text-ink-muted">Total</p>
                    <p className="font-extrabold text-ink">{formatIDR(order.total)}</p>
                  </div>
                </div>

                <div className="mt-3 flex gap-2 border-t border-slate-100 pt-3">
                  {order.status === 'awaiting_payment' ? (
                    <Button fullWidth onClick={() => navigate(`/payment/${order.id}`)}>
                      Bayar Sekarang
                    </Button>
                  ) : (
                    <Button
                      fullWidth
                      variant="secondary"
                      onClick={() => navigate(`/orders/${order.id}`)}
                    >
                      Lacak Pesanan
                      <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </article>
            )
          })}
        </main>
      )}
    </div>
  )
}
