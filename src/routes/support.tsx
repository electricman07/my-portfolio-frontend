import { createFileRoute, Link } from "@tanstack/react-router";
import { LifeBuoy, Mail, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support | GP Digital Web Studio" },
      {
        name: "description",
        content:
          "Get technical support or browse our knowledge base for GP Digital Web Studio projects.",
      },
    ],
  }),
  component: SupportPage,
});

function SupportPage() {
  return (
    <div className="max-w-5xl mx-auto py-20 px-6 space-y-12 animate-in fade-in duration-700">
      <div className="text-center space-y-4">
        <h4 className="text-blue-600 font-black uppercase tracking-[0.2em] text-[10px]">
          Help Center
        </h4>
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-950 dark:text-white">
          Support.
        </h1>
        <p className="text-slate-900 dark:text-slate-400 font-medium max-w-lg mx-auto">
          Need help with a project or have a technical question? Choose an
          option below to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Link
          to="/contact"
          className="group p-10 bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-[3rem] text-center space-y-6 shadow-sm hover:border-blue-500 hover:-translate-y-2 hover:shadow-xl transition-all duration-500"
        >
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-blue-600 transition-colors">
            <Mail
              className="text-blue-600 group-hover:text-white transition-colors"
              size={32}
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
              Direct Support
            </h3>
            <p className="text-sm text-slate-800 dark:text-slate-400 font-medium px-4">
              Submit a support ticket via our contact form. Typical response
              within 24 hours.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest text-[10px]">
            Open Ticket <ArrowRight size={14} strokeWidth={3} />
          </span>
        </Link>

        <Link
          to="/kb"
          className="group p-10 bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-[3rem] text-center space-y-6 shadow-sm hover:border-blue-500 hover:-translate-y-2 hover:shadow-xl transition-all duration-500"
        >
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-blue-600 transition-colors">
            <LifeBuoy
              className="text-blue-600 group-hover:text-white transition-colors"
              size={32}
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
              Knowledge Base
            </h3>
            <p className="text-sm text-slate-800 dark:text-slate-400 font-medium px-4">
              Browse our Knowledge Base for instant answers to common issues.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest text-[10px]">
            View KB <ArrowRight size={14} strokeWidth={3} />
          </span>
        </Link>
      </div>
    </div>
  );
}
