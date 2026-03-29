"use client";

import { memo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from "recharts";
import { formatIndianNumber, formatShortNumber } from "@/lib/utils/formatting";

interface VolumeData {
  destination: string;
  arrivals: number;
  year: number | string;
  source: string;
}

interface VolumeComparisonChartProps {
  data: VolumeData[];
}

export const VolumeComparisonChart = memo(function VolumeComparisonChart({ data }: VolumeComparisonChartProps) {
  // Sort data by arrivals (highest to lowest)
  const sortedData = [...data].sort((a, b) => b.arrivals - a.arrivals);

  return (
    <div className="card p-6">
      <div className="mb-6">
        <h3 className="text-sm font-medium text-[#94A3B8] uppercase tracking-wider mb-1">
          Tourist Volume Comparison (FY 2025)
        </h3>
        <p className="text-xs text-[#64748B]">
          International tourist arrivals • Verified from official government sources
        </p>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={sortedData}
          margin={{ top: 20, right: 30, left: 10, bottom: 60 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255, 255, 255, 0.05)"
            vertical={false}
          />

          <XAxis
            dataKey="destination"
            stroke="#64748B"
            tick={{ fill: "#94A3B8", fontSize: 11 }}
            tickLine={{ stroke: "rgba(255, 255, 255, 0.1)" }}
            angle={-45}
            textAnchor="end"
            height={80}
          />

          <YAxis
            stroke="#64748B"
            tick={{ fill: "#94A3B8", fontSize: 11 }}
            tickLine={{ stroke: "rgba(255, 255, 255, 0.1)" }}
            tickFormatter={(value) => formatShortNumber(value)}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#111318",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "8px",
              padding: "12px",
            }}
            labelStyle={{
              color: "#FFFFFF",
              fontWeight: 600,
              marginBottom: "8px",
            }}
            itemStyle={{
              color: "#94A3B8",
              fontSize: "12px",
              fontFamily: "var(--font-geist-mono)",
            }}
            formatter={(value: unknown) => [
              `${Number(value).toLocaleString("en-IN")} tourists`,
              "Arrivals",
            ]}
          />

          <Bar dataKey="arrivals" radius={[4, 4, 0, 0]} isAnimationActive={false}>
            {sortedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.destination === "Goa" ? "#F59E0B" : "#3B82F6"}
              />
            ))}
            <LabelList
              dataKey="arrivals"
              position="top"
              formatter={(value: unknown) => formatShortNumber(Number(value))}
              style={{ fill: "#94A3B8", fontSize: 11, fontFamily: "var(--font-geist-mono)" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Gap Analysis */}
      <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-white/[0.06]">
        <div>
          <div className="text-xs text-[#64748B] mb-1">Regional Leader</div>
          <div className="text-lg font-mono font-semibold text-[#0EA5E9]">
            {sortedData[0]?.destination}
          </div>
          <div className="text-xs text-[#64748B] mt-1">
            {formatShortNumber(sortedData[0]?.arrivals || 0)}
          </div>
        </div>
        <div>
          <div className="text-xs text-[#64748B] mb-1">Goa's Position</div>
          <div className="text-lg font-mono font-semibold text-[#F59E0B]">
            #{sortedData.findIndex(d => d.destination === "Goa") + 1} of {sortedData.length}
          </div>
          <div className="text-xs text-[#64748B] mt-1">
            {formatIndianNumber(sortedData.find(d => d.destination === "Goa")?.arrivals || 0)}
          </div>
        </div>
        <div>
          <div className="text-xs text-[#64748B] mb-1">Gap vs Leader</div>
          <div className="text-lg font-mono font-semibold text-[#EF4444]">
            {((sortedData[0]?.arrivals || 0) / (sortedData.find(d => d.destination === "Goa")?.arrivals || 1)).toFixed(0)}x
          </div>
          <div className="text-xs text-[#64748B] mt-1">
            smaller market
          </div>
        </div>
      </div>
    </div>
  );
});

export default VolumeComparisonChart;
