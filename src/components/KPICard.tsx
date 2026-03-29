import { ArrowUpRight, ArrowDownRight, type LucideIcon } from "lucide-react";

interface KPICardProps {
  label: string;
  value: string;
  trend?: number;
  trendLabel?: string;
  subText?: string;
  accent: "cyan" | "purple" | "emerald" | "amber" | "crimson";
  icon: LucideIcon;
  stagger?: number;
}

export function KPICard({ label, value, trend, trendLabel, subText, accent, icon: Icon, stagger = 1 }: KPICardProps) {
  const accentColor = `var(--${accent})`;
  const isPositive = trend !== undefined && trend >= 0;

  return (
    <div className={`kpi-card stagger-${stagger}`} data-accent={accent}>
      {/* Top row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: 1.5,
            color: "var(--text-muted)",
          }}
        >
          {label}
        </span>
        <Icon style={{ width: 16, height: 16, color: accentColor, opacity: 0.6 }} />
      </div>

      {/* Main value */}
      <div
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 28,
          fontWeight: 800,
          color: accentColor,
          lineHeight: 1,
          marginBottom: 8,
        }}
      >
        {value}
      </div>

      {/* Trend badge */}
      {trend !== undefined && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 3,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            fontWeight: 600,
            color: isPositive ? "var(--emerald)" : "var(--crimson)",
          }}
        >
          {isPositive ? (
            <ArrowUpRight style={{ width: 14, height: 14 }} />
          ) : (
            <ArrowDownRight style={{ width: 14, height: 14 }} />
          )}
          {trendLabel || `${isPositive ? "+" : ""}${trend.toFixed(1)}%`}
        </div>
      )}

      {/* Sub-text */}
      {subText && (
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--text-dim)",
            marginTop: 4,
          }}
        >
          {subText}
        </div>
      )}
    </div>
  );
}
