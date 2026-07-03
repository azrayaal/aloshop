import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { CartLine } from '@/context/CartContext'
import type { Order, OrderStatus, PaymentMethod, TrackingStep } from '@/types'

interface CreateOrderInput {
  lines: CartLine[]
  subtotal: number
  shippingFee: number
  paymentMethod: PaymentMethod
  bank?: string
  address: string
}

interface OrdersContextValue {
  orders: Order[]
  getOrder: (id: string) => Order | undefined
  createOrder: (input: CreateOrderInput) => Order
  markPaid: (id: string) => void
}

const STORAGE_KEY = 'aloshop.client.orders'
const OrdersContext = createContext<OrdersContextValue | null>(null)

const time = (d: Date) =>
  d.toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })

function buildTracking(createdAt: Date, paid: boolean): TrackingStep[] {
  const later = (mins: number) => time(new Date(createdAt.getTime() + mins * 60_000))
  return [
    { key: 'created', label: 'Pesanan Dibuat', description: 'Menunggu pembayaran', time: time(createdAt), done: true },
    { key: 'paid', label: 'Pembayaran Diterima', description: 'Pembayaran berhasil dikonfirmasi', time: paid ? later(2) : '—', done: paid },
    { key: 'processing', label: 'Diproses Toko', description: 'Pesanan sedang disiapkan', time: paid ? later(8) : '—', done: paid },
    { key: 'validated', label: 'Validasi Pesanan', description: 'Tunjukkan barcode ke kurir/kasir untuk verifikasi', time: '—', done: false },
    { key: 'shipped', label: 'Dalam Pengiriman', description: 'Kurir sedang menuju alamat Anda', time: '—', done: false },
    { key: 'delivered', label: 'Pesanan Diterima', description: 'Pesanan sampai tujuan', time: '—', done: false },
  ]
}

/** Insert the "Validasi Pesanan" step into orders persisted before it existed. */
function normalizeTracking(order: Order): Order {
  if (order.tracking.some((s) => s.key === 'validated')) return order
  const idx = order.tracking.findIndex((s) => s.key === 'processing')
  if (idx === -1) return order
  const validated: TrackingStep = {
    key: 'validated',
    label: 'Validasi Pesanan',
    description: 'Tunjukkan barcode ke kurir/kasir untuk verifikasi',
    time: '—',
    done: false,
  }
  const tracking = [...order.tracking]
  tracking.splice(idx + 1, 0, validated)
  return { ...order, tracking }
}

function readStored(): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Order[]).map(normalizeTracking) : []
  } catch {
    return []
  }
}

/** Persisted order store — powers the payment flow and order tracking. */
export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(readStored)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
  }, [orders])

  const createOrder = useCallback((input: CreateOrderInput): Order => {
    const now = new Date()
    const seq = Math.floor(now.getTime() / 1000) % 100000
    const order: Order = {
      id: `ALO-${seq}`,
      items: input.lines.map((l) => ({
        id: l.product.id,
        name: l.product.name,
        glyph: l.product.glyph,
        image: l.product.image,
        price: l.product.price,
        qty: l.qty,
      })),
      subtotal: input.subtotal,
      shippingFee: input.shippingFee,
      total: input.subtotal + input.shippingFee,
      paymentMethod: input.paymentMethod,
      bank: input.bank,
      vaNumber: input.paymentMethod === 'va' ? `8808 ${String(seq).padStart(4, '0')} ${String(seq * 7).slice(0, 4).padStart(4, '0')}` : undefined,
      status: 'awaiting_payment',
      createdAt: time(now),
      address: input.address,
      courier: 'Gojek Instant',
      tracking: buildTracking(now, false),
    }
    setOrders((prev) => [order, ...prev])
    return order
  }, [])

  const markPaid = useCallback((id: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o
        const status: OrderStatus = 'processing'
        return { ...o, status, tracking: buildTracking(new Date(), true) }
      }),
    )
  }, [])

  const getOrder = useCallback((id: string) => orders.find((o) => o.id === id), [orders])

  const value = useMemo(
    () => ({ orders, getOrder, createOrder, markPaid }),
    [orders, getOrder, createOrder, markPaid],
  )

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
}

export function useOrders(): OrdersContextValue {
  const ctx = useContext(OrdersContext)
  if (!ctx) throw new Error('useOrders must be used within an OrdersProvider')
  return ctx
}
