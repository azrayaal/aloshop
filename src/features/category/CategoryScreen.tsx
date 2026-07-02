import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchBar } from '@/components/molecules/SearchBar'
import { ProductCard } from '@/components/molecules/ProductCard'
import { IconButton } from '@/components/atoms/IconButton'
import { CartIcon } from '@/components/icons'
import { cn } from '@/lib/cn'
import { useCart } from '@/context/CartContext'
import { catalog, categories } from '@/data/catalog'

/** "Kategori" tab — searchable catalog with category filter chips. */
export function CategoryScreen() {
  const { add, count } = useCart()
  const navigate = useNavigate()
  const [active, setActive] = useState('all')
  const [query, setQuery] = useState('')

  const results = useMemo(
    () =>
      catalog.filter((p) => {
        const matchesCat = active === 'all' || p.category === active
        const matchesQuery = !query || p.name.toLowerCase().includes(query.toLowerCase())
        return matchesCat && matchesQuery
      }),
    [active, query],
  )

  return (
    <div className="flex h-full flex-col bg-surface-subtle">
      <header className="sticky top-0 z-20 space-y-3 bg-surface px-4 pb-3 pt-4 shadow-soft">
        <div className="flex items-center gap-2">
          <h1 className="flex-1 text-lg font-bold text-ink">Kategori</h1>
          <IconButton label="Keranjang" badge={count} onClick={() => navigate('/cart')}>
            <CartIcon className="h-6 w-6" />
          </IconButton>
        </div>
        <SearchBar placeholder="Cari di semua kategori" value={query} onChange={setQuery} />
      </header>

      {/* Category chips */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto bg-surface px-4 pb-3">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActive(c.id)}
            className={cn(
              'flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition',
              active === c.id ? 'bg-brand-600 text-white' : 'bg-surface-sunken text-ink-soft',
            )}
          >
            <span>{c.glyph}</span>
            {c.label}
          </button>
        ))}
      </div>

      <main className="no-scrollbar flex-1 overflow-y-auto px-4 pb-24 pt-4">
        <p className="mb-3 text-sm text-ink-soft">
          {results.length} produk
          {active !== 'all' && ` di ${categories.find((c) => c.id === active)?.label}`}
        </p>
        {results.length === 0 ? (
          <div className="mt-16 text-center text-ink-muted">
            <p className="text-4xl">🔍</p>
            <p className="mt-2 text-sm">Produk tidak ditemukan</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={add} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
