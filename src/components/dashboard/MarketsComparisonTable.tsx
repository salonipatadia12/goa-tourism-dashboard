"use client";

import { useState } from "react";
import { ArrowUp, ArrowDown, ArrowRight } from "lucide-react";
import type { SourceMarket } from "@/lib/constants/source-markets";

interface MarketsComparisonTableProps {
  markets: SourceMarket[];
}

type SortField = "country" | "status" | "trend";
type SortDirection = "asc" | "desc";

export function MarketsComparisonTable({ markets }: MarketsComparisonTableProps) {
  const [sortField, setSortField] = useState<SortField>("country");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedMarkets = [...markets].sort((a, b) => {
    let comparison = 0;

    switch (sortField) {
      case "country":
        comparison = a.country.localeCompare(b.country);
        break;
      case "status":
        const statusOrder = { emerging: 0, recovering: 1, stable: 2, declining: 3 };
        comparison = statusOrder[a.status] - statusOrder[b.status];
        break;
      case "trend":
        const trendOrder = { up: 0, flat: 1, down: 2 };
        comparison = trendOrder[a.trendDirection] - trendOrder[b.trendDirection];
        break;
    }

    return sortDirection === "asc" ? comparison : -comparison;
  });

  const TrendIcon = (direction: "up" | "down" | "flat") => {
    if (direction === "up") return <ArrowUp className="w-4 h-4 text-[#10B981]" />;
    if (direction === "down") return <ArrowDown className="w-4 h-4 text-[#EF4444]" />;
    return <ArrowRight className="w-4 h-4 text-[#94A3B8]" />;
  };

  return (
    <div className="card p-6">
      <div className="mb-6">
        <h3 className="text-sm font-medium text-[#94A3B8] uppercase tracking-wider mb-1">
          Detailed Market Comparison
        </h3>
        <p className="text-xs text-[#64748B]">Sortable comparison of all source markets</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th
                className="text-left py-3 px-4 text-xs font-medium text-[#94A3B8] uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort("country")}
              >
                Market {sortField === "country" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="text-left py-3 px-4 text-xs font-medium text-[#94A3B8] uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort("status")}
              >
                Status {sortField === "status" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-[#94A3B8] uppercase tracking-wider">
                Charter Flights
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-[#94A3B8] uppercase tracking-wider">
                Key Operator
              </th>
              <th
                className="text-center py-3 px-4 text-xs font-medium text-[#94A3B8] uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort("trend")}
              >
                Trend {sortField === "trend" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-[#94A3B8] uppercase tracking-wider">
                Risk Factor
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedMarkets.map((market) => (
              <tr
                key={market.country}
                className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-1 h-8 rounded"
                      style={{ backgroundColor: market.statusColor }}
                    />
                    <span className="text-sm font-medium text-white">{market.country}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span
                    className="inline-flex items-center px-2 py-1 rounded text-xs font-medium"
                    style={{
                      backgroundColor: `${market.statusColor}20`,
                      color: market.statusColor,
                    }}
                  >
                    {market.status.charAt(0).toUpperCase() + market.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-[#94A3B8]">{market.keyMetric}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-[#94A3B8]">
                    {market.charterOperators.length > 0 ? market.charterOperators[0] : "N/A"}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="flex justify-center">
                    {TrendIcon(market.trendDirection)}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-xs text-[#64748B]">{market.riskFactor || "—"}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
