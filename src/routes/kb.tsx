import { createFileRoute, Link } from "@tanstack/react-router";
import { useKB, fetchKB } from "../hooks/useStrapi";
import { AccordionItem } from "../components/faq/AccordionItem";
import { useState } from "react";
import { LifeBuoy, Loader2, MessageCircle, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/kb")({
  loader: () => fetchKB(),
  head: () => ({
    meta: [{ title: "Knowledge Base | Glen Studio Troubleshooting" }],
  }),
  component: KnowledgeBasePage,
});

function KnowledgeBasePage() {
  const [activeTab, setActiveTab] = useState("All");
  const { data: response, isLoading } = useKB(activeTab);
  const [openId, setOpenId] = useState<string | null>(null);

  const categories = ["All", "Frontend", "Backend", "Database", "General"];
  const guides = response?.data || [];

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 space-y-16 animate-in fade-in duration-700">
      {/* Header */}
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest">
          <LifeBuoy size={14} /> Support Center
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter">
          Knowledge Base
        </h1>
        <p className="text-slate-500 max-w-xl mx-auto font-medium">
          Common technical issues, symptoms, and step-by-step fixes for modern
          web builds.
        </p>
      </header>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all border-2 
              ${
                activeTab === cat
                  ? "bg-blue-600 border-blue-600 text-white shadow-lg"
                  : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-400 hover:border-blue-500"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="py-20 text-center">
            <Loader2 className="animate-spin mx-auto text-blue-500" />
          </div>
        ) : guides.length > 0 ? (
          guides.map((guide: any) => (
            <AccordionItem
              key={guide.id}
              question={`${guide.category}: ${guide.title}`}
              answer={guide.fix}
              isOpen={openId === guide.documentId}
              onClick={() =>
                setOpenId(openId === guide.documentId ? null : guide.documentId)
              }
            />
          ))
        ) : (
          <div className="py-20 text-center text-slate-400 font-bold border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem]">
            No guides found in this category.
          </div>
        )}
      </div>
      <section className="mt-24 pt-16 border-t-2 border-slate-100 dark:border-slate-800 text-center space-y-8">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-black tracking-tighter">Still stuck?</h2>
          <p className="text-slate-500 font-medium">
            If you're facing a unique challenge that isn't covered in our
            guides, send over a detailed message and I'll help you debug it.
          </p>
        </div>

        <Link
          to="/contact"
          className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest text-xs shadow-xl hover:bg-blue-700 hover:-translate-y-1 hover:shadow-2xl transition-all group"
        >
          <MessageCircle size={18} />
          Report an Issue
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </section>
    </div>
  );
}
