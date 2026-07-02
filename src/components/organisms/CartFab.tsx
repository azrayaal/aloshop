import { CartIcon } from '@/components/icons'

interface CartFabProps {
  count?: number
  onClick?: () => void
}

/** Floating cart button anchored above the bottom navigation. */
export function CartFab({ count = 0, onClick }: CartFabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Buka keranjang"
      className="absolute bottom-4 right-4 z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg transition active:scale-95"
    >
      <CartIcon className="h-6 w-6" />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-5 text-white ring-2 ring-white">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  )
}
