"use client";

import { Lock, ArrowLeft, Database, Eye, Globe } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-surface-950 text-white font-sans selection:bg-primary-500/30">
      <header className="px-4 lg:px-8 h-16 flex items-center glass border-b border-surface-800 sticky top-0 z-10">
        <Link href="/" className="flex items-center text-surface-400 hover:text-white transition-colors mr-6">
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back
        </Link>
        <div className="flex items-center font-bold text-lg tracking-tight text-white border-l border-surface-700 pl-6 h-8">
          Privacy Policy
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-12 px-6 lg:py-20">
        <div className="space-y-8">
          <section className="space-y-4 text-center pb-8 border-b border-surface-800">
            <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary-500/20">
              <Lock className="w-8 h-8 text-primary-400" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-surface-400 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-surface-400 text-lg">
              Committed to the Philippine Data Privacy Act (DPA) of 2012.
            </p>
          </section>

          <div className="space-y-12">
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-primary-400">
                <Database className="w-6 h-6" />
                <h2 className="text-2xl font-bold">1. Data We Collect</h2>
              </div>
              <p className="text-surface-300 leading-relaxed">
                We collect information to provide a personalized invoicing experience:
              </p>
              <ul className="list-disc list-inside space-y-2 text-surface-400 pl-4">
                <li>**Account Data**: Gmail address and profile picture via Google OAuth.</li>
                <li>**Business Profile**: Trade name, TIN, address, logo, and signature images.</li>
                <li>**Invoice Content**: Client details, item descriptions, and transaction amounts.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3 text-emerald-400">
                <Eye className="w-6 h-6" />
                <h2 className="text-2xl font-bold">2. How We Use Data</h2>
              </div>
              <p className="text-surface-300 leading-relaxed">
                Your data is used exclusively to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-surface-400 pl-4">
                <li>Pre-fill your invoices for faster generation.</li>
                <li>Sync your data across devices (Cloud Storage).</li>
                <li>Allow you to access a history of your past transactions.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3 text-blue-400">
                <Globe className="w-6 h-6" />
                <h2 className="text-2xl font-bold">3. Data Security & Hosting</h2>
              </div>
              <p className="text-surface-300 leading-relaxed">
                All data is securely stored using **Supabase** (PostgreSQL) with Row-Level Security (RLS) enabled. Only you can access your saved business profiles and invoices. We do not sell or share your data with third-party advertisers.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">4. Your Rights</h2>
              <p className="text-surface-300 leading-relaxed">
                Under the PH Data Privacy Act, you have the right to access, correct, or request the deletion of your personal data at any time. You can clear your local cache or delete your cloud history through our dashboard settings.
              </p>
            </section>
          </div>

          <div className="pt-12 border-t border-surface-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-surface-500 italic">
              Last updated: April 10, 2026
            </p>
            <div className="flex gap-4">
              <Link href="/terms" className={cn(buttonVariants({ variant: "ghost" }), "text-surface-400 hover:text-white")}>
                Read Terms
              </Link>
              <Link href="/login" className={cn(buttonVariants({ variant: "outline" }), "text-surface-300 hover:text-white")}>
                Return to Login
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
