import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { createFileRoute } from "@tanstack/react-router";
import { Search, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { BlogCard } from "../../components/blog/BlogCard";
import { BlogSidebar } from "../../components/blog/BlogSidebar";
import { useBlogPosts } from "../../hooks/useStrapi";

type BlogSearch = {
  page?: number;
  search?: string;
  tag?: string;
  author?: string;
  month?: string;
  year?: string;
  sort: "newest" | "oldest";
};

export const Route = createFileRoute("/blog/")({
  validateSearch: (search: Record<string, unknown>): BlogSearch => {
    return {
      page: Number(search.page) || 1,
      search: (search.search as string) || "",
      tag: (search.tag as string) || undefined,
      author: (search.author as string) || undefined,
      sort: (search.sort as "newest" | "oldest") || "newest",
    };
  },
  shouldReload: false,
  loaderDeps: ({ search: { page, search, tag } }) => ({
    page,
    search,
    tag,
  }),
  loader: ({ deps }) => {
    return { searchParams: deps };
  },
  head: (ctx) => {
    if (!ctx.loaderData?.searchParams) {
      return { meta: [{ title: "GP Digital Designs" }] };
    }

    const { search, tag, page } = ctx.loaderData.searchParams;
    const base = "GP Digital Designs";
    let title = `Insights | ${base}`;

    if (search) title = `Search: ${search} | ${base}`;
    else if (tag) title = `#${tag} Articles | ${base}`;
    else if (page && page > 1) title = `Insights - Page ${page} | ${base}`;

    return {
      meta: [
        { title },
        {
          name: "description",
          content: "Expert articles on web development and design strategy.",
        },
      ],
    };
  },
  component: BlogComponent,
});

function BlogComponent() {
  const navigate = Route.useNavigate();
  const { search: initialSearch, tag, author, sort } = Route.useSearch();

  const page = Route.useSearch({ select: (s) => s.page ?? 1 });
  const searchInUrl = Route.useSearch({ select: (s) => s.search || "" });
  const otherParams = Route.useSearch({
    select: (s) => ({ tag: s.tag, sort: s.sort }),
  });

  const [localSearch, setLocalSearch] = useState(initialSearch || "");
  const [debouncedValue] = useDebounce(localSearch, 400);

  useEffect(() => {
    if (debouncedValue !== searchInUrl) {
      navigate({
        search: (prev) => ({
          ...prev,
          search: debouncedValue || undefined,
          page: 1,
        }),
        replace: true,
        resetScroll: false,
      });
    }
  }, [debouncedValue, navigate, searchInUrl]);

  const {
    data: response,
    isLoading,
    isError,
  } = useBlogPosts({
    page,
    search: searchInUrl,
    ...otherParams,
  });

  const posts = (response as any)?.data || [];
  const pageCount = (response as any)?.meta?.pagination?.pageCount || 1;

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-20 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-100 dark:border-slate-800 pb-8">
        <div className="max-w-xl w-full space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-950 dark:text-white">
            Insights & Articles
          </h1>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              size={18}
            />
            <input
              type="text"
              placeholder="Search articles..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full pl-10 pr-12 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            />
            {(localSearch || tag || author) && (
              <button
                onClick={() => {
                  setLocalSearch(""); // 1. Clear the visual text box immediately
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      search: undefined, // 2. Remove search from URL
                      page: 1,
                    }),
                  });
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Clear search"
              >
                <svg
                  xmlns="http://w3.org"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
        </div>

        <select
          value={sort}
          onChange={(e) =>
            navigate({
              search: (prev) => ({
                ...prev,
                sort: e.target.value as any,
                page: 1,
              }),
            })
          }
          className="px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-bold outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <div className="grid lg:grid-cols-4 gap-16">
        <div className="lg:col-span-3 space-y-12">
          {/* CONDITIONAL RENDERING STARTS HERE (Nested inside the layout) */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-blue-600" size={40} />
            </div>
          ) : isError ? (
            <div className="text-center py-20 text-red-500">
              Error loading blogs.
            </div>
          ) : (
            <>
              {posts.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-10">
                  {posts.map((post: any) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-[3rem]">
                  <p className="text-slate-400 font-bold">
                    No articles found matching your criteria.
                  </p>
                </div>
              )}

              {pageCount > 1 && (
                <div className="flex items-center justify-center gap-6 pt-12 border-t border-slate-100 dark:border-slate-800">
                  <button
                    disabled={page <= 1}
                    onClick={() =>
                      navigate({
                        search: (prev) => ({ ...prev, page: page - 1 }),
                      })
                    }
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-blue-600 hover:text-white transition-all disabled:opacity-20"
                  >
                    <ChevronLeft size={20} strokeWidth={3} />
                  </button>
                  <span className="font-black text-slate-950 dark:text-white tracking-tighter">
                    Page {page} of {pageCount}
                  </span>
                  <button
                    disabled={page >= pageCount}
                    onClick={() =>
                      navigate({
                        search: (prev) => ({ ...prev, page: page + 1 }),
                      })
                    }
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-blue-600 hover:text-white transition-all disabled:opacity-20"
                  >
                    <ChevronRight size={20} strokeWidth={3} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <aside className="lg:col-span-1">
          <BlogSidebar />
        </aside>
      </div>
    </div>
  );
}
