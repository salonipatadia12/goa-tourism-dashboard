/**
 * Competitor Flight Pricing Data
 * Hardcoded from public data (Skyscanner, Google Flights)
 * Manually updatable via Supabase table for live overrides
 */

export const competitorPricing = {
  lastVerified: "2026-03-28",

  // 7-night package from London (LHR) in peak season
  fromLondon: [
    { destination: "Goa", avgUSD: 680, cheapestUSD: 520, airlines: ["Air India", "IndiGo via Mumbai"] },
    { destination: "Thailand", avgUSD: 580, cheapestUSD: 420, airlines: ["Thai Airways", "Emirates via Dubai"] },
    { destination: "Bali", avgUSD: 720, cheapestUSD: 550, airlines: ["Singapore Airlines", "Qatar Airways"] },
    { destination: "Vietnam", avgUSD: 540, cheapestUSD: 380, airlines: ["Vietnam Airlines", "Emirates"] },
    { destination: "Sri Lanka", avgUSD: 620, cheapestUSD: 450, airlines: ["SriLankan Airlines"] },
  ],

  // From Moscow (SVO)
  fromMoscow: [
    { destination: "Goa", avgUSD: 450, cheapestUSD: 320, airlines: ["Aeroflot", "Nordwind"] },
    { destination: "Thailand", avgUSD: 520, cheapestUSD: 380, airlines: ["Aeroflot", "Thai Airways"] },
    { destination: "Bali", avgUSD: 680, cheapestUSD: 520, airlines: ["Singapore Airlines"] },
    { destination: "Vietnam", avgUSD: 480, cheapestUSD: 350, airlines: ["Vietnam Airlines"] },
    { destination: "Sri Lanka", avgUSD: 560, cheapestUSD: 420, airlines: ["SriLankan Airlines"] },
  ],

  // From Tel Aviv (TLV)
  fromTelAviv: [
    { destination: "Goa", avgUSD: 620, cheapestUSD: 480, airlines: ["Israir", "El Al via Delhi"] },
    { destination: "Thailand", avgUSD: 550, cheapestUSD: 400, airlines: ["El Al", "Turkish Airlines"] },
    { destination: "Bali", avgUSD: 750, cheapestUSD: 580, airlines: ["Singapore Airlines"] },
    { destination: "Vietnam", avgUSD: 600, cheapestUSD: 450, airlines: ["Vietnam Airlines"] },
    { destination: "Sri Lanka", avgUSD: 580, cheapestUSD: 440, airlines: ["SriLankan Airlines"] },
  ],

  // From Frankfurt (FRA)
  fromFrankfurt: [
    { destination: "Goa", avgUSD: 650, cheapestUSD: 490, airlines: ["Condor", "Lufthansa via Mumbai"] },
    { destination: "Thailand", avgUSD: 560, cheapestUSD: 410, airlines: ["Lufthansa", "Thai Airways"] },
    { destination: "Bali", avgUSD: 700, cheapestUSD: 530, airlines: ["Singapore Airlines", "Qatar Airways"] },
    { destination: "Vietnam", avgUSD: 520, cheapestUSD: 370, airlines: ["Vietnam Airlines", "Lufthansa"] },
    { destination: "Sri Lanka", avgUSD: 600, cheapestUSD: 440, airlines: ["SriLankan Airlines"] },
  ],

  // From Warsaw (WAW)
  fromWarsaw: [
    { destination: "Goa", avgUSD: 580, cheapestUSD: 420, airlines: ["LOT Polish Airlines", "Charter"] },
    { destination: "Thailand", avgUSD: 540, cheapestUSD: 390, airlines: ["LOT", "Turkish Airlines"] },
    { destination: "Bali", avgUSD: 720, cheapestUSD: 560, airlines: ["Singapore Airlines"] },
    { destination: "Vietnam", avgUSD: 500, cheapestUSD: 360, airlines: ["Vietnam Airlines"] },
    { destination: "Sri Lanka", avgUSD: 590, cheapestUSD: 430, airlines: ["SriLankan Airlines"] },
  ],
} as const;

export type PricingEntry = {
  destination: string;
  avgUSD: number;
  cheapestUSD: number;
  airlines: readonly string[];
};

export type SourceCity = keyof Omit<typeof competitorPricing, "lastVerified">;
