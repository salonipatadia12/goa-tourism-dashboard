"use client";

import { memo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { formatIndianNumber } from "@/lib/utils/formatting";

interface AnnualData {
  year: number;
  arrivals: number;
}

interface ArrivalTrendChartProps {
  data: AnnualData[];
}

const PEAK = 890459;

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
  if (!active || !payload?.[0]) return null;
  return (
    <div
      style={{
        background: "rgba(18,19,26,0.92)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 8,
        padding: "10px 14px",
        boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 600, color: "#E8E8ED", marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontSize: 12, fontFamily: "monospace", color: "#F59E0B" }}>
        {formatIndianNumber(payload[0].value, true)} arrivals
      </div>
      <div style={{ fontSize: 11, color: "#5A5A6E", marginTop: 2 }}>
        {((payload[0].value / PEAK) * 100).toFixed(0)}% of peak
      </div>
    </div>
  );
};

export const ArrivalTrendChart = memo(function ArrivalTrendChart({ data }: ArrivalTrendChartProps) {
  const chartData = data.map((item) => ({
    year: item.year.toString(),
    arrivals: item.arrivals,
  }));

  return (
    <div className="card" style={{ padding: 24 }}>
      <div style={{ marginBottom: 20 }}>
        <span className="section-heading">Annual Arrival Trend (2017-2025)</span>
        <p style={{ fontSize: 12, color: "#5A5A6E", marginTop: 4 }}>
          Foreign tourist arrivals &bull; Verified data from Goa Department of Tourism
        </p>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.03)"
            vertical={false}
          />

          <XAxis
            dataKey="year"
            stroke="#5A5A6E"
            tick={{ fill: "#8B8B9E", fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: "rgba(255,255,255,0.04)" }}
          />

          <YAxis
            stroke="#5A5A6E"
            tick={{ fill: "#8B8B9E", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => formatIndianNumber(v)}
            domain={[0, 1000000]}
          />

          <ReferenceLine
            y={PEAK}
            stroke="#F59E0B"
            strokeDasharray="6 4"
            strokeWidth={1.5}
            label={{
              value: "2017 Peak",
              fill: "#F59E0B",
              fontSize: 11,
              position: "insideTopRight",
            }}
          />

          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="arrivals"
            stroke="#3B82F6"
            strokeWidth={2.5}
            fill="url(#areaGradient)"
            isAnimationActive={false}
            dot={{ r: 3, fill: "#3B82F6", stroke: "#12131A", strokeWidth: 2 }}
            activeDot={{ r: 5, fill: "#3B82F6", stroke: "#3B82F6", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Summary stats */}
      <div
        style={{
          marginTop: 16,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 16,
          paddingTop: 16,
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div>
          <div style={{ fontSize: 11, color: "#5A5A6E", marginBottom: 4 }}>2017 Peak</div>
          <div style={{ fontSize: 16, fontFamily: "var(--font-mono)", fontWeight: 600, color: "#F59E0B", fontVariantNumeric: "tabular-nums" }}>
            {formatIndianNumber(PEAK)}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: "#5A5A6E", marginBottom: 4 }}>2025 Latest</div>
          <div style={{ fontSize: 16, fontFamily: "var(--font-mono)", fontWeight: 600, color: "#3B82F6", fontVariantNumeric: "tabular-nums" }}>
            {formatIndianNumber(data[data.length - 1]?.arrivals || 0)}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: "#5A5A6E", marginBottom: 4 }}>Recovery</div>
          <div style={{ fontSize: 16, fontFamily: "var(--font-mono)", fontWeight: 600, color: "#3B82F6", fontVariantNumeric: "tabular-nums" }}>
            {(((data[data.length - 1]?.arrivals || 0) / PEAK) * 100).toFixed(0)}%
          </div>
        </div>
      </div>
    </div>
  );
});

export default ArrivalTrendChart;
