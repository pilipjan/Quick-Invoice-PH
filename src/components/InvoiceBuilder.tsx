"use client";

import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { LogOut, History, User as UserIcon } from 'lucide-react';
import { useInvoiceStore } from "@/store/useInvoiceStore";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import InvoiceForm from './InvoiceForm';
import InvoicePreview from './InvoicePreview';

export default function InvoiceBuilder() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUser(user);
    };
    getUser();
  }, [supabase]);

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
    </div>
  );
}
