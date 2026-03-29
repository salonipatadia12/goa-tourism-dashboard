"use client";

import { SentinelShell } from "@/components/SentinelShell";
import { Panel } from "@/components/Panel";
import { AlertBox } from "@/components/AlertBox";
import { SystemLoader } from "@/components/SystemLoader";
import { useData } from "@/context/DataProvider";
import { Globe } from "lucide-react";
import { fmt } from "@/lib/formatters";
import { CURRENT_YEAR_ARRIVALS } from "@/lib/constants/historical-data";

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { color: string; bg: string }> = {
    SURGING: { color: "var(--emerald)", bg: "var(--emerald-dim)" },
    GROWING: { color: "var(--cyan)", bg: "var(--cyan-dim)" },
    STABLE: { color: "var(--amber)", bg: "var(--amber-dim)" },
    DECLINING: { color: "var(--crimson)", bg: "var(--crimson-dim)" },
  };
  const c = colors[status] || colors.STABLE;
  return (
    <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, padding: "2px 8px", borderRadius: 4, color: c.color, background: c.bg }}>
      {status}
    </span>
  );
}

function SourceMarketsContent() {
  const { sourceMarkets, isLoaded } = useData();

  if (!isLoaded) return <SystemLoader />;

  return (
    <div style={{ paddingTop: 20 }}>
      {/* Verified aggregate */}
      <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-default)", borderRadius: 8, padding: 20, marginBottom: 16 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
          Total Foreign Tourist Arrivals (FY 2025 — Verified)
        </div>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 48, fontWeight: 800, color: "var(--cyan)" }}>
          {fmt(CURRENT_YEAR_ARRIVALS)}
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
          Source: GoaTourism.gov.in — Per-market arrival data not published. Aggregate only.
        </div>
      </div>

      <Panel title="Source Market Intelligence" icon={Globe} accentColor="var(--cyan)">
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Market</th>
              <th>Known Airlines</th>
              <th>Thailand Comparison</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sourceMarkets.map((m) => (
              <tr key={m.country}>
                <td style={{ color: "var(--text-dim)", fontWeight: 500 }}>{m.rank}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 16 }}>{m.flag}</span>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>{m.country}</span>
                  </div>
                </td>
                <td style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)" }}>{m.airlines}</td>
                <td>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--crimson)" }}>
                    {m.thailandComparison}
                  </span>
                </td>
                <td><StatusBadge status={m.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ marginTop: 12, fontSize: 11, color: "var(--text-dim)", fontFamily: "var(--font-mono)", lineHeight: 1.6 }}>
          Per-market arrival data not published by GoaTourism.gov.in — aggregate only: {fmt(CURRENT_YEAR_ARRIVALS)} foreign tourists total (FY 2025).
          Country-level breakdowns will be available after AirLabs API integration with immigration data.
          Market status based on charter operator activity and industry reporting.
        </p>
      </Panel>

      <div style={{ marginTop: 16 }}>
        <AlertBox type="insight">
          Poland and Kazakhstan have launched new charter routes to Goa in the 2025-26 season, representing emerging source markets.
          Recommend prioritizing trade show presence in Warsaw and Astana for 2026-27 to capture early-mover advantage.
          Detailed per-market booking volumes pending data integration.
        </AlertBox>
      </div>
    </div>
  );
}

export default function SourceMarketsPage() {
  return (
    <SentinelShell>
      <SourceMarketsContent />
    </SentinelShell>
  );
}
