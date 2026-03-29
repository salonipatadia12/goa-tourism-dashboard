"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Eye, AlertTriangle, Globe, Target, Plane, Activity, Zap, FileText, Crosshair } from "lucide-react";

const TABS = [
  { href: "/", label: "COMMAND CENTER", icon: Eye },
  { href: "/diagnosis", label: "DIAGNOSIS", icon: AlertTriangle },
  { href: "/source-markets", label: "SOURCE MARKETS", icon: Globe },
  { href: "/competitors", label: "COMPETITORS", icon: Target },
  { href: "/charter-ops", label: "CHARTER OPS", icon: Plane },
  { href: "/predictions", label: "PREDICTIONS", icon: Activity },
  { href: "/campaigns", label: "CAMPAIGNS", icon: Zap },
  { href: "/reports", label: "REPORTS", icon: FileText },
  { href: "/policy", label: "POLICY", icon: Crosshair },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        display: "flex",
        gap: 4,
        padding: "8px 20px",
        borderBottom: "1px solid var(--border-default)",
        background: "var(--bg-primary)",
        overflowX: "auto",
      }}
    >
      {TABS.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              borderRadius: 6,
              border: `1px solid ${isActive ? "rgba(0,212,255,0.25)" : "transparent"}`,
              background: isActive ? "var(--cyan-dim)" : "transparent",
              color: isActive ? "var(--cyan)" : "var(--text-muted)",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: 1,
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "all 150ms ease",
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = "var(--text-primary)";
                e.currentTarget.style.borderColor = "var(--border-default)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = "var(--text-muted)";
                e.currentTarget.style.borderColor = "transparent";
              }
            }}
          >
            <Icon style={{ width: 14, height: 14 }} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
