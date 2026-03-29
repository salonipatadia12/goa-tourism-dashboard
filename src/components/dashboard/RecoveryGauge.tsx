"use client";

import { memo } from "react";
import { formatIndianNumber } from "@/lib/utils/formatting";

interface RecoveryGaugeProps {
  current: number;
  peak: number;
  peakYear: number;
  currentYear?: number;
}

export const RecoveryGauge = memo(function RecoveryGauge({
  current,
  peak,
  peakYear,
  currentYear = 2025,
}: RecoveryGaugeProps) {
  const pct = (current / peak) * 100;
  const gap = peak - current;
  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  // Gradient arc: red → amber → green (58% lands in amber zone)
  const gradientId = "gauge-gradient";

  return (
    <div
      className="card"
      style={{
        padding: 28,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "visible",
      }}
    >
      <span className="section-heading" style={{ marginBottom: 20 }}>
        Recovery Progress
      </span>

      {/* Gauge */}
      <div style={{ position: "relative", width: 220, height: 220 }}>
        <svg width="220" height="220" style={{ transform: "rotate(-90deg)" }}>
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
          {/* Track */}
          <circle
            cx="110" cy="110" r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="14"
          />
          {/* Progress arc with gradient */}
          <circle
            cx="110" cy="110" r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="14"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)",
              filter: "drop-shadow(0 0 10px rgba(245, 158, 11, 0.35))",
            }}
          />
          {/* Glowing tip dot */}
          {(() => {
            const angle = (pct / 100) * 2 * Math.PI - Math.PI / 2;
            const cx = 110 + radius * Math.cos(angle);
            const cy = 110 + radius * Math.sin(angle);
            return (
              <circle
                cx={cx} cy={cy} r="5"
                fill="#F59E0B"
                style={{
                  filter: "drop-shadow(0 0 6px rgba(245,158,11,0.7))",
                  transform: "rotate(90deg)",
                  transformOrigin: "110px 110px",
                }}
              />
            );
          })()}
        </svg>

        {/* Center content */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: "var(--kpi-lg)",
              fontWeight: 700,
              fontFamily: "var(--font-mono)",
              color: "var(--text-primary)",
              fontVariantNumeric: "tabular-nums",
              lineHeight: 1,
              textShadow: "0 0 20px rgba(245,158,11,0.15)",
            }}
          >
            {Math.round(pct)}%
          </span>
          <span style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>
            of {peakYear} peak
          </span>
        </div>
      </div>

      {/* Stats */}
      <div style={{ marginTop: 20, width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 0",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>FY {currentYear}</span>
          <span
            style={{
              fontSize: 15,
              fontFamily: "var(--font-mono)",
              fontWeight: 600,
              color: "var(--accent)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {formatIndianNumber(current)}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 0",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>Peak ({peakYear})</span>
          <span
            style={{
              fontSize: 15,
              fontFamily: "var(--font-mono)",
              fontWeight: 600,
              color: "var(--text-primary)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {formatIndianNumber(peak)}
          </span>
        </div>
      </div>

      {/* Gap callout */}
      <div
        style={{
          marginTop: 16,
          width: "100%",
          background: "var(--bg-base)",
          borderRadius: 8,
          padding: "12px 16px",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Tourists to Recover
        </div>
        <div
          style={{
            fontSize: 22,
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            color: "var(--negative)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {formatIndianNumber(gap)}
        </div>
        <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
          {formatIndianNumber(gap, true)} international tourists
        </div>
      </div>
    </div>
  );
});
