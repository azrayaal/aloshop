import type { OrderStatus } from '@/types'

interface StatusMeta {
  label: string
  className: string
}

/** Display metadata for each order status. */
export const orderStatusMeta: Record<OrderStatus, StatusMeta> = {
  awaiting_payment: { label: 'Menunggu Pembayaran', className: 'bg-amber-50 text-amber-700' },
  processing: { label: 'Diproses', className: 'bg-blue-50 text-blue-600' },
  shipped: { label: 'Dikirim', className: 'bg-indigo-50 text-indigo-600' },
  delivered: { label: 'Selesai', className: 'bg-brand-50 text-brand-700' },
}
