import { useNavigate } from 'react-router-dom'
import { SubHeader } from '@/components/ui/SubHeader'
import { Button } from '@/components/ui/Button'
import { Thumbnail } from '@/components/atoms/Thumbnail'
import { QtyStepper } from '@/components/molecules/QtyStepper'
import { TrashIcon } from '@/components/icons'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { formatIDR } from '@/lib/format'
import { SHIPPING_FEE } from '@/lib/constants'

/** Shopping cart with quantity editing and a checkout call-to-action. */
export function CartScreen() {
  const { lines, subtotal, setQty, remove, count } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const goCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } })
      return
    }
    navigate('/checkout')
  }

  if (lines.length === 0) {
    return (
      <div className="flex h-full flex-col bg-surface-subtle">
        <SubHeader title="Keranjang" onBack={() => navigate('/')} />
        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
          <span className="text-6xl">🛒</span>
          <p className="text-lg font-bold text-ink">Keranjang masih kosong</p>
          <p className="text-sm text-ink-soft">Yuk, temukan produk favoritmu di Aloshop.</p>
          <Button onClick={() => navigate('/category')} className="mt-2">
            Mulai Belanja
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col bg-surface-subtle">
      <SubHeader title={`Keranjang (${count})`} onBack={() => navigate('/')} />

      <main className="no-scrollbar flex-1 space-y-3 overflow-y-auto p-4">
        {lines.map((line) => (
          <div key={line.product.id} className="flex gap-3 rounded-card bg-white p-3 shadow-soft">
            <Thumbnail
              src={line.product.image}
              alt={line.product.name}
              glyph={line.product.glyph}
              gradient={line.product.gradient}
              className="h-20 w-20 shrink-0 rounded-xl"
            />
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-start gap-2">
                <h3 className="line-clamp-2 flex-1 text-sm font-semibold text-ink">{line.product.name}</h3>
                <button
                  type="button"
                  aria-label="Hapus"
                  onClick={() => remove(line.product.id)}
                  className="text-ink-muted transition hover:text-red-500"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
              <p className="mt-1 font-extrabold text-brand-700">{formatIDR(line.product.price)}</p>
              <div className="mt-auto flex items-center justify-between pt-2">
                <span className="text-xs text-ink-muted">
                  Subtotal {formatIDR(line.product.price * line.qty)}
                </span>
                <QtyStepper qty={line.qty} onChange={(q) => setQty(line.product.id, q)} />
              </div>
            </div>
          </div>
        ))}

        <div className="rounded-card bg-white p-4 shadow-soft">
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-soft">Subtotal produk</span>
            <span className="font-semibold text-ink">{formatIDR(subtotal)}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-ink-soft">Estimasi ongkir</span>
            <span className="font-semibold text-ink">{formatIDR(SHIPPING_FEE)}</span>
          </div>
        </div>
      </main>

      {/* Sticky checkout bar */}
      <div className="border-t border-slate-100 bg-surface p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm text-ink-soft">Total</span>
          <span className="text-xl font-extrabold text-ink">{formatIDR(subtotal + SHIPPING_FEE)}</span>
        </div>
        <Button fullWidth onClick={goCheckout}>
          Checkout ({count})
        </Button>
      </div>
    </div>
  )
}
