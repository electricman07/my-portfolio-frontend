import { Link } from "@tanstack/react-router";
import { ChevronUp } from "lucide-react";
import { NAV_LINKS, LEGAL_LINKS } from "../../lib/navigation";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-auto border-t-2 border-slate-300 dark:border-slate-800 bg-slate-800 dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          {/* 1. BRANDING & COPYRIGHT */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-xl font-black tracking-tighter uppercase text-white">
              Glen<span className="text-blue-400">.</span>
            </h3>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              © {currentYear} All Rights Reserved.
            </p>
          </div>

          {/* 2. CENTERED NAVIGATION */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.to}
                to={item.to as any}
                className="text-xs font-black uppercase tracking-widest text-slate-300 hover:text-blue-400 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* 3. BACK TO TOP & LEGAL */}
          <div className="flex flex-col items-center md:items-end gap-6">
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

            <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
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
    </footer>
  );
}
