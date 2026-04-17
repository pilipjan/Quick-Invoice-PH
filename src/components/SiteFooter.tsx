import Link from "next/link";
import { FileText } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="border-t border-surface-800 bg-surface-950 py-6 px-4 flex flex-col items-center gap-3 text-center mt-auto">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-surface-500">
        {/* GitHub Star CTA */}
        <a
          href="https://github.com/pilipjan/Quick-Invoice-PH"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-surface-700 bg-surface-900 hover:border-primary-500/50 hover:bg-surface-800 transition-all text-xs font-semibold text-surface-300 hover:text-white group"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-3.5 h-3.5 fill-current text-surface-400 group-hover:text-yellow-400 transition-colors"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          Star on GitHub
          <span className="text-yellow-400">⭐</span>
        </a>

        <span className="text-surface-700 hidden sm:inline">|</span>

        <Link href="/terms" className="hover:text-primary-400 transition-colors">Terms</Link>
        <Link href="/privacy" className="hover:text-primary-400 transition-colors">Privacy</Link>
        <Link href="/compliance" className="hover:text-primary-400 transition-colors">BIR Compliance</Link>
      </div>

      <p className="text-[11px] text-surface-600">
        Built with{" "}
        <span className="text-red-500">♥</span>
        {" "}by{" "}
        <a
          href="https://github.com/pilipjan"
          target="_blank"
          rel="noopener noreferrer"
          className="text-surface-500 hover:text-primary-400 transition-colors font-semibold"
        >
          Philip John Santiano
        </a>
        {" "}· © 2026 QuickInvoice PH
      </p>
    </footer>
  );
}
