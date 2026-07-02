import { useNavigate } from 'react-router-dom'
import { AppHeader } from '@/components/organisms/AppHeader'
import { FlashDeals } from '@/components/organisms/FlashDeals'
import { MemberBanner } from '@/components/organisms/MemberBanner'
import { ProductGrid } from '@/components/organisms/ProductGrid'
import { PromoBanner } from '@/components/organisms/PromoBanner'
import { QuickActions } from '@/components/organisms/QuickActions'
import { RewardsCard } from '@/components/organisms/RewardsCard'
import { StoreCard } from '@/components/molecules/StoreCard'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import {
  flashDealCountdownSeconds,
  flashDeals,
  products,
  quickActions,
  rewards,
  store,
} from '@/data/home'
import type { FlashDeal, Product } from '@/types'

/**
 * Aloshop storefront homepage. Composes the header, rewards, quick actions,
 * flash deals, promo banner and product grid. Adding a product pushes it into
 * the shared cart context.
 */
export function HomeScreen() {
  const { add, count } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleAdd = (product: Product) => add(product)

  const handleAddDeal = (deal: FlashDeal) =>
    add({
      id: deal.id,
      name: deal.name,
      glyph: deal.glyph,
      image: deal.image,
      gradient: deal.gradient,
      price: deal.price,
      originalPrice: deal.originalPrice,
      discountPct: deal.discountPct,
      rating: 4.7,
    })

  return (
    <div className="relative flex h-full flex-col bg-surface-subtle">
      <AppHeader
        address="Aloshop Store Pusat, Jak…"
        cartCount={count}
        notificationCount={1}
        onCart={() => navigate('/cart')}
      />

      <main className="no-scrollbar flex-1 space-y-6 overflow-y-auto px-4 pb-24 pt-4">
        <RewardsCard rewards={rewards} />
        <QuickActions actions={quickActions} onSelect={() => navigate('/category')} />
        <StoreCard store={store} />
        <FlashDeals deals={flashDeals} countdownSeconds={flashDealCountdownSeconds} onAdd={handleAddDeal} />
        <PromoBanner onShop={() => navigate('/category')} />
        <ProductGrid products={products} onAdd={handleAdd} />
        {!user && <MemberBanner onRegister={() => navigate('/login')} />}
      </main>
    </div>
  )
}
