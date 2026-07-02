import { Outlet, useNavigate } from 'react-router-dom'
import { BottomTabBar } from '@/components/organisms/BottomTabBar'
import { CartFab } from '@/components/organisms/CartFab'
import { useCart } from '@/context/CartContext'

/**
 * Tab shell for the storefront: routed page content in the scroll area plus a
 * persistent bottom navigation and floating cart button.
 */
export function ShopLayout() {
  const navigate = useNavigate()
  const { count } = useCart()

  return (
    <div className="relative flex h-full flex-col bg-surface-subtle">
      <div className="relative flex flex-1 flex-col overflow-hidden">
        <Outlet />
        <CartFab count={count} onClick={() => navigate('/cart')} />
      </div>
      <BottomTabBar />
    </div>
  )
}
