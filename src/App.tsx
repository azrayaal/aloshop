import { Navigate, Route, Routes } from 'react-router-dom'
import { MobileFrame } from '@/components/layouts/MobileFrame'
import { ShopLayout } from '@/components/layouts/ShopLayout'
import { RequireAuth } from '@/components/layouts/RequireAuth'
import { HomeScreen } from '@/features/home/HomeScreen'
import { LoginScreen } from '@/features/auth/LoginScreen'
import { CategoryScreen } from '@/features/category/CategoryScreen'
import { AccountScreen } from '@/features/account/AccountScreen'
import { OrdersScreen } from '@/features/orders/OrdersScreen'
import { OrderTrackingScreen } from '@/features/orders/OrderTrackingScreen'
import { CartScreen } from '@/features/cart/CartScreen'
import { CheckoutScreen } from '@/features/checkout/CheckoutScreen'
import { PaymentScreen } from '@/features/payment/PaymentScreen'
import { AloPayScreen } from '@/features/alopay/AloPayScreen'

export default function App() {
  return (
    <MobileFrame>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />

        {/* Tabbed pages */}
        <Route element={<ShopLayout />}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/category" element={<CategoryScreen />} />
          <Route
            path="/orders"
            element={
              <RequireAuth>
                <OrdersScreen />
              </RequireAuth>
            }
          />
          <Route
            path="/account"
            element={
              <RequireAuth>
                <AccountScreen />
              </RequireAuth>
            }
          />
        </Route>

        {/* Full-screen sub-pages (no tab bar) */}
        <Route path="/cart" element={<CartScreen />} />
        <Route
          path="/checkout"
          element={
            <RequireAuth>
              <CheckoutScreen />
            </RequireAuth>
          }
        />
        <Route
          path="/payment/:orderId"
          element={
            <RequireAuth>
              <PaymentScreen />
            </RequireAuth>
          }
        />
        <Route
          path="/orders/:orderId"
          element={
            <RequireAuth>
              <OrderTrackingScreen />
            </RequireAuth>
          }
        />
        <Route path="/alopay" element={<AloPayScreen />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MobileFrame>
  )
}
