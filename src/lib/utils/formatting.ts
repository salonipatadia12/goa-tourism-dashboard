/**
 * Number Formatting Utilities
 * Indian numbering system (Lakhs/Crores) and international comparisons
 */

/**
 * Format number in Indian lakh/crore system
 * @example formatIndianNumber(517802) => "5.17L"
 * @example formatIndianNumber(10800000) => "1.08Cr"
 * @example formatIndianNumber(517802, true) => "5,17,802"
 */
export function formatIndianNumber(num: number, withCommas = false): string {
  if (withCommas) {
    // Indian comma format: 5,17,802
    return num.toLocaleString('en-IN');
  }

  // Lakh/Crore format
  if (num >= 10000000) {
    // Crore (1 Cr = 100 lakhs = 10,000,000)
    return `${(num / 10000000).toFixed(2)}Cr`;
  } else if (num >= 100000) {
    // Lakh (1 L = 100,000)
    return `${(num / 100000).toFixed(2)}L`;
  } else if (num >= 1000) {
    // Thousands
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

/**
 * Format number with K/M suffix (International format)
 * @example formatShortNumber(890459) => "890K"
 * @example formatShortNumber(1784) => "1.8K"
 */
export function formatShortNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

/**
 * Calculate Year-over-Year percentage change
 * @returns {value: number, formatted: string, isPositive: boolean}
 */
export function calculateYoY(current: number, previous: number): {
  value: number;
  formatted: string;
  isPositive: boolean;
} {
  if (previous === 0) {
    return { value: 0, formatted: "N/A", isPositive: true };
  }

  const change = ((current - previous) / previous) * 100;
  const isPositive = change >= 0;
  const formatted = `${isPositive ? "+" : ""}${change.toFixed(1)}% YoY`;

  return {
    value: change,
    formatted,
    isPositive,
  };
}

/**
 * Calculate recovery percentage against benchmark
 * @example calculateRecovery(517802, 890459) => { value: 58.15, formatted: "58% of pre-pandemic peak" }
 */
export function calculateRecovery(current: number, benchmark: number): {
  value: number;
  formatted: string;
  gap: number;
} {
  const percentage = (current / benchmark) * 100;
  const gap = 100 - percentage;

  return {
    value: percentage,
    formatted: `${percentage.toFixed(0)}% of pre-pandemic peak`,
    gap,
  };
}

/**
 * Format percentage
 * @example formatPercentage(58.15) => "58.2%"
 */
export function formatPercentage(num: number, decimals = 1): string {
  return `${num.toFixed(decimals)}%`;
}

/**
 * Format currency (Indian Rupees)
 * @example formatCurrency(30000) => "₹30,000"
 */
export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

/**
 * Get trend indicator (arrow) based on YoY change
 */
export function getTrendIndicator(yoyChange: number): {
  icon: "↑" | "↓" | "→";
  color: "positive" | "negative" | "neutral";
} {
  if (yoyChange > 0.5) {
    return { icon: "↑", color: "positive" };
  } else if (yoyChange < -0.5) {
    return { icon: "↓", color: "negative" };
  }
  return { icon: "→", color: "neutral" };
}

/**
 * Format date for display
 * @example formatDate(new Date()) => "27 Mar 2026"
 */
export function formatDate(date: Date, format: "short" | "long" = "short"): string {
  if (format === "long") {
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Format time ago (relative time)
 * @example formatTimeAgo(new Date('2025-12-20')) => "7 days ago"
 */
export function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 30) return `${diffDays}d ago`;
  return formatDate(date);
}

/**
 * Get month name from month number
 */
export function getMonthName(month: number, short = false): string {
  const months = short
    ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return months[month - 1] || "";
}
