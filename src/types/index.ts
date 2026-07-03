/** Domain types shared across the storefront. */

export type PaymentMethod = 'qris' | 'va'

export type OrderStatus = 'awaiting_payment' | 'processing' | 'shipped' | 'delivered'

export interface OrderItem {
  id: string
  name: string
  glyph: string
  image?: string
  price: number
  qty: number
}

export interface TrackingStep {
  key: string
  label: string
  description: string
  time: string
  done: boolean
}

export interface OrderCustomer {
  name: string
  email?: string
  phone?: string
}

export interface Order {
  id: string
  items: OrderItem[]
  subtotal: number
  shippingFee: number
  total: number
  paymentMethod: PaymentMethod
  /** Bank name for VA payments. */
  bank?: string
  /** Virtual-account number for VA payments. */
  vaNumber?: string
  status: OrderStatus
  createdAt: string
  address: string
  courier: string
  /** Buyer / account details for the order. */
  customer?: OrderCustomer
  tracking: TrackingStep[]
}

export interface QuickAction {
  id: string
  label: string
  icon: 'receipt' | 'tag' | 'star' | 'truck' | 'basket' | 'apple' | 'cup' | 'grid'
  /** Optional secondary caption, e.g. a points balance. */
  caption?: string
  tone?: 'brand' | 'red' | 'amber' | 'slate'
}

export interface FlashDeal {
  id: string
  name: string
  glyph: string
  image?: string
  gradient: string
  price: number
  originalPrice: number
  discountPct: number
  /** Remaining stock, used for the urgency progress bar. */
  stockLeft?: number
  soldCount?: number
  stockTotal: number
}

export interface Product {
  id: string
  name: string
  glyph: string
  image?: string
  gradient: string
  price: number
  originalPrice?: number
  discountPct?: number
  rating: number
  favorite?: boolean
  /** Category id used by the catalog / category page. */
  category?: string
}

export interface Category {
  id: string
  label: string
  glyph: string
}

export interface StoreInfo {
  name: string
  distanceKm: number
  stockAvailable: boolean
  couriers: string[]
}

export interface Rewards {
  points: number
  tier: string
  nextTier: string
  pointsToNextTier: number
  /** Progress toward the next tier, 0–1. */
  progress: number
}
