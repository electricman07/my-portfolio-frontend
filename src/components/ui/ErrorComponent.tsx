import { useRouter } from "@tanstack/react-router";
import { AlertCircle, RotateCcw } from "lucide-react";

export function ErrorComponent({ error }: { error: Error }) {
  const router = useRouter();

  return (
    <div className="p-10 max-w-2xl mx-auto my-20 bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-900/50 rounded-[3rem] text-center space-y-6">
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/50 rounded-2xl flex items-center justify-center mx-auto text-red-600">
        <AlertCircle size={32} />
      </div>
      <h3 className="text-2xl font-black tracking-tight text-red-900 dark:text-red-400">
        System Interruption
      </h3>
      <p className="text-sm text-red-700 dark:text-red-500 font-medium leading-relaxed">
        {error.message ||
          "An unexpected error occurred while rendering this view."}
      </p>
      <button
        onClick={() => router.invalidate()}
        className="inline-flex items-center gap-2 px-8 py-3 bg-red-600 text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-red-700 transition-all shadow-lg"
      >
        <RotateCcw size={16} /> Try Again
      </button>
    </div>
  );
}
