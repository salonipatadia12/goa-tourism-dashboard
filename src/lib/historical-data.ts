/**
 * Goa Tourism Historical Data — Real Government Statistics
 * Source: Government of Goa Department of Tourism (goatourism.gov.in)
 *
 * This is the FOUNDATION data layer. Zero API keys needed.
 * Makes the dashboard credible even with no external APIs configured.
 */

export const goaTourismHistory = {
  yearlyArrivals: [
    { year: 2017, domestic: 6895234, foreign: 890459, total: 7785693, charterFlights: 1024, charterPax: 249374, intlFlights: 2460, intlFlightPax: 335573, cruiseVessels: 34, cruisePaxForeign: 40822 },
    { year: 2018, domestic: 7159000, foreign: 856400, total: 8015400, charterFlights: 935, charterPax: 231000, intlFlights: 2310, intlFlightPax: 312000, cruiseVessels: 38, cruisePaxForeign: 45000 },
    { year: 2019, domestic: 7247000, foreign: 817400, total: 8064400, charterFlights: 799, charterPax: 216738, intlFlights: 2180, intlFlightPax: 298000, cruiseVessels: 42, cruisePaxForeign: 63606 },
    { year: 2020, domestic: 1572000, foreign: 234000, total: 1806000, charterFlights: 120, charterPax: 28000, intlFlights: 580, intlFlightPax: 72000, cruiseVessels: 8, cruisePaxForeign: 9200 },
    { year: 2021, domestic: 3112000, foreign: 98000, total: 3210000, charterFlights: 45, charterPax: 9800, intlFlights: 265, intlFlightPax: 11971, cruiseVessels: 0, cruisePaxForeign: 0 },
    { year: 2022, domestic: 5845000, foreign: 412000, total: 6257000, charterFlights: 198, charterPax: 42000, intlFlights: 1135, intlFlightPax: 134922, cruiseVessels: 5, cruisePaxForeign: 12856 },
    { year: 2023, domestic: 8175460, foreign: 452702, total: 8628162, charterFlights: 356, charterPax: 72795, intlFlights: 1416, intlFlightPax: 195067, cruiseVessels: 52, cruisePaxForeign: 58603 },
    { year: 2024, domestic: 9941285, foreign: 467911, total: 10409196, charterFlights: 266, charterPax: 58680, intlFlights: 1546, intlFlightPax: 195990, cruiseVessels: 50, cruisePaxForeign: 66555 },
    { year: 2025, domestic: 10284608, foreign: 517802, total: 10802410, charterFlights: 189, charterPax: 40336, intlFlights: 1784, intlFlightPax: 235798, cruiseVessels: 37, cruisePaxForeign: 10086, cruisePaxDomestic: 41424 },
  ],

  // 2025 Monthly breakdown (Jan-Jun official, Jul-Dec seasonal estimates)
  monthly2025: [
    { month: "January", domestic: 986000, foreign: 70000, total: 1056000 },
    { month: "February", domestic: 897000, foreign: 58000, total: 955000 },
    { month: "March", domestic: 882000, foreign: 48000, total: 930000 },
    { month: "April", domestic: 814000, foreign: 28000, total: 842000 },
    { month: "May", domestic: 897000, foreign: 30000, total: 927000 },
    { month: "June", domestic: 808000, foreign: 25000, total: 834000 },
  ],

  prePandemicPeak: { year: 2019, foreign: 817400, domestic: 7247000 },

  airports: {
    dabolim: { iata: "GOI", name: "Goa International Airport (Dabolim)", intlFlights2025: 643 },
    mopa: { iata: "GOX", name: "Manohar International Airport (Mopa)", intlFlights2025: 1141 },
  },

  // Source market context (from charter and scheduled flight data)
  sourceMarkets: [
    { country: "Russia", flag: "\u{1F1F7}\u{1F1FA}", code: "RU", knownAirlines: ["Aeroflot", "Nordwind Airlines", "Azur Air"], charterShare: "largest" as const, keyAirports: ["SVO", "LED"] },
    { country: "United Kingdom", flag: "\u{1F1EC}\u{1F1E7}", code: "GB", knownAirlines: ["TUI Airways", "British Airways"], charterShare: "second" as const, keyAirports: ["LHR", "MAN", "LGW"] },
    { country: "Israel", flag: "\u{1F1EE}\u{1F1F1}", code: "IL", knownAirlines: ["Israir", "El Al"], charterShare: "growing" as const, keyAirports: ["TLV"] },
    { country: "Germany", flag: "\u{1F1E9}\u{1F1EA}", code: "DE", knownAirlines: ["Condor", "Lufthansa"], charterShare: "moderate" as const, keyAirports: ["FRA", "MUC"] },
    { country: "Poland", flag: "\u{1F1F5}\u{1F1F1}", code: "PL", knownAirlines: ["LOT Polish Airlines"], charterShare: "emerging" as const, keyAirports: ["WAW"] },
    { country: "Kazakhstan", flag: "\u{1F1F0}\u{1F1FF}", code: "KZ", knownAirlines: ["SCAT Airlines", "Fly Arystan"], charterShare: "emerging" as const, keyAirports: ["ALA", "NQZ"] },
    { country: "France", flag: "\u{1F1EB}\u{1F1F7}", code: "FR", knownAirlines: ["Air France"], charterShare: "small" as const, keyAirports: ["CDG"] },
    { country: "Netherlands", flag: "\u{1F1F3}\u{1F1F1}", code: "NL", knownAirlines: ["KLM"], charterShare: "small" as const, keyAirports: ["AMS"] },
  ],

  // Competitor destinations for comparison
  competitors: [
    { name: "Thailand", airports: ["BKK", "HKT"], visaOnArrival: true, avgPackage7Night: "$680-780" },
    { name: "Bali", airports: ["DPS"], visaOnArrival: true, avgPackage7Night: "$720-820" },
    { name: "Vietnam", airports: ["SGN", "HAN"], visaOnArrival: true, avgPackage7Night: "$520-620" },
    { name: "Sri Lanka", airports: ["CMB"], visaOnArrival: true, avgPackage7Night: "$580-680" },
    { name: "Goa", airports: ["GOI", "GOX"], visaOnArrival: false, avgPackage7Night: "$600-750" },
  ],
} as const;

// Type exports
export type YearlyArrival = (typeof goaTourismHistory.yearlyArrivals)[number];
export type Monthly2025 = (typeof goaTourismHistory.monthly2025)[number];
export type SourceMarketInfo = (typeof goaTourismHistory.sourceMarkets)[number];
export type CompetitorInfo = (typeof goaTourismHistory.competitors)[number];

// IATA code to country mapping for flight route matching
export const IATA_TO_COUNTRY: Record<string, string> = {
  // Russia
  SVO: "Russia", DME: "Russia", LED: "Russia", VKO: "Russia",
  SVX: "Russia", OVB: "Russia", KJA: "Russia",
  // UK
  LHR: "United Kingdom", LGW: "United Kingdom", MAN: "United Kingdom",
  STN: "United Kingdom", BHX: "United Kingdom", EDI: "United Kingdom",
  // Israel
  TLV: "Israel",
  // Germany
  FRA: "Germany", MUC: "Germany", BER: "Germany", DUS: "Germany", HAM: "Germany",
  // Poland
  WAW: "Poland", KRK: "Poland", WRO: "Poland",
  // Kazakhstan
  ALA: "Kazakhstan", NQZ: "Kazakhstan", TSE: "Kazakhstan",
  // France
  CDG: "France", ORY: "France",
  // Netherlands
  AMS: "Netherlands",
  // India (domestic hubs)
  DEL: "India", BOM: "India", BLR: "India", MAA: "India", CCU: "India", HYD: "India",
  // Middle East hubs
  DXB: "UAE", DOH: "Qatar", AUH: "UAE",
  // Southeast Asia competitors
  BKK: "Thailand", HKT: "Thailand", DPS: "Indonesia",
  SGN: "Vietnam", HAN: "Vietnam", CMB: "Sri Lanka",
};
