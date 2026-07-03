import type { SVGProps } from 'react'

/**
 * Lightweight, stroke-based icon set (Lucide-style) rendered inline so the
 * storefront ships without an icon dependency. Every icon inherits the current
 * text color and accepts standard SVG props (className, width, etc.).
 */
export type IconProps = SVGProps<SVGSVGElement>

function base(props: IconProps) {
  return {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    ...props,
  }
}

export const SearchIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
)

export const ScanIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
    <path d="M7 12h10" />
  </svg>
)

export const BellIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
)

export const CartIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
)

export const PinIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

export const ChevronDownIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export const ChevronRightIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m9 18 6-6-6-6" />
  </svg>
)

export const StarIcon = (p: IconProps) => (
  <svg {...base({ fill: 'currentColor', stroke: 'none', ...p })}>
    <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.3l6.5-.9L12 2.5Z" />
  </svg>
)

export const HeartIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M19 14c1.5-1.5 3-3.3 3-5.5A4.5 4.5 0 0 0 12 5.8 4.5 4.5 0 0 0 2 8.5c0 2.2 1.5 4 3 5.5l7 7Z" />
  </svg>
)

export const PlusIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const CheckCircleIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M22 11.1V12a10 10 0 1 1-5.9-9.1" />
    <path d="m9 11 3 3L22 4" />
  </svg>
)

export const ReceiptIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1V2l-2 1-2-1-2 1-2-1-2 1-2-1Z" />
    <path d="M8 7h8M8 11h8M8 15h5" />
  </svg>
)

export const TagIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12.6 2.7 21 11a2 2 0 0 1 0 2.8l-6.2 6.2a2 2 0 0 1-2.8 0L3.6 11.7A2 2 0 0 1 3 10.3V4a1.3 1.3 0 0 1 1.3-1.3h6a2 2 0 0 1 1.3.7Z" />
    <circle cx="7.5" cy="7.5" r="1.2" fill="currentColor" />
  </svg>
)

export const TruckIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M2 5h11v11H2zM13 8h4l4 4v4h-8" />
    <circle cx="6.5" cy="18.5" r="1.8" />
    <circle cx="17.5" cy="18.5" r="1.8" />
  </svg>
)

export const GridIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
)

export const BasketIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 11h14l-1.4 8.2a2 2 0 0 1-2 1.8H8.4a2 2 0 0 1-2-1.8L5 11Z" />
    <path d="m9 11 1.5-6M15 11l-1.5-6" />
    <path d="M3.5 11h17" />
  </svg>
)

export const AppleIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 8c-1.5-3-5-3-6.5-1S4 12 6 16c1 2 2.5 4 4 4 1 0 1.5-.5 2-.5s1 .5 2 .5c1.5 0 3-2 4-4 1-2 1.2-4 .5-5.5" />
    <path d="M12 8c0-2 1-3.5 3-4" />
  </svg>
)

export const CupIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 8h12l-1 11a2 2 0 0 1-2 1.8H9A2 2 0 0 1 7 19L6 8Z" />
    <path d="M9 8V5h6v3M9.5 3h5" />
  </svg>
)

export const HomeIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
  </svg>
)

export const QrIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <path d="M14 14h3v3M20 14v7M14 20h3" />
  </svg>
)

export const BarcodeIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 6v12M8 6v12M12 6v12M16 6v12M20 6v12" />
  </svg>
)

export const DownloadIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3v12" />
    <path d="m7 11 5 4 5-4" />
    <path d="M5 21h14" />
  </svg>
)

export const UserIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.5-6 8-6s8 2 8 6" />
  </svg>
)

export const CloseIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
)

export const ChevronLeftIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m15 18-6-6 6-6" />
  </svg>
)

export const MinusIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14" />
  </svg>
)

export const TrashIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 6h18M8 6V4h8v2M6 6l1 14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-14" />
    <path d="M10 11v6M14 11v6" />
  </svg>
)

export const CopyIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h10" />
  </svg>
)

export const ClockIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)

export const ShieldIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" />
    <path d="m9 11.5 2 2 4-4" />
  </svg>
)

export const WalletIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="6" width="18" height="13" rx="2" />
    <path d="M16 12h3M3 9h18" />
  </svg>
)

export const BankIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 10h16M5 10V8l7-4 7 4v2M6 10v7M10 10v7M14 10v7M18 10v7M4 20h16" />
  </svg>
)

export const LogoutIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="m16 17 5-5-5-5M21 12H9" />
  </svg>
)

export const EditIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
)

export const HeadsetIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
    <rect x="2.5" y="13" width="4" height="7" rx="1.5" />
    <rect x="17.5" y="13" width="4" height="7" rx="1.5" />
    <path d="M20 20a3 3 0 0 1-3 3h-3" />
  </svg>
)

export const GiftIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <path d="M5 12v8h14v-8M12 8v12" />
    <path d="M12 8S10 3 7.5 4.5 9 8 12 8Zm0 0s2-5 4.5-3.5S15 8 12 8Z" />
  </svg>
)

export const CheckIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
)
