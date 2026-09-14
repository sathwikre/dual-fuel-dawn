# OM Solutions — Dual Fuel & Alternate Fuel Solutions

Official website for **OM Solutions**, a Pune-based engineering company delivering dual-fuel and alternate-fuel conversion solutions for diesel engines across industrial, generator, marine, and commercial vehicle applications.
---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [TanStack Start](https://tanstack.com/start) v1.168 |
| Routing | TanStack Router v1.170 (file-based) |
| Language | TypeScript 5.8 |
| Styling | Tailwind CSS v4 (CSS-first config) |
| UI Components | shadcn/ui + Radix UI |
| Icons | Lucide React |
| Build | Vite 8 + Nitro (Cloudflare Workers target) |
| Server State | TanStack Query v5 |
| Fonts | Inter, JetBrains Mono (Google Fonts) |
| Deployment | Cloudflare Pages / Workers |

---

## Project Structure

```
src/
├── routes/
│   ├── __root.tsx          # Root layout — HTML shell, fonts, QueryClientProvider
│   └── index.tsx           # Main page — full OM Solutions website (single route)
├── components/
│   ├── SavingsAssistant/   # Floating dual-fuel savings calculator
│   │   ├── SavingsAssistant.tsx        # Top-level orchestrator
│   │   ├── SavingsAssistantButton.tsx  # Floating action button (circuit icon, glow)
│   │   ├── SavingsCalculator.tsx       # Calculator panel container
│   │   ├── CalculatorForm.tsx          # 8-step conversational form
│   │   ├── CalculatorProgress.tsx      # Step progress bar
│   │   ├── CalculatorResults.tsx       # Results display (savings + CO₂)
│   │   └── calculatorUtils.ts          # Formulas, types, validation, currency format
│   └── ui/                 # shadcn/ui component library
├── assets/
│   ├── img-*.jpg           # Product/installation photographs
│   ├── image.png           # RECD system diagram
│   ├── imm.jpeg            # Dual fuel kit schematic
│   ├── borewell/           # Borewell application photos (7 images)
│   ├── aircompressor/      # Air compressor photos (7 images)
│   ├── Marine Propulsion/  # Marine propulsion photos (2 images)
│   └── Image gallery/
│       └── birla_tisya_bangaloore/  # Birla Tisya installation photos (8 images)
├── styles.css              # Global styles + Tailwind v4 theme tokens (oklch)
├── router.tsx              # Router factory with QueryClient context
├── server.ts               # SSR/Nitro entry + error handling
└── start.ts                # TanStack Start instance (CSRF + error middleware)

server/
├── models/                 # (stub — for future MongoDB integration)
├── routes/                 # (stub — for future API routes)
├── middleware/             # (stub)
└── seed/                   # (stub)

public/
├── om-solutions.html       # Standalone HTML reference page
└── robots.txt
```

---

## Getting Started

**Prerequisites:** Node.js 18+ and npm (or bun).

```sh
git clone <repository-url>
cd dual-fuel-dawn
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build (Nitro + Cloudflare target) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Run Prettier |

---

## Key Features

### Website Sections
- **Hero** — Cinematic animated background (Ken Burns + canvas particles), centred headline, "Contact Us" CTA
- **About** — Company history, founder details (Prasad Parulekar, IIT Bombay, 14+ yrs Cummins), stats
- **Explore Technology** — Cinematic banner that opens a full-screen Technology Drawer
- **Technology Drawer** — 10 sections: Solutions, Dual Fuel Kit, Technology, Benefits, Comparison, Components, Installations, Case Studies, Diesel Substitution, Other Applications
- **Image Gallery** — Birla Tisya Bengaluru installation (8 photos), Instagram-style popup viewer
- **Latest News** — Client story cards
- **Contact / Consultation** — Form wired to Formspree → `suramsathwikreddy292@gmail.com`
- **Footer** — Social links (LinkedIn, YouTube, Twitter, Instagram), quick links, contact

### Floating Savings Calculator
A floating assistant button (bottom-right) opens a conversational 8-step calculator:

1. Diesel consumption (L/hr)
2. Diesel price (₹/L)
3. Dual-fuel diesel consumption (L/hr)
4. Gas type (PNG / CNG / LPG)
5. Gas consumption (Sm³/hr or kg/hr)
6. Gas price (₹/Sm³ or ₹/kg)
7. Operating hours/day
8. Operating days/month

**Outputs:** Hourly / daily / monthly / annual savings, diesel replacement %, cost reduction %, diesel volume reduction, CO₂ reduction estimates (using `DIESEL_CO2_FACTOR = 2.68 kg CO₂/L`).

### Application Galleries
Clicking any application card (Borewell, Air Compressor, Marine Propulsion, KOEL 320 kVA) opens an Instagram-style image popup with thumbnails and prev/next navigation.

---

## Design System

All colors use **oklch** format defined in `src/styles.css`:

| Token | Value | Usage |
|---|---|---|
| `--panel` | `oklch(0.19 0.045 158)` | Dark green — hero, kit section, footer |
| `--signal` | `oklch(0.72 0.16 155)` | Vivid green accent — CTAs, highlights |
| `--background` | `oklch(1 0 0)` | White |
| `--foreground` | `oklch(0.129 0.042 265)` | Near-black |
| `--primary` | `oklch(0.208 0.042 266)` | Dark navy |
| `--secondary` | `oklch(0.968 0.007 248)` | Off-white grey |

Fonts: **Inter** (body) + **JetBrains Mono** (labels, mono elements).

---

## Contact

**OM Solutions**
29A, Sairam Park, Near Cipla Foundation, Warje, Pune, Maharashtra 411058

- Email: [omsolns18@gmail.com](mailto:omsolns18@gmail.com)
- WhatsApp: [+91 9014941863](https://wa.me/919014941863)

---

## Deployment

The project deploys to **Cloudflare Pages** via Nitro. Build output is in `.output/`.

```sh
npm run build