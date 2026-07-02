import { pad2 } from '@/lib/format'
import { useCountdown } from '@/hooks/useCountdown'

interface CountdownPillProps {
  seconds: number
  label?: string
}

function Segment({ value }: { value: number }) {
  return (
    <span className="rounded-md bg-red-50 px-1.5 py-0.5 text-sm font-bold tabular-nums text-red-500">
      {pad2(value)}
    </span>
  )
}

/** "Berakhir dalam 02 : 45 : 12" style countdown used in flash deals. */
export function CountdownPill({ seconds, label = 'Berakhir dalam' }: CountdownPillProps) {
  const { hours, minutes, seconds: s } = useCountdown(seconds)
  return (
    <div className="flex items-center gap-1.5 text-sm text-ink-soft">
      <span>{label}</span>
      <Segment value={hours} />
      <span className="font-bold text-red-500">:</span>
      <Segment value={minutes} />
      <span className="font-bold text-red-500">:</span>
      <Segment value={s} />
    </div>
  )
}
