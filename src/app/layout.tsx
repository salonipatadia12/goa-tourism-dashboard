import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SENTINEL — Goa International Tourist Recovery AI",
  description: "Intelligence dashboard tracking international tourist recovery for the Government of Goa",
  keywords: ["Goa Tourism", "SENTINEL", "Tourism Analytics", "Government Dashboard", "Tourist Recovery"],
  authors: [{ name: "Keel AI Systems" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ colorScheme: "dark" }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
