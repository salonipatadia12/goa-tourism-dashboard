"use client";

import { memo, useState, useEffect } from "react";
import { Calendar, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils/formatting";

export const LiveClock = memo(function LiveClock() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());
    // Update every 60 seconds — no need for second-level precision
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  if (!currentTime) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-[#94A3B8]" />
          <span className="text-white font-mono" style={{ fontVariantNumeric: "tabular-nums" }}>
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-sm">
        <Calendar className="w-4 h-4 text-[#94A3B8]" />
        <span className="text-white font-mono" style={{ fontVariantNumeric: "tabular-nums" }}>
          {formatDate(currentTime, "long")}
        </span>
        <span className="text-[#64748B] mx-1">|</span>
        <Clock className="w-4 h-4 text-[#94A3B8]" />
        <span className="text-white font-mono" style={{ fontVariantNumeric: "tabular-nums" }}>
          {currentTime.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
      <div className="flex items-center gap-2 text-xs text-[#64748B] border-l border-white/[0.06] pl-4">
        <div className="w-2 h-2 bg-[#0EA5E9] rounded-full animate-pulse-glow" />
        <span>Live</span>
      </div>
    </div>
  );
});
