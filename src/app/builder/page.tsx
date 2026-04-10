import InvoiceBuilder from "@/components/InvoiceBuilder";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";

export default function BuilderPage() {
  return (
    <div className="min-h-screen bg-surface-950 flex flex-col font-sans">
      <header className="px-4 lg:px-8 h-16 flex items-center glass border-b border-surface-800 sticky top-0 z-10">
        <Link href="/" className="flex items-center text-surface-400 hover:text-white transition-colors mr-6">
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back
        </Link>
        <div className="flex items-center font-bold text-lg tracking-tight text-white border-l border-surface-700 pl-6 h-8">
          <FileText className="h-5 w-5 mr-2 text-primary-400" />
          QuickInvoice <span className="text-primary-400 ml-1">PH</span>
        </div>
      </header>
      
      <main className="flex-1">
        <InvoiceBuilder />
      </main>
    </div>
  );
}
