"use client";

import { memo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Globe2,
  TrendingUp,
  Plane,
  LineChart,
  Megaphone,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  onCollapsedChange?: (collapsed: boolean) => void;
}

const navigation = [
  { name: "Command Center", href: "/", icon: LayoutDashboard },
  { name: "Source Markets", href: "/source-markets", icon: Globe2 },
  { name: "Competitors", href: "/competitors", icon: TrendingUp },
  { name: "Charter Ops", href: "/charter-ops", icon: Plane },
  { name: "Predictions", href: "/predictions", icon: LineChart },
  { name: "Campaigns", href: "/campaigns", icon: Megaphone },
  { name: "Reports", href: "/reports", icon: FileText },
];

export const Sidebar = memo(function Sidebar({ onCollapsedChange }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    onCollapsedChange?.(next);
  };

  return (
    <aside
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: isCollapsed ? "64px" : "240px",
        height: "100vh",
        zIndex: 50,
        background: "rgba(18, 19, 26, 0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderRight: "1px solid var(--border-subtle)",
        transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Logo */}
      <div
        style={{
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: isCollapsed ? "center" : "space-between",
          padding: isCollapsed ? "0" : "0 16px",
          borderBottom: "1px solid var(--border-subtle)",
          flexShrink: 0,
        }}
      >
        {!isCollapsed && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "linear-gradient(135deg, #F59E0B, #D97706)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 16px rgba(245, 158, 11, 0.2)",
              }}
            >
              <span style={{ color: "#0A0A0F", fontWeight: 700, fontSize: 13 }}>GT</span>
            </div>
            <div style={{ lineHeight: 1.2 }}>
              <div style={{ color: "var(--text-primary)", fontWeight: 600, fontSize: 13 }}>
                Goa Tourism
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: 11 }}>Intelligence</div>
            </div>
          </div>
        )}
        <button
          onClick={handleToggle}
          style={{
            padding: 6,
            borderRadius: 6,
            background: "transparent",
            border: "none",
            color: "var(--text-secondary)",
            transition: "background 150ms",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
          onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav style={{ padding: "12px 8px", flex: 1, overflow: "hidden" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: isCollapsed ? "10px 0" : "10px 12px",
                  justifyContent: isCollapsed ? "center" : "flex-start",
                  borderRadius: 8,
                  textDecoration: "none",
                  position: "relative",
                  background: isActive ? "rgba(245, 158, 11, 0.08)" : "transparent",
                  color: isActive ? "#F59E0B" : "var(--text-secondary)",
                  transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                }}
                onMouseOver={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.color = "var(--text-primary)";
                  }
                }}
                onMouseOut={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--text-secondary)";
                  }
                }}
              >
                {/* Active left accent bar */}
                {isActive && (
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "20%",
                      bottom: "20%",
                      width: 3,
                      borderRadius: 2,
                      background: "#F59E0B",
                      boxShadow: "0 0 8px rgba(245, 158, 11, 0.4)",
                    }}
                  />
                )}
                <Icon style={{ width: 18, height: 18, flexShrink: 0 }} />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div
          style={{
            padding: "12px 16px",
            borderTop: "1px solid var(--border-subtle)",
            flexShrink: 0,
          }}
        >
          <div style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.5 }}>
            <div>Government of Goa</div>
            <div>Department of Tourism</div>
          </div>
        </div>
      )}
    </aside>
  );
});
