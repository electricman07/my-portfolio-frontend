import { useGlobalSettings } from "../../hooks/useGlobalSettings";
import { Link } from "@tanstack/react-router";
import { ChevronUp, Loader2 } from "lucide-react";
import {
  NAV_LINKS_PRIMARY,
  NAV_LINKS_SECONDARY,
  SUPPORT_LINKS,
  LEGAL_LINKS,
} from "../../lib/navigation";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const { footerCopyright, isLoading } = useGlobalSettings();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-auto border-t-2 border-slate-300 dark:border-slate-800 bg-slate-800 dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* 1. BRANDING & COPYRIGHT */}
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-black tracking-tighter uppercase text-white">
              {isLoading ? (
                <Loader2 className="animate-spin text-blue-400" size={16} />
              ) : (
                footerCopyright
              )}
              <span className="text-blue-500">.</span>
            </h3>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              © {currentYear} All Rights Reserved.
            </p>
          </div>

          {/* 2. CENTERED NAVIGATION */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {[...NAV_LINKS_PRIMARY, ...NAV_LINKS_SECONDARY].map((item) => (
              <div
                key={item.to}
                className="text-xs font-black uppercase tracking-widest text-slate-300 hover:text-blue-400 transition-colors"
              >
                <Link
                  to={item.to as any}
                  className={
                    item.isCTA
                      ? "px-5 py-2 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg active:scale-95"
                      : "text-[11px] font-black uppercase tracking-widest hover:text-blue-500 transition-colors"
                  }
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </nav>

          {/* 3. BACK TO TOP & TIGHT 2x2 GRID */}
          <div className="flex flex-col items-center md:items-end gap-8">
            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="p-3 rounded-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:bg-blue-600 hover:text-white transition-all shadow-md group"
              aria-label="Back to top"
            >
              <ChevronUp
                size={20}
                className="group-hover:-translate-y-1 transition-transform"
              />
            </button>

            {/* Tight 2x2 Grid - Width constrained to sit under the button */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 w-50">
              {/* Column 1: Support Group */}
              <div className="flex flex-col gap-3 text-left">
                {SUPPORT_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`transition-colors flex items-center gap-1.5 whitespace-nowrap `}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Column 2: Legal Group */}
              <div className="flex flex-col gap-3 text-right">
                {LEGAL_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="hover:text-blue-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
