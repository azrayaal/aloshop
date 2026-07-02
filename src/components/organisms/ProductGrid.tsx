import { ProductCard } from '@/components/molecules/ProductCard'
import { SectionHeader } from '@/components/molecules/SectionHeader'
import type { Product } from '@/types'

interface ProductGridProps {
  products: Product[]
  onAdd?: (product: Product) => void
}

/** "Our Product" — 2-column grid of product cards. */
export function ProductGrid({ products, onAdd }: ProductGridProps) {
  return (
    <section className="space-y-3">
      <SectionHeader title="Our Product" actionLabel="View All" />
      <div className="grid grid-cols-2 gap-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={onAdd} />
        ))}
      </div>
    </section>
  )
}
