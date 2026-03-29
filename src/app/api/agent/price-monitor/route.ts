// @ts-nocheck — Supabase types will be auto-generated when project is connected
/**
 * Price Monitor Agent - API Route
 *
 * This is the core intelligence agent that:
 * 1. Queries Amadeus Flight Offers Search API for flights from source cities to Goa
 * 2. Queries the SAME source cities to competitor destinations
 * 3. Stores ALL results in Supabase `flight_prices` table
 * 4. Runs analysis comparing Goa prices vs competitors
 * 5. Generates `agent_analyses` entries when it finds insights
 * 6. Logs the entire run in `agent_runs`
 *
 * Trigger: Vercel cron job (daily at 6 AM UTC) or manual via curl
 *
 * Free tier Amadeus limit: 2,000 requests/month
 * Routes monitored: 6 origins × (2 Goa + 5 competitors) = 42 routes
 * At 1 request per route = 42 requests per run
 * Daily = ~1,260 requests/month (within limit with buffer)
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  isAmadeusConfigured,
  searchFlightOffers,
  SOURCE_MARKETS,
  GOA_AIRPORTS,
  COMPETITOR_DESTINATIONS,
  getAllMonitoredRoutes,
  getNextMonthDate,
  convertToINR,
} from '@/lib/amadeus/client';
import { supabaseServer, isSupabaseConfigured } from '@/lib/supabase/server';

// ================================================================
// CONFIGURATION
// ================================================================

const SEARCH_PARAMS = {
  departureDate: getNextMonthDate(), // Search 30 days out
  adults: 1,
  maxOffersPerRoute: 3, // Top 3 cheapest flights per route
};

// ================================================================
// MAIN HANDLER
// ================================================================

export async function GET(request: NextRequest) {
  console.log('🚀 Price Monitor Agent starting...');

  // ============================================================
  // STEP 0: Verify configuration
  // ============================================================

  if (!isSupabaseConfigured()) {
    console.error('❌ Supabase not configured');
    return NextResponse.json(
      {
        success: false,
        error: 'Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local',
      },
      { status: 500 }
    );
  }

  if (!isAmadeusConfigured()) {
    console.error('❌ Amadeus API not configured');
    return NextResponse.json(
      {
        success: false,
        error: 'Amadeus API not configured. Set AMADEUS_CLIENT_ID and AMADEUS_CLIENT_SECRET in .env.local',
        help: 'Sign up at https://developers.amadeus.com/self-service to get API credentials (free tier: 2,000 requests/month)',
      },
      { status: 500 }
    );
  }

  // ============================================================
  // STEP 1: Start agent run log
  // ============================================================

  const { data: agentRun, error: runError } = await supabaseServer
    .from('agent_runs')
    .insert({
      agent_type: 'price_monitor',
      status: 'running',
      metadata: {
        departure_date: SEARCH_PARAMS.departureDate,
        routes_to_check: getAllMonitoredRoutes().length,
      },
    })
    .select()
    .single();

  if (runError || !agentRun) {
    console.error('❌ Failed to create agent run log:', runError);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create agent run log',
        details: runError?.message,
      },
      { status: 500 }
    );
  }

  console.log(`📋 Agent run ${agentRun.id} started`);

  // ============================================================
  // STEP 2: Fetch flight prices for all monitored routes
  // ============================================================

  const routes = getAllMonitoredRoutes();
  let totalRoutes = 0;
  let successfulRoutes = 0;
  let totalRecords = 0;
  const errors: string[] = [];

  for (const route of routes) {
    totalRoutes++;

    console.log(
      `🔍 Searching: ${route.origin.city} (${route.origin.iata}) → ${route.destination.name} (${route.destination.iata})`
    );

    const result = await searchFlightOffers({
      origin: route.origin.iata,
      destination: route.destination.iata,
      departureDate: SEARCH_PARAMS.departureDate,
      adults: SEARCH_PARAMS.adults,
      max: SEARCH_PARAMS.maxOffersPerRoute,
    });

    if (!result.success || !result.data) {
      console.error(`  ❌ Error: ${result.error}`);
      errors.push(`${route.origin.iata}→${route.destination.iata}: ${result.error}`);
      continue;
    }

    // ============================================================
    // STEP 3: Store results in Supabase
    // ============================================================

    const flightOffers = result.data;

    if (!flightOffers || flightOffers.length === 0) {
      console.log(`  ⚠️  No flights found`);
      continue;
    }

    for (const offer of flightOffers) {
      try {
        // Extract price information
        const price = parseFloat(offer.price?.total || '0');
        const currency = offer.price?.currency || 'INR';
        const priceInr = currency === 'INR' ? price : convertToINR(price, currency);

        // Extract flight details
        const firstSegment = offer.itineraries?.[0]?.segments?.[0];
        const airline = firstSegment?.carrierCode || offer.validatingAirlineCodes?.[0] || null;
        const isDirect = (offer.itineraries?.[0]?.segments?.length || 0) === 1;

        // Prepare record
        const flightRecord = {
          origin_iata: route.origin.iata,
          origin_city: route.origin.city,
          origin_country: route.origin.country,
          destination_iata: route.destination.iata,
          destination_name: route.destination.name,
          departure_date: SEARCH_PARAMS.departureDate,
          return_date: null, // one-way search
          price_currency: currency,
          price_amount: price,
          price_inr: priceInr,
          airline,
          direct_flight: isDirect,
          cabin_class: 'ECONOMY',
          data_source: 'amadeus',
          raw_response: offer,
        };

        // Insert into database
        const { error: insertError } = await supabaseServer
          .from('flight_prices')
          .insert(flightRecord);

        if (insertError) {
          console.error(`  ❌ Database insert error:`, insertError.message);
          errors.push(`DB insert error for ${route.origin.iata}→${route.destination.iata}: ${insertError.message}`);
        } else {
          totalRecords++;
          console.log(`  ✅ Saved: ₹${priceInr.toLocaleString('en-IN')} via ${airline || 'unknown'}`);
        }
      } catch (error: any) {
        console.error(`  ❌ Processing error:`, error.message);
        errors.push(`Processing error: ${error.message}`);
      }
    }

    successfulRoutes++;

    // Rate limiting: small delay between requests to be nice to the API
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  // ============================================================
  // STEP 4: Analyze the data - compare Goa vs competitors
  // ============================================================

  console.log('\n📊 Running price comparison analysis...');

  const analysisResults: Array<{
    type: string;
    title: string;
    summary: string;
    details: any;
    severity: string;
    sourceMarket: string | null;
    confidence: number;
    actionable: boolean;
    recommendedAction: string | null;
  }> = [];

  // For each origin, calculate average price to Goa vs competitors
  for (const origin of SOURCE_MARKETS) {
    // Get average Goa price
    const { data: goaPrices } = await supabaseServer
      .from('flight_prices')
      .select('price_inr, destination_iata, destination_name')
      .eq('origin_iata', origin.iata)
      .in('destination_iata', GOA_AIRPORTS.map(d => d.iata))
      .gte('fetched_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()) // last 24 hours
      .order('fetched_at', { ascending: false });

    // Get average competitor prices
    const { data: competitorPrices } = await supabaseServer
      .from('flight_prices')
      .select('price_inr, destination_iata, destination_name')
      .eq('origin_iata', origin.iata)
      .in('destination_iata', COMPETITOR_DESTINATIONS.map(d => d.iata))
      .gte('fetched_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .order('fetched_at', { ascending: false });

    if (!goaPrices || goaPrices.length === 0) {
      console.log(`  ⚠️  No Goa prices found for ${origin.city}`);
      continue;
    }

    if (!competitorPrices || competitorPrices.length === 0) {
      console.log(`  ⚠️  No competitor prices found for ${origin.city}`);
      continue;
    }

    // Calculate averages
    const avgGoaPrice = goaPrices.reduce((sum, p) => sum + (p.price_inr || 0), 0) / goaPrices.length;
    const avgCompetitorPrice = competitorPrices.reduce((sum, p) => sum + (p.price_inr || 0), 0) / competitorPrices.length;

    const priceDifferenceMultiple = avgGoaPrice / avgCompetitorPrice;
    const priceDifferencePercent = ((avgGoaPrice - avgCompetitorPrice) / avgCompetitorPrice) * 100;

    // Generate analysis if significant difference (>50% more expensive)
    if (priceDifferenceMultiple > 1.5) {
      const severity = priceDifferenceMultiple > 3 ? 'critical' : priceDifferenceMultiple > 2 ? 'warning' : 'info';

      analysisResults.push({
        type: 'price_comparison',
        title: `${origin.city} → Goa is ${priceDifferenceMultiple.toFixed(1)}x more expensive than competitors`,
        summary: `Flight prices from ${origin.city} to Goa average ₹${Math.round(avgGoaPrice).toLocaleString('en-IN')}, while competitor destinations average ₹${Math.round(avgCompetitorPrice).toLocaleString('en-IN')} — a ${priceDifferencePercent.toFixed(0)}% premium.`,
        details: {
          origin: origin,
          goa_avg_price_inr: Math.round(avgGoaPrice),
          competitor_avg_price_inr: Math.round(avgCompetitorPrice),
          price_multiple: parseFloat(priceDifferenceMultiple.toFixed(2)),
          price_difference_percent: parseFloat(priceDifferencePercent.toFixed(1)),
          goa_destinations: goaPrices.map(p => ({
            iata: p.destination_iata,
            name: p.destination_name,
            price_inr: p.price_inr,
          })),
          competitor_destinations: competitorPrices.map(p => ({
            iata: p.destination_iata,
            name: p.destination_name,
            price_inr: p.price_inr,
          })),
        },
        severity,
        sourceMarket: origin.country,
        confidence: 0.9,
        actionable: true,
        recommendedAction: priceDifferenceMultiple > 2.5
          ? `Critical pricing gap. Consider charter subsidy programs or airline partnerships to reduce ${origin.city}→Goa flight costs.`
          : `Monitor pricing closely. Work with airlines to offer competitive fares from ${origin.city}.`,
      });

      console.log(`  🔴 ${severity.toUpperCase()}: ${origin.city} pricing gap = ${priceDifferenceMultiple.toFixed(1)}x`);
    } else {
      console.log(`  ✅ ${origin.city} pricing is competitive (${priceDifferenceMultiple.toFixed(1)}x)`);
    }
  }

  // ============================================================
  // STEP 5: Save analyses to database
  // ============================================================

  let analysesGenerated = 0;

  for (const analysis of analysisResults) {
    const { error: analysisError } = await supabaseServer
      .from('agent_analyses')
      .insert({
        analysis_type: analysis.type,
        title: analysis.title,
        summary: analysis.summary,
        details: analysis.details,
        severity: analysis.severity,
        source_market: analysis.sourceMarket,
        confidence: analysis.confidence,
        actionable: analysis.actionable,
        recommended_action: analysis.recommendedAction,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // expires in 7 days
      });

    if (analysisError) {
      console.error(`  ❌ Failed to save analysis:`, analysisError.message);
    } else {
      analysesGenerated++;
    }
  }

  // ============================================================
  // STEP 6: Update agent run log
  // ============================================================

  const status = errors.length > 0 && successfulRoutes === 0 ? 'failed' : errors.length > 0 ? 'partial' : 'completed';
  const errorMessage = errors.length > 0 ? errors.join('; ') : null;

  await supabaseServer
    .from('agent_runs')
    .update({
      completed_at: new Date().toISOString(),
      status,
      routes_checked: totalRoutes,
      records_inserted: totalRecords,
      analyses_generated: analysesGenerated,
      error_message: errorMessage,
      metadata: {
        departure_date: SEARCH_PARAMS.departureDate,
        successful_routes: successfulRoutes,
        failed_routes: totalRoutes - successfulRoutes,
        errors: errors.slice(0, 10), // limit to first 10 errors
      },
    })
    .eq('id', agentRun.id);

  // ============================================================
  // STEP 7: Return summary
  // ============================================================

  const summary = {
    success: true,
    agentRunId: agentRun.id,
    status,
    summary: {
      routes_checked: totalRoutes,
      successful_routes: successfulRoutes,
      failed_routes: totalRoutes - successfulRoutes,
      records_inserted: totalRecords,
      analyses_generated: analysesGenerated,
    },
    departure_date: SEARCH_PARAMS.departureDate,
    errors: errors.length > 0 ? errors : undefined,
    message: `Price monitor completed: ${successfulRoutes}/${totalRoutes} routes successful, ${totalRecords} records inserted, ${analysesGenerated} analyses generated`,
  };

  console.log('\n✅ Price Monitor Agent completed');
  console.log(`   Routes: ${successfulRoutes}/${totalRoutes}`);
  console.log(`   Records: ${totalRecords}`);
  console.log(`   Analyses: ${analysesGenerated}`);
  console.log(`   Status: ${status}`);

  return NextResponse.json(summary);
}

// ================================================================
// SECURITY: Optional auth check (uncomment when ready)
// ================================================================

// Verify the request is from Vercel Cron or authenticated user
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
