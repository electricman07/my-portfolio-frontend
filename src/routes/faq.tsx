import { createFileRoute } from "@tanstack/react-router";
import { AccordionItem } from "../components/faq/AccordionItem";
import { useFaqs } from "../hooks/useStrapi";
import { useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions | Glen Studio" },
      {
        name: "description",
        content:
          "Everything you need to know about my web development process, project timelines, maintenance packages, and custom eCommerce solutions.",
      },
    ],
  }),
  component: FAQPage,
});

function FAQPage() {
  const { data: response, isLoading, isError } = useFaqs();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <Loader2 className="animate-spin text-blue-500" size={40} />
        <p className="text-slate-500 font-black uppercase tracking-widest text-xs">
          Syncing FAQ...
        </p>
      </div>
    );

  if (isError)
    return (
      <div className="py-20 text-center text-red-500 flex flex-col items-center gap-2">
        <AlertCircle size={40} />
        <p className="font-bold">
          Failed to load FAQs. Please check your Strapi connection.
        </p>
      </div>
    );

  const faqs = response?.data || (Array.isArray(response) ? response : []);

  return (
    /* THE FIX: Added mx-auto and increased max-w for better readability */
    <div className="max-w-4xl mx-auto py-20 px-6 space-y-16 animate-in fade-in duration-700">
      {/* Premium Header Styling */}
      <header className="text-center space-y-6">
        <h4 className="text-blue-500 font-black uppercase tracking-[0.2em] text-xs">
          Support
        </h4>
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight">
          Common Questions.
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
          Everything you need to know about my process, timeline, and how we can
          build something great together.
        </p>
      </header>

      {/* Accordion Container */}
      <div className="space-y-6">
        {faqs.length > 0 ? (
          faqs.map((faq: any, index: number) => (
            <AccordionItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))
        ) : (
          <div className="text-center py-20 bg-[#F8FAFC] dark:bg-slate-900 rounded-[3rem] border-2 border-slate-300 dark:border-slate-600 shadow-sm">
            <p className="text-slate-400 font-black uppercase tracking-widest text-xs italic">
              No questions found in the backend.
            </p>
          </div>
        )}
      </div>

      {/* Optional Contact CTA */}
      <footer className="text-center pt-10">
        <p className="text-slate-500 font-medium">
          Still have questions?{" "}
          <span className="text-blue-600 font-bold hover:underline cursor-pointer">
            Contact me directly.
          </span>
        </p>
      </footer>
    </div>
  );
}
