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
  title: "QuickInvoice PH - Free Pro-forma Invoice Generator & BIR Compliance Guide",
  description: "Generate professional pro-forma invoices, receipts, and quotations for free. Built for Philippine businesses with VAT, non-VAT, and SC/PWD discount support.",
  keywords: ["Philippines Invoice", "PH Receipt Generator", "Free Pro-forma Invoice", "BIR Compliance Philippines", "Sales Invoice Template PH"],
  authors: [{ name: "Philip John Santiano" }],
  openGraph: {
    title: "QuickInvoice PH - Free Invoice Generator",
    description: "The fastest way to generate bookkeeping-ready invoices in the Philippines.",
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
      </body>
    </html>
  );
}
