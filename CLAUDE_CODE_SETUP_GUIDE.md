# Claude Code Setup Guide — Goa Tourism Dashboard

## Step 1: Create the Project

```bash
# Create project directory
mkdir goa-tourism-dashboard && cd goa-tourism-dashboard

# Initialize Next.js with TypeScript + Tailwind + App Router
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

## Step 2: Install the UI UX Pro Max Skill

**Option A: Using the CLI (Recommended)**
```bash
# Install the CLI globally
npm install -g uipro-cli

# Install the skill for Claude Code
uipro init --ai claude
```

This will create a `.claude/skills/ui-ux-pro-max/` directory in your project with:
- 67 UI styles database
- 161 reasoning rules for design system generation
- 57 font pairings
- 25 chart type recommendations
- BI/Analytics dashboard specific styles (perfect for this project)

**Option B: Using Claude Code's Plugin Marketplace**
```bash
# Inside Claude Code, run:
/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
/plugin install ui-ux-pro-max@ui-ux-pro-max-skill
```

**Verify installation:**
```bash
ls -la .claude/skills/ui-ux-pro-max/
# Should see: data/, scripts/, SKILL.md, etc.
```

**Requires Python 3 (for the design system search engine):**
```bash
python3 --version
# If not installed: brew install python3 (macOS) or sudo apt install python3 (Ubuntu)
```

## Step 3: Copy the CLAUDE.md File

The CLAUDE.md file I created is the master context for Claude Code.
Copy it to the root of your project:

```bash
# If you downloaded it from this chat:
cp ~/Downloads/CLAUDE.md ./CLAUDE.md

# OR just create it manually by copying the content from this chat
```

This file tells Claude Code everything about:
- Project structure, tech stack, design direction
- Database schema, API integrations
- Historical data context, number formatting
- Build phases and commands

## Step 4: Install Core Dependencies

```bash
# UI & Charts
npm install recharts framer-motion lucide-react clsx tailwind-merge
npm install class-variance-authority

# Supabase
npm install @supabase/supabase-js @supabase/ssr

# Maps
npm install mapbox-gl @types/mapbox-gl

# Auth
npm install next-auth @auth/supabase-adapter

# PDF Generation
npm install @react-pdf/renderer

# Date handling
npm install date-fns

# Amadeus API
npm install amadeus

# Fonts
npm install @fontsource/geist-mono @fontsource/geist-sans
# OR use next/font (recommended with Next.js)
```

## Step 5: Set Up Environment Variables

Create `.env.local` in the project root:

```env
# Supabase (get from supabase.com → your project → Settings → API)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Amadeus (get from developers.amadeus.com → My Self-Service Workspace)
AMADEUS_CLIENT_ID=your_amadeus_client_id
AMADEUS_CLIENT_SECRET=your_amadeus_client_secret

# Mapbox (get from mapbox.com → Account → Access tokens)
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token

# Claude API (get from console.anthropic.com)
ANTHROPIC_API_KEY=your_anthropic_key

# NextAuth
NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
NEXTAUTH_URL=http://localhost:3000
```

## Step 6: Initialize Supabase

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref your_project_ref

# Create initial migration
supabase migration new initial_schema
```

Then paste the SQL schema from the research document into the migration file.

## Step 7: Generate the Design System (Using UUPM)

Before building any UI, generate the design system using the skill:

```bash
# Generate a tailored design system for the dashboard
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "government intelligence analytics dashboard tourism" --design-system -p "Goa Tourism Intelligence"

# Persist it for consistent use across sessions
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "government intelligence analytics dashboard tourism" --design-system --persist -p "Goa Tourism Intelligence"

# Generate page-specific overrides
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "executive dashboard KPI monitoring" --design-system --persist -p "Goa Tourism Intelligence" --page "command-center"

python3 .claude/skills/ui-ux-pro-max/scripts/search.py "geographic data visualization heatmap" --design-system --persist -p "Goa Tourism Intelligence" --page "source-markets"

python3 .claude/skills/ui-ux-pro-max/scripts/search.py "competitive analysis comparison pricing" --design-system --persist -p "Goa Tourism Intelligence" --page "competitors"

python3 .claude/skills/ui-ux-pro-max/scripts/search.py "predictive analytics forecasting time series" --design-system --persist -p "Goa Tourism Intelligence" --page "predictions"
```

This creates a `design-system/` directory:
```
design-system/
├── MASTER.md              # Global design system (colors, typography, effects)
└── pages/
    ├── command-center.md   # Command Center overrides
    ├── source-markets.md   # Source Markets page overrides
    ├── competitors.md      # Competitor Radar overrides
    └── predictions.md      # Predictive Analytics overrides
```

## Step 8: Start Building with Claude Code

Now open the project in Claude Code:

```bash
claude
```

### First Prompt to Claude Code:
```
Read CLAUDE.md and design-system/MASTER.md. 

Start with Phase 1: Build the foundation.

1. Set up the dark theme design system in globals.css with all CSS variables from CLAUDE.md
2. Create the dashboard layout shell (Sidebar + TopBar) 
3. Build the Command Center page with these components:
   - RecoveryGauge (58% of 2017 peak, animated gauge)
   - 4 KPI cards (Foreign Arrivals YTD, Charter Flights, Scheduled Flights, Cruise Passengers)
   - 12-month arrival trend area chart (use seed data from historical constants)
   - Alert feed sidebar

Use the Geist font family. Follow the Bloomberg Terminal aesthetic from CLAUDE.md.
Seed all data from the historical constants — no API calls yet.
```

### Subsequent Prompts (Phase by Phase):
```
# Phase 2: Source Market Intelligence
Read design-system/pages/source-markets.md.
Build the Source Markets page with:
- Interactive world map (Mapbox dark style) with bubbles for each source country
- Market cards for Russia, UK, Israel, Germany, Poland, Kazakhstan
- Market health index composite scoring
- Google Trends sparklines per market

# Phase 2: Competitor Radar
Read design-system/pages/competitors.md.
Build the Competitor Radar page with:
- Price comparison table: Goa vs Thailand vs Bali vs Vietnam
- Flight price tracking chart (mock data initially)
- Route availability matrix
- Visa policy comparison cards

# Phase 3: Predictive Analytics
Read design-system/pages/predictions.md.
Build the Predictions page with:
- 90-day forecast chart with confidence intervals
- Seasonal demand heatmap (month × market)
- What-if simulator (slider: add X charter flights → projected impact)
- Booking curve analysis

# Phase 4: Minister's Report
Build the Reports page with:
- Auto-generated report preview (Claude API integration)
- PDF download button
- Historical report archive table
- Email distribution settings
```

## Folder Reference After Full Setup

```
goa-tourism-dashboard/
├── .claude/
│   └── skills/
│       └── ui-ux-pro-max/       ← UUPM skill (installed via CLI)
│           ├── data/
│           ├── scripts/
│           └── SKILL.md
├── design-system/                ← Generated by UUPM
│   ├── MASTER.md
│   └── pages/
├── CLAUDE.md                     ← Project brain (from this chat)
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── ...
├── supabase/
│   ├── migrations/
│   └── seed.sql
├── .env.local
├── package.json
└── ...
```

## Quick Reference: Key Commands in Claude Code

```bash
# Generate/search design system
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "query" --design-system

# Search for specific styles
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "data dense dashboard" --domain style

# Search for chart recommendations
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "time series forecasting" --domain chart

# Search for color palettes
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "government analytics dark" --domain color

# Search for typography
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "monospace data professional" --domain typography
```

## Tips for Working with Claude Code on This Project

1. **Always reference CLAUDE.md** — Start every session with "Read CLAUDE.md" if Claude Code doesn't seem to have context
2. **One page at a time** — Build each dashboard page as a focused session
3. **Seed data first, APIs later** — Get the UI perfect with static data before wiring APIs
4. **Use the UUPM skill for every new component** — It prevents generic "AI slop" aesthetics
5. **Test dark theme early** — Everything should look good on `#0A0B0F` background
6. **Indian number formatting** — Always use lakh/crore system (5.17L, 1.08Cr)
7. **Git commit after each page** — Keep clean history for rollbacks
