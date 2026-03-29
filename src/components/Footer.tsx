import { Cpu, Signal, Wifi } from "lucide-react";

export function Footer() {
  return (
    <footer
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        borderTop: "1px solid var(--border-default)",
        background: "var(--bg-primary)",
      }}
    >
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)" }}>
        SENTINEL v2.0 &bull; Built by Keel AI Systems &bull; Government of Goa Department of Tourism
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)" }}>
          <Cpu style={{ width: 10, height: 10 }} /> Inference: 142ms
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)" }}>
          <Signal style={{ width: 10, height: 10 }} /> Uptime: 99.7%
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)" }}>
          <Wifi style={{ width: 10, height: 10 }} /> 14 Sources Connected
        </span>
      </div>
    </footer>
  );
}
