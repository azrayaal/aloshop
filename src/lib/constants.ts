/** Shared storefront constants. */

/** Flat shipping fee applied at checkout (IDR). */
export const SHIPPING_FEE = 10000

/** Default delivery address for the demo session. */
export const DEFAULT_ADDRESS = 'Jl. Kemang Raya No. 12, Jakarta Selatan 12730'

export interface PaymentOption {
  id: string
  method: 'qris' | 'va'
  label: string
  caption: string
  glyph: string
  bank?: string
}

/** Available payment channels shown on the checkout page. */
export const paymentOptions: PaymentOption[] = [
  { id: 'qris', method: 'qris', label: 'QRIS / AloPay', caption: 'Scan sekali untuk semua e-wallet', glyph: '🔳' },
  { id: 'va-bca', method: 'va', label: 'BCA Virtual Account', caption: 'Transfer via m-Banking / ATM', glyph: '🏦', bank: 'BCA' },
  { id: 'va-mandiri', method: 'va', label: 'Mandiri Virtual Account', caption: 'Transfer via Livin / ATM', glyph: '🏦', bank: 'Mandiri' },
  { id: 'va-bni', method: 'va', label: 'BNI Virtual Account', caption: 'Transfer via m-Banking / ATM', glyph: '🏦', bank: 'BNI' },
  { id: 'va-bri', method: 'va', label: 'BRI Virtual Account', caption: 'Transfer via BRImo / ATM', glyph: '🏦', bank: 'BRI' },
]
