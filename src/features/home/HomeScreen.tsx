import { useState } from 'react'
import { AppHeader } from '@/components/organisms/AppHeader'
import { BottomTabBar } from '@/components/organisms/BottomTabBar'
import { CartFab } from '@/components/organisms/CartFab'
import { FlashDeals } from '@/components/organisms/FlashDeals'
import { MemberBanner } from '@/components/organisms/MemberBanner'
import { ProductGrid } from '@/components/organisms/ProductGrid'
import { PromoBanner } from '@/components/organisms/PromoBanner'
import { QuickActions } from '@/components/organisms/QuickActions'
import { RewardsCard } from '@/components/organisms/RewardsCard'
import { StoreCard } from '@/components/molecules/StoreCard'
import {
  flashDealCountdownSeconds,
  flashDeals,
  products,
  quickActions,
  rewards,
  store,
} from '@/data/home'
import type { Product } from '@/types'

/**
 * Aloshop storefront homepage. Composes the header, rewards, quick actions,
 * flash deals, promo banner and product grid inside the mobile app shell.
 */
export function HomeScreen() {
  const [cartCount, setCartCount] = useState(2)
  const [activeTab, setActiveTab] = useState('home')

  const handleAdd = (_product: Product) => setCartCount((c) => c + 1)

  return (
    <div className="relative flex h-full flex-col bg-surface-subtle">
      <AppHeader address="Aloshop Store Pusat, Jak…" cartCount={cartCount} notificationCount={1} />

      <main className="no-scrollbar flex-1 space-y-6 overflow-y-auto px-4 pb-6 pt-4">
        <RewardsCard rewards={rewards} />
        <QuickActions actions={quickActions} />
        <StoreCard store={store} />
        <FlashDeals deals={flashDeals} countdownSeconds={flashDealCountdownSeconds} />
        <PromoBanner />
        <ProductGrid products={products} onAdd={handleAdd} />
        <MemberBanner />
      </main>

      <CartFab count={cartCount} />
      <BottomTabBar active={activeTab} onChange={setActiveTab} />
    </div>
  )
}
