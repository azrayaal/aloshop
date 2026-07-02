import { useMemo } from 'react'
import { cn } from '@/lib/cn'

interface QrCodeProps {
  /** Seed string; the same value always renders the same pattern. */
  value: string
  size?: number
  className?: string
}

const GRID = 25

/** Deterministic decorative QR-style matrix (not a scannable code). */
export function QrCode({ value, size = 200, className }: QrCodeProps) {
  const cells = useMemo(() => {
    // Simple string hash → pseudo-random but stable per seed.
    let h = 2166136261
    for (let i = 0; i < value.length; i++) {
      h ^= value.charCodeAt(i)
      h = Math.imul(h, 16777619)
    }
    const rand = (n: number) => {
      h ^= h << 13
      h ^= h >>> 17
      h ^= h << 5
      return Math.abs((h + n * 2654435761) % 100) / 100
    }

    const isFinder = (r: number, c: number) => {
      const inBox = (br: number, bc: number) => r >= br && r < br + 7 && c >= bc && c < bc + 7
      return inBox(0, 0) || inBox(0, GRID - 7) || inBox(GRID - 7, 0)
    }

    const out: boolean[] = []
    for (let r = 0; r < GRID; r++) {
      for (let c = 0; c < GRID; c++) {
        if (isFinder(r, c)) {
          const local = (br: number, bc: number) => {
            const rr = r - br
            const cc = c - bc
            const edge = rr === 0 || rr === 6 || cc === 0 || cc === 6
            const core = rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4
            return edge || core
          }
          const on =
            (r < 7 && c < 7 && local(0, 0)) ||
            (r < 7 && c >= GRID - 7 && local(0, GRID - 7)) ||
            (r >= GRID - 7 && c < 7 && local(GRID - 7, 0))
          out.push(on)
        } else {
          out.push(rand(r * GRID + c) > 0.5)
        }
      }
    }
    return out
  }, [value])

  const cell = size / GRID
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn('rounded-xl bg-white', className)}
      role="img"
      aria-label="Kode QR pembayaran"
    >
      {cells.map((on, i) =>
        on ? (
          <rect
            key={i}
            x={(i % GRID) * cell}
            y={Math.floor(i / GRID) * cell}
            width={cell}
            height={cell}
            className="fill-ink"
          />
        ) : null,
      )}
    </svg>
  )
}
