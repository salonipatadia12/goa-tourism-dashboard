"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { CustomTooltip } from "@/components/CustomTooltip";
import { getHotelPriceComparison } from "@/lib/data";

export default function PriceCompChart() {
  const data = getHotelPriceComparison();

  return (
    <ResponsiveContainer width="100%" height={340}>
      <BarChart data={data} layout="vertical" margin={{ top: 10, right: 40, left: 80, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,34,51,0.5)" horizontal={false} />
        <XAxis type="number" tick={{ fill: "#6b7a94", fontSize: 11, fontFamily: "'JetBrains Mono'" }} stroke="#1a2233" tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}K`} />
        <YAxis type="category" dataKey="destination" tick={{ fill: "#6b7a94", fontSize: 11, fontFamily: "'JetBrains Mono'" }} stroke="#1a2233" width={75} />
        <Tooltip content={<CustomTooltip formatter={(v) => `₹${v.toLocaleString("en-IN")}`} />} />
        <Bar dataKey="priceINR" radius={[0, 4, 4, 0]} isAnimationActive={false}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.isGoa ? "var(--amber)" : "var(--cyan)"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
