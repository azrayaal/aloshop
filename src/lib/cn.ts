/**
 * Tiny className combiner — filters falsy values and joins with spaces.
 * Keeps the bundle dependency-free while giving conditional-class ergonomics.
 */
export type ClassValue = string | false | null | undefined

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ')
}
