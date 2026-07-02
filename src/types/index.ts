/** Domain types shared across the storefront. */

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
  gradient: string
  price: number
  originalPrice?: number
  discountPct?: number
  rating: number
  favorite?: boolean
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
