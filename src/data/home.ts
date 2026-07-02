import type { FlashDeal, Product, QuickAction, Rewards, StoreInfo } from '@/types'

/** Static content that would normally come from an API. Kept in one module so
 * the UI layer stays presentational and easy to wire to a backend later. */

export const rewards: Rewards = {
  points: 1250,
  tier: 'Gold Member',
  nextTier: 'Platinum',
  pointsToNextTier: 250,
  progress: 0.83,
}

export const store: StoreInfo = {
  name: 'Aloshop Kemang',
  distanceKm: 1.2,
  stockAvailable: true,
  couriers: ['Gojek', 'Grab'],
}

export const quickActions: QuickAction[] = [
  { id: 'topup', label: 'Top Up & Tagihan', icon: 'receipt', tone: 'brand' },
  { id: 'promo', label: 'Promo Menarik', icon: 'tag', tone: 'red' },
  { id: 'points', label: 'AloPoints', icon: 'star', caption: '1.250 Pts', tone: 'amber' },
  { id: 'ongkir', label: 'Gratis Ongkir', icon: 'truck', tone: 'brand' },
  { id: 'grocery', label: 'Grocery', icon: 'basket', tone: 'slate' },
  { id: 'fruits', label: 'Fruits', icon: 'apple', tone: 'brand' },
  { id: 'beverages', label: 'Beverages', icon: 'cup', tone: 'slate' },
  { id: 'all', label: 'Semua Kategori', icon: 'grid', tone: 'slate' },
]

export const flashDeals: FlashDeal[] = [
  {
    id: 'fd-1',
    name: 'Telur Ayam Negeri 1kg',
    glyph: '🥚',
    gradient: 'from-amber-50 to-orange-100',
    price: 16800,
    originalPrice: 28000,
    discountPct: 40,
    stockLeft: 5,
    stockTotal: 50,
  },
  {
    id: 'fd-2',
    name: 'Roti Tawar Gandum Gandum',
    glyph: '🍞',
    gradient: 'from-orange-50 to-amber-100',
    price: 16500,
    originalPrice: 22000,
    discountPct: 25,
    soldCount: 45,
    stockTotal: 100,
  },
  {
    id: 'fd-3',
    name: 'Susu UHT Full Cream 1L',
    glyph: '🥛',
    gradient: 'from-sky-50 to-blue-100',
    price: 18900,
    originalPrice: 22200,
    discountPct: 15,
    soldCount: 30,
    stockTotal: 100,
  },
]

/** Deadline offset (seconds) used to seed the flash-deal countdown. */
export const flashDealCountdownSeconds = 2 * 3600 + 45 * 60 + 12

export const products: Product[] = [
  {
    id: 'p-1',
    name: 'Premium Wireless ANC Headphones',
    glyph: '🎧',
    gradient: 'from-slate-100 to-slate-200',
    price: 64500,
    originalPrice: 80000,
    discountPct: 20,
    rating: 4.8,
  },
  {
    id: 'p-2',
    name: 'Artisan Ceramic Mug',
    glyph: '☕',
    gradient: 'from-emerald-50 to-teal-100',
    price: 18500,
    originalPrice: 21900,
    discountPct: 25,
    rating: 4.5,
  },
  {
    id: 'p-3',
    name: 'Hydrating Facial Serum 30ml',
    glyph: '🧴',
    gradient: 'from-lime-50 to-emerald-100',
    price: 14500,
    originalPrice: 16000,
    discountPct: 15,
    rating: 4.9,
  },
  {
    id: 'p-4',
    name: 'Hydrating Facial Serum 30ml',
    glyph: '🧴',
    gradient: 'from-emerald-50 to-green-100',
    price: 11900,
    originalPrice: 13500,
    discountPct: 12,
    rating: 4.9,
  },
]
