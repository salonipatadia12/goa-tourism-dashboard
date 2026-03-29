"use client";

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { CustomTooltip } from "@/components/CustomTooltip";
import { competitiveIntel } from "@/lib/competitive-intelligence";

export default function CharterDeclineChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={competitiveIntel.charterTimeline} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,34,51,0.5)" vertical={false} />
        <XAxis dataKey="year" tick={{ fill: "#6b7a94", fontSize: 10, fontFamily: "'JetBrains Mono'" }} stroke="#1a2233" />
        <YAxis tick={{ fill: "#6b7a94", fontSize: 10, fontFamily: "'JetBrains Mono'" }} stroke="#1a2233" />
        <Tooltip content={<CustomTooltip formatter={(v) => `${v} flights`} />} />
        <Area
          type="monotone"
          dataKey="flights"
          stroke="var(--cyan)"
          fill="rgba(0,212,255,0.1)"
          strokeWidth={2}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
