"use client";

import { useEffect, useState } from "react";
import { Shield } from "lucide-react";

export function Header() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const d = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
      const t = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
      setTime(`${d} • ${t} IST`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 20px",
        background: "rgba(6, 8, 13, 0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border-default)",
      }}
    >
      {/* Left: Logo + Name */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            background: "linear-gradient(135deg, var(--cyan), var(--purple))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Shield style={{ width: 22, height: 22, color: "#fff" }} />
        </div>
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 3,
              color: "var(--cyan)",
              lineHeight: 1,
            }}
          >
            SENTINEL
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--text-muted)",
              letterSpacing: 1,
              marginTop: 2,
            }}
          >
            GOA INTERNATIONAL TOURIST RECOVERY AI
          </div>
        </div>
      </div>

      {/* Right: Status + Freshness + Clock */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {/* System Status Pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 12px",
            borderRadius: 20,
            background: "var(--emerald-dim)",
            border: "1px solid rgba(0,255,136,0.2)",
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--emerald)",
              boxShadow: "0 0 8px var(--emerald)",
            }}
            className="animate-pulse-dot"
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: 600,
              color: "var(--emerald)",
              letterSpacing: 0.5,
            }}
          >
            SYSTEMS ONLINE
          </span>
        </div>

        {/* Data Freshness */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", letterSpacing: 0.5 }}>
            DATA FRESHNESS
          </span>
          <div className="freshness-bar">
            <div className="freshness-bar-fill" />
          </div>
        </div>

        {/* Clock */}
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            color: "var(--text-muted)",
            minWidth: 200,
            textAlign: "right",
          }}
        >
          {time}
        </span>
      </div>
    </header>
  );
}
