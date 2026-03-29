"use client";

import { useMemo } from "react";
import {
  ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine,
} from "recharts";
import { CustomTooltip } from "@/components/CustomTooltip";
import { ANNUAL_DATA, PEAK_FOREIGN_ARRIVALS } from "@/lib/constants/historical-data";
import { fmtCompact, fmt } from "@/lib/formatters";

export default function ArrivalForecastChart() {
  const data = useMemo(
    () =>
      ANNUAL_DATA.map((d) => ({
        year: d.year.toString(),
        actual: d.foreignTourists,
        preCovid: d.year <= 2019 ? d.foreignTourists : null,
        predicted: d.year >= 2024 ? Math.round(d.foreignTourists * (1 + (d.year - 2024) * 0.03)) : null,
        confidenceLow: d.year >= 2024 ? Math.round(d.foreignTourists * 0.9) : null,
        confidenceHigh: d.year >= 2024 ? Math.round(d.foreignTourists * 1.15) : null,
      })),
    []
  );

  return (
    <ResponsiveContainer width="100%" height={320}>
      <ComposedChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,34,51,0.5)" vertical={false} />
        <XAxis dataKey="year" tick={{ fill: "#6b7a94", fontSize: 11, fontFamily: "'JetBrains Mono'" }} stroke="#1a2233" />
        <YAxis tick={{ fill: "#6b7a94", fontSize: 11, fontFamily: "'JetBrains Mono'" }} stroke="#1a2233" tickFormatter={(v: number) => fmtCompact(v)} />
        <ReferenceLine y={PEAK_FOREIGN_ARRIVALS} stroke="#3d4d65" strokeDasharray="5 5" label={{ value: "2017 Peak", fill: "#3d4d65", fontSize: 10, fontFamily: "'JetBrains Mono'" }} />
        <Tooltip content={<CustomTooltip formatter={(v) => fmt(Math.round(v))} />} />
        <Area type="monotone" dataKey="confidenceHigh" fill="var(--cyan-dim)" stroke="none" isAnimationActive={false} />
        <Area type="monotone" dataKey="confidenceLow" fill="var(--bg-surface)" stroke="none" isAnimationActive={false} />
        <Line type="monotone" dataKey="preCovid" stroke="var(--text-dim)" strokeDasharray="5 5" dot={false} isAnimationActive={false} />
        <Area type="monotone" dataKey="predicted" fill="rgba(0,212,255,0.08)" stroke="var(--cyan)" strokeWidth={2} dot={false} isAnimationActive={false} />
        <Area type="monotone" dataKey="actual" fill="rgba(0,255,136,0.08)" stroke="var(--emerald)" strokeWidth={2} isAnimationActive={false} dot={{ r: 3, fill: "var(--emerald)" }} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
