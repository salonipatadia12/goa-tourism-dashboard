"use client";

import { memo } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { formatIndianNumber, calculateYoY } from "@/lib/utils/formatting";

interface KPICardProps {
  title: string;
  value: number;
  previousValue: number;
  icon?: React.ReactNode;
  suffix?: string;
  /** 9 data points for the mini sparkline (2017-2025) */
  sparklineData?: number[];
}

/** Tiny inline SVG sparkline — no Recharts, no overhead */
function MiniSparkline({ data, positive }: { data: number[]; positive: boolean }) {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 120;
  const h = 28;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");

  const color = positive ? "var(--positive)" : "var(--negative)";
  const glowColor = positive ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)";

  return (
    <svg width={w} height={h} style={{ display: "block" }}>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 3px ${glowColor})` }}
      />
    </svg>
  );
}

export const KPICard = memo(function KPICard({
  title,
  value,
  previousValue,
  icon,
  suffix = "",
  sparklineData,
}: KPICardProps) {
  const yoy = calculateYoY(value, previousValue);

  const TrendIcon = yoy.isPositive ? TrendingUp : yoy.value < -0.5 ? TrendingDown : Minus;

  const accentClass = yoy.isPositive
    ? "card-accent-positive"
    : yoy.value < -0.5
    ? "card-accent-negative"
    : "card-accent-info";

  const trendColor = yoy.isPositive
    ? "var(--positive)"
    : yoy.value < -0.5
    ? "var(--negative)"
    : "var(--text-secondary)";

  const trendBg = yoy.isPositive
    ? "var(--positive-glow)"
    : yoy.value < -0.5
    ? "var(--negative-glow)"
    : "rgba(139,139,158,0.1)";

  return (
    <div className={`card ${accentClass}`} style={{ padding: "20px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {icon && (
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "var(--accent-dim)",
                border: "1px solid rgba(245,158,11,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--accent)",
              }}
            >
              {icon}
            </div>
          )}
          <span className="section-heading">{title}</span>
        </div>
      </div>

      {/* Main Value */}
      <div style={{ marginBottom: 8 }}>
        <span
          style={{
            fontSize: "var(--kpi-lg)",
            fontWeight: 700,
            fontFamily: "var(--font-mono)",
            color: "var(--text-primary)",
            fontVariantNumeric: "tabular-nums",
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          {formatIndianNumber(value)}
        </span>
        {suffix && (
          <span style={{ fontSize: 16, fontWeight: 400, color: "var(--text-muted)", marginLeft: 8 }}>
            {suffix}
          </span>
        )}
      </div>

      {/* YoY badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: "3px 8px",
            borderRadius: 6,
            background: trendBg,
            color: trendColor,
            fontSize: 12,
            fontWeight: 600,
            fontFamily: "var(--font-mono)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          <TrendIcon style={{ width: 14, height: 14 }} />
          {yoy.formatted}
        </div>
      </div>

      {/* Sparkline */}
      {sparklineData && (
        <div style={{ marginBottom: 12, opacity: 0.8 }}>
          <MiniSparkline data={sparklineData} positive={yoy.isPositive} />
        </div>
      )}

      {/* Previous Year */}
      <div
        style={{
          paddingTop: 12,
          borderTop: "1px solid var(--border-subtle)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>vs FY 2024</span>
        <span
          style={{
            fontSize: 13,
            fontFamily: "var(--font-mono)",
            color: "var(--text-secondary)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {formatIndianNumber(previousValue)}
        </span>
      </div>
    </div>
  );
});
