/**
 * Amadeus Self-Service API Client
 *
 * Free tier: 2,000 flight searches/month
 * Docs: https://developers.amadeus.com/self-service/apis-docs/guides/developer-guides/resources/flights/
 *
 * This client is used by the price monitor agent to fetch real-time flight prices
 * from source markets (Russia, UK, Israel, Germany, Poland, Kazakhstan) to:
 * 1. Goa airports (GOI, GOX)
 * 2. Competitor destinations (BKK, HKT, SGN, DPS, CMB)
 */

import Amadeus, { Client } from 'amadeus';

// ================================================================
// CONFIGURATION
// ================================================================

export const AMADEUS_CONFIG = {
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
  // Use 'test' for sandbox, 'production' for real data
  hostname: (process.env.AMADEUS_ENV === 'production' ? 'production' : 'test') as 'production' | 'test',
};

// ================================================================
// MONITORED ROUTES
// ================================================================

/**
 * Source cities (where tourists come FROM)
 * These are the key source markets identified in the research
 */
export const SOURCE_MARKETS = [
  { iata: 'SVO', city: 'Moscow', country: 'Russia' },
  { iata: 'LHR', city: 'London', country: 'United Kingdom' },
  { iata: 'TLV', city: 'Tel Aviv', country: 'Israel' },
  { iata: 'BER', city: 'Berlin', country: 'Germany' },
  { iata: 'WAW', city: 'Warsaw', country: 'Poland' },
  { iata: 'TSE', city: 'Astana', country: 'Kazakhstan' },
] as const;

/**
 * Goa airports (destination)
 */
export const GOA_AIRPORTS = [
  { iata: 'GOI', name: 'Dabolim Airport' },
  { iata: 'GOX', name: 'Mopa/Manohar International' },
] as const;

/**
 * Competitor destinations (for price comparison)
 * These are eating Goa's lunch according to the research
 */
export const COMPETITOR_DESTINATIONS = [
  { iata: 'BKK', name: 'Bangkok', country: 'Thailand' },
  { iata: 'HKT', name: 'Phuket', country: 'Thailand' },
  { iata: 'SGN', name: 'Ho Chi Minh City', country: 'Vietnam' },
  { iata: 'DPS', name: 'Bali (Denpasar)', country: 'Indonesia' },
  { iata: 'CMB', name: 'Colombo', country: 'Sri Lanka' },
] as const;

// ================================================================
// CLIENT INITIALIZATION
// ================================================================

let amadeusClient: Client | null = null;

/**
 * Get or create Amadeus client
 * Returns null if credentials are not configured
 */
export function getAmadeusClient(): Client | null {
  if (!AMADEUS_CONFIG.clientId || !AMADEUS_CONFIG.clientSecret) {
    console.warn('Amadeus API credentials not configured. Set AMADEUS_CLIENT_ID and AMADEUS_CLIENT_SECRET in .env.local');
    return null;
  }

  if (!amadeusClient) {
    amadeusClient = new Amadeus({
      clientId: AMADEUS_CONFIG.clientId,
      clientSecret: AMADEUS_CONFIG.clientSecret,
      hostname: AMADEUS_CONFIG.hostname,
    });
  }

  return amadeusClient;
}

/**
 * Check if Amadeus API is configured
 */
export function isAmadeusConfigured(): boolean {
  return !!(AMADEUS_CONFIG.clientId && AMADEUS_CONFIG.clientSecret);
}

// ================================================================
// HELPER FUNCTIONS
// ================================================================

/**
 * Get date N days from now in YYYY-MM-DD format
 */
export function getDateFromNow(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

/**
 * Get first day of next month
 */
export function getNextMonthDate(): string {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  date.setDate(1);
  return date.toISOString().split('T')[0];
}

/**
 * Convert USD/EUR to INR (approximate rate, should be updated from live forex)
 */
export function convertToINR(amount: number, currency: string): number {
  const rates: Record<string, number> = {
    'USD': 83.0,
    'EUR': 90.0,
    'GBP': 105.0,
    'INR': 1.0,
  };

  const rate = rates[currency] || 85.0; // fallback to approximate USD rate
  return Math.round(amount * rate * 100) / 100;
}

// ================================================================
// API WRAPPER FUNCTIONS
// ================================================================

/**
 * Search flight offers for a specific route
 *
 * @param origin - Origin IATA code
 * @param destination - Destination IATA code
 * @param departureDate - Departure date (YYYY-MM-DD)
 * @param adults - Number of adult passengers (default: 1)
 * @param max - Maximum number of results (default: 5)
 * @returns Flight offers or null if error
 */
export async function searchFlightOffers(params: {
  origin: string;
  destination: string;
  departureDate: string;
  adults?: number;
  max?: number;
}) {
  const client = getAmadeusClient();

  if (!client) {
    return {
      success: false,
      error: 'Amadeus API not configured',
      data: null,
    };
  }

  try {
    const response = await client.shopping.flightOffersSearch.get({
      originLocationCode: params.origin,
      destinationLocationCode: params.destination,
      departureDate: params.departureDate,
      adults: params.adults || 1,
      max: params.max || 5,
      currencyCode: 'INR',
      nonStop: false, // include connecting flights
    });

    return {
      success: true,
      error: null,
      data: response.data,
    };
  } catch (error: any) {
    console.error(`Amadeus API error for ${params.origin}→${params.destination}:`, error);

    return {
      success: false,
      error: error.description?.[0]?.title || error.message || 'Unknown Amadeus API error',
      data: null,
    };
  }
}

/**
 * Get flight inspiration (popular destinations from an origin)
 * Useful for understanding where tourists from a source market are going
 */
export async function getFlightInspiration(params: {
  origin: string;
  departureDate?: string;
  maxPrice?: number;
}) {
  const client = getAmadeusClient();

  if (!client) {
    return {
      success: false,
      error: 'Amadeus API not configured',
      data: null,
    };
  }

  try {
    const response = await client.shopping.flightDestinations.get({
      origin: params.origin,
      departureDate: params.departureDate,
      maxPrice: params.maxPrice,
    });

    return {
      success: true,
      error: null,
      data: response.data,
    };
  } catch (error: any) {
    console.error(`Amadeus flight inspiration error for ${params.origin}:`, error);

    return {
      success: false,
      error: error.description?.[0]?.title || error.message || 'Unknown Amadeus API error',
      data: null,
    };
  }
}

/**
 * Get cheapest flight dates for a route
 * Useful for understanding price seasonality
 */
export async function getCheapestDates(params: {
  origin: string;
  destination: string;
  departureDate?: string;
}) {
  const client = getAmadeusClient();

  if (!client) {
    return {
      success: false,
      error: 'Amadeus API not configured',
      data: null,
    };
  }

  try {
    const response = await client.shopping.flightDates.get({
      origin: params.origin,
      destination: params.destination,
      departureDate: params.departureDate,
    });

    return {
      success: true,
      error: null,
      data: response.data,
    };
  } catch (error: any) {
    console.error(`Amadeus cheapest dates error for ${params.origin}→${params.destination}:`, error);

    return {
      success: false,
      error: error.description?.[0]?.title || error.message || 'Unknown Amadeus API error',
      data: null,
    };
  }
}

/**
 * Get all routes we monitor
 * Returns combinations of source markets × (Goa airports + competitor destinations)
 */
export function getAllMonitoredRoutes() {
  const routes: Array<{
    origin: typeof SOURCE_MARKETS[number];
    destination: (typeof GOA_AIRPORTS[number] | typeof COMPETITOR_DESTINATIONS[number]);
    isGoa: boolean;
  }> = [];

  for (const origin of SOURCE_MARKETS) {
    // Add Goa routes
    for (const destination of GOA_AIRPORTS) {
      routes.push({
        origin,
        destination,
        isGoa: true,
      });
    }

    // Add competitor routes
    for (const destination of COMPETITOR_DESTINATIONS) {
      routes.push({
        origin,
        destination,
        isGoa: false,
      });
    }
  }

  return routes;
}

// ================================================================
// EXPORT DEFAULT CLIENT
// ================================================================

export default getAmadeusClient();
