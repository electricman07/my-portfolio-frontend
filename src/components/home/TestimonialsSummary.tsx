import { useQuery } from "@tanstack/react-query";
import { fetchStrapi } from "../../lib/api";
import { Quote, Star, Loader2 } from "lucide-react";
import { Reveal } from "../ui/Reveal";

export function TestimonialsSummary() {
  const { data: response, isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: () => fetchStrapi<any>("testimonials?populate=*"),
  });

  const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1338";

  if (isLoading)
    return (
      <div className="py-20 text-center">
        <Loader2 className="animate-spin mx-auto text-blue-500" />
      </div>
    );

  const testimonials = response?.data || [];

  return (
    <section className="max-w-7xl mx-auto px-6 py-10 space-y-16">
      <div className="text-center space-y-4">
        <h4 className="text-blue-500 font-black uppercase tracking-[0.2em] text-xs">
          Trust
        </h4>
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
          What Clients Say.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t: any, i: number) => (
          <Reveal key={t.id} delay={i * 0.1}>
            <div className="p-10 flex flex-col h-full bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-800 rounded-[3rem] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
              {/* 1. RATING & QUOTE ICON */}
              <div className="flex justify-between items-start mb-8">
                <div className="flex gap-1">
                  {[...Array(t.stars || 5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <Quote
                  size={32}
                  className="text-blue-500/20 group-hover:text-blue-500 transition-colors"
                />
              </div>

              {/* 2. THE QUOTE: Using a serif font for a "Premium Editorial" look */}
              <p className="italic text-lg text-slate-700 dark:text-slate-300 font-serif leading-relaxed mb-8 grow">
                "{t.content}"
              </p>

              {/* 3. CLIENT INFO */}
              <div className="flex items-center gap-4 pt-6 border-t-2 border-slate-50 dark:border-slate-800">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-900 overflow-hidden border-2 border-white dark:border-slate-800 shadow-sm">
                  {t.image?.url && (
                    <img
                      src={`${STRAPI_URL}${t.image.url}`}
                      alt={t.clientName}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-sm tracking-tight text-slate-900 dark:text-white">
                    {t.clientName}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {t.clientRole}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
