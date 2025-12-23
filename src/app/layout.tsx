
'use client';

import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import FeatureBar from "@/components/FeatureBar";

// export const metadata: Metadata = {
//   title: "SpecCheck",
//   description: "Unbiased reviews for your next purchase.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>SpecCheck</title>
        <meta name="description" content="Unbiased reviews for your next purchase." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`font-body antialiased min-h-screen flex flex-col bg-background`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <Header />
            <FeatureBar />
            <main className="flex-grow container mx-auto px-4 py-8">
            {children}
            </main>
            <Footer />
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
