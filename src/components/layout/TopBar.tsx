"use client";

import { memo, useState } from "react";
import { LiveClock } from "./LiveClock";
import { SystemStatus } from "./SystemStatus";

type TimePeriod = "MTD" | "QTD" | "YTD" | "Custom";

interface TopBarProps {
  title: string;
}

export const TopBar = memo(function TopBar({ title }: TopBarProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("YTD");

  const periods: TimePeriod[] = ["MTD", "QTD", "YTD", "Custom"];

  return (
    <div>
      <div
        style={{
          height: 56,
          background: "var(--bg-surface-1)",
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          position: "relative",
        }}
      >
        {/* Subtle glow on bottom border */}
        <div
          style={{
            position: "absolute",
            bottom: -1,
            left: 0,
            right: 0,
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.1), transparent)",
          }}
        />

        {/* Left: Title */}
        <h1
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: "var(--text-primary)",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h1>

        {/* Center: Period pills */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            background: "var(--bg-base)",
            borderRadius: 8,
            padding: 3,
            border: "1px solid var(--border-subtle)",
          }}
        >
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              style={{
                padding: "5px 14px",
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 500,
                border: "none",
                cursor: "pointer",
                transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
                background: selectedPeriod === period ? "#F59E0B" : "transparent",
                color: selectedPeriod === period ? "#0A0A0F" : "var(--text-secondary)",
              }}
              onMouseOver={(e) => {
                if (selectedPeriod !== period) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.color = "var(--text-primary)";
                }
              }}
              onMouseOut={(e) => {
                if (selectedPeriod !== period) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }
              }}
            >
              {period}
            </button>
          ))}
        </div>

        {/* Right: Clock */}
        <LiveClock />
      </div>
      <SystemStatus />
    </div>
  );
});
