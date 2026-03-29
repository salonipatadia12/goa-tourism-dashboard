"use client";

import { SentinelShell } from "@/components/SentinelShell";
import { Panel } from "@/components/Panel";
import { AlertBox } from "@/components/AlertBox";
import { SystemLoader } from "@/components/SystemLoader";
import { useData } from "@/context/DataProvider";
import { Plane } from "lucide-react";
import { fmt } from "@/lib/formatters";
import {
  CURRENT_YEAR_DATA,
} from "@/lib/constants/historical-data";

function CharterContent() {
  const { charterOperators, isLoaded } = useData();

  if (!isLoaded) return <SystemLoader />;

  return (
    <div style={{ paddingTop: 20 }}>
      {/* Verified aggregate KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-default)", borderRadius: 8, padding: 20 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
            Total Charter Flights (FY 2025)
          </div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 40, fontWeight: 800, color: "var(--cyan)" }}>
            {fmt(CURRENT_YEAR_DATA.charterFlights)}
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
            Source: GoaTourism.gov.in
          </div>
        </div>
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-default)", borderRadius: 8, padding: 20 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
            Total Charter Passengers (FY 2025)
          </div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 40, fontWeight: 800, color: "var(--emerald)" }}>
            {fmt(40336)}
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
            Source: GoaTourism.gov.in
          </div>
        </div>
      </div>

      <Panel title="Known Charter Operators to Goa" icon={Plane} accentColor="var(--emerald)">
        <table className="data-table">
          <thead>
            <tr>
              <th>Operator</th>
              <th>Country</th>
              <th>Route</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {charterOperators.map((op) => (
              <tr key={op.operator}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 16 }}>{op.flag}</span>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>
                      {op.operator}
                    </span>
                  </div>
                </td>
                <td style={{ color: "var(--text-muted)" }}>{op.country}</td>
                <td style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)" }}>{op.route}</td>
                <td>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      padding: "2px 8px",
                      borderRadius: 4,
                      color: op.status === "Active" ? "var(--emerald)" : op.status.startsWith("Active") ? "var(--cyan)" : "var(--text-dim)",
                      background: op.status === "Active" ? "var(--emerald-dim)" : op.status.startsWith("Active") ? "var(--cyan-dim)" : "rgba(255,255,255,0.06)",
                    }}
                  >
                    {op.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ marginTop: 12, fontSize: 11, color: "var(--text-dim)", fontFamily: "var(--font-mono)", lineHeight: 1.6 }}>
          Specific flight frequencies and passenger data per operator pending AirLabs API integration.
          Charter total: {CURRENT_YEAR_DATA.charterFlights} flights carrying 40,336 passengers in FY 2025 (GoaTourism.gov.in verified).
          Pre-pandemic peak: 1,024 charter flights / 2,49,374 passengers in 2017.
        </p>
      </Panel>

      <div style={{ marginTop: 16 }}>
        <AlertBox type="insight">
          Charter tourism has declined 82% since 2017 (1,024 flights → 189 flights). Rebuilding charter partnerships
          with Russian, UK, and emerging Central/Eastern European operators is the single highest-impact recovery lever.
          Per-operator performance data will be available after AirLabs API integration.
        </AlertBox>
      </div>
    </div>
  );
}

export default function CharterOpsPage() {
  return (
    <SentinelShell>
      <CharterContent />
    </SentinelShell>
  );
}
