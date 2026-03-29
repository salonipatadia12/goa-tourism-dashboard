"use client";

import dynamic from "next/dynamic";
import { SentinelShell } from "@/components/SentinelShell";
import { Panel } from "@/components/Panel";
import { AlertBox } from "@/components/AlertBox";
import {
  AlertTriangle,
  DollarSign,
  Shield,
  Plane,
  TrendingUp,
  Star,
  Banknote,
} from "lucide-react";
import { competitiveIntel } from "@/lib/competitive-intelligence";
import { fmt } from "@/lib/formatters";

const ChartLoading = () => (
  <div style={{ height: 200, background: "var(--bg-surface-alt)", borderRadius: 8 }} />
);

const CharterDeclineChart = dynamic(
  () => import("@/components/charts/CharterDeclineChart"),
  { ssr: false, loading: ChartLoading }
);

const BudgetComparisonChart = dynamic(
  () => import("@/components/charts/BudgetComparisonChart"),
  { ssr: false, loading: ChartLoading }
);

const { goa2025, thailand2025, comparisons, economicImpact } = competitiveIntel;

interface RootCauseCardProps {
  icon: React.ElementType;
  iconColor: string;
  borderColor: string;
  title: string;
  stat: string;
  statColor: string;
  details: string[];
  children?: React.ReactNode;
}

function RootCauseCard({
  icon: Icon,
  iconColor,
  borderColor,
  title,
  stat,
  statColor,
  details,
  children,
}: RootCauseCardProps) {
  return (
    <div
      style={{
        background: "var(--bg-surface-alt)",
        border: "1px solid var(--border-default)",
        borderLeft: `3px solid ${borderColor}`,
        borderRadius: "0 10px 10px 0",
        padding: "24px 28px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: `${borderColor}15`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon style={{ width: 18, height: 18, color: iconColor }} />
        </div>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 1.5,
            color: "var(--text-primary)",
          }}
        >
          {title}
        </span>
      </div>

      <div
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 48,
          fontWeight: 800,
          color: statColor,
          lineHeight: 1,
          marginBottom: 16,
        }}
      >
        {stat}
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        {details.map((d, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
            }}
          >
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "var(--text-dim)",
                flexShrink: 0,
                marginTop: 7,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--text-muted)",
                lineHeight: 1.6,
              }}
            >
              {d}
            </span>
          </div>
        ))}
      </div>

      {children && <div style={{ marginTop: 16 }}>{children}</div>}
    </div>
  );
}

export default function DiagnosisPage() {
  return (
    <SentinelShell>
      <div style={{ paddingTop: 20 }}>
        {/* Section 1: The Headline Stat — Alarming Hero Card */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(255,51,102,0.08), rgba(255,51,102,0.02))",
            border: "1px solid rgba(255,51,102,0.2)",
            borderRadius: 10,
            padding: "32px 36px",
            marginBottom: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <AlertTriangle style={{ width: 20, height: 20, color: "var(--crimson)" }} />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 2,
                color: "var(--crimson)",
              }}
            >
              ROOT CAUSE ANALYSIS — WHY GOA IS LOSING
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {/* Left stats */}
            <div>
              <div style={{ marginBottom: 20 }}>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--text-dim)",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    marginBottom: 4,
                  }}
                >
                  Goa Foreign Tourists (2025)
                </div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 42, fontWeight: 800, color: "var(--crimson)", lineHeight: 1 }}>
                  {fmt(goa2025.foreignArrivals)}
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--text-dim)",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    marginBottom: 4,
                  }}
                >
                  Thailand Foreign Tourists (2025)
                </div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 42, fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>
                  {fmt(thailand2025.foreignArrivals)}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 14,
                    color: "var(--crimson)",
                    fontWeight: 700,
                    marginTop: 8,
                  }}
                >
                  Thailand attracts {comparisons.arrivals.ratio} more foreign tourists
                </div>
              </div>
            </div>

            {/* Right stats */}
            <div>
              <div style={{ marginBottom: 20 }}>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--text-dim)",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    marginBottom: 4,
                  }}
                >
                  Russia → Thailand (2025)
                </div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 42, fontWeight: 800, color: "var(--amber)", lineHeight: 1 }}>
                  {fmt(comparisons.russianTourists.thailand)}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    color: "var(--text-muted)",
                    marginTop: 4,
                  }}
                >
                  vs ~{fmt(comparisons.russianTourists.goa)} to Goa — {comparisons.russianTourists.ratio} ratio
                </div>
              </div>
              <div style={{ display: "flex", gap: 24 }}>
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
                    Goa Recovery
                  </div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 28, fontWeight: 800, color: "var(--crimson)", lineHeight: 1 }}>
                    {goa2025.recoveryPercent}%
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
                    Thailand Recovery
                  </div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 28, fontWeight: 800, color: "var(--emerald)", lineHeight: 1 }}>
                    93%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: The 5 Root Causes */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 12,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 2,
              color: "var(--text-muted)",
            }}
          >
            5 ROOT CAUSES OF DECLINE
          </span>
          <div style={{ flex: 1, height: 1, background: "var(--border-default)" }} />
        </div>

        <div style={{ display: "grid", gap: 12, marginBottom: 20 }}>
          {/* Card 1: Marketing Budget Gap */}
          <RootCauseCard
            icon={DollarSign}
            iconColor="var(--crimson)"
            borderColor="var(--crimson)"
            title="MARKETING BUDGET GAP"
            stat="24x Gap"
            statColor="var(--crimson)"
            details={[
              `Thailand's 2026 tourism budget: ₹1,080 Cr (4.5B Baht) for ${thailand2025.marketingBudget2026.initiatives} strategic initiatives`,
              `Goa's estimated tourism marketing budget: ${goa2025.estimatedMarketingBudget}`,
              `Thailand hired K-pop star ${thailand2025.marketingBudget2026.globalAmbassador} as global ambassador. Goa has no international campaign.`,
              `Thailand targets ${fmt(thailand2025.marketingBudget2026.target2026Arrivals)} tourists in 2026. Goa has no published target.`,
            ]}
          >
            <BudgetComparisonChart />
          </RootCauseCard>

          {/* Card 2: Visa Barrier */}
          <RootCauseCard
            icon={Shield}
            iconColor="var(--amber)"
            borderColor="var(--amber)"
            title="VISA BARRIER"
            stat="93 vs 0"
            statColor="var(--amber)"
            details={[
              `Thailand offers visa-free entry to ${thailand2025.visaFreeCountries} countries`,
              "Goa (India) requires e-Visa for almost all nationalities",
              "Average visa processing: 5–14 business days",
              "A tourist choosing between 'fly to Bangkok tomorrow' vs 'apply for India visa and wait' — Bangkok wins",
            ]}
          />

          {/* Card 3: Connectivity Collapse */}
          <RootCauseCard
            icon={Plane}
            iconColor="var(--cyan)"
            borderColor="var(--cyan)"
            title="CONNECTIVITY COLLAPSE"
            stat="5 flights/day"
            statColor="var(--cyan)"
            details={[
              `Goa had ${fmt(goa2025.intlFlights)} international flights in 2025 across both airports = ~5/day`,
              "Bangkok's Suvarnabhumi alone handles 500+ international flights daily",
              `Charter flights to Goa dropped from ${fmt(comparisons.charterDecline.from2017)} (2017) to ${comparisons.charterDecline.to2025} (2025) — an ${comparisons.charterDecline.declinePercent}% decline`,
            ]}
          >
            <CharterDeclineChart />
          </RootCauseCard>

          {/* Card 4: Price Perception Shift */}
          <RootCauseCard
            icon={TrendingUp}
            iconColor="var(--amber)"
            borderColor="var(--amber)"
            title="PRICE PERCEPTION SHIFT"
            stat={`No longer "budget paradise"`}
            statColor="var(--amber)"
            details={[
              "Goa's costs have risen while Thailand actively positions as affordable luxury",
              "Tourist complaints about inflated taxi fares, restaurant pricing, hotel rates",
              "No ride-hailing apps (Uber/Ola restricted) — tourists feel price-gouged",
              "Thailand markets 'Amazing Thailand' brand with value-for-money messaging globally",
            ]}
          />

          {/* Card 5: Experience Quality */}
          <RootCauseCard
            icon={Star}
            iconColor="var(--amber)"
            borderColor="var(--amber)"
            title="EXPERIENCE QUALITY"
            stat="Reputation risk"
            statColor="var(--amber)"
            details={[
              "Beach cleanliness concerns at popular spots",
              "Infrastructure gaps: roads, public transport, waste management",
              "Thailand invests in 'Trusted Thailand Safe Travel Stamp' — Goa has no equivalent",
              "Tourist safety perception lower than competing Southeast Asian destinations",
            ]}
          />
        </div>

        {/* Section 3: Revenue Impact */}
        <Panel title="Economic Impact of the Recovery Gap" icon={Banknote} accentColor="var(--crimson)">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div
              style={{
                background: "rgba(255,51,102,0.06)",
                border: "1px solid rgba(255,51,102,0.15)",
                borderRadius: 8,
                padding: 20,
                textAlign: "center",
              }}
            >
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
                Annual Revenue Lost
              </div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 36, fontWeight: 800, color: "var(--crimson)", lineHeight: 1 }}>
                ₹{fmt(economicImpact.annualRevenueLost)} Cr
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", marginTop: 6 }}>
                due to 42% recovery gap
              </div>
            </div>
            <div
              style={{
                background: "rgba(255,184,0,0.06)",
                border: "1px solid rgba(255,184,0,0.15)",
                borderRadius: 8,
                padding: 20,
                textAlign: "center",
              }}
            >
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
                80% Recovery Impact
              </div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 36, fontWeight: 800, color: "var(--amber)", lineHeight: 1 }}>
                ₹{fmt(economicImpact.recoveryTo80Target.totalEconomicImpact)} Cr
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", marginTop: 6 }}>
                total economic activity (with {economicImpact.economicMultiplier}x multiplier)
              </div>
            </div>
            <div
              style={{
                background: "rgba(0,212,255,0.06)",
                border: "1px solid rgba(0,212,255,0.15)",
                borderRadius: 8,
                padding: 20,
                textAlign: "center",
              }}
            >
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
                Per 10,000 Tourists
              </div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 36, fontWeight: 800, color: "var(--cyan)", lineHeight: 1 }}>
                ₹{economicImpact.per10kTouristsRevenue} Cr
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", marginTop: 6 }}>
                in local economic activity
              </div>
            </div>
          </div>

          <AlertBox type="alert">
            If Goa recovers to 80% of pre-pandemic foreign arrivals (+{fmt(economicImpact.recoveryTo80Target.additionalTourists)} tourists),
            the economic impact is ₹{fmt(economicImpact.recoveryTo80Target.additionalRevenue)} Cr in direct tourism revenue
            + ₹{fmt(economicImpact.recoveryTo80Target.totalEconomicImpact - economicImpact.recoveryTo80Target.additionalRevenue)} Cr
            in indirect economic activity. Every month of inaction costs Goa approximately ₹{Math.round(economicImpact.annualRevenueLost / 12)} Cr.
          </AlertBox>
        </Panel>
      </div>
    </SentinelShell>
  );
}
