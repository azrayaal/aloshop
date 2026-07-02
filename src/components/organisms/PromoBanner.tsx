import { Badge } from '@/components/atoms/Badge'

interface PromoBannerProps {
  onShop?: () => void
}

/** "Spring Collection 2026" promotional hero banner. */
export function PromoBanner({ onShop }: PromoBannerProps) {
  return (
    <section className="relative overflow-hidden rounded-card bg-gradient-to-br from-brand-100 via-brand-50 to-sky-100 p-6 shadow-card">
      <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/40 blur-2xl" />
      <div className="relative max-w-[75%] space-y-3">
        <Badge tone="brand">NEW ARRIVAL</Badge>
        <h2 className="text-2xl font-extrabold leading-tight text-ink">Spring Collection 2026</h2>
        <p className="text-sm text-ink-soft">Discover the latest trends in sustainable fashion.</p>
        <button
          type="button"
          onClick={onShop}
          className="rounded-full bg-white px-5 py-2 text-sm font-bold text-ink shadow-soft transition active:scale-95"
        >
          Shop Now
        </button>
      </div>
      <span className="absolute bottom-4 right-5 text-6xl">🌿</span>
    </section>
  )
}
