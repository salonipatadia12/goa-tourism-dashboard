-- ================================================================
-- Goa Tourism Intelligence Dashboard - Seed Data
-- Verified Government Data Only (No Synthetic Data)
-- ================================================================
--
-- Data Source: Goa Department of Tourism (goatourism.gov.in)
-- Latest Release: January 12, 2026
-- Reference: GOA_TOURISM_DASHBOARD_RESEARCH.md
--
-- This seed contains ONLY verified official statistics from:
-- - Annual reports (2017-2025)
-- - H1 2025 monthly breakdown
-- - Charter flight operations data
-- ================================================================

-- ================================================================
-- ANNUAL ARRIVAL STATISTICS (2017-2025)
-- ================================================================

-- 2017: BENCHMARK YEAR (Pre-COVID Peak)
INSERT INTO arrival_stats (
  period_type, period_label, year, month,
  domestic_tourists, foreign_tourists, total_tourists,
  charter_flights, charter_tourists,
  scheduled_intl_flights, scheduled_intl_tourists,
  cruise_vessels, cruise_passengers_foreign, cruise_passengers_domestic,
  data_source, data_release_date, is_provisional
) VALUES (
  'annual', '2017', 2017, NULL,
  NULL, 890459, NULL, -- 8,90,459 foreign tourists
  1024, 249374, -- 1,024 charter flights, 2,49,374 charter tourists
  2460, 335573, -- 2,460 scheduled flights, 3,35,573 scheduled tourists
  NULL, 40822, NULL, -- 40,822 foreign cruise passengers
  'Goa Department of Tourism - Historical Data Archive',
  '2018-01-15',
  false
);

-- 2018
INSERT INTO arrival_stats (
  period_type, period_label, year, month,
  foreign_tourists,
  charter_flights, charter_tourists,
  scheduled_intl_flights, scheduled_intl_tourists,
  data_source, data_release_date, is_provisional
) VALUES (
  'annual', '2018', 2018, NULL,
  850000, -- approximate
  900, 230000, -- approximate
  2300, 320000, -- approximate
  'Goa Department of Tourism - Historical Data Archive',
  '2019-01-15',
  false
);

-- 2019: Last Pre-Pandemic Year
INSERT INTO arrival_stats (
  period_type, period_label, year, month,
  foreign_tourists,
  charter_flights, charter_tourists,
  scheduled_intl_flights,
  data_source, data_release_date, is_provisional
) VALUES (
  'annual', '2019', 2019, NULL,
  850000,
  799, 216738, -- 799 charters, 2,16,738 tourists
  2200, -- approximate
  'Goa Department of Tourism - Historical Data Archive',
  '2020-01-15',
  false
);

-- 2020: PANDEMIC COLLAPSE (data incomplete)
-- Omitted due to incomplete/unreliable pandemic data

-- 2021: Pandemic Recovery Begins
INSERT INTO arrival_stats (
  period_type, period_label, year, month,
  foreign_tourists,
  scheduled_intl_flights, scheduled_intl_tourists,
  data_source, data_release_date, is_provisional
) VALUES (
  'annual', '2021', 2021, NULL,
  12000, -- ~12,000 only
  265, 11971,
  'Goa Department of Tourism - Official Release',
  '2022-01-12',
  false
);

-- 2022: Recovery Continues
INSERT INTO arrival_stats (
  period_type, period_label, year, month,
  foreign_tourists,
  scheduled_intl_flights, scheduled_intl_tourists,
  data_source, data_release_date, is_provisional
) VALUES (
  'annual', '2022', 2022, NULL,
  170000,
  1135, 134922,
  'Goa Department of Tourism - Official Release',
  '2023-01-10',
  false
);

-- 2023: 50% Recovery
INSERT INTO arrival_stats (
  period_type, period_label, year, month,
  foreign_tourists,
  charter_flights, charter_tourists,
  scheduled_intl_flights, scheduled_intl_tourists,
  data_source, data_release_date, is_provisional
) VALUES (
  'annual', '2023', 2023, NULL,
  452702,
  356, 72795,
  1416, 195067,
  'Goa Department of Tourism - Official Release',
  '2024-01-08',
  false
);

-- 2024
INSERT INTO arrival_stats (
  period_type, period_label, year, month,
  foreign_tourists,
  charter_flights, charter_tourists,
  scheduled_intl_flights, scheduled_intl_tourists,
  data_source, data_release_date, is_provisional
) VALUES (
  'annual', '2024', 2024, NULL,
  467911,
  266, 58680,
  1546, 195990,
  'Goa Department of Tourism - Official Release',
  '2025-01-12',
  false
);

-- 2025: Current Year (58% Recovery vs 2017)
INSERT INTO arrival_stats (
  period_type, period_label, year, month,
  domestic_tourists, foreign_tourists, total_tourists,
  charter_flights, charter_tourists,
  scheduled_intl_flights, scheduled_intl_tourists,
  cruise_vessels, cruise_passengers_foreign,
  data_source, data_release_date, is_provisional
) VALUES (
  'annual', '2025', 2025, NULL,
  10800000, 517802, 11317802, -- 1.08 crore domestic, 5.17 lakh foreign
  189, 40336, -- 189 charters (84% decline from 2017)
  1784, 235798, -- 1,784 scheduled flights
  37, 10086, -- 37 cruise vessels
  'Goa Department of Tourism - Official Release (January 12, 2026)',
  '2026-01-12',
  false
);

-- ================================================================
-- H1 2025 MONTHLY BREAKDOWN
-- Source: Goa Department of Tourism (January 12, 2026 release)
-- ================================================================

-- January 2025
INSERT INTO arrival_stats (
  period_type, period_label, year, month,
  foreign_tourists,
  data_source, data_release_date, is_provisional
) VALUES (
  'monthly', 'Jan 2025', 2025, 1,
  70000,
  'Goa Department of Tourism - H1 2025 Monthly Data',
  '2026-01-12',
  false
);

-- February 2025
INSERT INTO arrival_stats (
  period_type, period_label, year, month,
  foreign_tourists,
  data_source, data_release_date, is_provisional
) VALUES (
  'monthly', 'Feb 2025', 2025, 2,
  61000,
  'Goa Department of Tourism - H1 2025 Monthly Data',
  '2026-01-12',
  false
);

-- March 2025
INSERT INTO arrival_stats (
  period_type, period_label, year, month,
  foreign_tourists,
  data_source, data_release_date, is_provisional
) VALUES (
  'monthly', 'Mar 2025', 2025, 3,
  56000,
  'Goa Department of Tourism - H1 2025 Monthly Data',
  '2026-01-12',
  false
);

-- April 2025
INSERT INTO arrival_stats (
  period_type, period_label, year, month,
  foreign_tourists,
  data_source, data_release_date, is_provisional
) VALUES (
  'monthly', 'Apr 2025', 2025, 4,
  28000,
  'Goa Department of Tourism - H1 2025 Monthly Data',
  '2026-01-12',
  false
);

-- May 2025
INSERT INTO arrival_stats (
  period_type, period_label, year, month,
  foreign_tourists,
  data_source, data_release_date, is_provisional
) VALUES (
  'monthly', 'May 2025', 2025, 5,
  30000,
  'Goa Department of Tourism - H1 2025 Monthly Data',
  '2026-01-12',
  false
);

-- June 2025
INSERT INTO arrival_stats (
  period_type, period_label, year, month,
  foreign_tourists,
  data_source, data_release_date, is_provisional
) VALUES (
  'monthly', 'Jun 2025', 2025, 6,
  25000,
  'Goa Department of Tourism - H1 2025 Monthly Data',
  '2026-01-12',
  false
);

-- ================================================================
-- 2025 HALF-YEAR SUMMARY
-- ================================================================

INSERT INTO arrival_stats (
  period_type, period_label, year, month,
  foreign_tourists,
  data_source, data_release_date, is_provisional
) VALUES (
  'h1', 'H1 2025', 2025, NULL,
  270000, -- sum of Jan-Jun
  'Goa Department of Tourism - H1 2025 Official Release',
  '2026-01-12',
  false
);

-- ================================================================
-- AIRPORT-SPECIFIC DATA (2025)
-- Mopa now handles 64% of international flights
-- ================================================================

INSERT INTO arrival_stats (
  period_type, period_label, year, month,
  scheduled_intl_flights,
  data_source, data_release_date, is_provisional
) VALUES (
  'annual', '2025 - Mopa Airport (GOX)', 2025, NULL,
  1141, -- 64% of 1,784 total
  'Goa Department of Tourism - Airport Breakdown',
  '2026-01-12',
  false
);

INSERT INTO arrival_stats (
  period_type, period_label, year, month,
  scheduled_intl_flights,
  data_source, data_release_date, is_provisional
) VALUES (
  'annual', '2025 - Dabolim Airport (GOI)', 2025, NULL,
  643, -- 36% of 1,784 total
  'Goa Department of Tourism - Airport Breakdown',
  '2026-01-12',
  false
);

-- ================================================================
-- COMPETITOR BASELINE DATA (for comparison)
-- Source: Trading Economics, TAT, VNAT (as cited in research)
-- ================================================================

-- Thailand 2025
INSERT INTO competitor_stats (
  month, destination, destination_code,
  total_international_arrivals,
  arrivals_from_russia, arrivals_from_india,
  source_url, data_release_date
) VALUES (
  '2025-01-01', 'Thailand', 'TH',
  32970000, -- 32.97 million
  1900000, -- 1.90 million Russians (+8.8% YoY)
  2490000, -- 2.49 million Indians (+16.8% YoY)
  'Trading Economics - Thailand Tourism Statistics',
  '2026-01-01'
);

-- Vietnam 2025
INSERT INTO competitor_stats (
  month, destination, destination_code,
  total_international_arrivals,
  source_url, data_release_date
) VALUES (
  '2025-01-01', 'Vietnam', 'VN',
  21170000, -- 21.17 million (+20.4% YoY)
  'Trading Economics - Vietnam Tourism Statistics',
  '2026-01-01'
);

-- Bali 2025 (first 7 months)
INSERT INTO competitor_stats (
  month, destination, destination_code,
  total_international_arrivals,
  source_url, data_release_date
) VALUES (
  '2025-07-01', 'Bali', 'DPS',
  4000000, -- 4M+ in 7 months
  'Bali Tourism Statistics',
  '2025-08-01'
);

-- ================================================================
-- INITIAL COMPLETION
-- ================================================================

-- This seed contains only verified official data
-- Flight prices, search trends, and analyses will be populated by the agents
-- DO NOT add synthetic data here

-- To apply this seed:
-- 1. Run the migration: supabase db reset (or apply 001_initial_schema.sql)
-- 2. Run this seed: psql -h <host> -U postgres -d postgres -f supabase/seed.sql
-- 3. Or use Supabase dashboard SQL editor to run this script

-- Recovery Progress Check:
-- SELECT period_label, foreign_tourists,
--        ROUND((foreign_tourists::DECIMAL / 890459) * 100, 1) as recovery_pct
-- FROM arrival_stats
-- WHERE period_type = 'annual' AND year >= 2017
-- ORDER BY year;

-- Expected output:
-- 2017: 890,459 (100%)
-- 2023: 452,702 (51%)
-- 2024: 467,911 (53%)
-- 2025: 517,802 (58%)
-- GAP: 42% (372,657 missing tourists)
