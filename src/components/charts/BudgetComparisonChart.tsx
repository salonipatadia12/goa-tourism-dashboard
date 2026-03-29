"use client";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { CustomTooltip } from "@/components/CustomTooltip";

const data = [
  { name: "Thailand", budget: 1080, color: "var(--crimson)" },
  { name: "Goa", budget: 45, color: "var(--text-dim)" },
];

export default function BudgetComparisonChart() {
  return (
    <ResponsiveContainer width="100%" height={120}>
      <BarChart data={data} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
        <XAxis type="number" tick={{ fill: "#6b7a94", fontSize: 10, fontFamily: "'JetBrains Mono'" }} stroke="#1a2233" />
        <YAxis dataKey="name" type="category" tick={{ fill: "#6b7a94", fontSize: 11, fontFamily: "'JetBrains Mono'" }} stroke="#1a2233" width={70} />
        <Tooltip content={<CustomTooltip formatter={(v) => `₹${v} Cr`} />} />
        <Bar dataKey="budget" radius={[0, 4, 4, 0]} isAnimationActive={false}>
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
