import type { ReactNode } from 'react'

interface MobileFrameProps {
  children: ReactNode
}

/**
 * Centers the storefront in a phone-sized column on larger screens and lets it
 * fill the viewport on real mobile devices.
 */
export function MobileFrame({ children }: MobileFrameProps) {
  return (
    <div className="flex min-h-full justify-center bg-slate-200 sm:py-6">
      <div className="relative flex h-[100dvh] w-full max-w-app flex-col overflow-hidden bg-surface shadow-2xl sm:h-[900px] sm:rounded-[2rem]">
        {children}
      </div>
    </div>
  )
}
