import { NextResponse } from "next/server";
import { supabaseServer, isSupabaseConfigured } from "@/lib/supabase/server";
import { IATA_TO_COUNTRY } from "@/lib/historical-data";

const AIRLABS_BASE = "https://airlabs.co/api/v9";
const GOA_AIRPORTS = ["GOI", "GOX"];

function getAirLabsKey(): string | null {
  return process.env.AIRLABS_API_KEY || null;
}

export async function GET() {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ source: "unavailable", message: "Supabase not configured" });
    }

    const [{ data: routes }, { data: schedules }] = await Promise.all([
      supabaseServer.from("goa_routes").select("*").order("fetched_at", { ascending: false }),
      supabaseServer
        .from("flight_schedules")
        .select("*")
        .order("fetched_at", { ascending: false })
        .limit(200),
    ]);

    return NextResponse.json({ source: "cache", routes: routes || [], schedules: schedules || [] });
  } catch {
    return NextResponse.json({ source: "error", message: "Failed to read cached flights" }, { status: 500 });
  }
}

export async function POST() {
  const start = Date.now();
  const apiKey = getAirLabsKey();

  if (!apiKey) {
    return NextResponse.json(
      { source: "error", message: "AIRLABS_API_KEY not configured" },
      { status: 400 }
    );
  }

  try {
    // Fetch routes and schedules for both airports
    const routeResults: any[] = [];
    const scheduleResults: any[] = [];

    for (const airport of GOA_AIRPORTS) {
      const [routesRes, schedulesRes] = await Promise.all([
        fetch(`${AIRLABS_BASE}/routes?arr_iata=${airport}&api_key=${apiKey}`),
        fetch(`${AIRLABS_BASE}/schedules?arr_iata=${airport}&api_key=${apiKey}`),
      ]);

      if (routesRes.ok) {
        const data = await routesRes.json();
        if (data.response) routeResults.push(...data.response);
      }

      if (schedulesRes.ok) {
        const data = await schedulesRes.json();
        if (data.response) scheduleResults.push(...data.response);
      }
    }

    // Normalize routes
    const normalizedRoutes = routeResults.map((r: any) => ({
      airline_iata: r.airline_iata || null,
      airline_name: r.airline_name || null,
      dep_iata: r.dep_iata,
      dep_country: IATA_TO_COUNTRY[r.dep_iata] || null,
      arr_iata: r.arr_iata,
      days_of_week: r.days || null,
      flights_per_week: Array.isArray(r.days) ? r.days.length : null,
      fetched_at: new Date().toISOString(),
    }));

    // Normalize schedules
    const normalizedSchedules = scheduleResults.map((s: any) => ({
      flight_iata: s.flight_iata || null,
      airline_iata: s.airline_iata || null,
      airline_name: s.airline_name || null,
      dep_iata: s.dep_iata || null,
      dep_country: IATA_TO_COUNTRY[s.dep_iata] || null,
      arr_iata: s.arr_iata || null,
      dep_time: s.dep_time || null,
      arr_time: s.arr_time || null,
      status: s.status || "scheduled",
      fetched_at: new Date().toISOString(),
    }));

    if (isSupabaseConfigured()) {
      // Clear old data and insert fresh
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      await supabaseServer.from("goa_routes").delete().lt("fetched_at", today.toISOString());
      await supabaseServer.from("flight_schedules").delete().lt("fetched_at", today.toISOString());

      if (normalizedRoutes.length > 0) {
        await supabaseServer.from("goa_routes").insert(normalizedRoutes as any);
      }
      if (normalizedSchedules.length > 0) {
        await supabaseServer.from("flight_schedules").insert(normalizedSchedules as any);
      }

      await logRefresh(
        "flights",
        "success",
        normalizedRoutes.length + normalizedSchedules.length,
        null,
        Date.now() - start
      );
    }

    return NextResponse.json({
      source: "live",
      routes: normalizedRoutes.length,
      schedules: normalizedSchedules.length,
    });
  } catch (err: any) {
    if (isSupabaseConfigured()) {
      await logRefresh("flights", "error", 0, err.message, Date.now() - start);
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
