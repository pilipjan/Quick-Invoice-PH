"use client";

import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { LogOut, History, User as UserIcon } from 'lucide-react';
import { useInvoiceStore } from "@/store/useInvoiceStore";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertTriangle, CheckCircle2, ShieldAlert, Gavel } from 'lucide-react';
import { useState, useEffect } from 'react';
import InvoiceForm from './InvoiceForm';
import InvoicePreview from './InvoicePreview';

export default function InvoiceBuilder({ initialUser }: { initialUser?: User | null }) {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(initialUser || null);
  const [showCompliance, setShowCompliance] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const getUser = async () => {
      // If we already have the user from server, skip network call
      if (initialUser) return;
      
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUser(user);
    };
    getUser();

    // Session-based persistence for the compliance modal
    const hasAgreed = sessionStorage.getItem('quickinvoice_compliance_agreed');
    if (!hasAgreed) {
      setShowCompliance(true);
    }
  }, [supabase]);

  const handleAgreeCompliance = () => {
    sessionStorage.setItem('quickinvoice_compliance_agreed', 'true');
    setShowCompliance(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
  };

  if (!mounted) {
    return (
      <div className="container mx-auto p-4 md:p-8 flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-surface-400">Loading QuickInvoice Engine...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* Auth Status Header */}
      {user && (
        <div className="mb-8 flex items-center justify-between bg-surface-900 border border-surface-700/50 p-4 rounded-2xl shadow-xl animate-fade-in-up">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary-600/20 flex items-center justify-center border border-primary-500/30">
              <UserIcon className="w-5 h-5 text-primary-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{user.email}</p>
              <p className="text-[10px] text-surface-400 uppercase tracking-widest">Signed in via Google</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <Link 
                href="/history"
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "text-surface-400 hover:text-white")}
             >
                <History className="w-4 h-4 mr-2" />
                History
             </Link>
             <Button variant="outline" size="sm" onClick={handleLogout} className="border-surface-700/50 text-surface-400 hover:text-white hover:bg-surface-800">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
             </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Side: Controls & Data Entry */}
        <div className="w-full">
          <InvoiceForm />
        </div>
        
        {/* Right Side: Live Preview */}
        <div className="w-full hidden lg:block">
           <InvoicePreview />
        </div>
      </div>
      
      {/* Mobile Preview toggle (Optional later) */}
      <div className="block lg:hidden mt-8">
        <InvoicePreview />
      </div>

      {/* Compliance & Legal Notice Pop-up */}
      <Dialog open={showCompliance} onOpenChange={setShowCompliance}>
        <DialogContent className="max-w-md border-primary-500/20 shadow-[0_0_50px_rgba(59,130,246,0.15)] ring-1 ring-primary-500/10">
          <DialogHeader className="items-center text-center">
            <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center mb-4 border border-primary-500/20">
              <ShieldAlert className="w-8 h-8 text-primary-400" />
            </div>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-white to-surface-400 bg-clip-text text-transparent">
              BIR Compliance Notice
            </DialogTitle>
            <DialogDescription className="text-surface-400 pt-2">
              Before you proceed, please acknowledge the following legal requirements for invoicing in the Philippines.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex gap-3 items-start group">
              <div className="w-6 h-6 rounded-full bg-surface-900 border border-surface-800 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-primary-500/50 transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary-500" />
              </div>
              <p className="text-xs text-surface-300 leading-relaxed">
                This tool generates **Pro-forma Invoices** for bookkeeping and quotations only.
              </p>
            </div>
            <div className="flex gap-3 items-start group">
              <div className="w-6 h-6 rounded-full bg-surface-900 border border-surface-800 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-primary-500/50 transition-colors">
                <Gavel className="w-3.5 h-3.5 text-primary-500" />
              </div>
              <p className="text-xs text-surface-300 leading-relaxed">
                You are responsible for obtaining your own **Authority to Print (ATP)** or **CAS Permit** for official tax receipts.
              </p>
            </div>
            <div className="flex gap-3 items-start group">
              <div className="w-6 h-6 rounded-full bg-surface-900 border border-surface-800 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-primary-500/50 transition-colors">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <p className="text-xs text-surface-300 leading-relaxed">
                Misuse for fraudulent tax claims is strictly prohibited and subject to criminal penalties.
              </p>
            </div>
          </div>

          <DialogFooter className="sm:justify-center">
            <Button 
              onClick={handleAgreeCompliance}
              className="w-full gradient-primary text-white font-bold h-12 rounded-xl shadow-lg hover:shadow-primary-500/20 active:scale-[0.98] transition-all"
            >
              I Understand & Agree
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
