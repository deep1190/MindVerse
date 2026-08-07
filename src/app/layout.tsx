import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MindVerse — Why Is It Trending?",
  description:
    "Understand the complete story behind anything trending. Eight specialized AI agents investigate, sequence timelines, decode social sentiment, explain meme culture, and predict longevity — for any person, event, company, or technology.",
  keywords: ["trending", "AI", "news analysis", "why is it trending", "sentiment analysis", "trend explainer"],
  openGraph: {
    title: "MindVerse — Why Is It Trending?",
    description:
      "AI-powered trend intelligence. Search any topic and get a full breakdown: timeline, sentiment, social pulse, meme decoder, and expert analysis.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full bg-[#050816] text-slate-100 antialiased font-sans select-none relative">
        {/* HUD Scanlines & Grid Overlay */}
        <div className="scanlines" />
        <div className="hud-grid" />

        {/* App Container */}
        <main className="relative z-10 flex flex-col min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
