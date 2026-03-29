import { NextResponse } from "next/server";
import { supabaseServer, isSupabaseConfigured } from "@/lib/supabase/server";

// google-trends-api has no types — require it dynamically
let googleTrends: any = null;
try {
  googleTrends = require("google-trends-api");
} catch {
  // Package not installed
}

const SOURCE_MARKETS = [
  { code: "RU", keyword: "Goa travel" },
  { code: "GB", keyword: "Goa holiday" },
  { code: "IL", keyword: "Goa travel" },
  { code: "DE", keyword: "Goa Reise" },
  { code: "PL", keyword: "Goa travel" },
  { code: "KZ", keyword: "Goa travel" },
  { code: "FR", keyword: "Goa voyage" },
  { code: "NL", keyword: "Goa vakantie" },
];

// Rate-limit: 2 second delay between calls
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function GET() {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ source: "unavailable", message: "Supabase not configured" });
    }

    const { data } = await supabaseServer
      .from("search_trends")
      .select("*")
      .order("fetched_at", { ascending: false })
      .limit(16);

    return NextResponse.json({ source: "cache", data: data || [] });
  } catch {
    return NextResponse.json({ source: "error", message: "Failed to read cached trends" }, { status: 500 });
  }
}

export async function POST() {
  const start = Date.now();

  if (!googleTrends) {
    return NextResponse.json(
      { source: "error", message: "google-trends-api package not installed" },
      { status: 400 }
    );
  }

  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const results: any[] = [];

    for (const market of SOURCE_MARKETS) {
      try {
        // Interest over time
        const iotRaw = await googleTrends.interestOverTime({
          keyword: market.keyword,
          geo: market.code,
          startTime: sixMonthsAgo,
        });
        const iotData = JSON.parse(iotRaw);
        const dataPoints = iotData.default?.timelineData?.map((d: any) => ({
          date: d.formattedAxisTime,
          value: d.value?.[0] ?? 0,
        })) || [];

        // Related queries
        let relatedQueries: any[] = [];
        try {
          await delay(2000);
          const rqRaw = await googleTrends.relatedQueries({
            keyword: "Goa",
            geo: market.code,
          });
          const rqData = JSON.parse(rqRaw);
          relatedQueries = rqData.default?.rankedList?.[0]?.rankedKeyword?.slice(0, 5)?.map((k: any) => ({
            query: k.query,
            value: k.value,
          })) || [];
        } catch {
          // Related queries can fail — not critical
        }

        results.push({
          keyword: market.keyword,
          country_code: market.code,
          data_points: dataPoints,
          related_queries: relatedQueries,
          fetched_at: new Date().toISOString(),
        });
      } catch {
        // Individual market failure — continue with others
        results.push({
          keyword: market.keyword,
          country_code: market.code,
          data_points: [],
          related_queries: [],
          fetched_at: new Date().toISOString(),
        });
      }

      // Rate limit between markets
      await delay(2000);
    }

    if (isSupabaseConfigured() && results.length > 0) {
      // Clear old trends (keep only latest per country)
      for (const r of results) {
        await supabaseServer
          .from("search_trends")
          .delete()
          .eq("country_code", r.country_code);
      }
      await supabaseServer.from("search_trends").insert(results as any);

      await logRefresh("search_trends", "success", results.length, null, Date.now() - start);
    }

    return NextResponse.json({ source: "live", markets_fetched: results.length });
  } catch (err: any) {
    if (isSupabaseConfigured()) {
      await logRefresh("search_trends", "error", 0, err.message, Date.now() - start);
    }
    return NextResponse.json({ source: "error", message: err.message }, { status: 500 });
  }
}

async function logRefresh(source: string, status: string, records: number, error: string | null, duration: number) {
  try {
    await supabaseServer.from("refresh_log").insert({
      source,
      status,
      records_fetched: records,
      error_message: error,
      duration_ms: duration,
    } as any);
  } catch {}
}
