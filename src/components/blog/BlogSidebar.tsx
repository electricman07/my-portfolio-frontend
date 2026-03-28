import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import {
  Calendar as CalendarIcon,
  Tag,
  User,
  ChevronRight,
  Loader2,
  X,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchStrapi } from "../../lib/api";

export function BlogSidebar() {
  const navigate = useNavigate();
  const searchState = useSearch({ strict: false }) as any;
  const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1338";

  const { data: archiveResponse } = useQuery({
    queryKey: ["blog-archives"],
    queryFn: () => fetchStrapi<any>("posts/archives"),
  });

  const archives = archiveResponse?.data || [];

  const { data: tagsResponse, isLoading: tagsLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: () => fetchStrapi<any>("tags"),
  });

  const { data: authorsResponse, isLoading: authorsLoading } = useQuery({
    queryKey: ["authors"],
    queryFn: () => fetchStrapi<any>("authors", { populate: "*" }),
  });

  const tags = Array.isArray(tagsResponse?.data) ? tagsResponse.data : [];
  const authors = Array.isArray(authorsResponse?.data)
    ? authorsResponse.data
    : [];

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) return;
    const [year, month] = value.split("-");
    navigate({
      to: "/blog",
      search: (prev: any) => ({ ...prev, year, month, page: 1 }),
    });
  };

  const { tag, author, year, month } = searchState;
  const hasAnyFilter = !!(tag || author || year || month);

  const handleResetDate = () => {
    navigate({
      to: "/blog",
      search: (prev: any) => {
        const { year, month, ...rest } = prev;
        return { ...rest, page: 1 };
      },
    });
  };

  const handleClearAll = () => {
    navigate({ to: "/blog", search: { page: 1, sort: "newest", search: "" } });
  };

  if (tagsLoading || authorsLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8 sticky top-24 pb-10">
      {/* 1. GLOBAL CLEAR BUTTON */}
      {hasAnyFilter && (
        <button
          onClick={handleClearAll}
          className="w-full py-4 px-4 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 
                   rounded-4xl border-2 border-red-100 dark:border-red-900/50 
                   text-xs font-black uppercase tracking-[0.2em] 
                   hover:bg-red-600 hover:text-white transition-all duration-300
                   flex items-center justify-center gap-2 shadow-sm"
        >
          <X size={14} strokeWidth={3} /> Clear All Filters
        </button>
      )}

      {/* 2. ARCHIVES SECTION */}
      <section className="p-8 bg-slate-50 dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-800 rounded-[2.5rem] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)]">
        <h4 className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-slate-400 border-b-2 border-slate-100 dark:border-slate-800 pb-4 mb-6">
          <CalendarIcon size={16} className="text-blue-500" /> Archives
        </h4>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
                Jump to Date
              </label>
              {(year || month) && (
                <button
                  onClick={handleResetDate}
                  className="text-[10px] uppercase font-black text-red-500 hover:underline"
                >
                  Reset
                </button>
              )}
            </div>
            <div className="relative group">
              <input
                type="month"
                value={
                  year && month
                    ? `${year}-${month.toString().padStart(2, "0")}`
                    : ""
                }
                onChange={handleDateChange}
                onClick={(e) => (e.target as HTMLInputElement).showPicker?.()}
                className="w-full text-xs font-bold p-3 pr-10 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {archives.map((item: any) => (
              <Link
                key={item.key}
                to="/blog"
                search={(prev: any) => ({
                  ...prev,
                  year: item.year,
                  month: item.month,
                  page: 1,
                })}
                className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-500 flex justify-between items-center group transition-colors"
              >
                {item.label}
                <ChevronRight
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. KEYWORDS SECTION */}
      <section className="p-8 bg-slate-50 dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-800 rounded-[2.5rem] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)]">
        <h4 className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-slate-400 border-b-2 border-slate-100 dark:border-slate-800 pb-4 mb-6">
          <Tag size={16} className="text-blue-500" /> Keywords
        </h4>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag: any) => (
            <Link
              key={tag.id}
              to="/blog"
              search={{ ...searchState, tag: tag.name, page: 1 }}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-900 border-2 border-transparent rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 hover:border-blue-500 hover:text-blue-500 transition-all"
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      </section>

      {/* 4. AUTHORS SECTION */}
      <section className="p-8 bg-slate-50 dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-800 rounded-[2.5rem] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)]">
        <h4 className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-slate-400 border-b-2 border-slate-100 dark:border-slate-800 pb-4 mb-6">
          <User size={16} className="text-blue-500" /> Authors
        </h4>
        <div className="space-y-4">
          {authors.map((author: any) => (
            <Link
              key={author.id}
              to="/blog"
              search={{ ...searchState, author: author.name, page: 1 }}
              className="group flex items-center justify-between p-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border-2 border-white dark:border-slate-800 shadow-sm">
                  {author.avatar?.url && (
                    <img
                      src={`${STRAPI_URL}${author.avatar.url}`}
                      alt={author.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  {author.name}
                </span>
              </div>
              <ChevronRight
                size={14}
                className="text-slate-400 group-hover:text-blue-500 transition-colors"
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
