"use client";

import { SentinelShell } from "@/components/SentinelShell";
import { Panel } from "@/components/Panel";
import { PriorityBadge } from "@/components/PriorityBadge";
import { AlertBox } from "@/components/AlertBox";
import { Target, TrendingUp, Calendar } from "lucide-react";
import { competitiveIntel } from "@/lib/competitive-intelligence";
import { fmt } from "@/lib/formatters";

const { policyActions, investmentSummary, timelinePhases } = competitiveIntel;

function InvestmentReturnChart() {
  const totalInvestment = investmentSummary.totalProposed;
  const projectedReturn = investmentSummary.projectedRevenueRecovery.to;
  const maxVal = projectedReturn;

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {/* Investment bar */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)" }}>
            Total Proposed Investment
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700, color: "var(--amber)" }}>
            ₹{fmt(totalInvestment)} Cr
          </span>
        </div>
        <div style={{ height: 28, background: "var(--bg-primary)", borderRadius: 6, overflow: "hidden", border: "1px solid var(--border-default)" }}>
          <div
            style={{
              height: "100%",
              width: `${(totalInvestment / maxVal) * 100}%`,
              background: "linear-gradient(90deg, var(--amber), rgba(255,184,0,0.6))",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              paddingLeft: 10,
            }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, color: "var(--bg-primary)" }}>
              ₹{fmt(totalInvestment)} Cr
            </span>
          </div>
        </div>
      </div>

      {/* Current revenue bar */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)" }}>
            Current Tourism Revenue (est.)
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700, color: "var(--text-muted)" }}>
            ₹{fmt(investmentSummary.projectedRevenueRecovery.from)} Cr
          </span>
        </div>
        <div style={{ height: 28, background: "var(--bg-primary)", borderRadius: 6, overflow: "hidden", border: "1px solid var(--border-default)" }}>
          <div
            style={{
              height: "100%",
              width: `${(investmentSummary.projectedRevenueRecovery.from / maxVal) * 100}%`,
              background: "linear-gradient(90deg, var(--text-dim), rgba(61,77,101,0.6))",
              borderRadius: 6,
            }}
          />
        </div>
      </div>

      {/* Projected revenue bar */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)" }}>
            Projected Revenue (3 years)
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700, color: "var(--emerald)" }}>
            ₹{fmt(projectedReturn)} Cr
          </span>
        </div>
        <div style={{ height: 28, background: "var(--bg-primary)", borderRadius: 6, overflow: "hidden", border: "1px solid var(--border-default)" }}>
          <div
            style={{
              height: "100%",
              width: "100%",
              background: "linear-gradient(90deg, var(--emerald), rgba(0,255,136,0.6))",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              paddingLeft: 10,
            }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, color: "var(--bg-primary)" }}>
              ₹{fmt(projectedReturn)} Cr
            </span>
          </div>
        </div>
      </div>

      {/* ROI callout */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "12px 0",
          marginTop: 4,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 20px",
            background: "rgba(0,255,136,0.08)",
            border: "1px solid rgba(0,255,136,0.2)",
            borderRadius: 8,
          }}
        >
          <TrendingUp style={{ width: 16, height: 16, color: "var(--emerald)" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 700, color: "var(--emerald)" }}>
            Projected ROI: {investmentSummary.roi}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function PolicyPage() {
  return (
    <SentinelShell>
      <div style={{ paddingTop: 20 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Target style={{ width: 18, height: 18, color: "var(--emerald)" }} />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 2,
              color: "var(--emerald)",
            }}
          >
            RECOMMENDED POLICY ACTIONS
          </span>
          <div style={{ flex: 1, height: 1, background: "var(--border-default)" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)" }}>
            Total Investment: <span style={{ color: "var(--amber)", fontWeight: 700 }}>₹{fmt(investmentSummary.totalProposed)} Cr</span>
            {" • "}
            Projected ROI: <span style={{ color: "var(--emerald)", fontWeight: 700 }}>{investmentSummary.roi}</span>
          </span>
        </div>

        {/* Section 1: Priority Actions Table */}
        <Panel title="Priority Actions Matrix" icon={Target} accentColor="var(--emerald)">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Action</th>
                <th>Investment</th>
                <th>Timeline</th>
                <th>Expected Impact</th>
                <th>Priority</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {policyActions.map((a) => (
                <tr key={a.id}>
                  <td style={{ color: "var(--text-dim)", fontWeight: 500 }}>{a.id}</td>
                  <td>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>
                      {a.action}
                    </span>
                  </td>
                  <td style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700, color: "var(--amber)" }}>
                    {a.investment}
                  </td>
                  <td style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)" }}>
                    {a.timeline}
                  </td>
                  <td>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--emerald)", fontWeight: 600 }}>
                      {a.impact}
                    </span>
                  </td>
                  <td><PriorityBadge level={a.priority} /></td>
                  <td style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)" }}>
                    {a.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        {/* Section 2 + 3: Two column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
          {/* Investment vs Return */}
          <Panel title="Investment vs Return Projection" icon={TrendingUp} accentColor="var(--emerald)">
            <InvestmentReturnChart />
          </Panel>

          {/* Implementation Timeline */}
          <Panel title="Implementation Timeline" icon={Calendar} accentColor="var(--cyan)">
            <div style={{ display: "grid", gap: 16 }}>
              {timelinePhases.map((phase) => (
                <div key={phase.phase}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: phase.color,
                        boxShadow: `0 0 8px ${phase.color}`,
                      }}
                    />
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>
                      {phase.phase}
                    </span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)" }}>
                      {phase.period}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: 4,
                        color: phase.color,
                        background: `${phase.color}18`,
                        marginLeft: "auto",
                      }}
                    >
                      {phase.quarterLabel}
                    </span>
                  </div>

                  <div style={{ marginLeft: 20, borderLeft: `2px solid ${phase.color}30`, paddingLeft: 16 }}>
                    {phase.items.map((item, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "6px 0",
                        }}
                      >
                        <div
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: 2,
                            background: phase.color,
                            opacity: 0.6,
                          }}
                        />
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)" }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Bottom alert */}
        <div style={{ marginTop: 16 }}>
          <AlertBox type="insight">
            Combined investment of ₹{fmt(investmentSummary.totalProposed)} Cr across 8 initiatives could accelerate
            recovery from 58% to 80% of pre-pandemic levels within 3 years — generating an estimated
            ₹{fmt(investmentSummary.projectedRevenueRecovery.to)} Cr in annual tourism revenue.
            The cost of inaction: ₹{fmt(competitiveIntel.economicImpact.annualRevenueLost)} Cr lost annually while
            competitors like Thailand invest ₹1,080 Cr to capture the same tourists.
          </AlertBox>
        </div>
      </div>
    </SentinelShell>
  );
}
