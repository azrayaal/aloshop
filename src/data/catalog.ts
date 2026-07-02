import type { Category, Product } from '@/types'

/** Categories shown as filter chips on the catalog page. */
export const categories: Category[] = [
  { id: 'all', label: 'Semua', glyph: '🛍️' },
  { id: 'grocery', label: 'Grocery', glyph: '🧺' },
  { id: 'fruits', label: 'Buah', glyph: '🍎' },
  { id: 'beverages', label: 'Minuman', glyph: '🥤' },
  { id: 'beauty', label: 'Kecantikan', glyph: '🧴' },
  { id: 'electronics', label: 'Elektronik', glyph: '🎧' },
  { id: 'fashion', label: 'Fashion', glyph: '👜' },
  { id: 'home', label: 'Rumah', glyph: '🏠' },
]

/** Product catalog used by the Category page. */
export const catalog: Product[] = [
  { id: 'c-1', name: 'Telur Ayam Negeri 1kg', glyph: '🥚', image: '/products/eggs.jpg', gradient: 'from-amber-50 to-orange-100', price: 16800, originalPrice: 28000, discountPct: 40, rating: 4.7, category: 'grocery' },
  { id: 'c-2', name: 'Roti Tawar Gandum', glyph: '🍞', image: '/products/bread.jpg', gradient: 'from-orange-50 to-amber-100', price: 16500, originalPrice: 22000, discountPct: 25, rating: 4.6, category: 'grocery' },
  { id: 'c-3', name: 'Beras Premium 5kg', glyph: '🍚', image: '/products/rice.jpg', gradient: 'from-slate-50 to-slate-100', price: 68000, rating: 4.8, category: 'grocery' },
  { id: 'c-4', name: 'Apel Fuji 1kg', glyph: '🍎', image: '/products/apple.jpg', gradient: 'from-rose-50 to-red-100', price: 32000, originalPrice: 38000, discountPct: 15, rating: 4.9, category: 'fruits' },
  { id: 'c-5', name: 'Pisang Cavendish 1sisir', glyph: '🍌', image: '/products/banana.jpg', gradient: 'from-yellow-50 to-amber-100', price: 24000, rating: 4.7, category: 'fruits' },
  { id: 'c-6', name: 'Jeruk Sunkist 1kg', glyph: '🍊', image: '/products/orange.jpg', gradient: 'from-orange-50 to-orange-100', price: 29500, rating: 4.6, category: 'fruits' },
  { id: 'c-7', name: 'Susu UHT Full Cream 1L', glyph: '🥛', image: '/products/milk.jpg', gradient: 'from-sky-50 to-blue-100', price: 18900, originalPrice: 22200, discountPct: 15, rating: 4.8, category: 'beverages' },
  { id: 'c-8', name: 'Kopi Susu Botol 250ml', glyph: '🧋', image: '/products/coffee.jpg', gradient: 'from-amber-50 to-yellow-100', price: 12500, rating: 4.5, category: 'beverages' },
  { id: 'c-9', name: 'Air Mineral 600ml x6', glyph: '💧', image: '/products/water.jpg', gradient: 'from-cyan-50 to-sky-100', price: 21000, rating: 4.7, category: 'beverages' },
  { id: 'c-10', name: 'Hydrating Facial Serum 30ml', glyph: '🧴', image: '/products/serum.jpg', gradient: 'from-lime-50 to-emerald-100', price: 14500, originalPrice: 16000, discountPct: 15, rating: 4.9, category: 'beauty' },
  { id: 'c-11', name: 'Sunscreen SPF50 50ml', glyph: '🧴', image: '/products/sunscreen.jpg', gradient: 'from-emerald-50 to-green-100', price: 89000, originalPrice: 110000, discountPct: 19, rating: 4.8, category: 'beauty' },
  { id: 'c-12', name: 'Premium ANC Headphones', glyph: '🎧', image: '/products/headphones.jpg', gradient: 'from-slate-100 to-slate-200', price: 64500, originalPrice: 80000, discountPct: 20, rating: 4.8, category: 'electronics' },
  { id: 'c-13', name: 'Wireless Charger 15W', glyph: '🔌', image: '/products/charger.jpg', gradient: 'from-zinc-50 to-slate-100', price: 129000, rating: 4.6, category: 'electronics' },
  { id: 'c-14', name: 'Spring Tote Bag 2026', glyph: '👜', image: '/products/totebag.jpg', gradient: 'from-emerald-50 to-teal-100', price: 129000, originalPrice: 159000, discountPct: 19, rating: 4.7, category: 'fashion' },
  { id: 'c-15', name: 'Artisan Ceramic Mug', glyph: '☕', image: '/products/mug.jpg', gradient: 'from-emerald-50 to-teal-100', price: 18500, originalPrice: 21900, discountPct: 15, rating: 4.5, category: 'home' },
  { id: 'c-16', name: 'Scented Candle Lavender', glyph: '🕯️', image: '/products/candle.jpg', gradient: 'from-purple-50 to-violet-100', price: 45000, rating: 4.6, category: 'home' },
]
