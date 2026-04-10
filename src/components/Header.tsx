"use client";

import Link from "next/link";
import { FileText, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "BIR Compliance", href: "/compliance" },
  { name: "Terms of Use", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="px-4 lg:px-8 h-16 flex items-center glass border-b border-surface-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group transition-all">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            QuickInvoice <span className="text-primary-400">PH</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-surface-400 hover:text-primary-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/builder"
            className="px-4 py-2 rounded-lg gradient-primary text-white text-sm font-bold shadow-lg hover:shadow-[var(--shadow-glow)] transition-all active:scale-95"
          >
            Start Billing
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-surface-400 hover:text-white transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "absolute top-16 left-0 w-full glass border-b border-surface-800 md:hidden transition-all duration-300 origin-top",
        isMobileMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
      )}>
        <nav className="flex flex-col p-4 gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-medium text-surface-300 py-2 border-b border-surface-800"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/builder"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full py-3 rounded-xl gradient-primary text-white text-center font-bold shadow-lg"
          >
            Start Billing Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
