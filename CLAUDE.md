# CLAUDE.md — Goa International Tourism Recovery AI Dashboard

## Project Overview
An AI-powered intelligence dashboard that tracks international tourist recovery for the Government of Goa. It monitors booking trends from key source markets (Russia, UK, Israel, Germany, Poland, Kazakhstan), benchmarks against competitor destinations (Thailand, Bali, Vietnam), recommends campaign timing, scores charter partnerships, predicts arrivals 90 days out, and auto-generates monthly minister-ready intelligence reports.

## Tech Stack
- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL + Realtime + Auth + Edge Functions)
- **Charts**: Recharts + D3.js (for custom flight route visualizations)
- **Maps**: Mapbox GL JS (dark style, flight arc overlays)
- **Animations**: Framer Motion
- **Auth**: NextAuth.js (role-based: Admin / Minister / Staff)
- **Data Pipelines**: n8n (self-hosted) for scheduled ETL
- **AI Reports**: Claude API (Anthropic) for narrative generation
- **PDF Generation**: @react-pdf/renderer
- **APIs**: Amadeus Self-Service (flights), AviationStack (schedules), PyTrends (Google Trends)
- **Deployment**: Vercel

## Design Direction
**Aesthetic: "Government Intelligence Meets Bloomberg Terminal"**
- This is NOT a generic admin dashboard with pastel cards
- Dark theme primary: `#0A0B0F` (near-black), NOT pure `#000`
- Accent: Saffron/Amber `#F59E0B` — Indian identity without being literal
- Positive trends: Teal `#0EA5E9`
- Negative trends: Red `#EF4444`
- Neutral data: Slate `#94A3B8`
- Card backgrounds: `#111318` with `1px` border `rgba(255,255,255,0.06)`
- Typography: Geist Mono for data/numbers, Geist Sans for UI text
- Large confident KPI numbers: 48-72px
- Dense but scannable — every pixel earns its place
- Mapbox dark style with glowing flight route arcs
- Micro-animations: numbers counting up, charts drawing in, staggered card reveals

**Dashboard Style Reference (from UI UX Pro Max):**
- Primary: "Data-Dense Dashboard" or "Executive Dashboard" or "Real-Time Monitoring"
- Chart types: Area charts (trends), Bar charts (comparisons), Geo maps (source markets), Gauge (recovery %), Sankey (tourist flow)
- NO: rounded pastel cards, gradient backgrounds, emoji icons, purple AI aesthetic

## Project Structure
```
goa-tourism-dashboard/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout with dark theme
│   │   ├── page.tsx                      # Command Center (home)
│   │   ├── globals.css                   # Tailwind + CSS variables
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx                # Dashboard shell with sidebar
│   │   │   ├── page.tsx                  # Command Center
│   │   │   ├── source-markets/page.tsx   # Source Market Intelligence
│   │   │   ├── competitors/page.tsx      # Competitor Radar
│   │   │   ├── charter-ops/page.tsx      # Charter Operations Hub
│   │   │   ├── predictions/page.tsx      # Predictive Analytics
│   │   │   ├── campaigns/page.tsx        # Campaign Intelligence
│   │   │   └── reports/page.tsx          # Minister's Intelligence Reports
│   ├── components/
│   │   ├── ui/                           # Base UI components (shadcn-style)
│   │   ├── charts/                       # Recharts + D3 custom chart components
│   │   ├── maps/                         # Mapbox components (flight routes, source market bubbles)
│   │   ├── dashboard/                    # Dashboard-specific components
│   │   │   ├── KPICard.tsx
│   │   │   ├── RecoveryGauge.tsx
│   │   │   ├── SourceMarketCard.tsx
│   │   │   ├── CompetitorTable.tsx
│   │   │   ├── CharterCalendar.tsx
│   │   │   ├── ForecastChart.tsx
│   │   │   ├── CampaignTimeline.tsx
│   │   │   └── AlertFeed.tsx
│   │   └── layout/
│   │       ├── Sidebar.tsx
│   │       ├── TopBar.tsx
│   │       └── MobileNav.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts                 # Browser client
│   │   │   ├── server.ts                 # Server client
│   │   │   └── types.ts                  # Generated types from schema
│   │   ├── amadeus/
│   │   │   └── client.ts                 # Amadeus API wrapper
│   │   ├── utils/
│   │   │   ├── formatting.ts             # Number formatting (Indian lakhs/crores)
│   │   │   ├── dates.ts                  # Date helpers
│   │   │   └── calculations.ts           # YoY growth, recovery %, etc.
│   │   └── constants/
│   │       ├── markets.ts                # Source market definitions
│   │       ├── competitors.ts            # Competitor destination configs
│   │       └── historical-data.ts        # Seed data 2017-2025
│   ├── hooks/
│   │   ├── useRealtimeData.ts            # Supabase realtime subscriptions
│   │   ├── useFlightPrices.ts            # Amadeus price polling
│   │   └── useForecast.ts               # Forecast data fetching
│   ├── types/
│   │   └── index.ts                      # Global TypeScript types
│   └── api/
│       ├── trpc/                         # tRPC router (optional)
│       └── cron/                         # Vercel cron job handlers
├── supabase/
│   ├── migrations/                       # SQL migration files
│   └── seed.sql                          # Historical data seed (2017-2025)
├── public/
│   └── fonts/                            # Geist font files
├── .env.local                            # API keys (never commit)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Database Schema (Supabase)
See `supabase/migrations/` for full schema. Key tables:
- `arrival_stats` — Monthly tourist arrivals by nationality, type, airport
- `flight_prices` — Daily flight prices (origin → GOI/GOX vs competitors)
- `charter_flights` — Individual charter flight records
- `competitor_stats` — Monthly competitor destination data
- `search_trends` — Weekly Google Trends data by country
- `forecasts` — 90-day rolling arrival predictions
- `campaign_recommendations` — AI-generated campaign suggestions
- `intelligence_reports` — Monthly auto-generated PDF reports
- `hotel_prices` — Daily hotel price comparisons

## Key Historical Data Points (Seed Data)
Foreign tourist arrivals to Goa:
- 2017: 8,90,459 (BENCHMARK / peak)
- 2019: ~8,50,000
- 2021: ~12,000 (pandemic low)
- 2023: 4,52,702
- 2024: 4,67,911
- 2025: 5,17,802 (58% of 2017 peak — 42% gap remains)

Charter flights:
- 2017: 1,024 flights / 2,49,374 tourists
- 2025: 189 flights / 40,336 tourists (84% decline)

## API Integrations
1. **Amadeus Self-Service API** (free tier: 2,000 requests/month)
   - Flight Offers Search: Prices from source cities → GOI
   - Flight Inspiration Search: Trending destinations from source cities
   - Flight Cheapest Date Search: Price calendars
   - Flight Price Analysis: Historical price comparisons
   
2. **Supabase Realtime** — Live dashboard subscriptions
3. **Claude API** — Monthly report narrative generation
4. **Mapbox GL JS** — Flight route visualization on dark map
5. **PyTrends** — Google Trends data (unofficial, no key needed)

## Number Formatting Convention
- All Indian tourist numbers use lakh/crore system
- Display: "5.17L" or "5,17,802" (Indian comma format)
- YoY shown as: "+10.7% YoY" (green) or "-3.2% YoY" (red)
- Recovery shown as: "58% of 2017 peak" with gauge visualization

## Critical UX Rules
1. Every KPI must show: Current value + YoY change + trend direction arrow
2. Time period selector on every page: MTD / QTD / YTD / Custom Range
3. Color = meaning: Green = growth, Red = decline, Amber = needs attention
4. Mobile-responsive but desktop-first (this is a war room tool)
5. Loading states: skeleton screens with pulse animation, never blank
6. All charts must have proper axis labels, legends, and tooltips
7. Minister's report page must have one-click PDF download
8. No dummy data in production — show "Awaiting data" states when empty

## Environment Variables Required
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
AMADEUS_CLIENT_ID=
AMADEUS_CLIENT_SECRET=
MAPBOX_ACCESS_TOKEN=
ANTHROPIC_API_KEY=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```

## Commands
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint
npm run db:migrate   # Run Supabase migrations
npm run db:seed      # Seed historical data
npm run db:types     # Generate TypeScript types from Supabase
```

## Build Phases
- **Phase 1**: Foundation — Scaffold, design system, Command Center with static seed data
- **Phase 2**: Live Data — Amadeus integration, n8n pipelines, Source Markets + Competitor pages
- **Phase 3**: Intelligence — Forecasting model, Charter Hub, Campaign Intelligence
- **Phase 4**: Report Generation — Claude API narrative + PDF generation + email distribution
- **Phase 5**: Polish — Performance, mobile, RBAC, deploy

## Important Context
- The minister (Tourism Minister Rohan Khaunte) needs to see recovery progress at a glance
- Key source markets: Russia, UK, Israel, Germany, Poland, Kazakhstan
- Key competitors: Thailand (33M tourists), Vietnam (21M), Bali (4M+), Sri Lanka
- Goa's pricing problem: 3-5x more expensive than competitors for same quality
- Two airports: Dabolim (GOI) and Mopa/Manohar International (GOX)
- Charter tourism collapse is THE story (84% decline since 2017)
- Domestic tourism (1.08 crore in 2025) is masking the international gap
