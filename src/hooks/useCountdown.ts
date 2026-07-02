import { useEffect, useState } from 'react'

export interface CountdownParts {
  hours: number
  minutes: number
  seconds: number
  done: boolean
}

/**
 * Counts down from an initial number of seconds, ticking once per second.
 * Returns hour/minute/second parts for display (clamped at zero).
 */
export function useCountdown(initialSeconds: number): CountdownParts {
  const [remaining, setRemaining] = useState(Math.max(0, initialSeconds))

  useEffect(() => {
    if (remaining <= 0) return
    const id = window.setInterval(() => {
      setRemaining((s) => (s <= 1 ? 0 : s - 1))
    }, 1000)
    return () => window.clearInterval(id)
  }, [remaining])

  return {
    hours: Math.floor(remaining / 3600),
    minutes: Math.floor((remaining % 3600) / 60),
    seconds: remaining % 60,
    done: remaining <= 0,
  }
}
