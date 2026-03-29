import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface PanelProps {
  title: string;
  icon?: LucideIcon;
  accentColor?: string;
  badge?: ReactNode;
  children: ReactNode;
  style?: React.CSSProperties;
}

export function Panel({ title, icon: Icon, accentColor = "var(--cyan)", badge, children, style }: PanelProps) {
  return (
    <div className="panel" style={style}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div className="panel-title">
          {Icon && <Icon style={{ width: 16, height: 16, color: accentColor }} />}
          <span>{title}</span>
        </div>
        {badge}
      </div>
      {children}
    </div>
  );
}
