// app/layout.tsx
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata: Metadata = {
  title: {
    default: "Advanced Solar Solutions", // This will be the title for routes without a page.tsx metadata.title
    template: "%s | Advanced Solar Solutions", // This template will be used for pages that define their own title
  },
  description: "Harness the power of tomorrow with our cutting-edge solar technologies. From intelligent panels to AI-driven grid management, we deliver enterprise-grade solutions that transform how energy is generated, managed, and distributed.",
  // You might want to add other global metadata here, like openGraph, twitter, icons etc.
  // For example:
  openGraph: {
    title: "Leading Solar EPC Solutions",
    description: "Harness the power of tomorrow with our cutting-edge solar technologies.",
    url: "https://rrenterprises.one", // Replace with your actual domain
    siteName: "Advanced Solar Solutions",
    images: [
      {
        url: "https://rrenterprises.one/rr-logo.png", // Replace with a default Open Graph image
        width: 1200,
        height: 630,
        alt: "Advanced Solar Solutions",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}