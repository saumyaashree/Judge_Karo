
'use client';

import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AccessibilityProvider, AccessibilityContext } from "@/context/AccessibilityContext";
import React from "react";

// export const metadata: Metadata = {
//   title: "JudgeKro",
//   description: "Unbiased reviews for your next purchase.",
// };

function AppBody({ children }: { children: React.ReactNode }) {
    const { isAccessibilityMode } = React.useContext(AccessibilityContext);
    return (
        <body className={`font-body antialiased min-h-screen flex flex-col ${isAccessibilityMode ? 'accessibility-mode' : ''}`}>
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
            {children}
            </main>
            <Footer />
            <Toaster />
        </body>
    )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>JudgeKro</title>
        <meta name="description" content="Unbiased reviews for your next purchase." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <AccessibilityProvider>
        <AppBody>{children}</AppBody>
      </AccessibilityProvider>
    </html>
  );
}
