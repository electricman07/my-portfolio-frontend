import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageSquare, Sparkles } from "lucide-react";

export function ContactCTA() {
  return (
    <section className="relative group overflow-hidden p-8 md:p-20 rounded-[3rem] bg-blue-600 dark:bg-blue-700 border-4 border-white dark:border-slate-800 shadow-[0_20px_50px_rgba(59,130,246,0.3)] text-center text-white">
      {/* 1. ANIMATED BACKGROUND ELEMENTS */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-64 h-64 bg-blue-400/20 rounded-full blur-2xl" />

      {/* 2. CONTENT */}
      <div className="relative z-10 space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-black uppercase tracking-widest">
          <Sparkles size={14} className="text-yellow-300" />
          Ready to Build Something Great?
        </div>

        <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none max-w-3xl mx-auto">
          Let’s bring your digital vision to life.
        </h2>

        <p className="text-blue-100 text-lg md:text-xl font-medium max-w-xl mx-auto leading-relaxed">
          Whether you have a fully-formed idea or just a spark of inspiration,
          I’m here to help you develop a high-performance solution.
        </p>

        {/* 3. THE "MAGNETIC" BUTTON */}
        <div className="pt-6">
          <Link
            to="/get-started"
            className="inline-flex items-center gap-3 px-5 py-5 bg-white text-blue-600 rounded-full font-black uppercase tracking-widest text-sm shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 group/btn"
          >
            Start a Conversation
            <ArrowRight
              size={20}
              className="group-hover/btn:translate-x-2 transition-transform"
            />
          </Link>
        </div>
      </div>

      {/* 4. SECONDARY LINK */}
      <div className="relative z-10 pt-10">
        <Link
          to="/service"
          className="text-blue-200 hover:text-white text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
        >
          <MessageSquare size={14} /> Explore my services first
        </Link>
      </div>
    </section>
  );
}
