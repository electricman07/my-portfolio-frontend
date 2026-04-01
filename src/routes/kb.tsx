import { createFileRoute, Link } from "@tanstack/react-router";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"; // Fixed duplicate imports
import { fetchKB, fetchKBInfinite } from "../hooks/useStrapi"; // Ensure fetchKBInfinite is in useStrapi.ts
import { AccordionItem } from "../components/faq/AccordionItem";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { LifeBuoy, Loader2, MessageCircle, ArrowRight } from "lucide-react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { ClientOnly } from "#/components/ui/ClientOnly";

export const Route = createFileRoute("/kb")({
  loader: () => fetchKB(),
  head: () => ({
    meta: [{ title: "Knowledge Base | Glen Studio Troubleshooting" }],
  }),
  component: KnowledgeBasePage,
});

export function useKBCategories() {
  const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1338";
  return useQuery({
    queryKey: ["kb-categories"],
    queryFn: async () => {
      const res = await fetch(`${STRAPI_URL}/api/categories`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },
  });
}

function KBContent() {
  const [activeTab, setActiveTab] = useState("All");
  const { data: catResponse } = useKBCategories();
  const [openId, setOpenId] = useState<string | null>(null);

  const { ref, inView } = useInView();

  // THE INFINITE QUERY
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["kb-infinite", activeTab],
      queryFn: ({ pageParam }) =>
        fetchKBInfinite({ pageParam, category: activeTab }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const { page, pageCount } = lastPage.meta.pagination;

        return page < pageCount ? page + 1 : undefined;
      },
    });

  // TRIGGER FETCH ON SCROLL
  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage]);

  // FLATTEN DATA FOR GROUPING
  const allGuides = data?.pages.flatMap((page) => page.data) || [];

  const dynamicCategories = [
    "All",
    ...(catResponse?.data?.map((c: any) => c.name) || []),
  ];

  // GROUPING LOGIC
  const groupedGuides = allGuides.reduce((acc: any, guide: any) => {
    const itemCats =
      guide.categories && guide.categories.length > 0
        ? guide.categories.map((c: any) => c.name)
        : ["General"];

    itemCats.forEach((catName: string) => {
      const isMatch =
        activeTab === "All" ||
        catName.toLowerCase() === activeTab.toLowerCase();

      if (isMatch) {
        if (!acc[catName]) acc[catName] = [];
        // Prevent duplicates from multiple pages
        if (!acc[catName].find((i: any) => i.id === guide.id)) {
          acc[catName].push(guide);
        }
      }
    });
    return acc;
  }, {});

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 space-y-16 animate-in fade-in duration-700">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest">
          <LifeBuoy size={14} /> Support Center
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter">
          Knowledge Base
        </h1>
      </header>

      <div className="flex flex-wrap justify-center gap-2">
        {dynamicCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all border-2 
              ${activeTab === cat ? "bg-blue-600 border-blue-600 text-white shadow-lg" : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-400 hover:border-blue-500"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-12">
        {/* Catch the very first load */}
        {status === "pending" && allGuides.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center gap-4">
            <Loader2 className="animate-spin text-blue-500" size={40} />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
              Loading Guides...
            </p>
          </div>
        ) : allGuides.length > 0 ? (
          <>
            {Object.entries(groupedGuides).map(
              ([categoryName, items]: [string, any]) => (
                <section key={categoryName} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                      {categoryName}
                    </h2>
                    <div className="h-px bg-slate-200 dark:bg-slate-800 grow" />
                  </div>
                  <div className="grid gap-4">
                    {items.map((guide: any) => (
                      <AccordionItem
                        key={guide.id}
                        question={guide.title}
                        answer={
                          guide.fix ? (
                            <div className="prose prose-slate dark:prose-invert max-w-none">
                              <BlocksRenderer content={guide.fix} />
                            </div>
                          ) : (
                            "No solution yet."
                          )
                        }
                        isOpen={openId === guide.documentId}
                        onClick={() =>
                          setOpenId(
                            openId === guide.documentId
                              ? null
                              : guide.documentId,
                          )
                        }
                      />
                    ))}
                  </div>
                </section>
              ),
            )}

            {/* --- CRITICAL: THE SENSOR --- */}
            <div
              ref={ref}
              className="h-24 w-full flex items-center justify-center border-t border-slate-100 dark:border-slate-800"
            >
              {isFetchingNextPage ? (
                <Loader2 className="animate-spin text-blue-500" />
              ) : hasNextPage ? (
                <span className="text-[10px] font-black uppercase text-blue-500 animate-pulse">
                  ↓ Scroll for more fixes
                </span>
              ) : (
                <span className="text-[10px] font-black uppercase text-slate-300">
                  All documentation loaded
                </span>
              )}
            </div>
          </>
        ) : (
          <div className="py-20 text-center text-slate-400 font-bold border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem]">
            No guides found in this category.
          </div>
        )}
      </div>

      <section className="mt-24 pt-16 border-t-2 border-slate-100 dark:border-slate-800 text-center space-y-8">
        <Link
          to="/contact"
          className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest text-xs shadow-xl hover:bg-blue-700 hover:-translate-y-1 hover:shadow-2xl transition-all group"
        >
          <MessageCircle size={18} /> Report an Issue{" "}
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </section>
    </div>
  );
}

function KnowledgeBasePage() {
  return (
    <ClientOnly>
      <KBContent />
    </ClientOnly>
  );
}
