// app/layout.tsx
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans"; // Correct import for Geist Sans
import { GeistMono } from "geist/font/mono"; // Correct import for Geist Mono
import "./globals.css";
import { ThemeProvider } from "next-themes"; // Import ThemeProvider

// Import Vercel Analytics and Speed Insights
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next";

// Corrected font imports based on Geist usage
const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata: Metadata = {
  title: "Advanced Solar Solutions", // More descriptive title
  description: "Harness the power of tomorrow with our cutting-edge solar technologies. From intelligent panels to AI-driven grid management, we deliver enterprise-grade solutions that transform how energy is generated, managed, and distributed.", // More descriptive description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning is crucial for next-themes to prevent
    // hydration mismatches between server and client rendering for the `class` attribute.
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/*
          The ThemeProvider wraps your entire application.
          - 'attribute="class"' tells next-themes to add/remove the 'dark' class to the <html> element.
          - 'defaultTheme="system"' makes it respect the user's OS preference by default.
          - 'enableSystem' allows switching between light/dark/system.
          - 'disableTransitionOnChange' prevents flickering when theme changes (optional but good for UX).
        */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics /> {/* Vercel Analytics */}
        <SpeedInsights /> {/* Vercel Speed Insights */}
      </body>
    </html>
  );
}