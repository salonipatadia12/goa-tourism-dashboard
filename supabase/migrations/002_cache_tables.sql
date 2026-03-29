-- Cache tables for API-sourced data
-- Architecture: External APIs -> API Routes (cron) -> Supabase (cache) -> Frontend

-- Routes to Goa (from AirLabs routes API)
CREATE TABLE IF NOT EXISTS goa_routes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  airline_iata TEXT,
  airline_name TEXT,
  dep_iata TEXT NOT NULL,
  dep_country TEXT,
  arr_iata TEXT NOT NULL,
  days_of_week JSONB,
  flights_per_week INTEGER,
  fetched_at TIMESTAMPTZ DEFAULT NOW()
);

-- Today's flight schedules (from AirLabs schedules API)
CREATE TABLE IF NOT EXISTS flight_schedules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  flight_iata TEXT,
  airline_iata TEXT,
  airline_name TEXT,
  dep_iata TEXT,
  dep_country TEXT,
  arr_iata TEXT,
  dep_time TIMESTAMPTZ,
  arr_time TIMESTAMPTZ,
  status TEXT,
  fetched_at TIMESTAMPTZ DEFAULT NOW()
);

-- Google Trends data (extends table from 001 with JSONB columns for bulk data)
-- The search_trends table already exists from 001. Add new columns if missing.
DO $$
BEGIN
  -- Add new JSONB columns for bulk trends storage
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'search_trends' AND column_name = 'data_points') THEN
    ALTER TABLE search_trends ADD COLUMN data_points JSONB;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'search_trends' AND column_name = 'related_queries') THEN
    ALTER TABLE search_trends ADD COLUMN related_queries JSONB;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'search_trends' AND column_name = 'keyword') THEN
    ALTER TABLE search_trends ADD COLUMN keyword TEXT;
  END IF;
  -- Make old required columns nullable so bulk inserts work
  ALTER TABLE search_trends ALTER COLUMN week_start DROP NOT NULL;
  ALTER TABLE search_trends ALTER COLUMN search_term DROP NOT NULL;
END $$;

-- Competitor pricing (manually updated or via future API)
CREATE TABLE IF NOT EXISTS competitor_pricing (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  source_market TEXT NOT NULL,
  destination TEXT NOT NULL,
  avg_price_usd DECIMAL,
  cheapest_price_usd DECIMAL,
  airlines JSONB,
  last_verified DATE,
  fetched_at TIMESTAMPTZ DEFAULT NOW()
);

-- Exchange rates
CREATE TABLE IF NOT EXISTS exchange_rates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  base_currency TEXT DEFAULT 'USD',
  rates JSONB,
  fetched_at TIMESTAMPTZ DEFAULT NOW()
);

-- News cache
CREATE TABLE IF NOT EXISTS news_cache (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  query TEXT,
  articles JSONB,
  fetched_at TIMESTAMPTZ DEFAULT NOW()
);

-- Data refresh log
CREATE TABLE IF NOT EXISTS refresh_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  source TEXT NOT NULL,
  status TEXT NOT NULL,
  records_fetched INTEGER DEFAULT 0,
  error_message TEXT,
  duration_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_routes_arr ON goa_routes(arr_iata);
CREATE INDEX IF NOT EXISTS idx_schedules_arr ON flight_schedules(arr_iata, fetched_at);
-- idx_trends_country already created in 001 (on country_code, week_start)
CREATE INDEX IF NOT EXISTS idx_pricing_dest ON competitor_pricing(destination);
CREATE INDEX IF NOT EXISTS idx_refresh_log_source ON refresh_log(source, created_at);

-- RLS policies
ALTER TABLE goa_routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE flight_schedules ENABLE ROW LEVEL SECURITY;
-- search_trends RLS already enabled in 001
ALTER TABLE competitor_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE exchange_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE refresh_log ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "public_read_goa_routes" ON goa_routes FOR SELECT USING (true);
CREATE POLICY "public_read_flight_schedules" ON flight_schedules FOR SELECT USING (true);
-- search_trends policies already exist in 001
CREATE POLICY "public_read_competitor_pricing" ON competitor_pricing FOR SELECT USING (true);
CREATE POLICY "public_read_exchange_rates" ON exchange_rates FOR SELECT USING (true);
CREATE POLICY "public_read_news_cache" ON news_cache FOR SELECT USING (true);
CREATE POLICY "public_read_refresh_log" ON refresh_log FOR SELECT USING (true);

-- Service role insert/update access
CREATE POLICY "service_insert_goa_routes" ON goa_routes FOR INSERT WITH CHECK (true);
CREATE POLICY "service_insert_flight_schedules" ON flight_schedules FOR INSERT WITH CHECK (true);
CREATE POLICY "service_insert_competitor_pricing" ON competitor_pricing FOR INSERT WITH CHECK (true);
CREATE POLICY "service_insert_exchange_rates" ON exchange_rates FOR INSERT WITH CHECK (true);
CREATE POLICY "service_insert_news_cache" ON news_cache FOR INSERT WITH CHECK (true);
CREATE POLICY "service_insert_refresh_log" ON refresh_log FOR INSERT WITH CHECK (true);

-- Service role delete for cache cleanup
CREATE POLICY "service_delete_goa_routes" ON goa_routes FOR DELETE USING (true);
CREATE POLICY "service_delete_flight_schedules" ON flight_schedules FOR DELETE USING (true);
-- search_trends delete policy: only add if not exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'search_trends' AND policyname = 'service_delete_search_trends') THEN
    CREATE POLICY "service_delete_search_trends" ON search_trends FOR DELETE USING (true);
  END IF;
END $$;
CREATE POLICY "service_delete_exchange_rates" ON exchange_rates FOR DELETE USING (true);
CREATE POLICY "service_delete_news_cache" ON news_cache FOR DELETE USING (true);
