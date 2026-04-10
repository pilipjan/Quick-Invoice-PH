"use client";

import { Scale, ArrowLeft, Info, Landmark, HelpCircle, CheckCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-surface-950 text-white font-sans selection:bg-primary-500/30">

      <main className="max-w-4xl mx-auto py-12 px-6 lg:py-20">
        <div className="space-y-8">
          <section className="space-y-4 text-center pb-8 border-b border-surface-800">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white to-surface-400 bg-clip-text text-transparent">
              BIR Sales Invoice Guide (2024)
            </h1>
            <p className="text-surface-400 text-lg max-w-2xl mx-auto">
              Everything you need to know about the **Ease of Paying Taxes (EOPT) Act** and how it affects your billing.
            </p>
          </section>

          <section className="p-8 bg-primary-600/5 border border-primary-500/20 rounded-3xl space-y-4">
             <div className="flex items-center gap-3 text-primary-400">
                <Landmark className="w-6 h-6" />
                <h2 className="text-2xl font-bold">The Shift: Official Receipt → Sales Invoice</h2>
             </div>
             <p className="text-surface-300 leading-relaxed">
               Under **Revenue Regulation (RR) No. 7-2024**, the BIR has mandated the use of **Sales Invoices** for both goods and services. The traditional "Official Receipt" is now only a supplementary document. 
             </p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="bg-surface-900 p-4 rounded-xl border border-surface-800">
                   <h4 className="font-bold mb-2">Before EOPT</h4>
                   <p className="text-xs text-surface-500">Official Receipts for services, Sales Invoices for goods.</p>
                </div>
                <div className="bg-primary-500/10 p-4 rounded-xl border border-primary-500/20">
                   <h4 className="font-bold mb-2 text-primary-400">After EOPT (Current)</h4>
                   <p className="text-xs text-primary-300/80">**Sales Invoice** is the primary document for ALL transactions.</p>
                </div>
             </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="p-6 bg-surface-900 border border-surface-800 rounded-3xl space-y-3">
                <Info className="w-8 h-8 text-blue-400" />
                <h3 className="text-xl font-bold">What is RR 11-2024?</h3>
                <p className="text-sm text-surface-400 leading-relaxed">
                  This regulation provides the transition rules. Businesses are allowed to use their remaining "Official Receipt" booklets by striking out the term and stamping **"Sales Invoice"** until fully consumed.
                </p>
             </div>
             <div className="p-6 bg-surface-900 border border-surface-800 rounded-3xl space-y-3">
                <HelpCircle className="w-8 h-8 text-emerald-400" />
                <h3 className="text-xl font-bold">E-Commerce Sellers</h3>
                <p className="text-sm text-surface-400 leading-relaxed">
                  **Shopee and Lazada sellers** are strictly required to issue Sales Invoices. QuickInvoice PH helps you generate pro-forma versions to track your sales before encoding them into your official BIR-registered system.
                </p>
             </div>
          </div>

          <section className="space-y-6 pt-8">
            <h2 className="text-2xl font-bold flex items-center gap-3">
               <Scale className="w-6 h-6 text-primary-400" />
               Is this tool BIR-Approved?
            </h2>
            <div className="space-y-4 text-surface-300 leading-relaxed">
               <p>
                 QuickInvoice PH is a **technical layout tool**. It is **not** a POS system or a pre-registered Computerized Accounting System (CAS).
               </p>
               <ul className="space-y-3">
                  <li className="flex gap-3 items-start">
                     <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                     <span>**PRO-FORMA ONLY**: Use this for billing statements, service quotes, and internal record keeping.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                     <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                     <span>**LEGAL COMPLIANCE**: All generated documents automatically carry the mandatory "Pro-forma" watermark to prevent fraudulent use as tax receipts.</span>
                  </li>
               </ul>
            </div>
          </section>

          <div className="pt-12 border-t border-surface-800 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm text-surface-500 space-y-1">
              <p>Reference: BIR Revenue Regulation No. 7-2024 & 11-2024</p>
              <p>Ease of Paying Taxes (EOPT) Act - Republic Act No. 11976</p>
            </div>
            <Link 
               href="/builder" 
               className={cn(buttonVariants({ variant: "default" }), "gradient-primary text-white font-semibold px-8 h-12")}
            >
              Start Generating Sales Invoices
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
