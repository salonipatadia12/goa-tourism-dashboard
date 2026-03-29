"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { CustomTooltip } from "@/components/CustomTooltip";
import { fmt } from "@/lib/formatters";

export default function WeeklyPulseChart({ data }: { data: { week: string; bookings: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,34,51,0.5)" vertical={false} />
        <XAxis dataKey="week" tick={{ fill: "#6b7a94", fontSize: 11, fontFamily: "'JetBrains Mono'" }} stroke="#1a2233" />
        <YAxis tick={{ fill: "#6b7a94", fontSize: 11, fontFamily: "'JetBrains Mono'" }} stroke="#1a2233" />
        <Tooltip content={<CustomTooltip formatter={(v) => fmt(v)} />} />
        <Bar dataKey="bookings" fill="var(--amber)" radius={[3, 3, 0, 0]} isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  );
}
