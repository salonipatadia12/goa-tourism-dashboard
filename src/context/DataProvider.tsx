"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import {
  generateSourceMarketData,
  generateCharterOperatorData,
  generateWeeklyPulse,
  type SimulatedSourceMarket,
  type SimulatedCharterOperator,
  type WeeklyPulsePoint,
} from "@/lib/data-generators";

type DataMode = "live" | "cached" | "historical";

interface DataContextType {
  sourceMarkets: SimulatedSourceMarket[];
  charterOperators: SimulatedCharterOperator[];
  weeklyPulse: WeeklyPulsePoint[];
  lastRefresh: Date | null;
  freshnessPercent: number;
  isLoaded: boolean;
  dataMode: DataMode;
  refreshData: () => Promise<void>;
  isRefreshing: boolean;
  exchangeRates: Record<string, number> | null;
  news: any[];
  searchTrends: any[];
}

const DataContext = createContext<DataContextType | null>(null);

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}

// Merge route data from Supabase into source market format
// Currently a pass-through — live route data will enhance status when API is connected
function routesToSourceMarkets(
  routes: any[],
  fallback: SimulatedSourceMarket[]
): SimulatedSourceMarket[] {
  if (!routes || routes.length === 0) return fallback;
  // Future: update airline lists and status from live route data
  return fallback;
}

// Merge schedule data into charter operators
// Currently a pass-through — live schedule data will add frequency info when API is connected
function schedulesToCharterOps(
  schedules: any[],
  fallback: SimulatedCharterOperator[]
): SimulatedCharterOperator[] {
  if (!schedules || schedules.length === 0) return fallback;
  // Future: update operator status from live schedule data
  return fallback;
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [sourceMarkets, setSourceMarkets] = useState<SimulatedSourceMarket[]>([]);
  const [charterOperators, setCharterOperators] = useState<SimulatedCharterOperator[]>([]);
  const [weeklyPulse, setWeeklyPulse] = useState<WeeklyPulsePoint[]>([]);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [freshnessPercent, setFreshnessPercent] = useState(100);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dataMode, setDataMode] = useState<DataMode>("historical");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [exchangeRates, setExchangeRates] = useState<Record<string, number> | null>(null);
  const [news, setNews] = useState<any[]>([]);
  const [searchTrends, setSearchTrends] = useState<any[]>([]);

  // Load data from API routes (which read from Supabase cache)
  const loadFromCache = useCallback(async () => {
    const fallbackMarkets = generateSourceMarketData();
    const fallbackCharters = generateCharterOperatorData();
    const fallbackPulse = generateWeeklyPulse();

    let mode: DataMode = "historical";

    try {
      // Fetch all cached data in parallel
      const [flightsRes, trendsRes, exchangeRes, newsRes] = await Promise.all([
        fetch("/api/data/flights").then((r) => r.ok ? r.json() : null).catch(() => null),
        fetch("/api/data/trends").then((r) => r.ok ? r.json() : null).catch(() => null),
        fetch("/api/data/exchange").then((r) => r.ok ? r.json() : null).catch(() => null),
        fetch("/api/data/news").then((r) => r.ok ? r.json() : null).catch(() => null),
      ]);

      // Process flights data
      if (flightsRes?.source === "cache" && (flightsRes.routes?.length > 0 || flightsRes.schedules?.length > 0)) {
        setSourceMarkets(routesToSourceMarkets(flightsRes.routes, fallbackMarkets));
        setCharterOperators(schedulesToCharterOps(flightsRes.schedules, fallbackCharters));
        mode = "cached";
      } else {
        setSourceMarkets(fallbackMarkets);
        setCharterOperators(fallbackCharters);
      }

      // Process trends data
      if (trendsRes?.source === "cache" && trendsRes.data?.length > 0) {
        setSearchTrends(trendsRes.data);
        mode = "cached";
      }

      // Process exchange rates
      if (exchangeRes?.source === "cache" && exchangeRes.data?.rates) {
        setExchangeRates(exchangeRes.data.rates);
        mode = "cached";
      }

      // Process news
      if (newsRes?.source === "cache" && newsRes.data?.length > 0) {
        const allArticles = newsRes.data.flatMap((n: any) => n.articles || []);
        setNews(allArticles);
        mode = "cached";
      }
    } catch {
      // All API calls failed — use hardcoded fallbacks
      setSourceMarkets(fallbackMarkets);
      setCharterOperators(fallbackCharters);
    }

    setWeeklyPulse(fallbackPulse);
    setDataMode(mode);
    setLastRefresh(new Date());
    setFreshnessPercent(100);
    setIsLoaded(true);
  }, []);

  // Trigger a full refresh from external APIs
  const refreshData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/data/refresh", { method: "POST" });
      if (res.ok) {
        // After refresh, reload from cache
        await loadFromCache();
        setDataMode("live");
      }
    } catch {
      // Refresh failed — keep existing data
    } finally {
      setIsRefreshing(false);
    }
  }, [loadFromCache]);

  // Initial load from cache on mount
  useEffect(() => {
    loadFromCache();
  }, [loadFromCache]);

  // Re-read from cache every 5 minutes
  useEffect(() => {
    if (!isLoaded) return;
    const interval = setInterval(loadFromCache, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [isLoaded, loadFromCache]);

  // Deplete freshness bar over 5 minutes (not 15 seconds)
  useEffect(() => {
    if (!isLoaded) return;
    const interval = setInterval(() => {
      setFreshnessPercent((prev) => Math.max(0, prev - (100 / 300)));
    }, 1000);
    return () => clearInterval(interval);
  }, [isLoaded, lastRefresh]);

  return (
    <DataContext.Provider
      value={{
        sourceMarkets,
        charterOperators,
        weeklyPulse,
        lastRefresh,
        freshnessPercent,
        isLoaded,
        dataMode,
        refreshData,
        isRefreshing,
        exchangeRates,
        news,
        searchTrends,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
