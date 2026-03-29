"use client";

import type { ReactNode } from "react";
import { Header } from "./Header";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { DataProvider } from "@/context/DataProvider";

export function SentinelShell({ children }: { children: ReactNode }) {
  return (
    <DataProvider>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", position: "relative" }}>
        {/* Grid background */}
        <div className="sentinel-grid-bg" />
        {/* Scanline */}
        <div className="sentinel-scanline" />

        {/* Content at z-2 */}
        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Header />
          <Navigation />
          <main style={{ flex: 1, maxWidth: 1680, width: "100%", margin: "0 auto", padding: "0 20px 40px" }}>
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </DataProvider>
  );
}
