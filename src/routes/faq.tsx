import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AccordionItem } from "../components/faq/AccordionItem";
import { fetchFAQsInfinite } from "../hooks/useStrapi";
import { useEffect, useState } from "react";
import { Loader2, AlertCircle, HelpCircle } from "lucide-react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { ClientOnly } from "#/components/ui/ClientOnly";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions | GP Digital Web Studio" },
      {
        name: "description",
        content:
          "Everything you need to know about the web development process and custom digital solutions by GP Digital Designs.",
      },
      { property: "og:site_name", content: "GP Digital Web Studio" },
    ],
  }),
  component: FAQPage,
});

function FAQContent() {
  const [openId, setOpenId] = useState<string | null>(null);

  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError } =
    useInfiniteQuery({
      queryKey: ["faqs-infinite"],
      queryFn: ({ pageParam }) => fetchFAQsInfinite({ pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const { page, pageCount } = lastPage.meta.pagination;
        return page < pageCount ? page + 1 : undefined;
      },
    });

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage]);

  if (isError)
    return (
      <div className="py-20 text-center text-red-500 flex flex-col items-center gap-2">
        <AlertCircle size={40} />
        <p className="font-bold">
          Failed to load FAQs. Please check your Strapi connection.
        </p>
      </div>
    );

  const allFaqs = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="max-w-4xl mx-auto py-20 px-6 space-y-16 animate-in fade-in duration-700">
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest mx-auto">
          <HelpCircle size={14} /> Support Center
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight text-slate-950 dark:text-white">
          Common Questions.
        </h1>
        <p className="text-xl text-slate-900 dark:text-slate-400 font-medium max-w-2xl mx-auto">
          Everything you need to know about my process and how we can build
          something great together.
        </p>
      </header>

      <div className="space-y-6">
        {allFaqs.length > 0 ? (
          <>
            {allFaqs.map((faq: any) => (
              <AccordionItem
                key={faq.id}
                question={faq.question}
                answer={
                  <div className="prose prose-blue dark:prose-invert max-w-none text-slate-800 dark:text-slate-300">
                    {Array.isArray(faq.answer) ? (
                      <BlocksRenderer content={faq.answer} />
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    )}
                  </div>
                }
                isOpen={openId === faq.documentId}
                onClick={() =>
                  setOpenId(openId === faq.documentId ? null : faq.documentId)
                }
              />
            ))}

            <div
              ref={ref}
              className="py-12 flex flex-col items-center justify-center"
            >
              {isFetchingNextPage ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="animate-spin text-blue-600" />
                  <span className="text-[10px] font-black uppercase text-slate-400">
                    Loading...
                  </span>
                </div>
              ) : hasNextPage ? (
                <span className="text-[10px] font-black uppercase text-blue-500 animate-pulse">
                  ↓ Scroll for more
                </span>
              ) : (
                <div className="h-px bg-slate-200 dark:bg-slate-800 w-24 opacity-50" />
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-950 rounded-[3rem] border-2 border-slate-200 dark:border-slate-800">
            <p className="text-slate-400 font-black uppercase tracking-widest text-xs italic">
              No questions found.
            </p>
          </div>
        )}
      </div>

      <footer className="text-center pt-10 border-t border-slate-100 dark:border-slate-800">
        <p className="text-slate-900 dark:text-slate-400 font-medium">
          Still have questions?{" "}
          <Link
            to="/contact"
            className="text-blue-600 font-black hover:underline transition-all"
          >
            Contact me directly.
          </Link>
        </p>
      </footer>
    </div>
  );
}

function FAQPage() {
  return (
    <ClientOnly>
      <FAQContent />
    </ClientOnly>
  );
}
