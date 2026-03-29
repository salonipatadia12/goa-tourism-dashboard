"use client";

import { useEffect, useRef, useState } from "react";
import { SOURCE_MARKETS, GOA_COORDINATES } from "@/lib/constants/source-markets";

interface SourceMarketsMapProps {
  mapboxToken?: string;
}

export function SourceMarketsMap({ mapboxToken }: SourceMarketsMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState(false);

  // For Phase 1, show static SVG fallback (Mapbox integration in Phase 2)
  const showFallback = !mapboxToken || mapError;

  if (showFallback) {
    return (
      <div className="card p-6 relative" style={{ height: '500px' }}>
        <div className="mb-4">
          <h3 className="text-sm font-medium text-[#94A3B8] uppercase tracking-wider mb-1">
            Global Source Markets
          </h3>
          <p className="text-xs text-[#64748B]">Interactive map showing tourist source countries</p>
        </div>

        {/* Static Fallback View */}
        <div
          className="relative w-full h-full bg-[#0A0B0F] rounded-lg border border-white/[0.06] flex items-center justify-center overflow-hidden"
          style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.03) 0%, transparent 50%)' }}
        >
          {/* SVG World Map Placeholder */}
          <svg
            viewBox="0 0 1000 500"
            className="w-full h-full opacity-20"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          >
            {/* Simplified world map outline */}
            <path
              d="M 150 200 L 200 180 L 250 190 L 300 170 L 350 180 L 400 160 L 450 170 L 500 150 L 550 160 L 600 140 L 650 150 L 700 160 L 750 180 L 800 190"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="2"
              fill="none"
            />
          </svg>

          {/* Market Markers */}
          <div className="absolute inset-0">
            {SOURCE_MARKETS.map((market, index) => {
              // Convert lat/lng to SVG coordinates (simplified projection)
              const x = ((market.lng + 180) / 360) * 100;
              const y = ((90 - market.lat) / 180) * 100;

              return (
                <div
                  key={market.country}
                  className="absolute"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {/* Glowing Circle */}
                  <div
                    className="relative animate-pulse"
                    style={{
                      width: market.status === 'emerging' ? '24px' : market.status === 'recovering' ? '32px' : '28px',
                      height: market.status === 'emerging' ? '24px' : market.status === 'recovering' ? '32px' : '28px',
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        backgroundColor: market.statusColor,
                        opacity: 0.3,
                        filter: 'blur(8px)',
                      }}
                    />
                    <div
                      className="absolute inset-0 rounded-full border-2"
                      style={{
                        borderColor: market.statusColor,
                        backgroundColor: `${market.statusColor}20`,
                      }}
                    />
                  </div>

                  {/* Country Label */}
                  <div
                    className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap"
                    style={{ color: market.statusColor }}
                  >
                    {market.country}
                  </div>
                </div>
              );
            })}

            {/* Goa Marker */}
            <div
              className="absolute"
              style={{
                left: `${((GOA_COORDINATES.lng + 180) / 360) * 100}%`,
                top: `${((90 - GOA_COORDINATES.lat) / 180) * 100}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="relative">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: '#F59E0B',
                    boxShadow: '0 0 20px rgba(245, 158, 11, 0.6)',
                  }}
                />
                <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 text-xs font-bold text-[#F59E0B] whitespace-nowrap">
                  GOA
                </div>
              </div>
            </div>
          </div>

          {/* Overlay Message */}
          {!mapboxToken && (
            <div className="absolute bottom-4 left-4 right-4 bg-[#111318] border border-white/[0.12] rounded-lg p-4">
              <p className="text-xs text-[#94A3B8]">
                <span className="text-[#F59E0B] font-semibold">💡 Interactive Map:</span> Add <code className="px-1 py-0.5 bg-[#0A0B0F] rounded text-[#0EA5E9]">MAPBOX_ACCESS_TOKEN</code> to <code className="px-1 py-0.5 bg-[#0A0B0F] rounded">.env.local</code> to enable interactive Mapbox GL map with animated flight arcs.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // TODO: Phase 2 - Implement full Mapbox GL JS integration
  return (
    <div ref={mapContainer} className="card p-6" style={{ height: '500px' }}>
      <div className="text-center text-[#64748B] py-20">
        Mapbox integration coming in Phase 2...
      </div>
    </div>
  );
}
