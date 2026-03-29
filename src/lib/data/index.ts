/**
 * Data Service Layer
 * RIGHT NOW: Returns data from hardcoded historical constants
 * LATER: Will read from Supabase when connected
 *
 * Dashboard components should NEVER import constants directly — always go through this service.
 */

import {
  ANNUAL_DATA,
  MONTHLY_DATA_2025,
  PEAK_FOREIGN_ARRIVALS,
  CURRENT_YEAR_ARRIVALS,
  BENCHMARK_YEAR,
  CURRENT_YEAR_DATA,
  PREVIOUS_YEAR_DATA,
  SAMPLE_ALERTS,
  LATEST_DATA_RELEASE_DATE,
  type ArrivalData,
} from "../constants/historical-data";

import { SOURCE_MARKETS, GOA_COORDINATES, DATA_SOURCES, type SourceMarket } from "../constants/source-markets";

// Flag: are we connected to Supabase?
const USE_SUPABASE = !!(
  typeof process !== "undefined" &&
  process.env?.NEXT_PUBLIC_SUPABASE_URL &&
  process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const AMADEUS_CONFIGURED = !!(
  typeof process !== "undefined" &&
  process.env?.AMADEUS_CLIENT_ID &&
  process.env?.AMADEUS_CLIENT_SECRET
);

// ─── System Status ──────────────────────────────────────────

export interface SystemStatusData {
  supabase: { connected: boolean; label: string };
  amadeus: { connected: boolean; label: string };
  agentLastRun: string;
  liveData: string;
  dataMode: string;
}

export function getSystemStatus(): SystemStatusData {
  return {
    supabase: {
      connected: USE_SUPABASE,
      label: USE_SUPABASE ? "Connected" : "Not configured",
    },
    amadeus: {
      connected: AMADEUS_CONFIGURED,
      label: AMADEUS_CONFIGURED ? "Test Environment" : "Not configured",
    },
    agentLastRun: "Never",
    liveData: USE_SUPABASE ? "Online" : "Offline",
    dataMode: USE_SUPABASE
      ? "Live data from Supabase"
      : "Running on local data (verified FY 2025 statistics)",
  };
}

// ─── Arrival Stats ──────────────────────────────────────────

export function getAnnualData(): ArrivalData[] {
  // Future: if (USE_SUPABASE) { query supabase }
  return ANNUAL_DATA;
}

export function getMonthlyData2025(): ArrivalData[] {
  return MONTHLY_DATA_2025;
}

export function getCurrentYearData() {
  return CURRENT_YEAR_DATA;
}

export function getPreviousYearData() {
  return PREVIOUS_YEAR_DATA;
}

export function getRecoveryData() {
  return {
    current: CURRENT_YEAR_ARRIVALS,
    peak: PEAK_FOREIGN_ARRIVALS,
    benchmarkYear: BENCHMARK_YEAR,
    recoveryPercentage: (CURRENT_YEAR_ARRIVALS / PEAK_FOREIGN_ARRIVALS) * 100,
    gap: PEAK_FOREIGN_ARRIVALS - CURRENT_YEAR_ARRIVALS,
  };
}

export function getAlerts() {
  return SAMPLE_ALERTS;
}

export function getLatestDataReleaseDate() {
  return LATEST_DATA_RELEASE_DATE;
}

// ─── Source Markets ──────────────────────────────────────────

export function getSourceMarkets(): SourceMarket[] {
  return SOURCE_MARKETS;
}

export function getGoaCoordinates() {
  return GOA_COORDINATES;
}

export function getDataSourceAttribution() {
  return DATA_SOURCES;
}

// ─── Flight Prices (Agent-only data) ────────────────────────

export async function getFlightPrices() {
  if (USE_SUPABASE) {
    // Future: query from supabase flight_prices table
    return null;
  }
  // No fallback — flight prices are ONLY from the agent
  return null;
}

// ─── Agent Analyses (Agent-only data) ───────────────────────

export async function getAgentAnalyses() {
  if (USE_SUPABASE) {
    // Future: query from supabase agent_analyses table
    return null;
  }
  return null;
}

// ─── Competitor Data ────────────────────────────────────────

export interface CompetitorData {
  name: string;
  flag: string;
  arrivals2025: number | null;
  arrivalsLabel: string;
  budgetDailyCost: string;
  midRangeDailyCost: string;
  visaRussia: string;
  visaUK: string;
  russianTourists2025: string;
  keyAdvantage: string;
  keyWeakness: string;
  hotelPrice3Star: number;
  source: string;
}

export function getCompetitorData(): CompetitorData[] {
  return [
    {
      name: "Goa",
      flag: "🇮🇳",
      arrivals2025: 517802,
      arrivalsLabel: "5.18L",
      budgetDailyCost: "₹5,000-7,000",
      midRangeDailyCost: "₹10,000-15,000",
      visaRussia: "e-Visa",
      visaUK: "e-Visa",
      russianTourists2025: "Few thousand",
      keyAdvantage: "Culture, heritage",
      keyWeakness: "Price, limited flights",
      hotelPrice3Star: 30000,
      source: "Goa Department of Tourism (Jan 12, 2026)",
    },
    {
      name: "Thailand",
      flag: "🇹🇭",
      arrivals2025: 32970000,
      arrivalsLabel: "33.0M",
      budgetDailyCost: "₹1,500-2,500",
      midRangeDailyCost: "₹4,000-6,500",
      visaRussia: "60-day free",
      visaUK: "60-day free",
      russianTourists2025: "1.90M (+8.8% YoY)",
      keyAdvantage: "Infrastructure, nightlife",
      keyWeakness: "Overtourism",
      hotelPrice3Star: 9000,
      source: "Ministry of Tourism & Sports, Thailand",
    },
    {
      name: "Vietnam",
      flag: "🇻🇳",
      arrivals2025: 21170000,
      arrivalsLabel: "21.2M",
      budgetDailyCost: "₹1,200-2,000",
      midRangeDailyCost: "₹2,500-5,000",
      visaRussia: "Required",
      visaUK: "90-day free",
      russianTourists2025: "Surging (+240% Dec)",
      keyAdvantage: "Price, authenticity",
      keyWeakness: "Developing infra",
      hotelPrice3Star: 3500,
      source: "General Statistics Office, Vietnam",
    },
    {
      name: "Bali",
      flag: "🇮🇩",
      arrivals2025: 4000000,
      arrivalsLabel: "4.0M+ (H1)",
      budgetDailyCost: "₹2,000-3,500",
      midRangeDailyCost: "₹3,500-6,000",
      visaRussia: "VOA 30 days",
      visaUK: "VOA 30 days",
      russianTourists2025: "Moderate",
      keyAdvantage: "Wellness, temples",
      keyWeakness: "Tourist levy",
      hotelPrice3Star: 7000,
      source: "Bali Government Tourism Office",
    },
    {
      name: "Sri Lanka",
      flag: "🇱🇰",
      arrivals2025: null,
      arrivalsLabel: "N/A",
      budgetDailyCost: "₹1,500-3,000",
      midRangeDailyCost: "₹3,000-5,000",
      visaRussia: "ETA online",
      visaUK: "ETA online",
      russianTourists2025: "Recovering",
      keyAdvantage: "Price, beaches",
      keyWeakness: "Economic instability",
      hotelPrice3Star: 1500,
      source: "Sri Lanka Tourism Development Authority",
    },
  ];
}

// ─── Charter Data ───────────────────────────────────────────

export interface CharterYearData {
  year: number;
  flights: number;
  tourists: number;
}

export function getCharterTimelineData(): CharterYearData[] {
  return ANNUAL_DATA.map((d) => ({
    year: d.year,
    flights: d.charterFlights,
    tourists: d.charterTourists,
  }));
}

export interface CharterOperator {
  operator: string;
  country: string;
  route: string;
  frequency: string;
  status: string;
  statusColor: string;
}

export function getCharterOperators(): CharterOperator[] {
  return [
    { operator: "Aeroflot", country: "Russia", route: "Moscow → GOI/GOX", frequency: "9 weekly scheduled", status: "Active", statusColor: "#0EA5E9" },
    { operator: "Nordwind Airlines", country: "Russia", route: "Moscow, Yekaterinburg, Novosibirsk → GOI/GOX", frequency: "Charter (seasonal)", status: "Active (Oct-Mar)", statusColor: "#0EA5E9" },
    { operator: "Fly Arystan", country: "Kazakhstan", route: "Astana → GOI/GOX", frequency: "2x weekly charter", status: "Active (Oct-Mar)", statusColor: "#0EA5E9" },
    { operator: "TUI", country: "UK", route: "London → GOX (Mopa)", frequency: "2x weekly charter", status: "Active (Oct-Mar)", statusColor: "#0EA5E9" },
    { operator: "Charter (Poland)", country: "Poland", route: "Warsaw → GOX (Mopa)", frequency: "Charter (new)", status: "Launched Nov 2025", statusColor: "#10B981" },
  ];
}

// ─── Hotel Price Comparison ─────────────────────────────────

export interface HotelPriceData {
  destination: string;
  location: string;
  priceINR: number;
  isGoa: boolean;
}

export function getHotelPriceComparison(): HotelPriceData[] {
  return [
    { destination: "Sri Lanka", location: "Mirissa", priceINR: 1500, isGoa: false },
    { destination: "Vietnam", location: "Da Nang", priceINR: 3500, isGoa: false },
    { destination: "Bali", location: "Seminyak", priceINR: 7000, isGoa: false },
    { destination: "Thailand", location: "Phuket", priceINR: 9000, isGoa: false },
    { destination: "GOA", location: "Calangute/Baga", priceINR: 30000, isGoa: true },
  ];
}

// ─── Prediction / Recovery Projection ───────────────────────

export interface RecoveryProjection {
  label: string;
  growthRate: number;
  targetYear: number;
  color: string;
  dashed: boolean;
}

export function getRecoveryProjections(): RecoveryProjection[] {
  return [
    { label: "Optimistic (7%)", growthRate: 0.07, targetYear: 2031, color: "#94A3B8", dashed: true },
    { label: "Current pace (10.7%)", growthRate: 0.107, targetYear: 2029, color: "#0EA5E9", dashed: true },
    { label: "Accelerated (15%)", growthRate: 0.15, targetYear: 2028, color: "#10B981", dashed: true },
  ];
}

// ─── Campaign Timing Matrix ─────────────────────────────────

export interface CampaignTiming {
  market: string;
  months: number[]; // 1-12, value = intensity (0-3)
}

export function getCampaignTimingData(): CampaignTiming[] {
  // intensity: 0 = low, 1 = moderate, 2 = high, 3 = peak
  return [
    { market: "Russia", months: [0, 0, 0, 0, 0, 3, 3, 3, 1, 0, 0, 0] },
    { market: "UK", months: [0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 1, 0] },
    { market: "Israel", months: [0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 1] },
    { market: "Germany", months: [0, 0, 0, 0, 0, 0, 3, 3, 3, 1, 0, 0] },
    { market: "Poland", months: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
    { market: "Kazakhstan", months: [0, 0, 0, 0, 0, 0, 1, 2, 3, 3, 1, 0] },
  ];
}
