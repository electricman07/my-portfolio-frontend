import { ChevronDown } from "lucide-react";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

export function AccordionItem({
  question,
  answer,
  isOpen,
  onClick,
}: AccordionItemProps) {
  return (
    <div
      className={`
        overflow-hidden transition-all duration-500
        /* LIGHT: Pearl / Slate-300 */
        bg-[#F8FAFC] border-2 
        /* DARK: High-Contrast Slate-600 */
        dark:bg-slate-900 
        /* BORDER LOGIC: Blue if open, Slate if closed */
        ${
          isOpen
            ? "border-blue-500 shadow-xl -translate-y-1"
            : "border-slate-300 dark:border-slate-600 shadow-sm"
        } 
        rounded-[2.5rem]
      `}
    >
      <button
        onClick={onClick}
        className="w-full px-8 py-6 flex items-center justify-between text-left transition-colors group"
      >
        <span
          className={`font-black text-xl tracking-tight transition-colors duration-300 ${isOpen ? "text-blue-600 dark:text-blue-400" : "text-slate-900 dark:text-white"}`}
        >
          {question}
        </span>
        <div
          className={`p-2 rounded-full transition-all duration-500 ${isOpen ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-900 text-blue-500"}`}
        >
          <ChevronDown
            size={20}
            strokeWidth={3}
            className={`transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {/* Accordion Content */}
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-8 pb-8 text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium pt-2 border-t-2 border-slate-50 dark:border-slate-900">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}
