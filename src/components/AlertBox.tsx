import { Zap, AlertTriangle, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface AlertBoxProps {
  type: "insight" | "alert" | "info";
  children: ReactNode;
}

const configs: Record<string, { icon: LucideIcon; accent: string; prefix: string; className: string }> = {
  insight: { icon: Zap, accent: "var(--amber)", prefix: "AI INSIGHT:", className: "alert-box alert-box-amber" },
  alert: { icon: AlertTriangle, accent: "var(--crimson)", prefix: "\u26A0 ALERT:", className: "alert-box alert-box-crimson" },
  info: { icon: Zap, accent: "var(--cyan)", prefix: "INFO:", className: "alert-box alert-box-cyan" },
};

export function AlertBox({ type, children }: AlertBoxProps) {
  const { icon: Icon, accent, prefix, className } = configs[type];
  return (
    <div className={className} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
      <Icon style={{ width: 16, height: 16, color: accent, flexShrink: 0, marginTop: 2 }} />
      <div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: accent, marginRight: 6 }}>
          {prefix}
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6 }}>
          {children}
        </span>
      </div>
    </div>
  );
}
