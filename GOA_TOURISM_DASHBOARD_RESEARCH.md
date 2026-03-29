# Goa International Tourism Recovery AI Dashboard
## Complete Research, Data Architecture & Implementation Blueprint

---

## 1. THE PROBLEM — Quantified

### Foreign Tourist Arrivals: The Gap

| Year | Foreign Tourists | Charter Flights | Charter Tourists | Int'l Scheduled Flights | Scheduled Tourists |
|------|-----------------|-----------------|------------------|------------------------|--------------------|
| 2017 | **8,90,459** | 1,024 | 2,49,374 | 2,460 | 3,35,573 |
| 2018 | ~8,50,000 | ~900 | ~2,30,000 | ~2,300 | ~3,20,000 |
| 2019 | ~8,50,000 | 799 | 2,16,738 | ~2,200 | ~3,10,000 |
| 2020 | COLLAPSED | — | — | — | — |
| 2021 | ~12,000 | — | — | 265 | 11,971 |
| 2022 | ~1,70,000 | — | — | 1,135 | 1,34,922 |
| 2023 | 4,52,702 | 356 | 72,795 | 1,416 | 1,95,067 |
| 2024 | 4,67,911 | 266 | 58,680 | 1,546 | 1,95,990 |
| 2025 | **5,17,802** | 189 | 40,336 | 1,784 | 2,35,798 |

**Key Insight:** Foreign tourists in 2025 (5.17 lakh) are still only **58% of the 2017 peak** (8.9 lakh). That's a **42% gap** — nearly 3.7 lakh missing international tourists annually.

### Charter Collapse Is The Headline Story
- 2017: 1,024 charter flights → **2,49,374 tourists**
- 2025: 189 charter flights → **40,336 tourists**
- That's an **84% decline in charter tourists** — this alone accounts for ~2 lakh of the missing tourists
- Charter flights went from ~6/day (pre-COVID Russia peak) to ~6/week

### What's Actually Recovering
- International scheduled flights: 1,784 in 2025 vs 2,460 in 2017 (72% recovery)
- Mopa Airport now handles **64% of international flights** (1,141 of 1,784)
- Cruise tourism: 37 vessels, 10,086 foreign passengers (vs 40,822 in 2017)
- Domestic tourism: **1.08 crore in 2025** — an all-time record, masking the foreign tourist problem

---

## 2. SOURCE MARKET ANALYSIS

### Traditional Core Markets (Pre-COVID)
| Market | Pre-COVID Status | Current Status | Key Issue |
|--------|-----------------|----------------|-----------|
| **Russia** | #1 source, 6 charters/day | 6 flights/week (Aeroflot), new charters from Moscow, Novosibirsk, Yekaterinburg | Russia-Ukraine war, sanctions, reduced purchasing power |
| **UK** | #2 source, major charter + FIT | 2 charters/week (Mopa), strong FIT segment | Reduced charter volume, competing with Spain/Turkey |
| **Israel** | Major spender, FIT-heavy | Significant decline | Israel-Hamas conflict since Oct 2023 |
| **Germany** | Strong FIT, golden triangle combos | Moderate FIT recovery via Scandinavia route | Competing with cheaper SEA destinations |
| **Poland** | Emerging | Charter flights started Nov 2025 | Brand new market, needs development |

### Emerging Markets Being Pursued
- **Kazakhstan**: Fly Arystan charter flights from Astana (started Oct 2025, twice weekly)
- **Kyrgyzstan**: Government actively pursuing
- **Central Asia broadly**: Growing interest, new charter routes
- **Middle East**: Rising arrivals noted in H1 2025 data
- **Scandinavia**: FIT travelers via scheduled flights, government targeting direct charter routes

### What The Data Tells Us
1. **Russia is trying to come back** — Nordwind Airlines (Moscow, Yekaterinburg), Aeroflot (9 weekly flights) show demand exists
2. **Israel is a casualty of geopolitics** — nothing Goa can control, but monitoring is critical for timing re-entry marketing
3. **Poland/Central Asia are the growth story** — small base but high upside
4. **FIT from Europe is the quiet winner** — UK, Portugal, Germany, Scandinavia, France travelers on scheduled flights, spending more per capita

---

## 3. COMPETITOR LANDSCAPE — The Destinations Eating Goa's Lunch

### Thailand
- **2025 arrivals**: 32.97 million (down 7.23% from 2024's 35.55M, but still massive)
- **Pre-COVID peak**: 39.9 million
- **Key advantage**: 60-day visa-free for 93 countries, world-class infrastructure, $28-42/day budget tier
- **Russia market**: 1.90 million Russian tourists in 2025 (+8.8% YoY) — Thailand gets **100x more Russians than Goa**
- **India market**: 2.49 million Indian tourists (+16.8% YoY) — Indians choosing Thailand over Goa
- **Digital arrival card**: Mandatory from May 2025, full digital tourism infrastructure

### Vietnam
- **2025 arrivals**: 21.17 million (+20.4% YoY) — fastest growing in SEA
- **Cost advantage**: 30-50% cheaper than Thailand and Bali for food, accommodation, transport
- **Budget tier**: $20-35/day for budget travelers, 7-day trip costs $150-250
- **Russia market**: Russian arrivals up **239.7% YoY** in December 2025 (Azur Air direct flights to Khanh Hoa)
- **Visa**: Free entry for 25-30 countries, 90-day stays for some
- **UK/Germany**: Both up 15-17% YoY — directly competing with Goa for European FIT market

### Bali (Indonesia)
- **2025 arrivals**: 4+ million foreign tourists in first 7 months alone
- **Cost advantage**: Slightly cheaper than Thailand, IDR 150,000 (~$10) tourist levy
- **Positioning**: Digital nomad paradise, wellness tourism, spiritual tourism
- **Infrastructure**: Strong tourism tax generating revenue for sustainability

### The Pricing Problem for Goa
- A Novotel in Goa (non-beachfront): ₹30,000/night
- Beachfront hotel with private pool in Phuket: ₹9,000/night
- 5-star Movenpick in Cam Ranh, Vietnam: ₹6,000/night
- Sea-view hotel in Da Nang: ₹3,500/night
- **Goa is 3-5x more expensive than competitors for equivalent quality**
- A 3-star hotel in Goa: ₹4,000-6,000/night; equivalent in Phuket/Pattaya: half the price

---

## 4. DATA SOURCES & API ARCHITECTURE

### Tier 1: Live Data APIs (Real-Time / Daily Updates)

| Data Source | What It Provides | API Type | Cost |
|-------------|-----------------|----------|------|
| **Amadeus Self-Service API** | Flight searches, prices, routes to GOI/GOX, demand trends, cheapest dates, flight inspiration | REST API (JSON) | Free tier: 2,000 flight searches/month; Pay-as-you-go beyond |
| **Amadeus Travel Intelligence** | Forward-looking booking data, source market demand, competitor route analysis | Enterprise API | Custom pricing (high value for this use case) |
| **Amadeus Destination Gateway** | Traveler journey visualization, search-to-booking conversion, visitor profiles | Enterprise dashboard + API | Custom pricing |
| **Skyscanner Flights API** | Real-time flight prices from multiple airlines, route comparisons | REST API | Free tier available |
| **FlightAware Aero API** | Real-time flight tracking, historical flight data, airport activity | REST API | Free tier: limited; Paid: usage-based |
| **AviationStack API** | Real-time & historical flight data, airline routes, airport schedules | REST API | Free: 100 requests/month; Paid plans available |
| **Kiwi Tequila API** | Flight search, route mapping, price tracking | REST API | Free tier for startups |

### Tier 2: Structured Data Sources (Weekly/Monthly Updates)

| Data Source | What It Provides | Access Method |
|-------------|-----------------|---------------|
| **Goa Department of Tourism** (goatourism.gov.in) | Official arrival statistics, charter data, cruise data | Web scraping / PDF parsing (Form XI data) |
| **India Open Government Data** (data.gov.in) | Tourism sector datasets, state-level arrivals | Open API / CSV downloads |
| **CEIC Data** | Goa visitor arrivals time series (yearly) | Paid subscription |
| **Statista** | India/Goa tourism statistics, market breakdowns | Paid subscription |
| **UNWTO Tourism Data** | Country-level international arrival data | Paid API / bulk download |
| **Bureau of Immigration, India** | Nationality-wise foreign tourist arrivals | RTI / Published reports |

### Tier 3: Competitor Intelligence (Scraped / Aggregated)

| Data Source | What It Provides | Method |
|-------------|-----------------|--------|
| **Trading Economics** | Thailand, Vietnam, Bali tourist arrival time series | Web scraping / API |
| **TAT (Tourism Authority of Thailand)** | Monthly nationality-wise arrival data | Published reports (PDF/web scrape) |
| **Vietnam VNAT** | Monthly arrival statistics by nationality | Published reports |
| **Bali Statistics** | Monthly foreign arrival data | Published reports |
| **Google Trends** | Search interest for "Goa holiday", "Bali holiday", "Thailand holiday" by country | Google Trends API (unofficial / Pytrends) |
| **Booking.com / OTA price tracking** | Hotel pricing in Goa vs competitors | Web scraping (ethical, price comparison) |

### Tier 4: AI & Prediction Layer

| Capability | Method |
|-----------|--------|
| **90-day arrival forecasting** | SARIMA / Prophet / LSTM on historical arrival time series + booking lead time data from Amadeus |
| **Campaign timing optimization** | Correlation analysis: Google Trends search spikes → booking windows → optimal ad spend timing |
| **Charter partnership scoring** | Weighted model: route profitability × source market size × growth trend × geopolitical stability |
| **Competitor price positioning** | Daily scrape of flight + hotel prices for GOI vs BKK/HKT/SGN/DPS from same origin cities |
| **Monthly intelligence report generation** | Claude API / GPT-4 for narrative generation from structured data, auto-PDF creation |

---

## 5. TECHNICAL ARCHITECTURE

### Stack Recommendation

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (Dashboard)                   │
│  Next.js 14 (App Router) + TypeScript + Tailwind CSS     │
│  Charts: Recharts / D3.js for custom visualizations      │
│  Maps: Mapbox GL JS (flight route visualization)         │
│  Animations: Framer Motion                                │
│  Auth: NextAuth.js (role-based: Admin / Minister / Staff)│
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────┴────────────────────────────────────┐
│                    API LAYER                              │
│  Next.js API Routes + tRPC (type-safe)                   │
│  Cron Jobs: Vercel Cron / Node-cron for data fetching    │
│  Rate Limiting: Upstash Redis                            │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────┴────────────────────────────────────┐
│                 DATA LAYER                                │
│  Supabase (PostgreSQL)                                    │
│  ├── arrival_stats (monthly, by nationality)             │
│  ├── charter_flights (per flight, operator, origin)      │
│  ├── flight_prices (daily, by route)                     │
│  ├── competitor_stats (monthly, by destination)          │
│  ├── hotel_prices (daily, Goa vs competitors)            │
│  ├── google_trends (weekly, by search term + country)    │
│  ├── campaign_recommendations (AI-generated)             │
│  ├── forecasts (90-day rolling predictions)              │
│  └── intelligence_reports (monthly auto-generated PDFs)  │
│                                                           │
│  Supabase Edge Functions (data pipeline workers)          │
│  Supabase Realtime (live dashboard updates)              │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────┴────────────────────────────────────┐
│              DATA PIPELINE / ETL                          │
│  n8n (self-hosted, already in your stack)                 │
│  ├── Amadeus API polling (daily flight price checks)     │
│  ├── Web scraper workflows (competitor stats, govt data) │
│  ├── Google Trends data fetcher (weekly)                 │
│  ├── Forecast model trigger (weekly re-training)         │
│  ├── Monthly report generator (Claude API + PDF gen)     │
│  └── Alert system (anomaly detection → email/Slack)      │
│                                                           │
│  Python Scripts (for ML models)                           │
│  ├── Prophet / SARIMA forecasting                        │
│  ├── Charter partnership scoring model                   │
│  └── Campaign timing optimizer                           │
└─────────────────────────────────────────────────────────┘
```

### Why This Stack
1. **Next.js + Supabase** — You already know this stack well, fast to ship
2. **n8n for ETL** — Already in your stack, perfect for scheduled data pipelines
3. **Supabase Realtime** — Live dashboard updates without polling
4. **Edge Functions** — Server-side data processing without separate backend
5. **Mapbox** — Beautiful flight route visualization (origin → Goa mapping)
6. **Claude API** — For auto-generating monthly intelligence reports in natural language

---

## 6. DASHBOARD PAGES / MODULES

### Page 1: Command Center (Home)
- **Hero KPIs**: Total foreign arrivals (MTD/YTD), YoY change, % of 2017 peak recovery
- **Live flight tracker**: Active international flights inbound to GOI/GOX
- **Arrival trend sparklines**: Last 12 months, domestic vs foreign
- **Alert feed**: Anomalies, sudden booking spikes/drops, geopolitical events affecting source markets
- **Recovery gauge**: Visual progress toward pre-pandemic benchmark (8.9 lakh target)

### Page 2: Source Market Intelligence
- **Interactive world map**: Bubble size = tourist volume from each country, color = YoY growth
- **Market cards**: Russia, UK, Israel, Germany, Poland, Kazakhstan — each with:
  - Current season arrivals vs last season
  - Charter flight count + scheduled flight count
  - Average spend per tourist
  - Google Trends search interest (trailing 90 days)
  - Booking lead time (how far in advance they book)
- **Market health index**: Composite score (volume × growth × spend × stability)
- **Filters**: By time period, arrival type (charter/scheduled/cruise), airport (Dabolim/Mopa)

### Page 3: Competitor Radar
- **Destination comparison table**: Goa vs Thailand vs Bali vs Vietnam vs Sri Lanka
  - International arrivals (monthly)
  - Average hotel price (3-star, 4-star, 5-star)
  - Average flight price from key origins (Moscow, London, Tel Aviv, Berlin, Warsaw)
  - Visa policy comparison
  - Tourist infrastructure score
- **Price positioning chart**: Goa's price percentile vs competitors over time
- **Flight route map**: Overlay showing direct routes to each destination from source markets
- **"Market share" tracker**: What % of Russian/UK/German outbound tourism goes to Goa vs competitors

### Page 4: Charter Operations Hub
- **Charter flight calendar**: Visual timeline of all charter operations (past + scheduled)
- **Operator profiles**: Nordwind, Aeroflot, Fly Arystan, TUI, etc.
  - Routes served, frequency, capacity, load factors
- **Partnership scoring model**: AI-ranked list of charter operators to pursue
  - Weighted by: source market size, route profitability, operator reliability, growth potential
- **Charter revenue impact**: Estimated economic contribution per charter flight
- **Season comparison**: Current season vs last 3 seasons

### Page 5: Predictive Analytics
- **90-day arrival forecast**: Time series prediction with confidence intervals
  - By nationality, by arrival type, by airport
- **Booking curve analysis**: How far in advance are tourists booking? Is lead time shrinking?
- **Seasonal demand heatmap**: Month × Source Market matrix showing expected demand intensity
- **What-if simulator**: "If we add 2 weekly charters from Poland, projected impact on arrivals = X"
- **Early warning signals**: Leading indicators that predict arrival changes 60-90 days out

### Page 6: Campaign Intelligence
- **Campaign calendar**: Recommended marketing windows by source market
  - Based on: booking lead times, search interest peaks, competitor gap analysis
- **Channel recommendations**: Where to advertise (social, OTAs, travel trade, charter operator co-marketing)
- **Budget allocation optimizer**: Given ₹X budget, optimal split across markets and channels
- **ROI tracker**: Past campaign performance → arrivals lift attribution
- **Content suggestions**: AI-generated campaign themes based on trending search queries per market

### Page 7: Minister's Intelligence Report
- **Auto-generated monthly PDF** with:
  - Executive summary (3 bullet points)
  - Arrivals dashboard snapshot
  - Source market trends
  - Competitor positioning update
  - Charter operations status
  - 90-day forecast
  - Recommended actions (top 3)
  - Risk flags
- **Historical report archive**: Downloadable PDFs by month
- **Custom report builder**: Select metrics and date ranges for ad-hoc analysis

---

## 7. DATA MODEL (Supabase / PostgreSQL)

### Core Tables

```sql
-- Monthly arrival statistics
CREATE TABLE arrival_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  month DATE NOT NULL,
  nationality VARCHAR(100),
  arrival_type VARCHAR(50), -- 'charter', 'scheduled', 'cruise', 'land'
  airport VARCHAR(50), -- 'Dabolim', 'Mopa', 'Mormugao Port'
  tourist_count INTEGER NOT NULL,
  flight_count INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Daily flight price tracking
CREATE TABLE flight_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  origin_city VARCHAR(100) NOT NULL,
  origin_iata VARCHAR(10),
  destination VARCHAR(50) NOT NULL, -- 'GOI', 'GOX', 'BKK', 'DPS', 'SGN'
  airline VARCHAR(100),
  price_usd DECIMAL(10,2),
  price_inr DECIMAL(10,2),
  cabin_class VARCHAR(20),
  source VARCHAR(50), -- 'amadeus', 'skyscanner'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Charter flight operations
CREATE TABLE charter_flights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  flight_date DATE NOT NULL,
  operator VARCHAR(100) NOT NULL,
  origin_city VARCHAR(100),
  origin_country VARCHAR(100),
  destination_airport VARCHAR(50),
  passenger_count INTEGER,
  aircraft_type VARCHAR(50),
  season VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Competitor destination stats
CREATE TABLE competitor_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  month DATE NOT NULL,
  destination VARCHAR(100) NOT NULL,
  total_international_arrivals BIGINT,
  arrivals_from_russia INTEGER,
  arrivals_from_uk INTEGER,
  arrivals_from_germany INTEGER,
  arrivals_from_israel INTEGER,
  arrivals_from_india INTEGER,
  avg_hotel_price_3star_usd DECIMAL(10,2),
  avg_hotel_price_5star_usd DECIMAL(10,2),
  source_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Google Trends data
CREATE TABLE search_trends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  week_start DATE NOT NULL,
  search_term VARCHAR(200),
  country_code VARCHAR(5),
  interest_score INTEGER, -- 0-100
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI-generated forecasts
CREATE TABLE forecasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  forecast_date DATE NOT NULL,
  target_month DATE NOT NULL,
  metric VARCHAR(100), -- 'total_foreign_arrivals', 'russian_arrivals', etc.
  predicted_value DECIMAL(12,2),
  lower_bound DECIMAL(12,2),
  upper_bound DECIMAL(12,2),
  confidence DECIMAL(5,4),
  model_version VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Campaign recommendations
CREATE TABLE campaign_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  target_market VARCHAR(100),
  recommended_start DATE,
  recommended_end DATE,
  channel VARCHAR(100),
  budget_allocation_pct DECIMAL(5,2),
  rationale TEXT,
  priority INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Monthly intelligence reports
CREATE TABLE intelligence_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_month DATE NOT NULL,
  title VARCHAR(200),
  executive_summary TEXT,
  full_report_json JSONB,
  pdf_url TEXT,
  generated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hotel price comparison
CREATE TABLE hotel_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  destination VARCHAR(100),
  hotel_category VARCHAR(20), -- '3-star', '4-star', '5-star'
  avg_price_usd DECIMAL(10,2),
  avg_price_inr DECIMAL(10,2),
  sample_size INTEGER,
  source VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 8. N8N DATA PIPELINE WORKFLOWS

### Workflow 1: Daily Flight Price Monitor
```
Trigger: Cron (6:00 AM IST daily)
→ Amadeus API: Search flights from Moscow, London, Tel Aviv, Berlin, Warsaw → GOI
→ Amadeus API: Search same origins → BKK, DPS, SGN, CMB (competitors)
→ Transform: Normalize prices to USD and INR
→ Supabase: Insert into flight_prices table
→ Check: If Goa price > 2x competitor average → Flag alert
```

### Workflow 2: Weekly Google Trends Scraper
```
Trigger: Cron (Monday 2:00 AM)
→ PyTrends API: Fetch interest for ["Goa holiday", "Goa travel", "flights to Goa"]
→ PyTrends API: Same for ["Thailand holiday", "Bali holiday", "Vietnam holiday"]
→ Filter by countries: RU, GB, IL, DE, PL, KZ
→ Supabase: Insert into search_trends table
→ Compare: If any market shows >30% spike → Trigger campaign alert
```

### Workflow 3: Monthly Government Data Ingestion
```
Trigger: Cron (5th of each month)
→ Web scrape: goatourism.gov.in/dot-goa-statistics
→ PDF parse: Extract latest monthly arrival figures
→ Transform: Structure into nationality-wise, type-wise breakdown
→ Supabase: Insert into arrival_stats table
→ Trigger: Forecast model re-run
```

### Workflow 4: Monthly Competitor Stats
```
Trigger: Cron (10th of each month)
→ Web scrape: Trading Economics (Thailand, Vietnam arrivals)
→ Web scrape: TAT monthly reports
→ Web scrape: Vietnam VNAT monthly reports
→ Transform: Normalize to common schema
→ Supabase: Insert into competitor_stats table
```

### Workflow 5: Monthly Intelligence Report Generator
```
Trigger: Cron (15th of each month)
→ Supabase: Fetch last month's data (arrivals, prices, trends, forecasts)
→ Claude API: Generate executive summary + analysis + recommendations
→ PDF Generator: Create formatted minister-ready document
→ Supabase: Store report + PDF URL
→ Email: Send to configured recipients
```

### Workflow 6: Weekly Forecast Model Run
```
Trigger: Cron (Sunday midnight)
→ Supabase: Fetch last 36 months of arrival data
→ Python Script: Run Prophet/SARIMA model
→ Generate: 90-day forward predictions with confidence intervals
→ Supabase: Insert into forecasts table
→ Check: If forecast shows >15% decline → Alert
```

---

## 9. DESIGN DIRECTION

### Aesthetic: "Government Intelligence Meets Bloomberg Terminal"
- **NOT** a generic admin dashboard with pastel cards
- Think: Bloomberg Terminal darkness + modern data viz elegance
- Dark theme primary (#0A0B0F base, not pure black)
- Accent color: Saffron/Amber (#F59E0B) — ties to Indian identity without being literal
- Secondary accent: Teal (#0EA5E9) for positive trends
- Alert red: (#EF4444) for negative trends
- Typography: Geist Mono for data, Geist Sans for UI text
- Dense but scannable — every pixel earns its place
- Large, confident numbers — the minister should see KPIs from across the room
- Mapbox dark style with glowing flight route arcs
- Micro-animations on data load — numbers counting up, charts drawing in

### Key Design Principles
1. **Data density over decoration** — No empty cards, no placeholder illustrations
2. **Hierarchy through scale** — KPIs at 48-72px, supporting text at 12-14px
3. **Color means something** — Green = growth, Red = decline, Amber = attention needed
4. **Time is the primary axis** — Everything should be temporally navigable
5. **Mobile-responsive but desktop-first** — This is a war room tool

---

## 10. IMPLEMENTATION ROADMAP

### Phase 1: Foundation (Week 1-2)
- [ ] Supabase schema setup + seed with historical data (2017-2025)
- [ ] Next.js project scaffold with auth (NextAuth)
- [ ] Design system: dark theme, typography, color tokens, chart styles
- [ ] Command Center page with static data
- [ ] Amadeus API integration (free tier: flight price searches)

### Phase 2: Live Data (Week 3-4)
- [ ] n8n workflows: daily flight prices, weekly trends
- [ ] Source Market Intelligence page with world map
- [ ] Competitor Radar page with price comparison charts
- [ ] Real-time Supabase subscriptions for live updates
- [ ] Government data scraping pipeline

### Phase 3: Intelligence Layer (Week 5-6)
- [ ] Prophet/SARIMA forecasting model
- [ ] Charter Operations Hub page
- [ ] Predictive Analytics page with 90-day forecasts
- [ ] Campaign Intelligence page
- [ ] What-if simulator

### Phase 4: Report Generation (Week 7-8)
- [ ] Claude API integration for narrative generation
- [ ] PDF report template design
- [ ] Monthly auto-generation pipeline
- [ ] Minister's Report page with archive
- [ ] Email distribution system

### Phase 5: Polish & Launch (Week 9-10)
- [ ] Performance optimization (ISR, caching, lazy loading)
- [ ] Mobile responsiveness
- [ ] Role-based access control
- [ ] Onboarding walkthrough
- [ ] Deploy to Vercel (or self-hosted on VPS)
- [ ] Documentation

---

## 11. API KEYS & ACCOUNTS NEEDED

| Service | Purpose | Sign-up URL | Tier |
|---------|---------|-------------|------|
| Amadeus Self-Service | Flight data, prices, demand | developers.amadeus.com | Free (2K requests/mo) |
| Mapbox | Flight route maps | mapbox.com | Free (50K loads/mo) |
| Supabase | Database + Realtime + Auth | supabase.com | Free tier sufficient to start |
| Anthropic (Claude API) | Report generation | console.anthropic.com | Pay-as-you-go |
| AviationStack | Airport schedule data | aviationstack.com | Free (100 req/mo) |
| Google Trends (PyTrends) | Search interest data | No key needed (unofficial) | Free |
| Vercel | Hosting + Cron jobs | vercel.com | Free / Pro ($20/mo) |

---

## 12. KEY METRICS THE DASHBOARD MUST ANSWER

For the Minister's desk, every page should help answer these questions:

1. **"Are we recovering?"** → Recovery gauge vs 2017 benchmark, trendline direction
2. **"Which markets are growing?"** → Source market comparison, YoY growth by country
3. **"Where are we losing to competitors?"** → Price positioning, route availability, visa friction
4. **"Which charter operators should we pursue?"** → Partnership scoring model, ROI estimates
5. **"When should we spend marketing money?"** → Campaign timing optimizer, booking window analysis
6. **"What will next season look like?"** → 90-day forecast with confidence intervals
7. **"Give me the one-pager for the cabinet meeting"** → Auto-generated monthly intelligence report

---

## 13. RISK FACTORS & MITIGATION

| Risk | Impact | Mitigation |
|------|--------|------------|
| Amadeus free tier rate limits | Can't fetch enough price data | Use caching aggressively, batch queries, upgrade if needed |
| Government data is delayed/inconsistent | Stale arrival stats | Supplement with airport authority data, charter operator reports |
| Competitor data requires scraping | Legal/technical fragility | Use official published reports where possible, cache aggressively |
| Forecasting model accuracy | Wrong predictions → bad decisions | Show confidence intervals, ensemble multiple models, validate monthly |
| Geopolitical shocks (new conflict, sanctions) | Model breaks | Add geopolitical risk flags as model inputs, manual override capability |
| Minister expects real-time but data is monthly | Expectation gap | Clear labeling: "Last updated: [date]", live pricing is truly live, arrivals are monthly |

---

*Research compiled: March 27, 2026*  
*Data sources: Goa Department of Tourism, Business Standard, Travel & Tour World, Trading Economics, Amadeus, BusinessToday, CEIC, and official government press releases*
