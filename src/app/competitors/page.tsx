"use client";

import dynamic from "next/dynamic";
import { SentinelShell } from "@/components/SentinelShell";
import { Panel } from "@/components/Panel";
import { ProgressBar } from "@/components/ProgressBar";
import { AlertBox } from "@/components/AlertBox";
import { Target, DollarSign } from "lucide-react";
import { getCompetitorData } from "@/lib/data";

const ChartLoading = () => <div style={{ height: 340, background: "var(--bg-surface-alt)", borderRadius: 8 }} />;
const CompetitorRadarChart = dynamic(() => import("@/components/charts/CompetitorRadarChart"), { ssr: false, loading: ChartLoading });
const PriceCompChart = dynamic(() => import("@/components/charts/PriceCompChart"), { ssr: false, loading: ChartLoading });

export default function CompetitorsPage() {
  const competitors = getCompetitorData();

  return (
    <SentinelShell>
      <div style={{ paddingTop: 20 }}>
        {/* Radar + Price Comparison */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <Panel title="Competitive Radar — Goa vs Rivals" icon={Target} accentColor="var(--cyan)">
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--amber)", marginBottom: 8 }}>
              Qualitative assessment — not from indexed data. Scores reflect editorial judgment for visual comparison only.
            </p>
            <CompetitorRadarChart />
            <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
              {[
                { color: "var(--cyan)", label: "Goa" },
                { color: "var(--crimson)", label: "Thailand" },
                { color: "var(--amber)", label: "Bali" },
                { color: "var(--emerald)", label: "Vietnam" },
              ].map((l) => (
                <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: l.color, opacity: 0.7 }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)" }}>{l.label}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Price Comparison (7-Night Avg Package)" icon={DollarSign} accentColor="var(--amber)">
            <PriceCompChart />
          </Panel>
        </div>

        <div style={{ marginBottom: 16 }}>
          <AlertBox type="alert">
            Goa requires e-Visa for almost all nationalities while Thailand offers 60-day visa-free entry to 93 countries (as of 2025)
            and Vietnam offers 90-day visa-free for many European nations. This visa gap is a critical competitiveness barrier. Verify current 2026 visa policies before policy action.
          </AlertBox>
        </div>

        {/* Full Competitive Matrix */}
        <Panel title="Full Competitive Matrix" icon={Target} accentColor="var(--cyan)">
          <table className="data-table">
            <thead>
              <tr>
                <th>Destination</th>
                <th>Avg Daily Cost (₹)</th>
                <th>Weekly Flights</th>
                <th>Visa Score</th>
                <th>Infrastructure</th>
                <th>Nightlife</th>
                <th>Marketing</th>
                <th>Goa Gap</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((c) => {
                const isGoa = c.name === "Goa";
                const gapLabels: Record<string, string | null> = {
                  Goa: null, Thailand: "Significant gap", Vietnam: "Significant gap", Bali: "Moderate gap", "Sri Lanka": "Comparable",
                };
                const gap = gapLabels[c.name];
                const gapColor = gap === "Significant gap" ? "var(--crimson)" : gap === "Moderate gap" ? "var(--amber)" : gap === "Comparable" ? "var(--emerald)" : "var(--text-dim)";
                return (
                  <tr key={c.name}>
                    <td>
                      <span style={{ marginRight: 6 }}>{c.flag}</span>
                      <span style={{ fontWeight: 700, color: isGoa ? "var(--amber)" : "var(--text-primary)" }}>{c.name}</span>
                    </td>
                    <td style={{ color: isGoa ? "var(--crimson)" : "var(--text-primary)" }}>{c.midRangeDailyCost}</td>
                    <td>{isGoa ? "13" : c.name === "Thailand" ? "Multiple daily" : c.name === "Vietnam" ? "Several weekly" : "Limited"}</td>
                    <td>
                      <ProgressBar
                        value={isGoa ? 35 : c.name === "Thailand" ? 90 : c.name === "Vietnam" ? 70 : c.name === "Bali" ? 75 : 65}
                        color={isGoa ? "var(--crimson)" : "var(--cyan)"}
                        width={60}
                      />
                    </td>
                    <td style={{ color: "var(--text-muted)" }}>{isGoa ? "Moderate" : c.name === "Thailand" ? "Excellent" : "Developing"}</td>
                    <td style={{ color: "var(--text-muted)" }}>{isGoa ? "Good" : c.name === "Thailand" ? "Excellent" : "Moderate"}</td>
                    <td style={{ color: "var(--text-muted)" }}>{isGoa ? "Low" : c.name === "Thailand" ? "World-class" : "Growing"}</td>
                    <td style={{ fontWeight: 700, fontSize: 11, color: gapColor }}>
                      {gap === null ? "—" : gap}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Panel>
      </div>
    </SentinelShell>
  );
}
