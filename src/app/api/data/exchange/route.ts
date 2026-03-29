import { NextResponse } from "next/server";
import { supabaseServer, isSupabaseConfigured } from "@/lib/supabase/server";

const EXCHANGE_API = "https://open.er-api.com/v6/latest/USD";
const RELEVANT_CURRENCIES = ["RUB", "GBP", "ILS", "EUR", "PLN", "KZT", "INR"];

export async function GET() {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ source: "unavailable", message: "Supabase not configured" });
    }
    const { data } = await supabaseServer
      .from("exchange_rates")
      .select("*")
      .order("fetched_at", { ascending: false })
      .limit(1)
      .single();

    return NextResponse.json({ source: "cache", data });
  } catch {
    return NextResponse.json({ source: "error", message: "Failed to read cached rates" }, { status: 500 });
  }
}

export async function POST() {
  const start = Date.now();
  try {
    const res = await fetch(EXCHANGE_API);
    if (!res.ok) throw new Error(`Exchange API returned ${res.status}`);

    const json = await res.json();
    const filtered: Record<string, number> = {};
    for (const code of RELEVANT_CURRENCIES) {
      if (json.rates?.[code]) filtered[code] = json.rates[code];
    }

    const result = { base_currency: "USD", rates: filtered, fetched_at: new Date().toISOString() };

    if (isSupabaseConfigured()) {
      await supabaseServer.from("exchange_rates").insert(result as any);
      await logRefresh("exchange_rates", "success", RELEVANT_CURRENCIES.length, null, Date.now() - start);
    }

    return NextResponse.json({ source: "live", data: result });
  } catch (err: any) {
    if (isSupabaseConfigured()) {
      await logRefresh("exchange_rates", "error", 0, err.message, Date.now() - start);
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
