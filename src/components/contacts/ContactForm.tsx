import { useContactMutation } from "../../hooks/useStrapi";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RotateCcw,
} from "lucide-react";

export function ContactForm() {
  const mutation = useContactMutation();

  const handleSubmit = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();

    if (mutation.isPending) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    mutation.mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  if (mutation.isSuccess) {
    return (
      <div className="bg-[#F8FAFC] dark:bg-slate-900 mx-4 p-12 rounded-[3rem] border-2 border-emerald-500 shadow-2xl text-center space-y-6 animate-in zoom-in duration-500">
        <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl flex items-center justify-center mx-auto">
          <CheckCircle2 className="text-emerald-500" size={48} />
        </div>
        <div className="space-y-2">
          <h3 className="text-3xl font-black tracking-tighter">
            Message Received!
          </h3>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xs mx-auto">
            Thanks for reaching out, Glen. I've received your inquiry and will
            be in touch shortly.
          </p>
        </div>
        <button
          onClick={() => mutation.reset()}
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-600 hover:underline"
        >
          <RotateCcw size={14} strokeWidth={3} /> Send another
        </button>
      </div>
    );
  }

  const inputClasses = `
  w-full box-border max-w-full px-6 md:px-8 py-5 rounded-[2rem] bg-slate-50 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300
`;

  return (
    <form onSubmit={handleSubmit} className="space-y-8 p-4">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">
            Full Name
          </label>
          <input
            required
            name="name"
            type="text"
            placeholder="Enter your name"
            className={inputClasses}
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">
            Email Address
          </label>
          <input
            required
            name="email"
            type="email"
            placeholder="email@example.com"
            className={inputClasses}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">
          Subject
        </label>
        <input
          required
          name="subject"
          type="text"
          placeholder="What can I help you with?"
          className={inputClasses}
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">
          Your Message
        </label>
        <textarea
          required
          name="message"
          rows={5}
          placeholder="Tell me about your project..."
          className={`${inputClasses} resize-none`}
        />
      </div>

      <div className="flex flex-col items-center md:items-start gap-6">
        <button
          disabled={mutation.isPending}
          className="group w-full md:w-auto px-12 py-5 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest text-xs shadow-xl hover:bg-blue-700 hover:-translate-y-1 hover:shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="animate-spin" size={20} /> Sending...
            </>
          ) : (
            <>
              Submit Inquiry{" "}
              <Send
                size={18}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </>
          )}
        </button>

        {mutation.isError && (
          <div
            role="alert"
            aria-live="polite"
            className="bg-red-50 dark:bg-red-950/30 p-4 rounded-2xl border-2 border-red-100 dark:border-red-900/50 flex items-center gap-3 text-red-600 dark:text-red-400 text-xs font-bold"
          >
            <AlertCircle size={18} />
            <span>
              Connection error. Please try again or email me directly.
            </span>
          </div>
        )}
      </div>
    </form>
  );
}
