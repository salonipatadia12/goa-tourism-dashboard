"use client";

import { SentinelShell } from "@/components/SentinelShell";
import { Panel } from "@/components/Panel";
import { PriorityBadge } from "@/components/PriorityBadge";
import { Zap, Calendar } from "lucide-react";

interface CampaignRec {
  market: string;
  channel: string;
  priority: "critical" | "high" | "medium";
  budget: string;
  impact: "HIGH IMPACT" | "MEDIUM IMPACT";
  timing: string;
  status: "ready" | "pending" | "planning";
  reasoning: string;
}

const CAMPAIGNS: CampaignRec[] = [
  {
    market: "Russia",
    channel: "Aviasales + Aeroflot Co-marketing",
    priority: "critical",
    budget: "₹2.1 Cr (proposed)",
    impact: "HIGH IMPACT",
    timing: "Jun 2026 – Sep 2026",
    status: "ready",
    reasoning: "1.90M Russians chose Thailand in 2025. Capturing just 1% = 19,000 tourists. Booking window for Oct-Mar season opens June. Co-marketing with Aeroflot maximizes reach.",
  },
  {
    market: "UK",
    channel: "Google Ads + TUI Partnership",
    priority: "high",
    budget: "₹1.4 Cr (proposed)",
    impact: "HIGH IMPACT",
    timing: "Aug 2026 – Oct 2026",
    status: "ready",
    reasoning: "Target premium FIT travellers promoting Goa as Golden Triangle add-on. TUI co-funded campaigns reduce cost. UK is a traditional high-value source market for Goa.",
  },
  {
    market: "Poland",
    channel: "Warsaw Trade Shows + Digital",
    priority: "high",
    budget: "₹0.8 Cr (proposed)",
    impact: "HIGH IMPACT",
    timing: "Jul 2026 – Oct 2026",
    status: "pending",
    reasoning: "New charter route launched Nov 2025 showing strong growth. Early investment in destination awareness while competitors haven't entered. First-mover advantage critical.",
  },
  {
    market: "Kazakhstan",
    channel: "Astana Trade Fair + Fly Arystan",
    priority: "medium",
    budget: "₹0.5 Cr (proposed)",
    impact: "MEDIUM IMPACT",
    timing: "Aug 2026 – Sep 2026",
    status: "pending",
    reasoning: "Fly Arystan operating 2x weekly charters in first season. Central Asian beach tourism demand is underserved. Low-cost market entry point.",
  },
  {
    market: "Germany",
    channel: "FIT Portals + Content Marketing",
    priority: "medium",
    budget: "₹0.9 Cr (proposed)",
    impact: "MEDIUM IMPACT",
    timing: "Jul 2026 – Sep 2026",
    status: "planning",
    reasoning: "German FIT market is stable but not growing. Content strategy positioning Goa as heritage/wellness destination (not party destination) resonates with German preferences.",
  },
  {
    market: "Israel",
    channel: "Recovery Campaign – Digital Only",
    priority: "medium",
    budget: "₹0.7 Cr (proposed)",
    impact: "MEDIUM IMPACT",
    timing: "Sep 2026 – Nov 2026",
    status: "planning",
    reasoning: "Market down 28% due to ongoing conflict. Maintain brand presence with minimal spend. Scale up rapidly when geopolitical situation stabilizes.",
  },
];

const statusColors: Record<string, { color: string; bg: string }> = {
  ready: { color: "var(--emerald)", bg: "var(--emerald-dim)" },
  pending: { color: "var(--amber)", bg: "var(--amber-dim)" },
  planning: { color: "var(--cyan)", bg: "var(--cyan-dim)" },
};

const impactColors: Record<string, { color: string; bg: string }> = {
  "HIGH IMPACT": { color: "var(--emerald)", bg: "var(--emerald-dim)" },
  "MEDIUM IMPACT": { color: "var(--cyan)", bg: "var(--cyan-dim)" },
};

const totalBudget = "₹6.4 Cr (proposed)";

export default function CampaignsPage() {
  return (
    <SentinelShell>
      <div style={{ paddingTop: 20 }}>
        <Panel title="Proposed Marketing Campaigns" icon={Zap} accentColor="var(--amber)">
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--amber)", marginBottom: 12, lineHeight: 1.5 }}>
            Budget allocations are illustrative estimates for planning purposes. Impact assessments are qualitative.
          </p>
          {/* Summary bar */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)" }}>
              Total Budget: <span style={{ color: "var(--amber)", fontWeight: 700 }}>{totalBudget}</span>
            </span>
          </div>

          {/* Campaign cards */}
          <div style={{ display: "grid", gap: 12 }}>
            {CAMPAIGNS.map((c) => {
              const sc = statusColors[c.status];
              const ic = impactColors[c.impact];
              const borderColor = c.priority === "critical" ? "var(--crimson)" : c.priority === "high" ? "var(--amber)" : "var(--cyan)";
              return (
                <div
                  key={c.market + c.channel}
                  style={{
                    background: "var(--bg-surface-alt)",
                    border: "1px solid var(--border-default)",
                    borderLeft: `3px solid ${borderColor}`,
                    borderRadius: "0 8px 8px 0",
                    padding: "16px 20px",
                  }}
                >
                  {/* Top row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <PriorityBadge level={c.priority} />
                      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>
                        {c.market} — {c.channel}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700, color: "var(--amber)" }}>{c.budget}</span>
                      <span style={{
                        fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1,
                        padding: "2px 8px", borderRadius: 4, color: ic.color, background: ic.bg,
                      }}>
                        {c.impact}
                      </span>
                    </div>
                  </div>

                  {/* Middle row */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                    <Calendar style={{ width: 12, height: 12, color: "var(--text-dim)" }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)" }}>{c.timing}</span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        padding: "2px 8px",
                        borderRadius: 4,
                        color: sc.color,
                        background: sc.bg,
                      }}
                    >
                      {c.status}
                    </span>
                  </div>

                  {/* Reasoning */}
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6 }}>
                    {c.reasoning}
                  </p>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>
    </SentinelShell>
  );
}
