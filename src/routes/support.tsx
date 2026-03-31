import { createFileRoute, Link } from "@tanstack/react-router";
import { LifeBuoy, Mail, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/support")({
  component: SupportPage,
});

function SupportPage() {
  return (
    <div className="max-w-5xl mx-auto py-20 px-6 space-y-12 animate-in fade-in duration-700">
      {/* HEADER */}
      <div className="text-center space-y-4">
        <h4 className="text-blue-500 font-black uppercase tracking-[0.2em] text-xs">
          Help Center
        </h4>
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter">
          Support.
        </h1>
        <p className="text-slate-500 font-medium max-w-lg mx-auto">
          Need help with a project or have a technical question? Choose an
          option below to get started.
        </p>
      </div>

      {/* TWO-COLUMN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* 1. CONTACT FORM LINK (Replaces Email) */}
        <Link
          to="/contact"
          className="group p-10 bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-800 rounded-[3rem] text-center space-y-6 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] hover:border-blue-500 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
        >
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
            <Mail className="text-blue-500" size={32} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black tracking-tight">
              Direct Support
            </h3>
            <p className="text-sm text-slate-500 font-medium px-4">
              Submit a support ticket via our contact form. Typical response
              within 24 hours.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest text-xs">
            Open Ticket <ArrowRight size={14} strokeWidth={3} />
          </span>
        </Link>

        {/* 2. FAQ LINK */}
        <Link
          to="/faq"
          className="group p-10 bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-800 rounded-[3rem] text-center space-y-6 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] hover:border-blue-500 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
        >
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
            <LifeBuoy className="text-blue-500" size={32} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black tracking-tight">
              Frequently Asked Questions
            </h3>
            <p className="text-sm text-slate-500 font-medium px-4">
              Browse our frequently asked questions for instant answers to
              common issues.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest text-xs">
            View FAQs <ArrowRight size={14} strokeWidth={3} />
          </span>
        </Link>
      </div>
    </div>
  );
}
