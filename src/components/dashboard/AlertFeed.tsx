"use client";

import { memo } from "react";
import { TrendingUp, TrendingDown, AlertTriangle, AlertCircle } from "lucide-react";
import { formatTimeAgo } from "@/lib/utils/formatting";

export interface Alert {
  id: number;
  type: "positive" | "negative" | "warning" | "info";
  title: string;
  message: string;
  timestamp: Date;
  priority: "high" | "medium" | "low";
}

interface AlertFeedProps {
  alerts: Alert[];
}

const ALERT_CONFIG = {
  positive: { icon: TrendingUp, color: "var(--positive)", bg: "var(--positive-glow)" },
  negative: { icon: TrendingDown, color: "var(--negative)", bg: "var(--negative-glow)" },
  warning: { icon: AlertTriangle, color: "var(--warning)", bg: "var(--accent-glow)" },
  info: { icon: AlertCircle, color: "var(--info)", bg: "rgba(59,130,246,0.15)" },
};

export const AlertFeed = memo(function AlertFeed({ alerts }: AlertFeedProps) {
  return (
    <div className="card" style={{ padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <span className="section-heading">Intelligence Alerts</span>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            className="animate-pulse-glow"
            style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--positive)" }}
          />
          <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Live</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {alerts.length === 0 ? (
          <div style={{ textAlign: "center", padding: 32, color: "var(--text-muted)" }}>
            <AlertCircle style={{ width: 32, height: 32, margin: "0 auto 8px", opacity: 0.5 }} />
            <p style={{ fontSize: 13 }}>No alerts at this time</p>
          </div>
        ) : (
          alerts.map((alert) => {
            const config = ALERT_CONFIG[alert.type];
            const Icon = config.icon;

            return (
              <div
                key={alert.id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  padding: "12px 14px",
                  borderRadius: 8,
                  background: "var(--bg-base)",
                  border: "1px solid var(--border-subtle)",
                  borderLeft: `3px solid ${config.color}`,
                  cursor: "pointer",
                  transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-md)";
                  e.currentTarget.style.borderColor = "var(--border-medium)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                }}
              >
                <Icon
                  style={{
                    width: 16,
                    height: 16,
                    color: config.color,
                    marginTop: 2,
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 4 }}>
                    <h4 style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.3 }}>
                      {alert.title}
                    </h4>
                    {alert.priority === "high" && (
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          padding: "2px 6px",
                          borderRadius: 4,
                          background: config.bg,
                          color: config.color,
                          flexShrink: 0,
                        }}
                      >
                        High
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 4 }}>
                    {alert.message}
                  </p>
                  <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
                    {formatTimeAgo(alert.timestamp)}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
});
