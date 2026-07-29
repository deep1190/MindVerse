import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MindVerse | Explore Intelligence. Understand the World.",
  description: "An AI-powered knowledge universe where users explore planets. Explore the Trending Now engine, trace multi-agent operations, chronological timelines, social pulse sentiment databases, and meme decoders.",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal?: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full bg-space-black text-slate-100 antialiased font-sans select-none relative">
        {/* HUD Scanlines & Grid Overlay */}
        <div className="scanlines" />
        <div className="hud-grid" />
        
        {/* Interactive App Container */}
        <main className="relative z-10 flex flex-col min-h-screen">
          {children}
        </main>
        {modal}
      </body>
    </html>
  );
}
