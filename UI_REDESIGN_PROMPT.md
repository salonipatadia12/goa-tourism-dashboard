# COMPLETE UI/UX REDESIGN — Using UI UX Pro Max Skill

## STOP. Before writing ANY code, do this:

### Step 1: Generate a FRESH design system using the UUPM skill

Run these commands in the terminal and READ the output carefully:

```bash
# Generate the master design system for a government intelligence dashboard
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "government intelligence analytics dashboard dark mode real-time monitoring" --design-system -p "Goa Tourism Intelligence" -f markdown

# Search for the best dashboard style
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "data dense dashboard executive" --domain style

# Search for dark mode best practices
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "dark mode OLED dashboard" --domain style

# Search for the right chart approach
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "analytics dashboard charts KPI" --domain chart

# Search for a color palette suitable for government/analytics dark theme
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "dark analytics government intelligence" --domain color

# Search for the right typography pairing
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "monospace data dashboard analytics" --domain typography

# Search for the right BI dashboard style specifically
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "real-time monitoring dashboard" --domain style
```

READ every output. The UUPM skill has 67 styles, 96 palettes, 57 font pairings, 25 chart types, and 99 UX guidelines. USE THEM. Do not ignore this output.

Also read the full SKILL.md:
```bash
cat .claude/skills/ui-ux-pro-max/SKILL.md
```

And read the data files to understand what's available:
```bash
ls .claude/skills/ui-ux-pro-max/data/
cat .claude/skills/ui-ux-pro-max/data/styles.csv | head -20
cat .claude/skills/ui-ux-pro-max/data/color_palettes.csv | head -20
cat .claude/skills/ui-ux-pro-max/data/font_pairings.csv | head -20
```

### Step 2: Read the UUPM pre-delivery checklist and UX guidelines

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "pre-delivery checklist" --domain ux
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "accessibility contrast" --domain ux
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "hover states transitions" --domain ux
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "responsive layout grid" --domain ux
```

### Step 3: Apply EVERYTHING from Steps 1-2 to redesign the dashboard

Now read the current code files:
- `src/app/globals.css`
- `src/app/page.tsx` (Command Center)
- `src/components/layout/Sidebar.tsx`
- `src/components/layout/TopBar.tsx`
- `src/components/dashboard/KPICard.tsx`
- `src/components/dashboard/RecoveryGauge.tsx`
- `src/components/charts/ArrivalTrendChart.tsx`
- `src/components/dashboard/AlertFeed.tsx`

---

## THE PROBLEM WITH THE CURRENT DESIGN

The current dashboard looks like a generic dark admin template. It has:
- Basic cards with basic borders
- Default Recharts styling (no customization)
- Flat, lifeless layout with no visual hierarchy
- No depth, no texture, no character
- Boring KPI cards that look like every other admin panel
- Recovery gauge that's just a basic SVG arc
- Alert feed that's just a basic list
- Chart that uses default Recharts colors and grid

This is supposed to be a **GOVERNMENT INTELLIGENCE DASHBOARD** that a TOURISM MINISTER opens daily. It needs to feel like walking into a command center — powerful, authoritative, alive.

## WHAT IT NEEDS TO LOOK LIKE

Reference: Bloomberg Terminal + Palantir Gotham + Datadog dark mode + Vercel Analytics

### Design System (apply from UUPM output):

**Color Palette — Dark Intelligence Theme:**
- Base: `#0A0A0F` (near-black with slight blue undertone)
- Surface 1: `#12131A` (cards)
- Surface 2: `#1A1B25` (elevated cards, modals)
- Surface 3: `#22232E` (hover states)
- Border: `rgba(255, 255, 255, 0.04)` (ultra-subtle)
- Border Hover: `rgba(255, 255, 255, 0.08)`
- Text Primary: `#E8E8ED` (not pure white)
- Text Secondary: `#8B8B9E`
- Text Muted: `#5A5A6E`
- Accent Primary: `#F59E0B` (saffron/amber — Indian identity)
- Accent Glow: `rgba(245, 158, 11, 0.15)` (for glowing effects)
- Positive: `#10B981` (emerald green, not basic teal)
- Negative: `#EF4444`
- Warning: `#F59E0B`
- Info: `#3B82F6`

**Typography:**
Use whatever the UUPM skill recommends from its font pairings search. But the rules are:
- Display/Heading font: Something with CHARACTER (not generic sans-serif)
- Data font: Must be monospace with tabular numerals
- Body font: Clean, readable
- Import from Google Fonts
- KPI numbers: 56-72px, font-weight 700
- Section headings: 14px uppercase, letter-spacing 0.1em, text-muted color
- Card titles: 13px, font-weight 500

**Effects & Depth:**
- Cards: `background: linear-gradient(135deg, #12131A 0%, #0F1017 100%)` with `border: 1px solid rgba(255,255,255,0.04)` and `box-shadow: 0 4px 24px rgba(0,0,0,0.4)`
- Hover on cards: border brightens to `rgba(255,255,255,0.08)`, subtle glow effect
- KPI cards: top border accent line (2px, color = metric sentiment)
- Glassmorphism for overlays/modals: `backdrop-filter: blur(12px)`
- Chart area background: subtle gradient instead of flat color
- Smooth transitions: `transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1)`

**Grid & Layout:**
- Sidebar: 240px fixed, with glassmorphism background, NOT flat dark. Active item has a left accent bar + background glow.
- TopBar: Minimal, 56px height, has a subtle bottom border glow
- Main content: CSS Grid, NOT flexbox hacks. Proper `grid-template-columns` and `grid-template-rows`.
- Card grid: `gap: 16px`, consistent everywhere
- Page padding: `24px` on desktop
- Max content width: `1600px` with `margin: 0 auto` for ultra-wide screens

### Component-Level Redesign:

**KPI Cards:**
```
┌─────────────────────────────┐
│ ▔▔▔▔▔▔▔▔▔▔▔▔ (2px accent)  │  ← top border: green for positive, red for negative
│                             │
│ FOREIGN ARRIVALS     📊     │  ← 13px uppercase, muted, Lucide icon
│                             │
│ 5.18L                       │  ← 56px, monospace, bold, white
│                             │
│ ↑ +10.7% YoY    FY 2025    │  ← 13px, green for positive + muted label
│                             │
│ ░░░░░░░░░░░░░░░░░░░░░░░    │  ← Micro sparkline (last 9 years)
│                             │
│ vs 4.68L (FY 2024)         │  ← 12px, muted
└─────────────────────────────┘
```
Key: Each card has a SPARKLINE showing the 9-year trend (2017-2025). This adds visual richness without taking more space. Use tiny inline SVG, not Recharts.

**Recovery Gauge:**
Not a basic SVG arc. Make it premium:
- Outer ring: subtle dark track
- Progress arc: gradient from red (#EF4444) at 0% → amber (#F59E0B) at 50% → green (#10B981) at 100%
- Current position: 58% so it's in the amber zone
- Glowing dot at the tip of the arc
- Center: Large "58%" number with "of 2017 peak" subtitle
- Below: "3.73L tourists to recover" in muted text
- Subtle pulsing animation on the glow (CSS only, not JS intervals)

**Arrival Trend Chart:**
- Custom styled Recharts with:
  - Background: subtle gradient on the chart area
  - Grid lines: `rgba(255,255,255,0.03)` — almost invisible
  - Area fill: gradient from accent color → transparent
  - Line: 2px stroke with slight glow effect (filter: drop-shadow)
  - Axis labels: muted color, 11px, monospace
  - Tooltip: dark glassmorphism card, NOT default Recharts tooltip
  - The 2017 Peak reference line: dashed, amber color, with label
  - Dots on data points: small, glowing on hover

**Alert Feed:**
Not a flat list. Make each alert a mini-card:
- Left accent bar colored by severity (green/red/amber)
- Icon matching alert type (TrendingUp, TrendingDown, AlertTriangle from Lucide)
- Title in 14px semibold
- Description in 13px muted
- Timestamp in 12px, far right
- "High Priority" badge: small pill with red background
- Hover: entire card lifts slightly (translateY(-1px) + shadow increase)

**Sidebar:**
- Background: `rgba(18, 19, 26, 0.8)` with `backdrop-filter: blur(12px)` — glassmorphism
- Logo area: "GT" monogram in saffron on dark circle, "Goa Tourism Intelligence" text
- Nav items: 14px, icon + label, `padding: 10px 16px`, `border-radius: 8px`
- Active item: `background: rgba(245, 158, 11, 0.1)`, left accent bar (3px saffron), text becomes white
- Hover: `background: rgba(255, 255, 255, 0.04)`
- Bottom: "Government of Goa" + "Department of Tourism" in 11px muted
- Divider lines between sections: `rgba(255,255,255,0.04)`

**TopBar:**
- Height: 56px
- Left: Page title (20px, semibold)
- Center: Time period selector pills (MTD/QTD/YTD/Custom) — rounded pills, active = saffron bg
- Right: Date + Clock (monospace) + System status dot (green/red)
- Bottom border: `1px solid rgba(255,255,255,0.04)` with subtle glow

**Bloomberg Ticker (Command Center only):**
- Full-width bar at the very bottom of the page
- Background: `#0D0D14`
- Infinite scrolling text with key intelligence facts
- CSS animation only — `@keyframes scroll`
- Monospace font, 12px, muted color with highlighted keywords in saffron

---

## APPLY TO ALL 7 PAGES

Once the design system is set in `globals.css` and the core components are redesigned, apply the same quality to:

1. **Command Center** (`/`) — KPIs + Chart + Gauge + Alerts + Ticker
2. **Source Markets** (`/source-markets`) — Map + Cards + Table
3. **Competitors** (`/competitors`) — Price charts + Volume charts + Table + Insight cards
4. **Charter Ops** (`/charter-ops`) — KPIs + Timeline + Operators table + Agent placeholder
5. **Predictions** (`/predictions`) — Recovery trajectories + What-if simulator + Agent placeholder
6. **Campaigns** (`/campaigns`) — Heatmap + Opportunity cards + Agent placeholder
7. **Reports** (`/reports`) — Intelligence brief + Archive + Agent placeholder

Every page must follow the same design system. No page should look like it was built by a different developer.

---

## PERFORMANCE REQUIREMENTS

The current build is so heavy Chrome tabs timeout. Fix this:

1. **Remove ALL Framer Motion** — Use CSS transitions only. `transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1)`.
2. **Remove ALL animated count-up effects** — Static numbers with `font-variant-numeric: tabular-nums`.
3. **Lazy load charts** — `React.lazy()` + `Suspense` with skeleton placeholders.
4. **React.memo()** on EVERY chart and card component.
5. **useMemo()** on ALL data transformations.
6. **No JS intervals** — The clock can update with CSS or a single isolated component that NEVER re-renders its parent.
7. **Target: Each page < 200KB JS bundle**. Run `npm run build` and check.
8. **Skeleton loading states** — When any component is loading, show a pulsing skeleton that matches the component's shape, not a blank space.

---

## UUPM PRE-DELIVERY CHECKLIST (from the skill)

Before any page is "done":
- [ ] No emojis as functional icons (use Lucide React SVG icons). Country flags OK.
- [ ] `cursor-pointer` on ALL clickable elements
- [ ] Hover states with smooth transitions (150-300ms) on ALL interactive elements
- [ ] Text contrast: 4.5:1 minimum against background
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected (wrap animations in media query)
- [ ] Responsive: 1024px, 1440px, 1920px (desktop-first, these are the targets)
- [ ] No orphaned text, no widows in headings
- [ ] Consistent spacing (multiples of 4px: 4, 8, 12, 16, 24, 32, 48)
- [ ] All data has source attribution
- [ ] "Awaiting live data" for anything not yet connected (not empty space)

---

## EXECUTION ORDER

1. Run ALL the UUPM search.py commands from Step 1 above
2. Read ALL outputs and the SKILL.md file
3. Redesign `globals.css` with the new design system
4. Redesign `Sidebar.tsx` and `TopBar.tsx` (layout shell)
5. Redesign `KPICard.tsx` with sparklines and accent borders
6. Redesign `RecoveryGauge.tsx` with gradient arc and glow
7. Redesign `ArrivalTrendChart.tsx` with custom Recharts styling
8. Redesign `AlertFeed.tsx` with mini-cards
9. Add Bloomberg ticker to Command Center
10. Apply consistent styling to all 6 other pages
11. Performance fixes (remove Framer Motion, lazy load, memo)
12. Run `npm run build` — report bundle sizes
13. Run UUPM pre-delivery checklist

DO NOT skip the UUPM search commands in Step 1. The whole point is to use the skill's intelligence, not ignore it.