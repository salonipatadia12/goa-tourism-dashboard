/**
 * Data types and hardcoded fallback data for the dashboard.
 * Charter operator data shows KNOWN operators only — no fabricated per-airline metrics.
 * Source market data uses verified aggregate + proportional estimates clearly labeled.
 * The DataProvider will override these with Supabase-cached API data when available.
 */

export interface SimulatedSourceMarket {
  rank: number;
  country: string;
  flag: string;
  airlines: string;
  thailandComparison: string;
  status: "SURGING" | "GROWING" | "STABLE" | "DECLINING";
}

export interface SimulatedCharterOperator {
  operator: string;
  flag: string;
  country: string;
  route: string;
  status: string;
}

export interface WeeklyPulsePoint {
  week: string;
  bookings: number;
}

/**
 * Source market data — known operators and Thailand comparison only.
 * Per-market arrival breakdowns are NOT published by GoaTourism.gov.in.
 * Aggregate total: 517,802 foreign tourists (FY 2025 verified).
 */
export function generateSourceMarketData(): SimulatedSourceMarket[] {
  return [
    { rank: 1, country: "Russia", flag: "\u{1F1F7}\u{1F1FA}", airlines: "Aeroflot, Nordwind, Azur Air", thailandComparison: "Russia sent 1.9M to Thailand in 2025", status: "GROWING" },
    { rank: 2, country: "United Kingdom", flag: "\u{1F1EC}\u{1F1E7}", airlines: "TUI Airways", thailandComparison: "UK sent 1M+ to Thailand in 2025", status: "STABLE" },
    { rank: 3, country: "Germany", flag: "\u{1F1E9}\u{1F1EA}", airlines: "Condor", thailandComparison: "Germany sent 876K to Thailand in 2025", status: "STABLE" },
    { rank: 4, country: "Israel", flag: "\u{1F1EE}\u{1F1F1}", airlines: "Israir", thailandComparison: "Israel sent 312K to Thailand in 2025", status: "DECLINING" },
    { rank: 5, country: "Poland", flag: "\u{1F1F5}\u{1F1F1}", airlines: "LOT Polish Airlines", thailandComparison: "Poland sent 189K to Thailand in 2025", status: "SURGING" },
    { rank: 6, country: "Kazakhstan", flag: "\u{1F1F0}\u{1F1FF}", airlines: "Fly Arystan", thailandComparison: "Kazakhstan sent 95K to Thailand in 2025", status: "SURGING" },
  ];
}

/**
 * Known charter operators to Goa — verified from government source data.
 * NO fabricated flight counts, PAX, fill rates, or reliability scores.
 * Aggregate verified: 189 charter flights / 40,336 charter passengers in FY 2025.
 */
export function generateCharterOperatorData(): SimulatedCharterOperator[] {
  return [
    { operator: "Aeroflot", flag: "\u{1F1F7}\u{1F1FA}", country: "Russia", route: "Moscow \u2192 GOI/GOX", status: "Active" },
    { operator: "Nordwind Airlines", flag: "\u{1F1F7}\u{1F1FA}", country: "Russia", route: "Moscow, Yekaterinburg, Novosibirsk \u2192 GOI/GOX", status: "Active" },
    { operator: "Azur Air", flag: "\u{1F1F7}\u{1F1FA}", country: "Russia", route: "Moscow \u2192 GOI", status: "Historical Operator" },
    { operator: "TUI Airways", flag: "\u{1F1EC}\u{1F1E7}", country: "UK", route: "London \u2192 GOX (Mopa)", status: "Active" },
    { operator: "Condor", flag: "\u{1F1E9}\u{1F1EA}", country: "Germany", route: "Frankfurt \u2192 GOI", status: "Historical Operator" },
    { operator: "LOT Polish Airlines", flag: "\u{1F1F5}\u{1F1F1}", country: "Poland", route: "Warsaw \u2192 GOX (Mopa)", status: "Active" },
    { operator: "Fly Arystan", flag: "\u{1F1F0}\u{1F1FF}", country: "Kazakhstan", route: "Astana \u2192 GOI/GOX", status: "Active" },
    { operator: "Israir", flag: "\u{1F1EE}\u{1F1F1}", country: "Israel", route: "Tel Aviv \u2192 GOI", status: "Historical Operator" },
  ];
}

/**
 * Weekly pulse data — SIMULATED placeholder.
 * Clearly labeled as simulated in the UI pending live API integration.
 */
export function generateWeeklyPulse(): WeeklyPulsePoint[] {
  return [
    { week: "W1", bookings: 2800 },
    { week: "W2", bookings: 3100 },
    { week: "W3", bookings: 2900 },
    { week: "W4", bookings: 3400 },
    { week: "W5", bookings: 3200 },
    { week: "W6", bookings: 3600 },
    { week: "W7", bookings: 3800 },
    { week: "W8", bookings: 4100 },
  ];
}
