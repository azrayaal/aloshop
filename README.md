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
│   ├── molecules/    # SearchBar, ProductCard, FlashDealCard, CategoryTile, StoreCard, ...
│   ├── organisms/    # AppHeader, RewardsCard, QuickActions, FlashDeals, ProductGrid, BottomTabBar, ...
│   ├── layouts/      # MobileFrame (phone shell)
│   └── icons/        # dependency-free inline SVG icon set
├── features/home/    # HomeScreen — composes the storefront
├── data/             # mock content (swap for an API layer)
├── hooks/            # useCountdown
├── lib/              # cn(), formatters
└── types/            # domain models
```

Design tokens (brand palette, radii, shadows) live in `tailwind.config.ts`.
Content is isolated in `src/data/home.ts`, so wiring a real backend means
replacing that module — the presentational components stay unchanged.
# aloshop
