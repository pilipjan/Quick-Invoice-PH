"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, ArrowLeft, Download, Eye, Calendar, User, ShoppingBag, Loader2, Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { format } from "date-fns";
import { formatCurrency } from "@/lib/tax-calculator";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function HistoryPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const store = useInvoiceStore();
  const router = useRouter();

  useEffect(() => {
    const fetchInvoices = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("invoices")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching invoices:", error);
      } else {
        setInvoices(data || []);
      }
      setLoading(false);
    };

    fetchInvoices();
  }, [supabase, router]);

  const handleLoadInvoice = (invoice: any) => {
    // Sync store with historical data
    store.updateField("clientName", invoice.client_name);
    store.updateField("clientAddress", invoice.client_address);
    store.updateField("clientTin", invoice.client_tin);
    store.updateField("invoiceNumber", invoice.invoice_number);
    store.updateField("invoiceDate", invoice.invoice_date);
    store.updateField("items", invoice.items);
    store.updateField("currency", invoice.currency);
    store.updateField("discountType", invoice.discount_type);
    store.updateField("theme", invoice.theme);
    
    router.push("/builder");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-950 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="space-y-1">
            <Link 
              href="/builder" 
              className="flex items-center gap-2 text-surface-400 hover:text-white transition-colors text-sm mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Builder
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Invoice History</h1>
            <p className="text-surface-400">Manage and re-download your saved sales evidence.</p>
          </div>
          <Link 
            href="/builder" 
            className={cn(buttonVariants({ variant: "default" }), "bg-primary-600 hover:bg-primary-500 text-white")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Invoice
          </Link>
        </div>

        {invoices.length === 0 ? (
          <Card className="glass border-surface-700/50 p-12 text-center">
            <FileText className="w-16 h-16 text-surface-600 mx-auto mb-4 opacity-20" />
            <h3 className="text-xl font-semibold mb-2 text-surface-200">No invoices saved yet</h3>
            <p className="text-surface-500 mb-6">Invoices you save to the cloud will appear here.</p>
            <Link 
              href="/builder" 
              className={cn(buttonVariants({ variant: "outline" }), "text-surface-300 hover:text-white")}
            >
              Start Building
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {invoices.map((inv) => (
              <Card key={inv.id} className="glass border-surface-700/50 hover:border-primary-500/30 transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] overflow-hidden group">
                <div className="p-4 border-b border-surface-800/50 bg-surface-900/50 flex justify-between items-center">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-primary-400 bg-primary-500/10 px-2 py-1 rounded">
                     {inv.theme || 'standard'}
                   </span>
                   <span className="text-xs text-surface-500 font-mono">{inv.invoice_number}</span>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg truncate">{inv.client_name || "Untitled Client"}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    {format(new Date(inv.invoice_date), "MMM dd, yyyy")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-y border-surface-800/30">
                    <span className="text-sm text-surface-500">Total Amount</span>
                    <span className="text-lg font-bold text-white">{formatCurrency(inv.total_amount, inv.currency)}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="w-full bg-surface-800 hover:bg-surface-700 text-surface-200"
                      onClick={() => handleLoadInvoice(inv)}
                    >
                      <Eye className="w-3 h-3 mr-2" />
                      View/Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full border-surface-700 text-surface-400 hover:text-white"
                      disabled
                    >
                      <Download className="w-3 h-3 mr-2" />
                      PDF (Soon)
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
