# Aloshop — Client (Storefront)

Mobile-first storefront homepage for Aloshop, built with **React + TypeScript + Vite + Tailwind CSS**.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check + production build
npm run preview  # preview the production build
```

## Architecture

The UI follows an **atomic-design** layering so components stay small and reusable:

```
src/
├── components/
│   ├── atoms/        # Logo, Badge, Price, Rating, ProgressBar, Thumbnail, IconButton
│   ├── molecules/    # SearchBar, ProductCard, FlashDealCard, QtyStepper, StoreCard, ...
│   ├── organisms/    # AppHeader, RewardsCard, QuickActions, FlashDeals, BottomTabBar, ...
│   ├── ui/           # Button, SubHeader, QrCode
│   ├── layouts/      # MobileFrame, ShopLayout (tabs), RequireAuth
│   └── icons/        # dependency-free inline SVG icon set
├── context/          # AuthContext, CartContext, OrdersContext (localStorage-backed)
├── features/         # one folder per screen (see below)
├── data/             # mock content (swap for an API layer)
├── hooks/            # useCountdown
├── lib/              # cn(), formatters, constants
└── types/            # domain models
```

## Routing, auth & state

`react-router-dom` drives navigation inside the phone frame. Three React
contexts hold app state and persist to `localStorage`:

- **AuthContext** — dummy sign-in (any credentials). `/account`, `/orders`,
  `/checkout` and payment are gated by `RequireAuth`; browsing is open.
- **CartContext** — add / update qty / remove; drives the cart badge + FAB.
- **OrdersContext** — creates orders at checkout, generates a VA number and a
  delivery tracking timeline, and flips status to *processing* once paid.

## Screens

| Route | Screen | Notes |
| --- | --- | --- |
| `/` | Home | rewards, flash deals, catalog — add to cart |
| `/category` | Category | searchable catalog with category chips |
| `/cart` | Cart | qty steppers, totals, checkout CTA |
| `/checkout` | Checkout | address, summary, payment method (QRIS + VA banks) |
| `/payment/:orderId` | Payment | QRIS QR **or** VA number + copy, countdown timer |
| `/orders` | Orders | order list with pay / track actions |
| `/orders/:orderId` | Tracking | step-by-step delivery timeline |
| `/account` | Account | profile, loyalty, menu, logout |
| `/alopay` | AloPay | wallet balance + pay QR |
| `/login` | Login | dummy split-hero sign-in |

### Payment flow

Checkout → pick **QRIS** (renders a decorative QR) or a **Virtual Account**
(BCA / Mandiri / BNI / BRI, with a generated VA number and copy button) →
*Saya Sudah Bayar* marks the order paid, clears the cart, and opens the tracking
timeline. All simulated client-side; no real payment gateway.

Design tokens live in `tailwind.config.ts`. Mock content lives in `src/data/*`,
so wiring a real backend means replacing the data + context internals while the
presentational components stay unchanged.
