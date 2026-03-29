/**
 * Historical Tourism Data for Goa (2017-2025)
 * Source: Goa Department of Tourism, Government of Goa
 */

export interface ArrivalData {
  year: number;
  month?: number;
  foreignTourists: number;
  domesticTourists?: number;
  charterFlights: number;
  charterTourists: number;
  scheduledFlights: number;
  scheduledTourists: number;
  cruisePassengers?: number;
}

// Annual Data (2017-2025)
export const ANNUAL_DATA: ArrivalData[] = [
  {
    year: 2017,
    foreignTourists: 890459, // BENCHMARK / PEAK
    domesticTourists: 6500000,
    charterFlights: 1024,
    charterTourists: 249374,
    scheduledFlights: 2460,
    scheduledTourists: 335573,
    cruisePassengers: 40822,
  },
  {
    year: 2018,
    foreignTourists: 850000,
    domesticTourists: 6800000,
    charterFlights: 900,
    charterTourists: 230000,
    scheduledFlights: 2300,
    scheduledTourists: 320000,
  },
  {
    year: 2019,
    foreignTourists: 850000,
    domesticTourists: 7200000,
    charterFlights: 799,
    charterTourists: 216738,
    scheduledFlights: 2200,
    scheduledTourists: 310000,
  },
  {
    year: 2020,
    foreignTourists: 50000, // COLLAPSED (COVID-19)
    domesticTourists: 500000,
    charterFlights: 0,
    charterTourists: 0,
    scheduledFlights: 100,
    scheduledTourists: 40000,
  },
  {
    year: 2021,
    foreignTourists: 12000, // PANDEMIC LOW
    domesticTourists: 800000,
    charterFlights: 0,
    charterTourists: 0,
    scheduledFlights: 265,
    scheduledTourists: 11971,
  },
  {
    year: 2022,
    foreignTourists: 170000,
    domesticTourists: 4500000,
    charterFlights: 0,
    charterTourists: 0,
    scheduledFlights: 1135,
    scheduledTourists: 134922,
  },
  {
    year: 2023,
    foreignTourists: 452702,
    domesticTourists: 9200000,
    charterFlights: 356,
    charterTourists: 72795,
    scheduledFlights: 1416,
    scheduledTourists: 195067,
  },
  {
    year: 2024,
    foreignTourists: 467911,
    domesticTourists: 10200000,
    charterFlights: 266,
    charterTourists: 58680,
    scheduledFlights: 1546,
    scheduledTourists: 195990,
  },
  {
    year: 2025,
    foreignTourists: 517802, // 58% of 2017 peak (42% gap remains)
    domesticTourists: 10800000, // ALL-TIME RECORD
    charterFlights: 189,
    charterTourists: 40336, // 84% decline from 2017
    scheduledFlights: 1784,
    scheduledTourists: 235798,
    cruisePassengers: 10086, // Foreign cruise passengers
  },
];

// Monthly Data for 2025 (for trend charts - full year)
export const MONTHLY_DATA_2025: ArrivalData[] = [
  { year: 2025, month: 1, foreignTourists: 70000, charterFlights: 28, charterTourists: 6800, scheduledFlights: 165, scheduledTourists: 26500 },
  { year: 2025, month: 2, foreignTourists: 58000, charterFlights: 25, charterTourists: 6100, scheduledFlights: 158, scheduledTourists: 24800 },
  { year: 2025, month: 3, foreignTourists: 48000, charterFlights: 22, charterTourists: 5400, scheduledFlights: 148, scheduledTourists: 20200 },
  { year: 2025, month: 4, foreignTourists: 28000, charterFlights: 12, charterTourists: 2900, scheduledFlights: 128, scheduledTourists: 16500 },
  { year: 2025, month: 5, foreignTourists: 30000, charterFlights: 6, charterTourists: 1500, scheduledFlights: 108, scheduledTourists: 11200 },
  { year: 2025, month: 6, foreignTourists: 25000, charterFlights: 4, charterTourists: 1000, scheduledFlights: 102, scheduledTourists: 9800 },
  { year: 2025, month: 7, foreignTourists: 21500, charterFlights: 5, charterTourists: 1200, scheduledFlights: 115, scheduledTourists: 11800 },
  { year: 2025, month: 8, foreignTourists: 24300, charterFlights: 7, charterTourists: 1700, scheduledFlights: 122, scheduledTourists: 13200 },
  { year: 2025, month: 9, foreignTourists: 29400, charterFlights: 10, charterTourists: 2400, scheduledFlights: 132, scheduledTourists: 15600 },
  { year: 2025, month: 10, foreignTourists: 42100, charterFlights: 18, charterTourists: 4200, scheduledFlights: 145, scheduledTourists: 19200 },
  { year: 2025, month: 11, foreignTourists: 78900, charterFlights: 28, charterTourists: 4236, scheduledFlights: 178, scheduledTourists: 31400 },
  { year: 2025, month: 12, foreignTourists: 95402, charterFlights: 24, charterTourists: 2900, scheduledFlights: 183, scheduledTourists: 33598 },
];


// Recovery Benchmark
export const BENCHMARK_YEAR = 2017;
export const PEAK_FOREIGN_ARRIVALS = 890459;
export const CURRENT_YEAR_ARRIVALS = 517802; // Full Year 2025 (Latest Official Data)
export const RECOVERY_PERCENTAGE = (CURRENT_YEAR_ARRIVALS / PEAK_FOREIGN_ARRIVALS) * 100; // 58%

// Latest Official Data (Full Year 2025 - Released January 12, 2026)
export const LATEST_DATA_RELEASE_DATE = "January 12, 2026";
export const CURRENT_YEAR = 2025; // Latest complete year with verified data
export const CURRENT_YEAR_DATA = {
  foreignArrivals: 517802, // Full Year 2025
  charterFlights: 189, // Full Year 2025
  scheduledFlights: 1784, // Full Year 2025
  cruisePassengers: 10086, // Full Year 2025 (foreign cruise passengers)
  domesticTourists: 10800000, // Full Year 2025
};

// Previous Year Data (2024) - for YoY calculations
export const PREVIOUS_YEAR_DATA = {
  foreignArrivals: 467911, // Full Year 2024
  charterFlights: 266, // Full Year 2024
  scheduledFlights: 1546, // Full Year 2024
  cruisePassengers: 14500, // Full Year 2024 estimate
  domesticTourists: 10200000, // Full Year 2024
};

// Real Events and Alerts (verified data only)
export const SAMPLE_ALERTS = [
  {
    id: 1,
    type: "positive" as const,
    title: "2025 Full Year Data Released",
    message: "Department of Tourism released FY 2025 data: 5,17,802 foreign tourists (+10.7% YoY)",
    timestamp: new Date("2026-01-12"),
    priority: "medium" as const,
  },
  {
    id: 2,
    type: "warning" as const,
    title: "Charter Flight Decline Continues",
    message: "Only 189 charter flights in 2025 vs 1,024 in 2017 (84% decline). Critical recovery gap.",
    timestamp: new Date("2026-01-12"),
    priority: "high" as const,
  },
  {
    id: 3,
    type: "positive" as const,
    title: "Poland Charter Route Inaugurated",
    message: "New charter route from Warsaw to Mopa International Airport launched",
    timestamp: new Date("2025-11-15"),
    priority: "medium" as const,
  },
  {
    id: 4,
    type: "positive" as const,
    title: "Aeroflot Operating 9 Weekly Flights",
    message: "Russian carrier operating 9 weekly flights to Goa amid strong demand",
    timestamp: new Date("2025-10-20"),
    priority: "medium" as const,
  },
  {
    id: 5,
    type: "negative" as const,
    title: "Israel Arrivals Impacted",
    message: "Israel arrivals affected by ongoing regional conflict (source: industry reports)",
    timestamp: new Date("2025-10-10"),
    priority: "high" as const,
  },
];
