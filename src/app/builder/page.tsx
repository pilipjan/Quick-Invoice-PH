import InvoiceBuilder from "@/components/InvoiceBuilder";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";

export default function BuilderPage() {
  return (
    <div className="min-h-screen bg-surface-950 flex flex-col font-sans">
      
      <main className="flex-1">
        <InvoiceBuilder />
      </main>
    </div>
  );
}
