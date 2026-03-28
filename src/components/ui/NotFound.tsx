import { Link } from "@tanstack/react-router";
import { Home, ArrowLeft } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 space-y-8 animate-in fade-in duration-700">
      <div className="space-y-4">
        <h1 className="text-[12rem] font-black tracking-tighter leading-none text-slate-200 dark:text-slate-800 select-none">
          404
        </h1>
        <h2 className="text-4xl font-black tracking-tight -mt-16">
          Lost in the Slate.
        </h2>
        <p className="text-slate-500 font-medium max-w-md mx-auto">
          The page you're looking for has moved to a different coordinate or
          never existed in the first place.
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-6 py-3 border-2 border-slate-300 dark:border-slate-800 rounded-full font-black uppercase tracking-widest text-xs hover:bg-slate-200 transition-all"
        >
          <ArrowLeft size={16} /> Go Back
        </button>
        <Link
          to="/"
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest text-xs shadow-lg hover:bg-blue-700 transition-all"
        >
          <Home size={16} /> Home Base
        </Link>
      </div>
    </div>
  );
}
