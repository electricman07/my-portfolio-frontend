import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Rocket,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Calendar,
} from "lucide-react";

export const Route = createFileRoute("/get-started")({
  component: GetStartedPage,
});

function GetStartedPage() {
  return (
    <div className="max-w-5xl mx-auto py-20 px-6 space-y-16 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      {/* 1. HERO HEADER */}
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest">
          <Rocket size={14} /> Let's Launch Your Project
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
          Ready to build <br /> something great?
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
          Choose how you'd like to proceed. Whether you have a full spec or just
          an idea, I'm ready to help.
        </p>
      </header>

      {/* 2. CHOICE GRID */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Option 1: Direct Message */}
        <Link
          to="/contact"
          className="group p-12 bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-800 rounded-[3rem] shadow-xl hover:border-blue-500 hover:-translate-y-2 transition-all duration-500"
        >
          <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/30">
            <MessageSquare size={32} />
          </div>
          <h3 className="text-3xl font-black tracking-tight mb-4">
            Send a Message
          </h3>
          <p className="text-slate-600 dark:text-slate-400 font-medium mb-8">
            Best for general inquiries, quotes, or just saying hello. I'll get
            back to you within 24 hours.
          </p>
          <span className="inline-flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest text-xs">
            Open Contact Form <ArrowRight size={16} strokeWidth={3} />
          </span>
        </Link>

        {/* Option 2: Browse Services */}
        <Link
          to="/services"
          className="group p-12 bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-800 rounded-[3rem] shadow-xl hover:border-blue-500 hover:-translate-y-2 transition-all duration-500"
        >
          <div className="w-16 h-16 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg">
            <Rocket size={32} />
          </div>
          <h3 className="text-3xl font-black tracking-tight mb-4">
            View Solutions
          </h3>
          <p className="text-slate-600 dark:text-slate-400 font-medium mb-8">
            Not sure what you need? Explore my specialized services in
            development and design.
          </p>
          <span className="inline-flex items-center gap-2 text-slate-900 dark:text-white font-black uppercase tracking-widest text-xs">
            See My Services <ArrowRight size={16} strokeWidth={3} />
          </span>
        </Link>
      </div>
      {/* Option 3: Discovery Call (Placeholder) */}
      <div className="group p-10 bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-800 rounded-[3rem] shadow-xl opacity-80 hover:opacity-100 transition-all">
        <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-emerald-500/30">
          <Calendar size={32} />
        </div>
        <h3 className="text-3xl font-black tracking-tight mb-4">
          Discovery Call
        </h3>
        <p className="text-slate-600 dark:text-slate-400 font-medium mb-8">
          Direct scheduling is coming soon. For now, please use the contact form
          to request a time.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 text-emerald-600 font-black uppercase tracking-widest text-xs"
        >
          Request a Meeting <ArrowRight size={16} />
        </Link>
      </div>

      {/* 4. VALUE PROPS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10">
        {["Expert Code", "Modern UI", "SEO Ready", "Fast Delivery"].map(
          (text) => (
            <div
              key={text}
              className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400"
            >
              <CheckCircle2 size={14} className="text-emerald-500" /> {text}
            </div>
          ),
        )}
      </div>
    </div>
  );
}
