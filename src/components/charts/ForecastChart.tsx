"use client";

import { useMemo } from "react";
import {
  ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine, Legend,
} from "recharts";
import { CustomTooltip } from "@/components/CustomTooltip";
import { getAnnualData, getRecoveryProjections } from "@/lib/data";
import { PEAK_FOREIGN_ARRIVALS } from "@/lib/constants/historical-data";
import { fmtCompact, fmt } from "@/lib/formatters";

const PEAK = PEAK_FOREIGN_ARRIVALS;

export default function ForecastChart() {
  const annualData = useMemo(() => getAnnualData(), []);
  const projections = useMemo(() => getRecoveryProjections(), []);

  const base = 517802;
  const projectionYears = Array.from({ length: 8 }, (_, i) => 2026 + i);

  const chartData = useMemo(() => {
    const data: Record<string, number | string | null>[] = annualData.map((d) => ({
      year: d.year.toString(),
      actual: d.foreignTourists,
    }));

    projectionYears.forEach((year) => {
      const entry: Record<string, number | string | null> = { year: year.toString(), actual: null };
      projections.forEach((proj) => {
        const yearsOut = year - 2025;
        entry[proj.label] = Math.min(Math.round(base * Math.pow(1 + proj.growthRate, yearsOut)), PEAK * 1.1);
      });
      const mid = Math.round(base * Math.pow(1.107, year - 2025));
      entry.confidenceHigh = Math.round(mid * 1.15);
      entry.confidenceLow = Math.round(mid * 0.85);
      data.push(entry);
    });

    return data;
  }, [annualData, projections]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,34,51,0.5)" vertical={false} />
        <XAxis dataKey="year" tick={{ fill: "#6b7a94", fontSize: 11, fontFamily: "'JetBrains Mono'" }} stroke="#1a2233" />
        <YAxis tick={{ fill: "#6b7a94", fontSize: 11, fontFamily: "'JetBrains Mono'" }} stroke="#1a2233" tickFormatter={(v: number) => fmtCompact(v)} domain={[0, 1050000]} />
        <ReferenceLine y={PEAK} stroke="var(--amber)" strokeDasharray="5 5" strokeWidth={1.5} label={{ value: "Pre-Pandemic Peak (8.90L)", fill: "var(--amber)", fontSize: 10, fontFamily: "'JetBrains Mono'", position: "right" }} />
        <ReferenceLine y={Math.round(PEAK * 0.8)} stroke="var(--amber)" strokeDasharray="3 3" strokeWidth={1} label={{ value: "Govt Target: 80% Recovery (7.12L)", fill: "var(--amber)", fontSize: 10, fontFamily: "'JetBrains Mono'", position: "right" }} />
        <Tooltip content={<CustomTooltip formatter={(v) => fmt(Math.round(v))} />} />
        <Area type="monotone" dataKey="confidenceHigh" fill="var(--cyan-dim)" stroke="none" isAnimationActive={false} />
        <Area type="monotone" dataKey="confidenceLow" fill="var(--bg-surface)" stroke="none" isAnimationActive={false} />
        <Line type="monotone" dataKey="actual" stroke="var(--emerald)" strokeWidth={3} dot={{ r: 3, fill: "var(--emerald)" }} name="Actual" isAnimationActive={false} connectNulls={false} />
        {projections.map((proj) => (
          <Line key={proj.label} type="monotone" dataKey={proj.label} stroke={proj.color} strokeWidth={2} strokeDasharray="8 4" dot={false} name={proj.label} isAnimationActive={false} connectNulls={false} />
        ))}
        <Legend wrapperStyle={{ fontSize: 10, fontFamily: "'JetBrains Mono'", color: "#6b7a94" }} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
