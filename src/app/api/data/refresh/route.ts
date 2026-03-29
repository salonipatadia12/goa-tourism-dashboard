import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXTAUTH_URL || process.env.VERCEL_URL || "http://localhost:3000";

interface RefreshResult {
  source: string;
  status: "success" | "skipped" | "error";
  message?: string;
  duration_ms?: number;
}

const ALL_SOURCES = ["exchange", "flights", "trends", "news"];

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const sources: string[] = body.sources || ALL_SOURCES;
    const results: RefreshResult[] = [];

    for (const source of sources) {
      const start = Date.now();
      try {
        const url = `${BASE_URL}/api/data/${source}`;
        const res = await fetch(url, { method: "POST" });
        const data = await res.json();

        results.push({
          source,
          status: res.ok ? "success" : "error",
          message: data.message || `${data.source}: fetched`,
          duration_ms: Date.now() - start,
        });
      } catch (err: any) {
        results.push({
          source,
          status: "error",
          message: err.message,
          duration_ms: Date.now() - start,
        });
      }
    }

    const successCount = results.filter((r) => r.status === "success").length;
    const totalDuration = results.reduce((sum, r) => sum + (r.duration_ms || 0), 0);

    return NextResponse.json({
      summary: `${successCount}/${results.length} sources refreshed`,
      total_duration_ms: totalDuration,
      results,
      refreshed_at: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
