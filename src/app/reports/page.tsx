"use client";

import { useState } from "react";
import { SentinelShell } from "@/components/SentinelShell";
import { Panel } from "@/components/Panel";
import { FileText, Download, Database, AlertTriangle, Shield, Target } from "lucide-react";

const FINDINGS = [
  { severity: "critical", text: "Charter operations at 84% decline from 2017 peak — primary recovery bottleneck identified" },
  { severity: "critical", text: "Marketing budget gap is 24x — Thailand invests ₹1,080 Cr vs Goa's ~₹45 Cr" },
  { severity: "high", text: "Goa's hotel pricing 3-5x above competitor destinations, deterring price-sensitive source markets" },
  { severity: "high", text: "Israel source market down 28% YoY — geopolitical risk remains elevated with no recovery timeline" },
  { severity: "medium", text: "Poland and Kazakhstan emerging markets show +45% and +39% growth — recommend scaling investment" },
  { severity: "medium", text: "Thailand captured 1.90M Russian tourists vs Goa's ~18,000 — visa policy gap is decisive factor" },
];

const ROOT_CAUSES = [
  "Marketing Budget Gap: Thailand spends 24x more (₹1,080 Cr vs ₹45 Cr)",
  "Visa Barrier: Thailand visa-free for 93 countries, India requires e-Visa",
  "Connectivity Collapse: Goa averages 5 intl flights/day vs Bangkok's 500+",
];

const TOP_POLICY_ACTIONS = [
  { action: "Visa-on-Arrival for top 10 markets", impact: "+40% charter bookings", priority: "CRITICAL" },
  { action: "Marketing budget increase to ₹200 Cr", impact: "+25% brand awareness", priority: "CRITICAL" },
  { action: "Charter Operator Partnership Program", impact: "Target 500 flights/season", priority: "HIGH" },
];

const DATA_SOURCES = [
  "Flight Booking APIs",
  "OTA Price Scrapers",
  "Competitor Ad Trackers",
  "Charter Systems",
  "Immigration Data",
  "Hotel Occupancy",
  "Google Trends",
  "Social Sentiment",
];

const severityColors: Record<string, string> = {
  critical: "var(--crimson)",
  high: "var(--amber)",
  medium: "var(--cyan)",
};

export default function ReportsPage() {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <SentinelShell>
      <div style={{ paddingTop: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {/* Left: Report Generation */}
          <div
            style={{
              background: "linear-gradient(135deg, var(--bg-surface-alt), var(--bg-surface))",
              border: "1px solid var(--border-active)",
              borderRadius: 10,
              padding: 24,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <FileText style={{ width: 24, height: 24, color: "var(--cyan)" }} />
              <div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: "var(--text-primary)" }}>
                  Monthly Intelligence Briefing
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: 1, marginTop: 2 }}>
                  AUTO-GENERATED &bull; FOR MINISTER&apos;S DESK
                </div>
              </div>
            </div>

            <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 20 }}>
              Comprehensive intelligence report synthesizing data from 14 connected sources including
              flight booking APIs, OTA price scrapers, competitor ad trackers, charter operator systems,
              immigration data, hotel occupancy rates, Google Trends, and social sentiment analysis.
            </p>

            {/* Metadata grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
              {[
                { label: "Report Period", value: "March 2026" },
                { label: "Data Sources", value: "14 Connected" },
                { label: "Last Generated", value: "28 Mar 2026" },
                { label: "Confidence", value: "94.2%" },
              ].map((m) => (
                <div key={m.label} style={{ background: "var(--bg-primary)", border: "1px solid var(--border-default)", borderRadius: 8, padding: 12 }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{m.label}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>{m.value}</div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => showToast("Report generation requires Claude API connection")}
              style={{
                width: "100%",
                padding: "14px 20px",
                borderRadius: 8,
                border: "1px solid rgba(0,212,255,0.3)",
                background: "linear-gradient(135deg, rgba(0,212,255,0.12), rgba(168,85,247,0.12))",
                color: "var(--cyan)",
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: "uppercase",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "all 150ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(168,85,247,0.2))";
                e.currentTarget.style.borderColor = "rgba(0,212,255,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, rgba(0,212,255,0.12), rgba(168,85,247,0.12))";
                e.currentTarget.style.borderColor = "rgba(0,212,255,0.3)";
              }}
            >
              <Download style={{ width: 16, height: 16 }} />
              Generate March 2026 Report
            </button>
          </div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Key Executive Findings */}
            <Panel title="Key Executive Findings" icon={Shield} accentColor="var(--amber)">
              <div style={{ display: "grid", gap: 0 }}>
                {FINDINGS.map((f, i) => (
                  <div key={i}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 0" }}>
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: severityColors[f.severity],
                          flexShrink: 0,
                          marginTop: 4,
                        }}
                      />
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5 }}>
                        {f.text}
                      </span>
                    </div>
                    {i < FINDINGS.length - 1 && (
                      <div style={{ height: 1, background: "var(--border-default)" }} />
                    )}
                  </div>
                ))}
              </div>
            </Panel>

            {/* Root Causes Summary */}
            <Panel title="Top Root Causes (from Diagnosis)" icon={AlertTriangle} accentColor="var(--crimson)">
              <div style={{ display: "grid", gap: 0 }}>
                {ROOT_CAUSES.map((cause, i) => (
                  <div key={i}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 0" }}>
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: "var(--crimson)",
                          flexShrink: 0,
                          marginTop: 4,
                        }}
                      />
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5 }}>
                        {cause}
                      </span>
                    </div>
                    {i < ROOT_CAUSES.length - 1 && (
                      <div style={{ height: 1, background: "var(--border-default)" }} />
                    )}
                  </div>
                ))}
              </div>
            </Panel>

            {/* Top Policy Actions */}
            <Panel title="Priority Policy Actions" icon={Target} accentColor="var(--emerald)">
              <div style={{ display: "grid", gap: 0 }}>
                {TOP_POLICY_ACTIONS.map((action, i) => (
                  <div key={i}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, flex: 1 }}>
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: action.priority === "CRITICAL" ? "var(--crimson)" : "var(--amber)",
                            flexShrink: 0,
                            marginTop: 4,
                          }}
                        />
                        <div>
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-primary)", fontWeight: 600 }}>
                            {action.action}
                          </span>
                          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--emerald)", marginTop: 2 }}>
                            {action.impact}
                          </div>
                        </div>
                      </div>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 9,
                          fontWeight: 700,
                          padding: "2px 6px",
                          borderRadius: 3,
                          color: action.priority === "CRITICAL" ? "var(--crimson)" : "var(--amber)",
                          background: action.priority === "CRITICAL" ? "var(--crimson-dim)" : "var(--amber-dim)",
                        }}
                      >
                        {action.priority}
                      </span>
                    </div>
                    {i < TOP_POLICY_ACTIONS.length - 1 && (
                      <div style={{ height: 1, background: "var(--border-default)" }} />
                    )}
                  </div>
                ))}
              </div>
            </Panel>

            {/* System Architecture */}
            <Panel title="System Architecture" icon={Database} accentColor="var(--cyan)">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {DATA_SOURCES.map((s) => (
                  <span
                    key={s}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "5px 10px",
                      background: "var(--bg-primary)",
                      border: "1px solid var(--border-default)",
                      borderRadius: 10,
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--text-muted)",
                    }}
                  >
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--emerald)" }} />
                    {s}
                  </span>
                ))}
              </div>
            </Panel>
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div
            style={{
              position: "fixed",
              bottom: 24,
              right: 24,
              zIndex: 100,
              padding: "12px 18px",
              background: "var(--bg-surface)",
              border: "1px solid var(--border-default)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--text-muted)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            }}
            className="animate-fade-in"
          >
            <AlertTriangle style={{ width: 14, height: 14, color: "var(--amber)" }} />
            {toast}
          </div>
        )}
      </div>
    </SentinelShell>
  );
}
