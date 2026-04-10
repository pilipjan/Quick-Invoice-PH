"use client";

import { useInvoiceStore } from '@/store/useInvoiceStore';
import { computeCartTotals, formatCurrency } from '@/lib/tax-calculator';
import { createClient } from '@/lib/supabase/client';
import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2, Save, Cloud } from 'lucide-react';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// --- COMPLIANCE WATERMARK ---
const Watermark = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
    <div className="text-[120px] font-black text-slate-100/40 -rotate-[35deg] whitespace-nowrap select-none tracking-tighter uppercase">
      Pro-forma
    </div>
  </div>
);

// --- STANDARD A4 THEME ---
const StandardTheme = ({ store, totals }: { store: any; totals: any }) => (
  <div className="bg-white p-10 w-[800px] min-h-[1056px] flex flex-col font-sans tracking-normal text-black mx-auto relative">
    {!store.isRegisteredBir && <Watermark />}
    <div className="flex justify-between items-start mb-8 pb-6 border-b-2 border-slate-200">
      <div className="flex flex-col">
        {store.logoUrl && <img src={store.logoUrl} alt="Logo" className="h-16 w-auto object-contain mb-4" />}
        <h1 className="text-4xl font-bold text-slate-800 tracking-tight">SALES INVOICE</h1>
        <p className="text-sm mt-2 text-slate-500 max-w-sm">This document serves as the primary evidence of the sale.</p>
      </div>
      <div className="text-right space-y-1">
        <h3 className="text-xl font-bold text-slate-800">{store.businessName || "Your Business Name"}</h3>
        {store.address && <p className="text-sm text-slate-600">{store.address}</p>}
        <p className="text-sm font-semibold mt-2">
          TIN: <span className="font-normal">{store.tin || "000-000-000-000"}</span>
          {store.isVatRegistered ? ' (VAT Reg)' : ' (Non-VAT Reg)'}
        </p>
        {store.ptuNumber && <p className="text-sm">PTU/ATP: {store.ptuNumber}</p>}
      </div>
    </div>
    <div className="flex justify-between mb-8 text-sm">
      <div className="space-y-1">
        <p className="text-slate-500 font-semibold mb-1">Billed To:</p>
        <p className="font-bold text-lg">{store.clientName || "Customer Name"}</p>
        {store.clientAddress && <p className="text-slate-600">{store.clientAddress}</p>}
        {store.clientTin && <p className="text-slate-600">TIN: {store.clientTin}</p>}
      </div>
      <div className="space-y-2 text-right">
        <div className="flex justify-end gap-4"><span className="text-slate-500">Invoice No:</span><span className="font-bold">{store.invoiceNumber || "000000"}</span></div>
        <div className="flex justify-end gap-4"><span className="text-slate-500">Date:</span><span className="font-bold">{store.invoiceDate || "YYYY-MM-DD"}</span></div>
      </div>
    </div>
    <table className="w-full mb-8 text-sm text-left">
      <thead>
        <tr className="border-y border-slate-300 bg-slate-50">
          <th className="py-3 px-4 font-semibold text-slate-700">Description</th>
          <th className="py-3 px-4 text-center font-semibold text-slate-700 w-24">Qty</th>
          <th className="py-3 px-4 text-right font-semibold text-slate-700 w-32">Unit Price</th>
          <th className="py-3 px-4 text-right font-semibold text-slate-700 w-32">Total</th>
        </tr>
      </thead>
      <tbody>
        {store.items.map((item: any) => (
          <tr key={item.id} className="border-b border-slate-100">
            <td className="py-3 px-4">{item.description || "—"}</td>
            <td className="py-3 px-4 text-center">{item.quantity}</td>
            <td className="py-3 px-4 text-right">{formatCurrency(item.unitPrice, store.currency)}</td>
            <td className="py-3 px-4 text-right">{formatCurrency(item.unitPrice * item.quantity, store.currency)}</td>
          </tr>
        ))}
      </tbody>
    </table>
    
    {(store.paymentDetails || store.notes) && (
      <div className="mb-8 grid grid-cols-2 gap-8 text-sm">
        {store.paymentDetails && (
          <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
            <h4 className="font-bold text-slate-700 mb-1">Payment Details</h4>
            <p className="whitespace-pre-wrap text-slate-600">{store.paymentDetails}</p>
          </div>
        )}
        {store.notes && (
          <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
            <h4 className="font-bold text-slate-700 mb-1">Terms & Notes</h4>
            <p className="whitespace-pre-wrap text-slate-600">{store.notes}</p>
          </div>
        )}
      </div>
    )}

    <div className="flex mt-auto pt-8 items-end">
      <div className="flex-1 pr-8 space-y-6">
        {store.discountType !== "none" && (
          <div className="bg-yellow-50 text-yellow-800 p-3 rounded-md text-sm border border-yellow-200">
            <strong>Note:</strong> {store.discountType === "senior" ? "Senior Citizen" : "PWD"} discount applied. This transaction is VAT-Exempt as per Republic Act.
          </div>
        )}
        
        {/* Signature Area */}
        {store.signatureUrl && (
          <div className="pt-4 w-48 text-center flex flex-col items-center">
            <img src={store.signatureUrl} alt="Signature" className="h-16 w-auto object-contain mb-1" />
            <div className="border-t border-slate-400 font-bold text-sm text-slate-700 pt-1 w-full">Authorized Signature</div>
          </div>
        )}
      </div>
      <div className="w-80 border rounded-md overflow-hidden text-sm">
        <div className="bg-slate-50 p-4 border-b space-y-2">
          <div className="flex justify-between"><span className="text-slate-600">Subtotal</span><span>{formatCurrency(totals.subtotal, store.currency)}</span></div>
          {store.isVatRegistered ? (
            <>
              <div className="flex justify-between"><span className="text-slate-600">Vatable Sales</span><span>{formatCurrency(totals.vatableSales, store.currency)}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">VAT (12%)</span><span>{formatCurrency(totals.vatAmount, store.currency)}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">VAT-Exempt Sales</span><span>{formatCurrency(totals.vatExemptSales, store.currency)}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Zero-Rated Sales</span><span>{formatCurrency(totals.zeroRatedSales, store.currency)}</span></div>
            </>
          ) : (
            <div className="flex justify-between"><span className="text-slate-600">VAT-Exempt / Non-VAT</span><span>{formatCurrency(totals.vatExemptSales, store.currency)}</span></div>
          )}
          {store.discountType !== "none" && (
            <div className="flex justify-between text-red-600 font-medium"><span>Less: SC/PWD (20%)</span><span>-{formatCurrency(totals.discountAmount, store.currency)}</span></div>
          )}
        </div>
        <div className="p-4 bg-slate-800 text-white flex justify-between font-bold text-lg items-center">
          <span>Amount Due</span><span>{formatCurrency(totals.totalAmount, store.currency)}</span>
        </div>
      </div>
    </div>
    <div className="mt-8 pt-4 border-t border-slate-200 text-[10px] text-slate-400 text-center uppercase tracking-widest max-w-2xl mx-auto">
      {store.isRegisteredBir 
        ? "This document is an electronically generated official invoice issued by a registered entity. Subject to Philippine Revenue Regulations."
        : "Disclaimer: Generated via QuickInvoice PH software. This document does not constitute a valid BIR-approved official invoice unless issued by a registered entity holding a valid Authority to Print (ATP) or Computerized Accounting System (CAS) permit. The individual or business issuing this document assumes all legal liabilities under the National Internal Revenue Code."}
    </div>
  </div>
);

// --- MODERN A4 THEME ---
const ModernTheme = ({ store, totals }: { store: any; totals: any }) => (
  <div className="bg-slate-50 pb-10 w-[800px] min-h-[1056px] flex flex-col font-sans tracking-normal text-black mx-auto overflow-hidden relative">
    {!store.isRegisteredBir && <Watermark />}
    {/* Colored Header Block */}
    <div className="bg-blue-600 text-white p-10 flex justify-between items-center rounded-b-3xl shadow-md">
      <div className="flex flex-col items-start">
        {store.logoUrl && <img src={store.logoUrl} alt="Logo" className="h-14 w-auto object-contain mb-4 rounded bg-white/10 p-1" />}
        <h1 className="text-5xl font-black tracking-tighter">SALES INVOICE</h1>
        <p className="opacity-80 font-medium mt-1">Invoice No: {store.invoiceNumber || "000000"}</p>
        <p className="opacity-80">Date: {store.invoiceDate || "YYYY-MM-DD"}</p>
      </div>
      <div className="text-right">
        <h3 className="text-2xl font-bold">{store.businessName || "Your Business Name"}</h3>
        {store.address && <p className="opacity-80 text-sm mt-1">{store.address}</p>}
        <p className="opacity-80 text-sm mt-2">TIN: {store.tin || "000-000-000-000"} {store.isVatRegistered ? '(VAT Reg)' : '(Non-VAT)'}</p>
      </div>
    </div>
    
    <div className="p-10 flex-1 flex flex-col">
      <div className="mb-10 bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex justify-between items-start">
         <div className="space-y-1">
           <p className="text-blue-600 font-bold text-xs uppercase tracking-widest">Billed To</p>
           <p className="font-bold text-xl">{store.clientName || "Customer Name"}</p>
           {store.clientAddress && <p className="text-slate-500 text-sm">{store.clientAddress}</p>}
           {store.clientTin && <p className="text-slate-500 text-sm">TIN: {store.clientTin}</p>}
         </div>
         {store.ptuNumber && (
           <div className="text-right space-y-1">
             <p className="text-blue-600 font-bold text-xs uppercase tracking-widest">BIR Authority</p>
             <p className="text-sm font-medium">PTU/ATP: {store.ptuNumber}</p>
           </div>
         )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-8">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-100 text-blue-900 border-b">
            <tr>
              <th className="py-4 px-6 font-bold">Description</th>
              <th className="py-4 px-6 text-center font-bold w-24">Qty</th>
              <th className="py-4 px-6 text-right font-bold w-32">Unit Price</th>
              <th className="py-4 px-6 text-right font-bold w-32">Total</th>
            </tr>
          </thead>
          <tbody>
            {store.items.map((item: any, i: number) => (
              <tr key={item.id} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                <td className="py-4 px-6 font-medium">{item.description || "—"}</td>
                <td className="py-4 px-6 text-center">{item.quantity}</td>
                <td className="py-4 px-6 text-right text-slate-500">{formatCurrency(item.unitPrice, store.currency)}</td>
                <td className="py-4 px-6 text-right font-medium text-blue-900">{formatCurrency(item.unitPrice * item.quantity, store.currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(store.paymentDetails || store.notes) && (
        <div className="mb-8 grid grid-cols-2 gap-6 text-sm">
          {store.paymentDetails && (
            <div>
              <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-1">Payment Details</p>
              <p className="text-slate-600 whitespace-pre-wrap">{store.paymentDetails}</p>
            </div>
          )}
          {store.notes && (
            <div>
              <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-1">Terms & Notes</p>
              <p className="text-slate-600 whitespace-pre-wrap">{store.notes}</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-auto grid grid-cols-2 gap-8 items-end">
        <div className="space-y-6">
           {store.discountType !== "none" && (
             <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 rounded-r-lg text-sm">
                <strong>Applicable Discount:</strong> {store.discountType === "senior" ? "Senior Citizen" : "PWD"} applied. <br/>
                Per Republic Act guidelines, this transaction is VAT-Exempted.
             </div>
           )}
           
           {store.signatureUrl && (
             <div className="pt-2 w-48 text-center flex flex-col items-center">
               <img src={store.signatureUrl} alt="Signature" className="h-14 w-auto object-contain mb-1" />
               <div className="border-t border-slate-300 font-bold text-xs text-slate-500 pt-1 w-full uppercase tracking-widest">Authorized By</div>
             </div>
           )}
           
           <p className="text-xs text-slate-400 font-medium">Thank you for your business. This is a system-generated document.</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
          <div className="p-6 space-y-3 text-sm">
             <div className="flex justify-between"><span className="text-slate-500 font-medium">Subtotal</span><span className="font-semibold">{formatCurrency(totals.subtotal, store.currency)}</span></div>
             {store.isVatRegistered ? (
               <>
                 <div className="flex justify-between"><span className="text-slate-500">Vatable Sales</span><span>{formatCurrency(totals.vatableSales, store.currency)}</span></div>
                 <div className="flex justify-between"><span className="text-slate-500">VAT (12%)</span><span>{formatCurrency(totals.vatAmount, store.currency)}</span></div>
                 <div className="flex justify-between"><span className="text-slate-500">VAT-Exempt Sales</span><span>{formatCurrency(totals.vatExemptSales, store.currency)}</span></div>
                 <div className="flex justify-between"><span className="text-slate-500">Zero-Rated Sales</span><span>{formatCurrency(totals.zeroRatedSales, store.currency)}</span></div>
               </>
             ) : (
               <div className="flex justify-between"><span className="text-slate-500">VAT-Exempt</span><span>{formatCurrency(totals.vatExemptSales, store.currency)}</span></div>
             )}
             {store.discountType !== "none" && (
               <div className="flex justify-between text-blue-600 font-bold border-t pt-2 mt-2"><span>Less: SC/PWD (20%)</span><span>-{formatCurrency(totals.discountAmount, store.currency)}</span></div>
             )}
          </div>
          <div className="bg-blue-600 text-white p-6 flex justify-between items-center">
            <span className="font-bold text-lg">Total Due</span>
            <span className="font-bold text-2xl">{formatCurrency(totals.totalAmount, store.currency)}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-slate-200 text-[10px] text-slate-400 text-center uppercase tracking-widest max-w-2xl mx-auto">
        Disclaimer: Generated via QuickInvoice PH software. This document does not constitute a valid BIR-approved official invoice unless issued by a registered entity holding a valid Authority to Print (ATP) or CAS permit. The issuer assumes all tax and legal liabilities.
      </div>
    </div>
  </div>
);

// --- THERMAL POS RECEIPT THEME ---
const ReceiptTheme = ({ store, totals }: { store: any; totals: any }) => (
  // Fixed width approx 80mm equivalent (300px roughly), height dynamic
  <div className="bg-white p-6 w-[340px] font-mono text-black mx-auto text-xs pb-12 shadow-[0_0_15px_rgba(0,0,0,0.1)] relative overflow-hidden">
    {!store.isRegisteredBir && (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="text-[40px] font-black text-slate-200/40 -rotate-[45deg] whitespace-nowrap select-none uppercase">
          PRO-FORMA
        </div>
      </div>
    )}
    <div className="text-center mb-4 flex flex-col items-center space-y-1">
      {store.logoUrl && <img src={store.logoUrl} alt="Logo" className="h-12 w-auto object-contain mb-2 grayscale" />}
      <h2 className="font-bold text-base uppercase">{store.businessName || "STORE NAME"}</h2>
      {store.address && <p>{store.address}</p>}
      <p>VAT Reg TIN: {store.tin || "000-000-000-000"}</p>
      {store.ptuNumber && <p>PTU: {store.ptuNumber}</p>}
    </div>
    
    <div className="border-t-2 border-dashed border-gray-400 my-3" />
    
    <div className="space-y-1 mb-3">
      <div className="flex justify-between"><span>SALES INVOICE</span><span className="font-bold">{store.invoiceNumber || "000"}</span></div>
      <div className="flex justify-between"><span>Date:</span><span>{store.invoiceDate}</span></div>
      <div className="flex justify-between"><span>Customer:</span><span className="truncate w-32 text-right">{store.clientName || "Walk-in"}</span></div>
      {store.clientTin && <div className="flex justify-between"><span>Cust TIN:</span><span>{store.clientTin}</span></div>}
    </div>

    <div className="border-t-2 border-dashed border-gray-400 my-3" />
    
    <div className="flex justify-between font-bold mb-2"><span>Item</span><span>Qty</span><span>Total</span></div>
    
    <div className="space-y-3 mb-4">
      {store.items.map((item: any) => (
         <div key={item.id} className="flex flex-col">
            <div className="mb-0.5 truncate">{item.description || "Item"}</div>
            <div className="flex justify-between">
               <span className="text-gray-600 pl-2">@ {formatCurrency(item.unitPrice, store.currency)}</span>
               <span className="text-center w-12">{item.quantity}</span>
               <span>{formatCurrency(item.unitPrice * item.quantity, store.currency)}</span>
            </div>
         </div>
      ))}
    </div>

    <div className="border-t-2 border-dashed border-gray-400 my-3" />

    <div className="space-y-1">
       <div className="flex justify-between"><span>Subtotal:</span><span>{formatCurrency(totals.subtotal, store.currency)}</span></div>
       
       {store.discountType !== "none" && (
         <div className="flex justify-between font-bold">
            <span>{store.discountType === "senior" ? "SC" : "PWD"} Disc (20%):</span>
            <span>-{formatCurrency(totals.discountAmount, store.currency)}</span>
         </div>
       )}

       <div className="flex justify-between font-bold text-sm pt-2">
          <span>AMOUNT DUE:</span>
          <span>{formatCurrency(totals.totalAmount, store.currency)}</span>
       </div>
    </div>
    
    <div className="border-t-2 border-dashed border-gray-400 my-3" />

    <div className="space-y-1 text-gray-700">
      {store.isVatRegistered ? (
         <>
          <div className="flex justify-between"><span>VATable Sales</span><span>{formatCurrency(totals.vatableSales, store.currency)}</span></div>
          <div className="flex justify-between"><span>VAT Amount (12%)</span><span>{formatCurrency(totals.vatAmount, store.currency)}</span></div>
          <div className="flex justify-between"><span>VAT-Exempt Sales</span><span>{formatCurrency(totals.vatExemptSales, store.currency)}</span></div>
          <div className="flex justify-between"><span>Zero-Rated Sales</span><span>{formatCurrency(totals.zeroRatedSales, store.currency)}</span></div>
         </>
      ) : (
         <div className="flex justify-between"><span>Non-VAT / Exempt</span><span>{formatCurrency(totals.vatExemptSales, store.currency)}</span></div>
      )}
    </div>

    <div className="border-t-2 border-dashed border-gray-400 my-3" />
    
    <div className="text-center space-y-1 mt-4">
      <p className="font-bold uppercase">THIS DOCUMENT IS NOT VALID FOR CLAIM OF INPUT TAX</p>
      <p>Thank you! Please come again.</p>
      <p className="mt-4 pt-4 text-gray-500 uppercase tracking-tight text-[9px] leading-tight text-center">
        Disclaimer: System generated.<br/>Not a substitute for BIR-authorized receipts<br/>without valid ATP/CAS. Issuer assumes all liability.
      </p>
      <p className="mt-2 text-gray-400 uppercase tracking-widest text-[10px]">Powered by QuickInvoice PH</p>
    </div>
  </div>
);


export default function InvoicePreview() {
  const store = useInvoiceStore();
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();
  }, [supabase]);

  if (!store) return null;

  const totals = computeCartTotals(store.items, store.isVatRegistered, store.discountType);

  const handleSaveToHistory = async () => {
    if (!user) {
      toast.error("Sign in with Google to save your history!");
      return;
    }

    try {
      setIsSaving(true);
      const { error } = await supabase.from('invoices').insert({
        user_id: user.id,
        invoice_number: store.invoiceNumber,
        invoice_date: store.invoiceDate,
        client_name: store.clientName,
        client_address: store.clientAddress,
        client_tin: store.clientTin,
        items: store.items,
        subtotal: totals.subtotal,
        vat_amount: totals.vatAmount,
        discount_type: store.discountType,
        discount_amount: totals.discountAmount,
        total_amount: totals.totalAmount,
        currency: store.currency,
        theme: store.theme
      });

      if (error) throw error;
      toast.success("Saved to your cloud history!");
    } catch (err: any) {
      toast.error("Failed to save: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!invoiceRef.current) return;
    try {
      setIsExporting(true);
      
      // We use a clone to capture the element without the parent's scale/transform interference
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        onclone: (clonedDoc) => {
          // Ensure the cloned element is perfectly visible for capture
          const el = clonedDoc.querySelector('[data-invoice-container]');
          if (el instanceof HTMLElement) {
            el.style.transform = 'none';
            el.style.margin = '0';
          }
        }
      });

      const imgData = canvas.toDataURL('image/png');
      
      // Standard A4 dimensions in mm
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate scaling to fit A4 exactly
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      const fileName = store.invoiceNumber ? `Invoice-${store.invoiceNumber}.pdf` : 'Sales-Invoice.pdf';
      pdf.save(fileName);
    } catch (error) {
      console.error('Failed to generate PDF', error);
    } finally {
      setIsExporting(false);
    }
  };

  const currentTheme = store.theme || "standard";

  return (
    <div className="space-y-4 sticky top-6">
      {/* Global Print Styles */}
      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          #invoice-capture-area, #invoice-capture-area * { visibility: visible; }
          #invoice-capture-area { 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 210mm;
            height: 297mm;
            padding: 0;
            margin: 0;
            transform: none !important;
            scale: 1 !important;
          }
          @page { size: auto; margin: 0; }
        }
      `}</style>
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-xl font-bold">Live Preview</h2>
          <p className="text-xs text-surface-400 capitalize">{currentTheme} Theme</p>
        </div>
        <div className="flex items-center gap-2">
          {user && (
            <Button 
              variant="outline" 
              onClick={handleSaveToHistory} 
              disabled={isSaving}
              className="border-primary-500/30 text-primary-400 hover:bg-primary-500/10 h-10 px-3"
              title="Save to your cloud account"
            >
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Cloud className="h-4 w-4 mr-2" />}
              {isSaving ? '' : 'Save to Cloud'}
            </Button>
          )}
          <Button onClick={handleDownloadPDF} disabled={isExporting} className="bg-primary-600 hover:bg-primary-500 text-white font-medium shadow-md hover:shadow-[var(--shadow-glow)] transition-all h-10 px-4">
            {isExporting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Download className="h-4 w-4 mr-2" />}
            Download PDF
          </Button>
        </div>
      </div>

      <div className="bg-surface-900 border border-surface-700/50 rounded-2xl flex justify-center overflow-hidden p-4 relative min-h-[600px] shadow-inner items-start">
        {/* We use specific flex rules because the Receipt is small, while A4 is huge */}
        <div className={`origin-top transition-transform flex-shrink-0 mx-auto ${currentTheme === 'receipt' ? 'scale-100 py-8' : 'transform scale-[0.55] sm:scale-[0.65] lg:scale-[0.55] xl:scale-[0.75] 2xl:scale-90 w-[800px] h-[1056px]'}`}>
          <div ref={invoiceRef} id="invoice-capture-area" data-invoice-container className="shadow-2xl bg-white border border-slate-100">
             {currentTheme === 'standard' && <StandardTheme store={store} totals={totals} />}
             {currentTheme === 'modern' && <ModernTheme store={store} totals={totals} />}
             {currentTheme === 'receipt' && <ReceiptTheme store={store} totals={totals} />}
          </div>
        </div>
      </div>
    </div>
  );
}
