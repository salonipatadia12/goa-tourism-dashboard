/**
 * SENTINEL formatting utilities.
 * Re-exports from existing formatting.ts + adds SENTINEL-specific helpers.
 */

export {
  formatIndianNumber,
  formatShortNumber,
  calculateYoY,
  calculateRecovery,
  formatPercentage,
  formatCurrency,
  getTrendIndicator,
  formatDate,
  formatTimeAgo,
  getMonthName,
} from "./utils/formatting";

export function fmt(n: number): string {
  return n.toLocaleString("en-IN");
}

export function fmtCompact(n: number): string {
  if (n >= 10000000) return `${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

export function fmtCurrency(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}

export function fmtUSD(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}
