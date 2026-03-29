/**
 * Supabase Database Types
 *
 * These types match the schema in supabase/migrations/001_initial_schema.sql
 *
 * In production, generate these with:
 * npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/lib/supabase/types.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      flight_prices: {
        Row: {
          id: string
          fetched_at: string
          origin_iata: string
          origin_city: string
          origin_country: string
          destination_iata: string
          destination_name: string
          departure_date: string
          return_date: string | null
          price_currency: string
          price_amount: number | null
          price_inr: number | null
          airline: string | null
          direct_flight: boolean
          cabin_class: string
          data_source: string
          raw_response: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          fetched_at?: string
          origin_iata: string
          origin_city: string
          origin_country: string
          destination_iata: string
          destination_name: string
          departure_date: string
          return_date?: string | null
          price_currency?: string
          price_amount?: number | null
          price_inr?: number | null
          airline?: string | null
          direct_flight?: boolean
          cabin_class?: string
          data_source?: string
          raw_response?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          fetched_at?: string
          origin_iata?: string
          origin_city?: string
          origin_country?: string
          destination_iata?: string
          destination_name?: string
          departure_date?: string
          return_date?: string | null
          price_currency?: string
          price_amount?: number | null
          price_inr?: number | null
          airline?: string | null
          direct_flight?: boolean
          cabin_class?: string
          data_source?: string
          raw_response?: Json | null
          created_at?: string
        }
      }
      agent_analyses: {
        Row: {
          id: string
          created_at: string
          analysis_type: string
          title: string
          summary: string
          details: Json
          severity: string
          source_market: string | null
          confidence: number | null
          actionable: boolean
          recommended_action: string | null
          expires_at: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          created_at?: string
          analysis_type: string
          title: string
          summary: string
          details: Json
          severity?: string
          source_market?: string | null
          confidence?: number | null
          actionable?: boolean
          recommended_action?: string | null
          expires_at?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          created_at?: string
          analysis_type?: string
          title?: string
          summary?: string
          details?: Json
          severity?: string
          source_market?: string | null
          confidence?: number | null
          actionable?: boolean
          recommended_action?: string | null
          expires_at?: string | null
          updated_at?: string
        }
      }
      arrival_stats: {
        Row: {
          id: string
          recorded_at: string
          period_type: string
          period_label: string
          year: number
          month: number | null
          domestic_tourists: number | null
          foreign_tourists: number | null
          total_tourists: number | null
          charter_flights: number | null
          charter_tourists: number | null
          scheduled_intl_flights: number | null
          scheduled_intl_tourists: number | null
          cruise_vessels: number | null
          cruise_passengers_foreign: number | null
          cruise_passengers_domestic: number | null
          data_source: string
          data_release_date: string | null
          is_provisional: boolean
          created_at: string
        }
        Insert: {
          id?: string
          recorded_at?: string
          period_type: string
          period_label: string
          year: number
          month?: number | null
          domestic_tourists?: number | null
          foreign_tourists?: number | null
          total_tourists?: number | null
          charter_flights?: number | null
          charter_tourists?: number | null
          scheduled_intl_flights?: number | null
          scheduled_intl_tourists?: number | null
          cruise_vessels?: number | null
          cruise_passengers_foreign?: number | null
          cruise_passengers_domestic?: number | null
          data_source: string
          data_release_date?: string | null
          is_provisional?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          recorded_at?: string
          period_type?: string
          period_label?: string
          year?: number
          month?: number | null
          domestic_tourists?: number | null
          foreign_tourists?: number | null
          total_tourists?: number | null
          charter_flights?: number | null
          charter_tourists?: number | null
          scheduled_intl_flights?: number | null
          scheduled_intl_tourists?: number | null
          cruise_vessels?: number | null
          cruise_passengers_foreign?: number | null
          cruise_passengers_domestic?: number | null
          data_source?: string
          data_release_date?: string | null
          is_provisional?: boolean
          created_at?: string
        }
      }
      search_trends: {
        Row: {
          id: string
          fetched_at: string
          week_start: string
          search_term: string
          country_code: string
          country_name: string | null
          interest_score: number | null
          compared_to: string | null
          created_at: string
        }
        Insert: {
          id?: string
          fetched_at?: string
          week_start: string
          search_term: string
          country_code: string
          country_name?: string | null
          interest_score?: number | null
          compared_to?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          fetched_at?: string
          week_start?: string
          search_term?: string
          country_code?: string
          country_name?: string | null
          interest_score?: number | null
          compared_to?: string | null
          created_at?: string
        }
      }
      agent_runs: {
        Row: {
          id: string
          started_at: string
          completed_at: string | null
          agent_type: string
          status: string
          routes_checked: number | null
          records_inserted: number | null
          analyses_generated: number | null
          error_message: string | null
          metadata: Json | null
          updated_at: string
        }
        Insert: {
          id?: string
          started_at?: string
          completed_at?: string | null
          agent_type: string
          status?: string
          routes_checked?: number | null
          records_inserted?: number | null
          analyses_generated?: number | null
          error_message?: string | null
          metadata?: Json | null
          updated_at?: string
        }
        Update: {
          id?: string
          started_at?: string
          completed_at?: string | null
          agent_type?: string
          status?: string
          routes_checked?: number | null
          records_inserted?: number | null
          analyses_generated?: number | null
          error_message?: string | null
          metadata?: Json | null
          updated_at?: string
        }
      }
      competitor_stats: {
        Row: {
          id: string
          month: string
          destination: string
          destination_code: string | null
          total_international_arrivals: number | null
          arrivals_from_russia: number | null
          arrivals_from_uk: number | null
          arrivals_from_germany: number | null
          arrivals_from_israel: number | null
          arrivals_from_india: number | null
          avg_hotel_price_3star_usd: number | null
          avg_hotel_price_5star_usd: number | null
          source_url: string | null
          data_release_date: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['competitor_stats']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['competitor_stats']['Insert']>
      }
      forecasts: {
        Row: {
          id: string
          forecast_date: string
          target_month: string
          metric: string
          predicted_value: number | null
          lower_bound: number | null
          upper_bound: number | null
          confidence: number | null
          model_version: string | null
          model_type: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['forecasts']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['forecasts']['Insert']>
      }
      campaign_recommendations: {
        Row: {
          id: string
          target_market: string
          recommended_start: string | null
          recommended_end: string | null
          channel: string | null
          budget_allocation_pct: number | null
          rationale: string | null
          priority: number | null
          status: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['campaign_recommendations']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['campaign_recommendations']['Insert']>
      }
      intelligence_reports: {
        Row: {
          id: string
          report_month: string
          title: string | null
          executive_summary: string | null
          full_report_json: Json | null
          pdf_url: string | null
          generated_at: string
          generated_by: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['intelligence_reports']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['intelligence_reports']['Insert']>
      }
      // ─── Cache Tables (002_cache_tables.sql) ──────────────────
      goa_routes: {
        Row: {
          id: string
          airline_iata: string | null
          airline_name: string | null
          dep_iata: string
          dep_country: string | null
          arr_iata: string
          days_of_week: Json | null
          flights_per_week: number | null
          fetched_at: string
        }
        Insert: {
          id?: string
          airline_iata?: string | null
          airline_name?: string | null
          dep_iata: string
          dep_country?: string | null
          arr_iata: string
          days_of_week?: Json | null
          flights_per_week?: number | null
          fetched_at?: string
        }
        Update: Partial<Database['public']['Tables']['goa_routes']['Insert']>
      }
      flight_schedules: {
        Row: {
          id: string
          flight_iata: string | null
          airline_iata: string | null
          airline_name: string | null
          dep_iata: string | null
          dep_country: string | null
          arr_iata: string | null
          dep_time: string | null
          arr_time: string | null
          status: string | null
          fetched_at: string
        }
        Insert: {
          id?: string
          flight_iata?: string | null
          airline_iata?: string | null
          airline_name?: string | null
          dep_iata?: string | null
          dep_country?: string | null
          arr_iata?: string | null
          dep_time?: string | null
          arr_time?: string | null
          status?: string | null
          fetched_at?: string
        }
        Update: Partial<Database['public']['Tables']['flight_schedules']['Insert']>
      }
      exchange_rates: {
        Row: {
          id: string
          base_currency: string
          rates: Json
          fetched_at: string
        }
        Insert: {
          id?: string
          base_currency?: string
          rates: Json
          fetched_at?: string
        }
        Update: Partial<Database['public']['Tables']['exchange_rates']['Insert']>
      }
      news_cache: {
        Row: {
          id: string
          query: string | null
          articles: Json | null
          fetched_at: string
        }
        Insert: {
          id?: string
          query?: string | null
          articles?: Json | null
          fetched_at?: string
        }
        Update: Partial<Database['public']['Tables']['news_cache']['Insert']>
      }
      competitor_pricing: {
        Row: {
          id: string
          source_market: string
          destination: string
          avg_price_usd: number | null
          cheapest_price_usd: number | null
          airlines: Json | null
          last_verified: string | null
          fetched_at: string
        }
        Insert: {
          id?: string
          source_market: string
          destination: string
          avg_price_usd?: number | null
          cheapest_price_usd?: number | null
          airlines?: Json | null
          last_verified?: string | null
          fetched_at?: string
        }
        Update: Partial<Database['public']['Tables']['competitor_pricing']['Insert']>
      }
      refresh_log: {
        Row: {
          id: string
          source: string
          status: string
          records_fetched: number
          error_message: string | null
          duration_ms: number | null
          created_at: string
        }
        Insert: {
          id?: string
          source: string
          status: string
          records_fetched?: number
          error_message?: string | null
          duration_ms?: number | null
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['refresh_log']['Insert']>
      }
      hotel_prices: {
        Row: {
          id: string
          date: string
          destination: string
          destination_code: string | null
          hotel_category: string
          avg_price_usd: number | null
          avg_price_inr: number | null
          min_price_usd: number | null
          max_price_usd: number | null
          sample_size: number | null
          source: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['hotel_prices']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['hotel_prices']['Insert']>
      }
    }
    Views: {
      v_latest_flight_prices: {
        Row: {
          origin_iata: string
          origin_city: string
          origin_country: string
          destination_iata: string
          destination_name: string
          price_amount: number | null
          price_currency: string
          price_inr: number | null
          airline: string | null
          direct_flight: boolean
          fetched_at: string
        }
      }
      v_recovery_progress: {
        Row: {
          period_label: string
          year: number
          month: number | null
          foreign_tourists: number | null
          domestic_tourists: number | null
          total_tourists: number | null
          charter_tourists: number | null
          scheduled_intl_tourists: number | null
          benchmark_2017: number | null
          recovery_percentage: number | null
        }
      }
      v_latest_analyses: {
        Row: {
          analysis_type: string
          title: string
          summary: string
          severity: string
          source_market: string | null
          confidence: number | null
          actionable: boolean
          recommended_action: string | null
          created_at: string
        }
      }
    }
    Functions: {}
    Enums: {}
  }
}
