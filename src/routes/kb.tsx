import { createFileRoute, Link } from "@tanstack/react-router";
import { useInfiniteQuery } from "@tanstack/react-query"; // Fixed duplicate imports
import { fetchKB, fetchKBInfinite } from "../hooks/useStrapi"; // Ensure fetchKBInfinite is in useStrapi.ts
import { AccordionItem } from "../components/faq/AccordionItem";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { LifeBuoy, Loader2, MessageCircle, ArrowRight } from "lucide-react";
import { ClientOnly } from "#/components/ui/ClientOnly";
import { useKBCategories } from "../hooks/useKBCategories";

export const Route = createFileRoute("/kb")({
  loader: () => fetchKB(),
  head: () => ({
    meta: [
      { title: "Knowledge Base | GP Digital Web Studio" },
      {
        name: "description",
        content:
          "Technical guides, troubleshooting, and documentation for web projects by GP Digital Web Studio.",
      },
    ],
  }),
  component: KnowledgeBasePage,
});

function KBContent() {
  const [activeTab, setActiveTab] = useState("All");
  const { data: catResponse } = useKBCategories();
  const [openId, setOpenId] = useState<string | null>(null);
  const { ref, inView } = useInView();

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

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage]);

  const allGuides = data?.pages.flatMap((page) => page.data) || [];
  const dynamicCategories = [
    "All",
    ...(catResponse?.data?.map((c: any) => c.name) || []),
  ];

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
        // Prevent duplicates
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
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mx-auto border border-blue-100 dark:border-blue-800">
          <LifeBuoy size={14} /> Support Center
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-950 dark:text-white">
          Knowledge Base
        </h1>
        <p className="text-lg text-slate-900 dark:text-slate-400 font-medium max-w-xl mx-auto">
          Common technical issues, symptoms, and step-by-step fixes.
        </p>
      </header>

      <div className="flex flex-wrap justify-center gap-2">
        {dynamicCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border-2 
              ${
                activeTab === cat
                  ? "bg-blue-600 border-blue-600 text-white shadow-lg"
                  : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-blue-500 hover:text-blue-600"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-12">
        {status === "pending" && allGuides.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center gap-4">
            <Loader2 className="animate-spin text-blue-600" size={40} />
            <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">
              Loading Guides...
            </p>
          </div>
        ) : allGuides.length > 0 ? (
          <>
            {Object.entries(groupedGuides).map(
              ([categoryName, items]: [string, any]) => (
                <section key={categoryName} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
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
                          <div className="space-y-6">
                            {guide.symptom && (
                              <div className="space-y-2">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-red-500">
                                  The Symptom
                                </h4>
                                <div
                                  className="prose prose-sm dark:prose-invert text-slate-900 dark:text-slate-300 max-w-none"
                                  dangerouslySetInnerHTML={{
                                    __html: guide.symptom,
                                  }}
                                />
                              </div>
                            )}

                            {guide.theFix && (
                              <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                                  The Fix
                                </h4>
                                <div
                                  className="prose prose-sm dark:prose-invert text-slate-900 dark:text-slate-200 max-w-none font-medium"
                                  dangerouslySetInnerHTML={{
                                    __html: guide.theFix,
                                  }}
                                />
                              </div>
                            )}
                          </div>
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

            <div
              ref={ref}
              className="h-24 w-full flex items-center justify-center"
            >
              {isFetchingNextPage ? (
                <Loader2 className="animate-spin text-blue-600" />
              ) : hasNextPage ? (
                <span className="text-[10px] font-black uppercase text-blue-500 animate-pulse">
                  ↓ Scroll for more fixes
                </span>
              ) : (
                <span className="text-[10px] font-black uppercase text-slate-400">
                  All documentation loaded
                </span>
              )}
            </div>
          </>
        ) : (
          <div className="py-20 text-center text-slate-500 font-bold border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem]">
            No guides found in this category.
          </div>
        )}
      </div>

      {/* Report Issue Footer */}
      <section className="mt-24 pt-16 border-t-2 border-slate-100 dark:border-slate-800 text-center">
        <Link
          to="/contact"
          className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-blue-700 hover:-translate-y-1 transition-all group"
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
