"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { SentinelShell } from "@/components/SentinelShell";
import { KPICard } from "@/components/KPICard";
import { Panel } from "@/components/Panel";
import { SystemLoader } from "@/components/SystemLoader";
import { useData } from "@/context/DataProvider";
import { Users, Activity, Plane, Gauge, TrendingUp, DollarSign } from "lucide-react";
import {
  CURRENT_YEAR_DATA,
  PREVIOUS_YEAR_DATA,
  PEAK_FOREIGN_ARRIVALS,
  CURRENT_YEAR_ARRIVALS,
} from "@/lib/constants/historical-data";
import { fmt, fmtCompact } from "@/lib/formatters";
import type { SimulatedSourceMarket, SimulatedCharterOperator } from "@/lib/data-generators";

const ChartLoading = () => <div style={{ height: 320, background: "var(--bg-surface-alt)", borderRadius: 8 }} />;
const ArrivalForecastChart = dynamic(() => import("@/components/charts/ArrivalForecastChart"), { ssr: false, loading: ChartLoading });

function SourceMarketMonitor({ markets }: { markets: SimulatedSourceMarket[] }) {
  return (
    <>
      <table className="data-table">
        <thead>
          <tr>
            <th>Market</th>
            <th>Known Airlines</th>
            <th>Thailand Comparison</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {markets.slice(0, 6).map((m) => (
            <tr key={m.country}>
              <td>
                <span style={{ marginRight: 6 }}>{m.flag}</span>
                <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{m.country}</span>
              </td>
              <td style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)" }}>{m.airlines}</td>
              <td>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--crimson)" }}>{m.thailandComparison}</span>
              </td>
              <td>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 1,
                  padding: "2px 6px", borderRadius: 4,
                  color: m.status === "SURGING" ? "var(--emerald)" : m.status === "GROWING" ? "var(--cyan)" : m.status === "DECLINING" ? "var(--crimson)" : "var(--amber)",
                  background: m.status === "SURGING" ? "var(--emerald-dim)" : m.status === "GROWING" ? "var(--cyan-dim)" : m.status === "DECLINING" ? "var(--crimson-dim)" : "var(--amber-dim)",
                }}>
                  {m.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ marginTop: 8, fontSize: 10, color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
        Per-market arrivals not published — aggregate: {fmt(CURRENT_YEAR_ARRIVALS)} total foreign tourists (FY 2025)
      </p>
    </>
  );
}

function CharterRankings({ operators }: { operators: SimulatedCharterOperator[] }) {
  return (
    <>
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
          {operators.map((op) => (
            <tr key={op.operator}>
              <td>
                <span style={{ marginRight: 6 }}>{op.flag}</span>
                <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{op.operator}</span>
              </td>
              <td style={{ color: "var(--text-muted)" }}>{op.country}</td>
              <td style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)" }}>{op.route}</td>
              <td>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 1,
                  padding: "2px 6px", borderRadius: 4,
                  color: op.status === "Active" ? "var(--emerald)" : "var(--text-dim)",
                  background: op.status === "Active" ? "var(--emerald-dim)" : "rgba(255,255,255,0.06)",
                }}>
                  {op.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ marginTop: 8, fontSize: 10, color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
        {CURRENT_YEAR_DATA.charterFlights} flights / 40,336 PAX verified (FY 2025). Per-operator data pending API integration.
      </p>
    </>
  );
}

function CommandCenterContent() {
  const { sourceMarkets, charterOperators, isLoaded } = useData();

  const yoy = useMemo(() => {
    return ((CURRENT_YEAR_DATA.foreignArrivals - PREVIOUS_YEAR_DATA.foreignArrivals) / PREVIOUS_YEAR_DATA.foreignArrivals * 100);
  }, []);

  const recoveryPct = useMemo(() => (CURRENT_YEAR_ARRIVALS / PEAK_FOREIGN_ARRIVALS * 100), []);

  const charterYoY = useMemo(() => {
    return ((CURRENT_YEAR_DATA.charterFlights - PREVIOUS_YEAR_DATA.charterFlights) / PREVIOUS_YEAR_DATA.charterFlights * 100);
  }, []);

  if (!isLoaded) return <SystemLoader />;

  return (
    <div style={{ paddingTop: 20 }}>
      {/* Executive Headline */}
      <div style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-default)",
        borderLeft: "4px solid var(--crimson)",
        borderRadius: "0 8px 8px 0",
        padding: "16px 20px",
        marginBottom: 20,
      }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-primary)", lineHeight: 1.7, margin: 0 }}>
          Goa's international tourism is at <strong style={{ color: "var(--amber)" }}>58% of pre-pandemic levels</strong>.
          Thailand — Goa's primary competitor — has recovered to 93% and invests <strong style={{ color: "var(--crimson)" }}>24x more</strong> in tourism marketing.
          Every month of inaction costs approximately <strong style={{ color: "var(--crimson)" }}>₹210 Cr</strong> in lost revenue.
        </p>
      </div>

      {/* KPI Strip — 5 cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 20 }}>
        <KPICard label="Total Bookings (Season)" value={fmtCompact(CURRENT_YEAR_DATA.foreignArrivals)} trend={yoy} subText="FY 2025 Verified" accent="cyan" icon={Users} stagger={1} />
        <KPICard label="90-Day Trend Estimate" value={fmtCompact(Math.round(CURRENT_YEAR_ARRIVALS * 1.12))} trend={12.0} subText="Trend extrapolation" accent="purple" icon={Activity} stagger={2} />
        <KPICard label="Charter Passengers" value={fmtCompact(40336)} trend={charterYoY} subText={`${CURRENT_YEAR_DATA.charterFlights} flights`} accent="emerald" icon={Plane} stagger={3} />
        <KPICard label="Recovery vs Pre-COVID" value={`${recoveryPct.toFixed(1)}%`} trendLabel={`${(100 - recoveryPct).toFixed(0)}% gap remains`} trend={-1} subText="of pre-pandemic peak" accent="amber" icon={Gauge} stagger={4} />
        <KPICard label="Marketing Budget Gap" value="24x" trend={-96} trendLabel="Thailand: ₹1,080 Cr" subText="Goa: ~₹45 Cr" accent="crimson" icon={DollarSign} stagger={5} />
      </div>

      {/* Arrival Forecast — full width */}
      <div style={{ marginBottom: 16 }}>
        <Panel title="Arrival Forecast & Historical Trend" icon={TrendingUp} accentColor="var(--cyan)">
          <ArrivalForecastChart />
          <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
            {[
              { color: "var(--emerald)", label: "Actual Arrivals" },
              { color: "var(--cyan)", label: "Trend Estimate" },
              { color: "var(--text-dim)", label: "Pre-COVID Baseline" },
            ].map((l) => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 16, height: 2, background: l.color, borderRadius: 1 }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)" }}>{l.label}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Tables Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Panel title="Source Market Monitor" icon={Users} accentColor="var(--cyan)">
          <SourceMarketMonitor markets={sourceMarkets} />
        </Panel>
        <Panel title="Known Charter Operators" icon={Plane} accentColor="var(--emerald)">
          <CharterRankings operators={charterOperators} />
        </Panel>
      </div>
    </div>
  );
}

export default function CommandCenter() {
  return (
    <SentinelShell>
      <CommandCenterContent />
    </SentinelShell>
  );
}
