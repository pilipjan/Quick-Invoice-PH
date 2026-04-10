"use client";

import { Scale, ArrowLeft, Info, Landmark, HelpCircle, CheckCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-surface-950 text-white font-sans selection:bg-primary-500/30">
      <header className="px-4 lg:px-8 h-16 flex items-center glass border-b border-surface-800 sticky top-0 z-10">
        <Link href="/" className="flex items-center text-surface-400 hover:text-white transition-colors mr-6">
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back
        </Link>
        <div className="flex items-center font-bold text-lg tracking-tight text-white border-l border-surface-700 pl-6 h-8">
          BIR Compliance Notice
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-12 px-6 lg:py-20">
        <div className="space-y-8">
          <section className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-surface-400 bg-clip-text text-transparent">
              BIR & EIS Compliance
            </h1>
            <p className="text-surface-400 text-lg">
              Understanding your duties as a Philippine taxpayer.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="p-6 bg-surface-900 border border-surface-800 rounded-3xl space-y-3">
                <Landmark className="w-8 h-8 text-primary-400" />
                <h3 className="text-xl font-bold">What is EIS?</h3>
                <p className="text-sm text-surface-400 leading-relaxed">
                  The **Electronic Invoicing System (EIS)** is the BIR's mandate for certain taxpayers (e.g., e-commerce, large taxpayers) to issue and report sales data electronically in near real-time.
                </p>
             </div>
             <div className="p-6 bg-surface-900 border border-surface-800 rounded-3xl space-y-3">
                <Info className="w-8 h-8 text-blue-400" />
                <h3 className="text-xl font-bold">Authority to Print (ATP)</h3>
                <p className="text-sm text-surface-400 leading-relaxed">
                  Every business must have a valid **Authority to Print** for manual receipts or a **CAS (Computerized Accounting System)** permit for digital ones. 
                </p>
             </div>
          </div>

          <div className="space-y-12 pt-8">
            <section className="space-y-6">
              <div className="flex items-center gap-3 text-emerald-400">
                <HelpCircle className="w-6 h-6" />
                <h2 className="text-2xl font-bold">Is QuickInvoice PH BIR-Compliant?</h2>
              </div>
              <p className="text-surface-300 leading-relaxed">
                QuickInvoice PH is a **technical framework** for generating professional layout invoices. It is **not** a pre-registered CAS software.
              </p>
              
              <div className="bg-surface-900/50 border border-surface-800 p-8 rounded-3xl space-y-6">
                 <h4 className="font-bold text-white flex items-center gap-2">
                   <CheckCircle className="w-4 h-4 text-emerald-500" />
                   Approved Use Cases:
                 </h4>
                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <li className="flex gap-3 text-sm text-surface-400">
                       <span className="w-1.5 h-1.5 rounded-full bg-surface-700 mt-2 shrink-0" />
                       Issuing pro-forma invoices for service quotations.
                    </li>
                    <li className="flex gap-3 text-sm text-surface-400">
                       <span className="w-1.5 h-1.5 rounded-full bg-surface-700 mt-2 shrink-0" />
                       Internal expense reimbursement tracking for employees.
                    </li>
                    <li className="flex gap-3 text-sm text-surface-400">
                       <span className="w-1.5 h-1.5 rounded-full bg-surface-700 mt-2 shrink-0" />
                       Freelancers documenting non-VAT sales for record-keeping.
                    </li>
                    <li className="flex gap-3 text-sm text-surface-400">
                       <span className="w-1.5 h-1.5 rounded-full bg-surface-700 mt-2 shrink-0" />
                       Personal side-project earnings documentation.
                    </li>
                 </ul>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3 text-primary-400">
                <Scale className="w-6 h-6" />
                <h2 className="text-2xl font-bold">Mandatory BIR Disclaimers</h2>
              </div>
              <p className="text-surface-300 leading-relaxed">
                By BIR regulation (RR No. 10-2015), any computerized software producing invoices must display a specific disclaimer if it is not a registered CAS. Our system automatically appends this to the bottom of all PDFs:
              </p>
              <div className="p-4 bg-surface-950 font-mono text-[10px] text-surface-500 text-center uppercase tracking-tighter border border-surface-800 rounded">
                "Disclaimer: System generated. Not a substitute for BIR-authorized receipts without valid ATP/CAS. Issuer assumes all liability."
              </div>
            </section>
          </div>

          <div className="pt-12 border-t border-surface-800 flex justify-between items-center">
            <p className="text-sm text-surface-500">
              Reference: BIR Revenue Memorandum Order No. 24-2023
            </p>
            <Link 
               href="/builder" 
               className={cn(buttonVariants({ variant: "default" }), "gradient-primary text-white font-semibold px-6")}
            >
              I Understand, Let's Build
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
