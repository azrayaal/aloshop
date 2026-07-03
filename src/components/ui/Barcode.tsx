import { useMemo } from 'react'
import { cn } from '@/lib/cn'

interface BarcodeProps {
  value: string
  height?: number
  className?: string
}

export function Barcode({ value, height = 72, className }: BarcodeProps) {
  // Ambil angka saja
  const numericValue = value.replace(/\D/g, '')

  const bars = useMemo(() => {
    let h = 2166136261

    for (let i = 0; i < numericValue.length; i++) {
      h ^= numericValue.charCodeAt(i)
      h = Math.imul(h, 16777619)
    }

    const rand = () => {
      h ^= h << 13
      h ^= h >>> 17
      h ^= h << 5
      return Math.abs(h % 1000) / 1000
    }

    const out: { x: number; w: number }[] = []
    let x = 0
    let dark = true

    while (x < 100) {
      const w = 0.8 + rand() * 2.4
      if (dark) out.push({ x, w: Math.min(w, 100 - x) })
      x += w
      dark = !dark
    }

    return out
  }, [numericValue])

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <svg
        width="100%"
        height={height}
        viewBox="0 0 100 24"
        preserveAspectRatio="none"
        className="rounded-lg bg-white"
        role="img"
        aria-label={`Barcode pesanan ${numericValue}`}
      >
        {bars.map((b, i) => (
          <rect
            key={i}
            x={b.x}
            y={0}
            width={b.w}
            height={24}
            fill="#0f172a"
          />
        ))}
      </svg>

      <span className="font-mono text-xs tracking-[0.3em] text-ink-soft">
        {numericValue}
      </span>
    </div>
  )
}