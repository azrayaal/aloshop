/** Formatting helpers shared across the storefront. */

const idr = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})

/** Format a number as Indonesian Rupiah, e.g. 16800 -> "Rp16.800". */
export function formatIDR(value: number): string {
  return idr.format(value).replace(/\s/g, '').replace('Rp', 'Rp')
}

/** Format a points value with a thousands separator, e.g. 1250 -> "1.250". */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('id-ID').format(value)
}

/** Two-digit clock segment, e.g. 2 -> "02". */
export function pad2(value: number): string {
  return value.toString().padStart(2, '0')
}
