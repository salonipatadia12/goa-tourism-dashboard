import { NextResponse } from "next/server";
import { supabaseServer, isSupabaseConfigured } from "@/lib/supabase/server";

const NEWS_API_BASE = "https://newsapi.org/v2/everything";

const QUERIES = [
  '"Goa tourism" OR "Goa flights" OR "Goa charter"',
  '"Thailand tourism" OR "Bali tourism" OR "Vietnam tourism"',
];

function getNewsApiKey(): string | null {
  return process.env.NEWS_API_KEY || null;
}

export async function GET() {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ source: "unavailable", message: "Supabase not configured" });
    }

    const { data } = await supabaseServer
      .from("news_cache")
      .select("*")
      .order("fetched_at", { ascending: false })
      .limit(2);

    return NextResponse.json({ source: "cache", data: data || [] });
  } catch {
    return NextResponse.json({ source: "error", message: "Failed to read cached news" }, { status: 500 });
  }
}

export async function POST() {
  const start = Date.now();
  const apiKey = getNewsApiKey();

  if (!apiKey) {
    return NextResponse.json(
      { source: "error", message: "NEWS_API_KEY not configured" },
      { status: 400 }
    );
  }

  try {
    const results: any[] = [];

    for (const query of QUERIES) {
      const params = new URLSearchParams({
        q: query,
        language: "en",
        sortBy: "publishedAt",
        pageSize: "10",
        apiKey,
      });

      const res = await fetch(`${NEWS_API_BASE}?${params}`);
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`NewsAPI returned ${res.status}: ${errText}`);
      }

      const json = await res.json();
      const articles = (json.articles || []).map((a: any) => ({
        title: a.title,
        description: a.description,
        url: a.url,
        source: a.source?.name,
        publishedAt: a.publishedAt,
        urlToImage: a.urlToImage,
      }));

      results.push({
        query,
        articles,
        fetched_at: new Date().toISOString(),
      });
    }

    if (isSupabaseConfigured() && results.length > 0) {
      // Clear old news cache
      await supabaseServer.from("news_cache").delete().neq("id", "00000000-0000-0000-0000-000000000000");
      await supabaseServer.from("news_cache").insert(results as any);

      await logRefresh("news", "success", results.length, null, Date.now() - start);
    }

    return NextResponse.json({ source: "live", queries_fetched: results.length });
  } catch (err: any) {
    if (isSupabaseConfigured()) {
      await logRefresh("news", "error", 0, err.message, Date.now() - start);
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
