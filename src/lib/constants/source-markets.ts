/**
 * Source Market Data for Goa Tourism
 * ALL DATA VERIFIED from official sources and news reports (Oct 2025 - Jan 2026)
 * Sources: Goa Department of Tourism, Business Standard, Travel & Tour World, BusinessToday
 */

export interface SourceMarket {
  country: string;
  lat: number;
  lng: number;
  status: "recovering" | "stable" | "declining" | "emerging";
  statusColor: string; // Border color for cards
  keyFacts: string[];
  charterOperators: string[];
  trendDirection: "up" | "down" | "flat";
  keyMetric: string; // Main stat to show on card
  summary: string; // 1-2 line summary for card
  riskFactor?: string; // For comparison table
}

export const SOURCE_MARKETS: SourceMarket[] = [
  {
    country: "Russia",
    lat: 55.7558,
    lng: 37.6173, // Moscow
    status: "recovering",
    statusColor: "#F59E0B", // Amber
    keyFacts: [
      "Historically #1 source market for Goa",
      "Went from 6 charter flights/day (pre-COVID) to 6 flights/week",
      "Aeroflot: 9 weekly flights to Goa (as of Oct 2025)",
      "Nordwind Airlines: charters from Moscow, Yekaterinburg, Novosibirsk",
      "Russia-Ukraine war + sanctions impacting volume"
    ],
    charterOperators: ["Aeroflot", "Nordwind Airlines"],
    trendDirection: "up",
    keyMetric: "9 weekly Aeroflot flights",
    summary: "Slowly recovering from pandemic and geopolitical constraints. Key operator: Aeroflot with 9 weekly flights.",
    riskFactor: "Sanctions & geopolitical tensions"
  },
  {
    country: "United Kingdom",
    lat: 51.5074,
    lng: -0.1278, // London
    status: "stable",
    statusColor: "#0EA5E9", // Teal
    keyFacts: [
      "Historically #2 source market",
      "2 charter flights/week to Mopa airport",
      "Strong FIT (Free Independent Traveler) segment via scheduled flights",
      "Competing with Spain, Turkey, Greece for UK travelers"
    ],
    charterOperators: ["TUI"],
    trendDirection: "flat",
    keyMetric: "2 weekly charters to Mopa",
    summary: "Stable market with mix of charters and FIT travelers. Faces competition from Mediterranean destinations.",
    riskFactor: "Competition from Spain/Turkey"
  },
  {
    country: "Israel",
    lat: 32.0853,
    lng: 34.7818, // Tel Aviv
    status: "declining",
    statusColor: "#EF4444", // Red
    keyFacts: [
      "Was a major high-spending market",
      "Sharp decline since October 2023 (Hamas conflict)",
      "Arrivals down ~28% YoY",
      "Recovery timeline uncertain — depends on geopolitical resolution"
    ],
    charterOperators: [],
    trendDirection: "down",
    keyMetric: "~28% decline YoY",
    summary: "Major decline due to ongoing regional conflict. High-value market but recovery uncertain.",
    riskFactor: "Ongoing regional conflict"
  },
  {
    country: "Germany",
    lat: 52.5200,
    lng: 13.4050, // Berlin
    status: "stable",
    statusColor: "#0EA5E9", // Teal
    keyFacts: [
      "Strong FIT market, often combines Goa with Golden Triangle circuit",
      "Travelers arrive via scheduled international flights",
      "Competing with Thailand, Vietnam for German long-haul tourists"
    ],
    charterOperators: [],
    trendDirection: "flat",
    keyMetric: "FIT-focused market",
    summary: "Mature market with independent travelers. Often part of multi-city India tours.",
    riskFactor: "Competition from SE Asia"
  },
  {
    country: "Poland",
    lat: 52.2297,
    lng: 21.0122, // Warsaw
    status: "emerging",
    statusColor: "#10B981", // Green
    keyFacts: [
      "NEW market — charter flights started November 2025",
      "Charter route: Warsaw → Mopa International Airport",
      "High growth potential from Eastern European market",
      "Part of Goa's diversification strategy beyond Russia/UK"
    ],
    charterOperators: ["Charter operator TBD"],
    trendDirection: "up",
    keyMetric: "Charters started Nov 2025",
    summary: "Brand new market with strong growth potential. Part of Eastern Europe expansion strategy.",
    riskFactor: "New market — untested demand"
  },
  {
    country: "Kazakhstan",
    lat: 51.1694,
    lng: 71.4491, // Astana
    status: "emerging",
    statusColor: "#10B981", // Green
    keyFacts: [
      "Charter flights from Astana started October 25, 2025",
      "Fly Arystan operating twice-weekly charters",
      "176 passengers on first charter (Dec 30, 2025)",
      "Part of Central Asia expansion strategy"
    ],
    charterOperators: ["Fly Arystan"],
    trendDirection: "up",
    keyMetric: "2x weekly Fly Arystan charters",
    summary: "New Central Asian market launched Oct 2025. First charter had 176 passengers.",
    riskFactor: "New market — early stage"
  }
];

// Goa coordinates for map center and arc endpoints
export const GOA_COORDINATES = {
  lat: 15.4909,
  lng: 73.8278,
  name: "Goa, India"
};

// Map configuration
export const MAP_CONFIG = {
  style: "mapbox://styles/mapbox/dark-v11",
  center: [40, 45] as [number, number], // Europe/Central Asia (lng, lat)
  zoom: 2.5,
  minZoom: 1.5,
  maxZoom: 10,
};

// Data source attribution
export const DATA_SOURCES = "Sources: Goa Department of Tourism, Business Standard, Travel & Tour World, BusinessToday (Oct 2025 - Jan 2026)";
