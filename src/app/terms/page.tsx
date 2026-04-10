"use client";

import { FileText, ArrowLeft, ShieldCheck, Scale, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-surface-950 text-white font-sans selection:bg-primary-500/30">
      <header className="px-4 lg:px-8 h-16 flex items-center glass border-b border-surface-800 sticky top-0 z-10">
        <Link href="/" className="flex items-center text-surface-400 hover:text-white transition-colors mr-6">
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back
        </Link>
        <div className="flex items-center font-bold text-lg tracking-tight text-white border-l border-surface-700 pl-6 h-8">
          Terms of Use
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-12 px-6 lg:py-20">
        <div className="space-y-8">
          <section className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-surface-400 bg-clip-text text-transparent">
              Terms of Use
            </h1>
            <p className="text-surface-400 text-lg">
              Effective Date: April 10, 2026
            </p>
          </section>

          <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl flex gap-4 items-start">
            <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-1" />
            <div className="space-y-2">
              <h3 className="font-bold text-red-400 uppercase tracking-wider text-sm">Critical Legal Notice</h3>
              <p className="text-sm text-red-200/80 leading-relaxed">
                QuickInvoice PH is a productivity tool for generating sales evidence and expense documentation. It does **NOT** issue official receipts or invoices recognized by the Bureau of Internal Revenue (BIR) unless the user has obtained their own valid Authority to Print (ATP) or CAS permit.
              </p>
            </div>
          </div>

          <div className="space-y-12 pt-8">
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-primary-400">
                <ShieldCheck className="w-6 h-6" />
                <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
              </div>
              <p className="text-surface-300 leading-relaxed">
                By accessing or using QuickInvoice PH, you agree to be bound by these Terms of Use. If you do not agree to these terms, you must not use the software.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3 text-primary-400">
                <Scale className="w-6 h-6" />
                <h2 className="text-2xl font-bold">2. Compliance with Philippine Tax Laws</h2>
              </div>
              <p className="text-surface-300 leading-relaxed">
                Users are solely responsible for ensuring that their use of QuickInvoice PH complies with the National Internal Revenue Code and all prevailing BIR regulations.
              </p>
              <ul className="list-disc list-inside space-y-2 text-surface-400 pl-4">
                <li>You acknowledge that pro-forma invoices generated here are not valid for claim of Input VAT.</li>
                <li>You agree not to use this tool for tax evasion or fraudulent insurance claims.</li>
                <li>You assume all liability for penalties arising from unauthorized issuance of receipts.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3 text-primary-400">
                <FileText className="w-6 h-6" />
                <h2 className="text-2xl font-bold">3. No Professional Advice</h2>
              </div>
              <p className="text-surface-300 leading-relaxed">
                The content and tools provided are for informational purposes only and do not constitute legal, financial, or tax advice. Always consult with a Certified Public Accountant (CPA) for your business compliance needs.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">4. Limitation of Liability</h2>
              <p className="text-surface-300 leading-relaxed">
                QuickInvoice PH and its developers shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the service, including but not limited to BIR audits, fines, or loss of data.
              </p>
            </section>
          </div>

          <div className="pt-12 border-t border-surface-800 flex justify-between items-center">
            <p className="text-sm text-surface-500 italic">
              Last updated: April 10, 2026
            </p>
            <Link 
              href="/builder" 
              className={cn(buttonVariants({ variant: "outline" }), "text-surface-300 hover:text-white")}
            >
              I Understand, Start Building
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
