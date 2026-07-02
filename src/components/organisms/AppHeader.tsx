import { BellIcon, CartIcon } from '@/components/icons'
import { IconButton } from '@/components/atoms/IconButton'
import { Logo } from '@/components/atoms/Logo'
import { LocationBar } from '@/components/molecules/LocationBar'
import { SearchBar } from '@/components/molecules/SearchBar'

interface AppHeaderProps {
  address: string
  cartCount?: number
  notificationCount?: number
  onCart?: () => void
}

/** Sticky top region: brand row, delivery location and search. */
export function AppHeader({ address, cartCount = 0, notificationCount = 0, onCart }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-20 space-y-3 bg-surface px-4 pb-3 pt-4 shadow-soft">
      <div className="flex items-center justify-between">
        <Logo />
        <div className="flex items-center">
          <IconButton label="Notifikasi" badge={notificationCount}>
            <BellIcon className="h-6 w-6" />
          </IconButton>
          <IconButton label="Keranjang" badge={cartCount} onClick={onCart}>
            <CartIcon className="h-6 w-6" />
          </IconButton>
        </div>
      </div>

      <LocationBar label="Kirim ke" address={address} />
      <SearchBar />
    </header>
  )
}
