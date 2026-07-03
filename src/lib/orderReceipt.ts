import type { Order } from '@/types'
import { formatIDR } from '@/lib/format'

function paymentLabel(order: Order): string {
  return order.paymentMethod === 'qris' ? 'QRIS / AloPay' : `${order.bank ?? ''} Virtual Account`.trim()
}

const statusText: Record<Order['status'], string> = {
  awaiting_payment: 'Menunggu Pembayaran',
  processing: 'Diproses',
  shipped: 'Dikirim',
  delivered: 'Selesai',
}

/** Numeric-only code shown on the barcode (matches Barcode.tsx). */
function barcodeValue(order: Order): string {
  return order.id.replace(/\D/g, '') || '0'
}

/** Deterministic barcode bars in a 0..100 coordinate space (matches Barcode.tsx). */
function barcodeBars(value: string): { x: number; w: number }[] {
  let h = 2166136261
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i)
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
}

// ---- Minimal, dependency-free PDF builder --------------------------------

const PAGE_W = 595.28
const PAGE_H = 841.89
const MARGIN = 46
const CONTENT_W = PAGE_W - MARGIN * 2

type Rgb = [number, number, number]
const INK: Rgb = [0.059, 0.09, 0.165]
const SOFT: Rgb = [0.278, 0.333, 0.412]
const MUTED: Rgb = [0.58, 0.639, 0.722]
const GREEN: Rgb = [0.02, 0.588, 0.412]
const GREEN_DK: Rgb = [0.016, 0.47, 0.34]
const LINE: Rgb = [0.886, 0.91, 0.941]
const WHITE: Rgb = [1, 1, 1]

/** Courier advance width (points) for a given font size. */
const courierW = (str: string, size: number) => str.length * 0.6 * size

/** Escape a string for a PDF literal, transliterating common symbols to ASCII. */
function pdfText(s: string): string {
  return s
    .replace(/×/g, 'x') // ×
    .replace(/[–—]/g, '-') // – —
    .replace(/…/g, '...') // …
    .replace(/[‘’]/g, "'") // ‘ ’
    .replace(/[“”]/g, '"') // “ ”
    .replace(/ /g, ' ') // nbsp
    .replace(/[^\x20-\x7E]/g, '')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
}

class PdfPage {
  ops: string[] = []
  y = PAGE_H - MARGIN

  private fill([r, g, b]: Rgb) {
    this.ops.push(`${r} ${g} ${b} rg`)
  }

  /** Draw text with its baseline at the current y (or an explicit one). */
  text(str: string, opts: { size?: number; font?: 'F1' | 'F2' | 'F3'; x?: number; y?: number; color?: Rgb } = {}) {
    const { size = 11, font = 'F1', x = MARGIN, y = this.y, color = INK } = opts
    this.fill(color)
    this.ops.push('BT', `/${font} ${size} Tf`, `1 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)} Tm`, `(${pdfText(str)}) Tj`, 'ET')
  }

  /** Right-align monospace text so it ends at `right`. */
  textRight(str: string, right: number, opts: { size?: number; y?: number; color?: Rgb } = {}) {
    const { size = 10, y = this.y, color = INK } = opts
    this.text(str, { font: 'F3', size, color, y, x: right - courierW(str, size) })
  }

  rect(x: number, y: number, w: number, h: number, color: Rgb = INK) {
    this.fill(color)
    this.ops.push(`${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re f`)
  }

  circle(cx: number, cy: number, r: number, color: Rgb) {
    const k = 0.5523 * r
    this.fill(color)
    this.ops.push(
      `${(cx + r).toFixed(2)} ${cy.toFixed(2)} m`,
      `${(cx + r).toFixed(2)} ${(cy + k).toFixed(2)} ${(cx + k).toFixed(2)} ${(cy + r).toFixed(2)} ${cx.toFixed(2)} ${(cy + r).toFixed(2)} c`,
      `${(cx - k).toFixed(2)} ${(cy + r).toFixed(2)} ${(cx - r).toFixed(2)} ${(cy + k).toFixed(2)} ${(cx - r).toFixed(2)} ${cy.toFixed(2)} c`,
      `${(cx - r).toFixed(2)} ${(cy - k).toFixed(2)} ${(cx - k).toFixed(2)} ${(cy - r).toFixed(2)} ${cx.toFixed(2)} ${(cy - r).toFixed(2)} c`,
      `${(cx + k).toFixed(2)} ${(cy - r).toFixed(2)} ${(cx + r).toFixed(2)} ${(cy - k).toFixed(2)} ${(cx + r).toFixed(2)} ${cy.toFixed(2)} c`,
      'f',
    )
  }
}

function assemblePdf(streams: string[]): string {
  const bodies: string[] = []
  bodies.push('<< /Type /Catalog /Pages 2 0 R >>')
  const pageRefs: string[] = []
  for (let i = 0; i < streams.length; i++) pageRefs.push(`${6 + i * 2} 0 R`)
  bodies.push(`<< /Type /Pages /Kids [${pageRefs.join(' ')}] /Count ${streams.length} >>`)
  bodies.push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>')
  bodies.push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>')
  bodies.push('<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>')
  streams.forEach((s) => {
    bodies.push(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] ` +
        `/Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >> >> /Contents ${bodies.length + 2} 0 R >>`,
    )
    bodies.push(`<< /Length ${s.length} >>\nstream\n${s}\nendstream`)
  })

  let out = '%PDF-1.4\n'
  const offsets: number[] = []
  bodies.forEach((body, i) => {
    offsets.push(out.length)
    out += `${i + 1} 0 obj\n${body}\nendobj\n`
  })
  const xrefStart = out.length
  out += `xref\n0 ${bodies.length + 1}\n0000000000 65535 f \n`
  offsets.forEach((off) => {
    out += `${String(off).padStart(10, '0')} 00000 n \n`
  })
  out += `trailer\n<< /Size ${bodies.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`
  return out
}

/** Render the order to a self-contained PDF Blob. */
export function buildOrderPdf(order: Order): Blob {
  const right = PAGE_W - MARGIN
  const pages: PdfPage[] = []
  let page = new PdfPage()
  pages.push(page)

  const ensure = (need: number) => {
    if (page.y - need < MARGIN) {
      page = new PdfPage()
      pages.push(page)
      page.y = PAGE_H - MARGIN
    }
  }
  const rule = (color: Rgb = LINE) => {
    page.rect(MARGIN, page.y, CONTENT_W, 0.7, color)
    page.y -= 14
  }
  const sectionTitle = (label: string) => {
    ensure(40)
    page.y -= 10
    page.text(label.toUpperCase(), { font: 'F2', size: 10, color: GREEN, x: MARGIN })
    page.y -= 8
    page.rect(MARGIN, page.y, CONTENT_W, 0.7, LINE)
    page.y -= 16
  }

  // ---- Header band ----
  const bandH = 96
  page.rect(0, PAGE_H - bandH, PAGE_W, bandH, GREEN)
  page.rect(0, PAGE_H - bandH, PAGE_W, 4, GREEN_DK)
  page.text('AloShop', { font: 'F2', size: 26, color: WHITE, x: MARGIN, y: PAGE_H - 46 })
  page.text('Struk Pesanan', { size: 11, color: [0.85, 0.96, 0.91], x: MARGIN, y: PAGE_H - 64 })
  page.textRight(order.id, right, { size: 13, color: WHITE, y: PAGE_H - 44 })
  page.textRight(statusText[order.status], right, { size: 10, color: [0.85, 0.96, 0.91], y: PAGE_H - 62 })
  page.y = PAGE_H - bandH - 26

  // ---- Order info ----
  const info: [string, string][] = [
    ['Tanggal', order.createdAt],
    ['Kurir', order.courier],
    ['Alamat', order.address],
    ['Metode Bayar', paymentLabel(order)],
  ]
  if (order.vaNumber) info.push(['No. VA', order.vaNumber])
  info.forEach(([k, v]) => {
    ensure(17)
    page.text(k, { color: MUTED, size: 10 })
    page.text(v, { x: MARGIN + 96, size: 10, color: SOFT })
    page.y -= 17
  })

  // ---- Items ----
  sectionTitle('Detail Pesanan')
  page.text('Produk', { color: MUTED, size: 9, font: 'F2' })
  page.textRight('Subtotal', right, { size: 9, color: MUTED })
  page.y -= 12
  rule()
  order.items.forEach((it) => {
    ensure(28)
    page.text(it.name.length > 46 ? `${it.name.slice(0, 45)}…` : it.name, { size: 10.5, color: INK })
    page.textRight(formatIDR(it.price * it.qty), right, { size: 10, color: INK })
    page.y -= 14
    page.text(`${it.qty} × ${formatIDR(it.price)}`, { size: 9, color: MUTED })
    page.y -= 16
  })
  rule()
  const totalRow = (label: string, value: string, strong = false) => {
    ensure(18)
    page.text(label, { size: strong ? 12 : 10, color: strong ? INK : SOFT, font: strong ? 'F2' : 'F1' })
    page.textRight(value, right, { size: strong ? 12 : 10, color: strong ? GREEN : SOFT })
    page.y -= strong ? 20 : 16
  }
  totalRow('Subtotal', formatIDR(order.subtotal))
  totalRow('Ongkir', formatIDR(order.shippingFee))
  totalRow('Total', formatIDR(order.total), true)

  // ---- Barcode ----
  sectionTitle('Barcode Validasi')
  const boxH = 92
  ensure(boxH + 6)
  const boxTop = page.y
  page.rect(MARGIN, boxTop - boxH, CONTENT_W, boxH, [0.973, 0.98, 0.988]) // card bg
  page.rect(MARGIN, boxTop - boxH, CONTENT_W, 0.7, LINE)
  page.rect(MARGIN, boxTop, CONTENT_W, 0.7, LINE)
  const code = barcodeValue(order)
  const bw = 300
  const bh = 44
  const bx = MARGIN + (CONTENT_W - bw) / 2
  const barTop = boxTop - 22
  barcodeBars(code).forEach((b) => {
    page.rect(bx + (b.x / 100) * bw, barTop - bh, (b.w / 100) * bw, bh, INK)
  })
  const codeStr = code.split('').join('  ')
  page.text(codeStr, { font: 'F3', size: 12, color: SOFT, x: MARGIN + (CONTENT_W - courierW(codeStr, 12)) / 2, y: boxTop - boxH + 16 })
  page.y = boxTop - boxH - 6

  // ---- Tracking timeline ----
  sectionTitle('Status Pengiriman')
  const blockH = 34
  const dotX = MARGIN + 6
  order.tracking.forEach((s, i) => {
    ensure(blockH)
    const dotY = page.y - 4
    const isLast = i === order.tracking.length - 1
    if (!isLast) page.rect(dotX - 0.8, dotY - blockH, 1.6, blockH, s.done ? GREEN : LINE)
    page.circle(dotX, dotY, 5, s.done ? GREEN : MUTED)
    if (s.done) page.circle(dotX, dotY, 1.8, WHITE)
    page.text(s.label, { x: MARGIN + 22, size: 10.5, font: 'F2', color: s.done ? INK : SOFT })
    page.textRight(s.time, right, { size: 9, color: MUTED, y: page.y })
    page.y -= 13
    page.text(s.description, { x: MARGIN + 22, size: 9, color: MUTED })
    page.y -= blockH - 13
  })

  // ---- Footer ----
  page.y -= 6
  page.rect(MARGIN, page.y, CONTENT_W, 0.7, LINE)
  page.y -= 16
  page.text('Terima kasih telah berbelanja di AloShop!', { color: MUTED, size: 10 })

  const pdf = assemblePdf(pages.map((p) => p.ops.join('\n')))
  return new Blob([pdf], { type: 'application/pdf' })
}

/** Download the order as a PDF file. */
export function downloadOrderReceipt(order: Order): void {
  const url = URL.createObjectURL(buildOrderPdf(order))
  const a = document.createElement('a')
  a.href = url
  a.download = `Pesanan-${order.id}.pdf`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
