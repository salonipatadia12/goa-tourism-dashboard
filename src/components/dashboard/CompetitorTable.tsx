"use client";

import { useState } from "react";
import { formatIndianNumber, formatShortNumber } from "@/lib/utils/formatting";

export interface CompetitorDestination {
  name: string;
  flag: string;
  arrivals: number;
  year: string;
  source: string;
  budgetDailyCost: string;
  midRangeDailyCost: string;
  visaRussians: string;
  visaUK: string;
  directFlightsMoscow: string;
  directFlightsLondon: string;
  russianTourists: string;
  keyAdvantage: string;
  keyWeakness: string;
}

interface CompetitorTableProps {
  competitors: CompetitorDestination[];
}

type SortField = "arrivals" | "name";
type SortDirection = "asc" | "desc";

export function CompetitorTable({ competitors }: CompetitorTableProps) {
  const [sortField, setSortField] = useState<SortField>("arrivals");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection(field === "arrivals" ? "desc" : "asc");
    }
  };

  const sortedCompetitors = [...competitors].sort((a, b) => {
    if (sortField === "arrivals") {
      return sortDirection === "asc" ? a.arrivals - b.arrivals : b.arrivals - a.arrivals;
    } else {
      return sortDirection === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
  });

  const toggleExpanded = (name: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(name)) {
        newSet.delete(name);
      } else {
        newSet.add(name);
      }
      return newSet;
    });
  };

  return (
    <div className="card p-6">
      <div className="mb-6">
        <h3 className="text-sm font-medium text-[#94A3B8] uppercase tracking-wider mb-1">
          Detailed Competitor Comparison
        </h3>
        <p className="text-xs text-[#64748B]">
          Click any row to expand full details • Data from official government sources
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="text-left pb-3 pr-4">
                <button
                  onClick={() => handleSort("name")}
                  className="text-xs text-[#94A3B8] uppercase tracking-wider hover:text-[#0EA5E9] transition-colors flex items-center gap-1"
                >
                  Destination
                  {sortField === "name" && (
                    <span className="text-[#0EA5E9]">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </button>
              </th>
              <th className="text-right pb-3 pr-4">
                <button
                  onClick={() => handleSort("arrivals")}
                  className="text-xs text-[#94A3B8] uppercase tracking-wider hover:text-[#0EA5E9] transition-colors flex items-center gap-1 ml-auto"
                >
                  Arrivals (FY 2025)
                  {sortField === "arrivals" && (
                    <span className="text-[#0EA5E9]">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </button>
              </th>
              <th className="text-right pb-3 pr-4">
                <div className="text-xs text-[#94A3B8] uppercase tracking-wider">
                  Budget Cost
                </div>
              </th>
              <th className="text-right pb-3 pr-4">
                <div className="text-xs text-[#94A3B8] uppercase tracking-wider">
                  Mid-Range Cost
                </div>
              </th>
              <th className="text-center pb-3">
                <div className="text-xs text-[#94A3B8] uppercase tracking-wider">
                  Visa (Russia)
                </div>
              </th>
              <th className="text-center pb-3">
                <div className="text-xs text-[#94A3B8] uppercase tracking-wider">
                  Visa (UK)
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedCompetitors.map((competitor) => {
              const isExpanded = expandedRows.has(competitor.name);
              const isGoa = competitor.name === "Goa";

              return (
                <>
                  <tr
                    key={competitor.name}
                    onClick={() => toggleExpanded(competitor.name)}
                    className={`border-b border-white/[0.06] hover:bg-white/[0.02] transition-colors cursor-pointer ${
                      isGoa ? "bg-[#F59E0B]/5" : ""
                    }`}
                  >
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{competitor.flag}</span>
                        <div>
                          <div className={`font-semibold ${isGoa ? "text-[#F59E0B]" : "text-white"}`}>
                            {competitor.name}
                          </div>
                          <div className="text-xs text-[#64748B]">{competitor.year}</div>
                        </div>
                        <button className="ml-auto text-[#64748B] hover:text-[#0EA5E9] transition-colors">
                          {isExpanded ? "▼" : "▶"}
                        </button>
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-right">
                      <div className="font-mono font-semibold text-white">
                        {competitor.arrivals === 0
                          ? "—"
                          : isGoa
                          ? formatIndianNumber(competitor.arrivals)
                          : formatShortNumber(competitor.arrivals)}
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-right">
                      <div className="font-mono text-sm text-[#94A3B8]">
                        {competitor.budgetDailyCost}
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-right">
                      <div className="font-mono text-sm text-[#94A3B8]">
                        {competitor.midRangeDailyCost}
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      <div
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          competitor.visaRussians.toLowerCase().includes("free")
                            ? "bg-[#10B981]/20 text-[#10B981]"
                            : competitor.visaRussians.toLowerCase().includes("voa")
                            ? "bg-[#F59E0B]/20 text-[#F59E0B]"
                            : "bg-[#EF4444]/20 text-[#EF4444]"
                        }`}
                      >
                        {competitor.visaRussians}
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      <div
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          competitor.visaUK.toLowerCase().includes("free")
                            ? "bg-[#10B981]/20 text-[#10B981]"
                            : competitor.visaUK.toLowerCase().includes("voa")
                            ? "bg-[#F59E0B]/20 text-[#F59E0B]"
                            : "bg-[#EF4444]/20 text-[#EF4444]"
                        }`}
                      >
                        {competitor.visaUK}
                      </div>
                    </td>
                  </tr>

                  {/* Expanded Details Row */}
                  {isExpanded && (
                    <tr className={`border-b border-white/[0.06] ${isGoa ? "bg-[#F59E0B]/5" : "bg-white/[0.02]"}`}>
                      <td colSpan={6} className="py-4 px-6">
                        <div className="grid grid-cols-2 gap-6">
                          {/* Left Column */}
                          <div className="space-y-3">
                            <div>
                              <div className="text-xs text-[#64748B] mb-1">Direct Flights from Moscow</div>
                              <div className="text-sm text-white font-mono">
                                ✈️ {competitor.directFlightsMoscow}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-[#64748B] mb-1">Direct Flights from London</div>
                              <div className="text-sm text-white font-mono">
                                ✈️ {competitor.directFlightsLondon}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-[#64748B] mb-1">Russian Tourists</div>
                              <div className="text-sm text-white font-mono">
                                🇷🇺 {competitor.russianTourists}
                              </div>
                            </div>
                          </div>

                          {/* Right Column */}
                          <div className="space-y-3">
                            <div>
                              <div className="text-xs text-[#64748B] mb-1">Key Advantage</div>
                              <div className="text-sm text-[#10B981] flex items-start gap-2">
                                <span>✓</span>
                                <span>{competitor.keyAdvantage}</span>
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-[#64748B] mb-1">Key Weakness</div>
                              <div className="text-sm text-[#EF4444] flex items-start gap-2">
                                <span>✗</span>
                                <span>{competitor.keyWeakness}</span>
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-[#64748B] mb-1">Data Source</div>
                              <div className="text-xs text-[#64748B] italic">{competitor.source}</div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="mt-4 pt-4 border-t border-white/[0.06] text-xs text-[#64748B] text-center">
        Showing {sortedCompetitors.length} destinations • Click any row for detailed breakdown
      </div>
    </div>
  );
}
