"use client";

import { memo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { formatCurrency } from "@/lib/utils/formatting";

interface PriceData {
  destination: string;
  priceINR: number;
  priceUSD: number;
}

interface PriceComparisonChartProps {
  data: PriceData[];
  insight?: string;
}

export const PriceComparisonChart = memo(function PriceComparisonChart({ data, insight }: PriceComparisonChartProps) {
  // Sort data by price (cheapest to most expensive)
  const sortedData = [...data].sort((a, b) => a.priceINR - b.priceINR);

  return (
    <div className="card p-6">
      <div className="mb-6">
        <h3 className="text-sm font-medium text-[#94A3B8] uppercase tracking-wider mb-1">
          Hotel Price Comparison — Equivalent 3-4 Star Beachfront
        </h3>
        <p className="text-xs text-[#64748B]">
          Per night cost • TripZilla India, OTA aggregator data (Jan 2024)
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={sortedData}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 140, bottom: 10 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255, 255, 255, 0.05)"
            horizontal={false}
          />

          <XAxis
            type="number"
            stroke="#64748B"
            tick={{ fill: "#94A3B8", fontSize: 11 }}
            tickLine={{ stroke: "rgba(255, 255, 255, 0.1)" }}
            tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
          />

          <YAxis
            type="category"
            dataKey="destination"
            stroke="#64748B"
            tick={{ fill: "#94A3B8", fontSize: 11 }}
            tickLine={{ stroke: "rgba(255, 255, 255, 0.1)" }}
            width={130}
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
            formatter={(value: unknown, _name: unknown, props: unknown) => {
              const usdValue = (props as { payload?: { priceUSD?: number } })?.payload?.priceUSD;
              return [
                `₹${Number(value).toLocaleString("en-IN")} ($${usdValue})`,
                "Price per night",
              ];
            }}
          />

          <Bar dataKey="priceINR" radius={[0, 4, 4, 0]} isAnimationActive={false}>
            {sortedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.destination.includes("Goa") ? "#EF4444" : "#3B82F6"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Insight */}
      {insight && (
        <div className="mt-6 p-4 bg-[#0A0B0F] rounded-lg border border-[#EF4444]/20">
          <div className="flex items-start gap-3">
            <div className="text-2xl">💰</div>
            <div>
              <div className="text-xs text-[#EF4444] font-semibold mb-1 uppercase tracking-wider">
                The Price Problem
              </div>
              <p className="text-sm text-[#94A3B8] leading-relaxed">{insight}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default PriceComparisonChart;
