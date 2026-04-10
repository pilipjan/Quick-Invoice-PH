"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, ArrowRight, Check, Zap, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-surface-950 font-sans">

      <main className="flex-1">
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 mt-12">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light text-sm text-primary-300 mb-8">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Frictionless & BIR-Compliant
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight text-balance">
                Professional Invoices, <br/>
                <span className="gradient-text">Under 60 Seconds</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-6 text-lg sm:text-xl text-surface-300 max-w-2xl mx-auto text-balance leading-relaxed">
                No sign-up required. Instantly generate Philippine-compliant sales invoices. Download as a crisp PDF and send to your clients right away.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/builder" className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 gradient-primary text-white font-semibold px-8 py-4 rounded-full text-lg shadow-[var(--shadow-glow)] hover:shadow-primary-500/50 transition-all hover:scale-[1.02]">
                  Create Invoice Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/login" className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-emerald-500/40 text-emerald-400 font-semibold px-8 py-4 rounded-full text-lg hover:bg-emerald-500/10 hover:border-emerald-400/60 transition-all">
                  Sign in to Save History
                </Link>
              </motion.div>
            </div>
            
            {/* Minimalist Showcase Area */}
            <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-20 max-w-5xl mx-auto relative perspective-1000">
               <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-surface-700/50 bg-surface-900 aspect-video flex items-center justify-center p-8 z-10">
                  <div className="bg-white text-black p-8 rounded-md w-full max-w-2xl mx-auto shadow-xl opacity-90 transform rotate-1 scale-105 border">
                     {/* Mock Invoice UI */}
                     <div className="flex justify-between items-start border-b pb-4 mb-4">
                        <div>
                           <h2 className="text-2xl font-bold tracking-tight">SALES INVOICE</h2>
                        </div>
                        <div className="text-right">
                           <h3 className="font-bold">Juan's Tech Services</h3>
                           <p className="text-sm text-gray-500">TIN: 123-456-789-000 (VAT Reg)</p>
                        </div>
                     </div>
                     <div className="space-y-2 text-sm">
                        <div className="flex justify-between font-bold border-b pb-2"><span>Item</span><span>Total</span></div>
                        <div className="flex justify-between"><span>Web Development Services</span><span>₱ 15,000.00</span></div>
                        <div className="flex justify-between"><span>Hosting Maintenance</span><span>₱ 2,500.00</span></div>
                     </div>
                     <div className="mt-8 pt-4 border-t flex justify-end">
                        <div className="w-48 space-y-1 text-sm">
                           <div className="flex justify-between text-gray-500"><span>Vatable Sales</span><span>₱ 15,625.00</span></div>
                           <div className="flex justify-between text-gray-500"><span>VAT (12%)</span><span>₱ 1,875.00</span></div>
                           <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t text-black"><span>Total</span><span>₱ 17,500.00</span></div>
                        </div>
                     </div>
                  </div>
               </div>
               {/* Glow effect under mockup */}
               <div className="absolute inset-0 bg-gradient-to-b from-primary-600/20 to-transparent rounded-2xl blur-3xl -z-10" />
            </motion.div>
          </div>
        </section>

        <section id="features" className="py-24 bg-surface-950 relative border-t border-surface-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-sm font-semibold text-primary-400 uppercase tracking-wider mb-3">
                Everything You Need
              </motion.p>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white text-balance">
                Built for Philippine Businesses
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-surface-900 border border-surface-700/50 rounded-2xl p-6 hover:border-surface-600 transition-all hover:-translate-y-1 group">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 text-primary-400 border border-primary-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                     <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Lightning Fast Generation</h3>
                  <p className="text-sm text-surface-400 leading-relaxed">No required logins. Type your details and see the live pixel-perfect preview instantly generated on your device.</p>
               </div>
               
               <div className="bg-surface-900 border border-surface-700/50 rounded-2xl p-6 hover:border-surface-600 transition-all hover:-translate-y-1 group">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                     <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">BIR & EOPT Compliant</h3>
                  <p className="text-sm text-surface-400 leading-relaxed">Automatically handles 12% VAT calculations, Vatable Sales isolation, and proper SC/PWD RA 9994 rules.</p>
               </div>
               
               <div className="bg-surface-900 border border-surface-700/50 rounded-2xl p-6 hover:border-surface-600 transition-all hover:-translate-y-1 group">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 text-primary-400 border border-primary-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                     <Download className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Free PDF Exports</h3>
                  <p className="text-sm text-surface-400 leading-relaxed">Export beautiful, printer-friendly PDFs with one click natively. Perfect for emailing direct to corporate clients.</p>
               </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 w-full border-t border-surface-800 bg-surface-950 flex flex-col items-center justify-center px-4 md:px-8">
        <div className="max-w-4xl w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-8">
          <div className="flex flex-col items-center md:items-start max-w-sm">
            <div className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-lg">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                QuickInvoice <span className="text-primary-400">PH</span>
              </span>
            </div>
            <p className="text-xs text-surface-400 leading-relaxed text-center md:text-left">
              Frictionless, zero-commission, compliant invoicing tools built for the modern Philippine freelancer and SME.
            </p>
          </div>
          <div className="flex flex-col gap-2 items-center md:items-end">
             <div className="flex flex-wrap justify-center gap-6 mt-6 md:mt-0 text-xs text-surface-500 font-medium">
            <Link href="/terms" className="hover:text-primary-400 transition-colors">Terms of Use</Link>
            <Link href="/privacy" className="hover:text-primary-400 transition-colors">Privacy Policy</Link>
            <Link href="/compliance" className="hover:text-primary-400 transition-colors">BIR Compliance</Link>
            <span className="text-surface-700">|</span>
            <span>&copy; 2026 QuickInvoice PH</span>
          </div>
          </div>
        </div>

        <div className="max-w-4xl w-full border-t border-surface-800/50 pt-8 flex flex-col items-center text-center">
          <p className="text-[10px] text-surface-500 max-w-3xl leading-relaxed mb-4 uppercase tracking-widest">
            <strong>Important Legal Disclaimer:</strong> QuickInvoice PH provides digital templates for generating documentation. We are not a BIR-accredited Computerized Accounting System (CAS). The generated documents do not substitute official BIR-authorized invoices unless the user holds a valid Authority to Print (ATP) or CAS permit. The user assumes full legal, tax, and ethical liability under the National Internal Revenue Code (Republic Act No. 8424) for the issuance and use of any documents created through this platform.
          </p>
          <p className="text-xs text-surface-500 font-medium">
            © 2026 QuickInvoice PH. Developed for Filipino Professionals.
          </p>
        </div>
      </footer>
    </div>
  );
}
