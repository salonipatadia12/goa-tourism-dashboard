import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface TrendBadgeProps {
  value: number;
  suffix?: string;
}

export function TrendBadge({ value, suffix = "%" }: TrendBadgeProps) {
  const isPositive = value >= 0;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        fontWeight: 600,
        color: isPositive ? "var(--emerald)" : "var(--crimson)",
      }}
    >
      {isPositive ? (
        <ArrowUpRight style={{ width: 12, height: 12 }} />
      ) : (
        <ArrowDownRight style={{ width: 12, height: 12 }} />
      )}
      {isPositive ? "+" : ""}{value.toFixed(1)}{suffix}
    </span>
  );
}
