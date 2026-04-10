import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuickInvoice PH - Free EOPT-Compliant Sales Invoice Generator",
  description: "Generate BIR-compliant Sales Invoices (per RR 7-2024) for free. Optimized for Shopee, Lazada sellers, and Filipino small businesses with no sign-up required.",
  keywords: ["Sales Invoice Generator Philippines", "RR 7-2024 Compliance", "EOPT Act PH", "Shopee Seller Invoice Maker", "Free Receipt Maker No Signup", "Lazada Invoice Generator"],
  authors: [{ name: "Philip John Santiano" }],
  openGraph: {
    title: "QuickInvoice PH - Sales Invoice Generator",
    description: "The fastest way to generate EOPT Act compliant invoices in the Philippines.",
    url: "https://invoice.philipjohnn8nautomation.online",
    siteName: "QuickInvoice PH",
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    title: "QuickInvoice PH",
    description: "Free Pro-forma Invoice Generator for Filipinos.",
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  verification: {
    google: "UaOSg89_kEa1zlI5_Svx4gbYyM15Z1-tDOidWy5RjKk",
  },
  manifest: "/manifest.json",
  themeColor: "#0f172a",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "QuickInvoice PH",
  },
};

import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster position="top-right" richColors />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
