"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { SentinelShell } from "@/components/SentinelShell";
import { Panel } from "@/components/Panel";
import { Activity, Sliders, Database } from "lucide-react";
import { getMonthlyData2025, getRecoveryData } from "@/lib/data";
import { fmt, getMonthName, formatPercentage } from "@/lib/formatters";
import { PEAK_FOREIGN_ARRIVALS } from "@/lib/constants/historical-data";

const ChartLoading = () => <div style={{ height: 400, background: "var(--bg-surface-alt)", borderRadius: 8 }} />;
const ForecastChart = dynamic(() => import("@/components/charts/ForecastChart"), { ssr: false, loading: ChartLoading });

export default function PredictionsPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [charterFlights, setCharterFlights] = useState(0);
  const [hotelPriceReduction, setHotelPriceReduction] = useState(0);
  const [newRoutes, setNewRoutes] = useState(0);

  const monthlyData = useMemo(() => getMonthlyData2025(), []);
  const recovery = useMemo(() => getRecoveryData(), []);

  const estimatedImpact = useMemo(() => {
    const charterImpact = charterFlights * 200 * 0.85 * 24;
    const fitIncrease = (hotelPriceReduction / 10) * 0.05 * recovery.current;
    const routeImpact = newRoutes * 3 * 200 * 0.7 * 52;
    return Math.round(charterImpact + fitIncrease + routeImpact);
  }, [charterFlights, hotelPriceReduction, newRoutes, recovery.current]);

  return (
    <SentinelShell>
      <div style={{ paddingTop: 20 }}>
        <Panel title="90-Day Arrival Forecast" icon={Activity} accentColor="var(--cyan)">
          <ForecastChart />

          <div style={{ marginTop: 16, overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Predicted</th>
                  <th>Lower Bound</th>
                  <th>Upper Bound</th>
                  <th>Pre-COVID Baseline</th>
                  <th>Recovery %</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((m) => {
                  const baseline = Math.round(PEAK_FOREIGN_ARRIVALS / 12 * (m.month! <= 3 || m.month! >= 10 ? 1.3 : 0.7));
                  const recPct = (m.foreignTourists / baseline) * 100;
                  const isActual = m.month! <= 6;
                  return (
                    <tr key={m.month}>
                      <td style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                        {getMonthName(m.month!)}
                        {mounted && (
                          <span style={{
                            marginLeft: 8,
                            fontSize: 9,
                            fontWeight: 700,
                            letterSpacing: 0.5,
                            padding: "2px 6px",
                            borderRadius: 4,
                            background: isActual ? "rgba(16,185,129,0.15)" : "rgba(139,92,246,0.15)",
                            color: isActual ? "var(--emerald)" : "var(--purple)",
                          }}>
                            {isActual ? "ACTUAL" : "ESTIMATE"}
                          </span>
                        )}
                      </td>
                      <td>{fmt(m.foreignTourists)}</td>
                      <td style={{ color: "var(--text-dim)" }}>{fmt(Math.round(m.foreignTourists * 0.85))}</td>
                      <td style={{ color: "var(--text-dim)" }}>{fmt(Math.round(m.foreignTourists * 1.15))}</td>
                      <td style={{ color: "var(--amber)" }}>{fmt(baseline)}</td>
                      <td style={{ color: recPct >= 70 ? "var(--emerald)" : recPct >= 50 ? "var(--amber)" : "var(--crimson)" }}>
                        {formatPercentage(recPct, 0)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Panel>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
          <Panel title="Forecast Methodology" icon={Database} accentColor="var(--purple)">
            <div style={{ padding: "12px 14px", background: "var(--bg-surface-alt)", borderRadius: 8, marginBottom: 12 }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)", lineHeight: 1.7 }}>
                Trend extrapolation based on 2017–2025 government arrival data with seasonal adjustment.
                This is <strong style={{ color: "var(--amber)" }}>not a trained ML model</strong> — predictions use historical growth
                rates and seasonal patterns from verified GoaTourism.gov.in data.
              </p>
            </div>

            <div style={{ marginTop: 16 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Data Sources</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {["GoaTourism.gov.in (FY 2017–2025)", "Charter flight records", "Historical seasonal patterns"].map((s) => (
                  <span key={s} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 8px", background: "var(--bg-primary)", border: "1px solid var(--border-default)", borderRadius: 10, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)" }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--emerald)" }} />
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", marginTop: 16, lineHeight: 1.5 }}>
              Jul–Dec values are trend-based estimates, not ML predictions.
              Confidence bounds (±15%) reflect historical variance, not model uncertainty.
            </p>
          </Panel>

          <Panel title="What-If Simulator" icon={Sliders} accentColor="var(--amber)">
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--amber)", marginBottom: 12 }}>
              Illustrative projections for policy planning purposes. Not predictive model output.
            </p>
            <div style={{ display: "grid", gap: 20 }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <label style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)" }}>Add charter flights/week from Russia</label>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--cyan)" }}>{charterFlights}</span>
                </div>
                <input type="range" min={0} max={20} value={charterFlights} onChange={(e) => setCharterFlights(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--cyan)" }} />
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <label style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)" }}>Reduce avg hotel price by</label>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--emerald)" }}>{hotelPriceReduction}%</span>
                </div>
                <input type="range" min={0} max={50} value={hotelPriceReduction} onChange={(e) => setHotelPriceReduction(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--emerald)" }} />
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <label style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)" }}>Add new direct scheduled routes</label>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--amber)" }}>{newRoutes}</span>
                </div>
                <input type="range" min={0} max={10} value={newRoutes} onChange={(e) => setNewRoutes(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--amber)" }} />
              </div>
            </div>

            <div style={{ marginTop: 20, padding: 16, background: "var(--bg-primary)", borderRadius: 8, border: "1px solid var(--border-default)" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Estimated Impact</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 32, fontWeight: 800, color: "var(--emerald)" }}>
                +{fmt(estimatedImpact)}
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>additional tourists per season</div>
            </div>

            <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", marginTop: 10 }}>
              Estimates: 200 pax/charter at 85% load, 5% FIT increase per 10% price drop, 3 flights/week per new route at 70% load.
            </p>
          </Panel>
        </div>
      </div>
    </SentinelShell>
  );
}
