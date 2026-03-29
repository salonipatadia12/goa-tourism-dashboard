"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { SourceMarket } from "@/lib/constants/source-markets";

interface MarketSummaryCardProps {
  market: SourceMarket;
}

const STATUS_LABELS = {
  recovering: "Recovering",
  stable: "Stable",
  declining: "Declining",
  emerging: "Emerging",
};

const COUNTRY_FLAGS: Record<string, string> = {
  "Russia": "🇷🇺",
  "United Kingdom": "🇬🇧",
  "Israel": "🇮🇱",
  "Germany": "🇩🇪",
  "Poland": "🇵🇱",
  "Kazakhstan": "🇰🇿",
};

export function MarketSummaryCard({ market }: MarketSummaryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const TrendIcon = market.trendDirection === "up" ? TrendingUp : market.trendDirection === "down" ? TrendingDown : Minus;

  return (
    <div
      className="card p-5 cursor-pointer transition-all hover:border-opacity-30"
      style={{
        borderColor: market.statusColor,
        borderWidth: '2px',
      }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{COUNTRY_FLAGS[market.country] || "🌍"}</span>
          <div>
            <h4 className="text-base font-semibold text-white">{market.country}</h4>
            <div
              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-1"
              style={{
                backgroundColor: `${market.statusColor}20`,
                color: market.statusColor,
              }}
            >
              {STATUS_LABELS[market.status]}
            </div>
          </div>
        </div>

        {/* Trend Indicator */}
        <div
          className="flex items-center gap-1 px-2 py-1 rounded"
          style={{
            backgroundColor: market.trendDirection === "up" ? "rgba(16, 185, 129, 0.1)" : market.trendDirection === "down" ? "rgba(239, 68, 68, 0.1)" : "rgba(148, 163, 184, 0.1)",
            color: market.trendDirection === "up" ? "#10B981" : market.trendDirection === "down" ? "#EF4444" : "#94A3B8",
          }}
        >
          <TrendIcon className="w-4 h-4" />
        </div>
      </div>

      {/* Key Metric */}
      <div className="mb-3">
        <div className="text-xs text-[#64748B] mb-1">Key Metric</div>
        <div className="text-lg font-mono font-semibold" style={{ color: market.statusColor }}>
          {market.keyMetric}
        </div>
      </div>

      {/* Summary */}
      <p className="text-sm text-[#94A3B8] mb-3 leading-relaxed">
        {market.summary}
      </p>

      {/* Expand/Collapse Button */}
      <button
        className="flex items-center gap-1 text-xs text-[#64748B] hover:text-[#94A3B8] transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
      >
        {isExpanded ? (
          <>
            <ChevronUp className="w-4 h-4" />
            Show less
          </>
        ) : (
          <>
            <ChevronDown className="w-4 h-4" />
            Show details
          </>
        )}
      </button>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-white/[0.06] space-y-3">
          {/* Charter Operators */}
          {market.charterOperators.length > 0 && (
            <div>
              <div className="text-xs font-medium text-[#94A3B8] mb-1">Charter Operators</div>
              <div className="flex flex-wrap gap-1">
                {market.charterOperators.map((operator, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-0.5 rounded bg-white/[0.06] text-[#94A3B8]"
                  >
                    {operator}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Key Facts */}
          <div>
            <div className="text-xs font-medium text-[#94A3B8] mb-2">Key Facts</div>
            <ul className="space-y-1">
              {market.keyFacts.map((fact, index) => (
                <li key={index} className="text-xs text-[#64748B] flex items-start gap-2">
                  <span className="text-[#0EA5E9] mt-0.5">•</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
