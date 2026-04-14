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
  head: (ctx) => {
    const params = new URLSearchParams(ctx.location.search);

    const page = Number(params.get("page") || 1);
    const query = params.get("search") || "";
    const tag = params.get("tag") || undefined;

    const base = "GP Digital Designs";
    let title = `Insights | ${base}`;

    if (query) title = `Search: ${query} | ${base}`;
    else if (tag) title = `#${tag} Articles | ${base}`;
    else if (page > 1) title = `Insights - Page ${page} | ${base}`;

    return {
      meta: [
        { title },
        {
          name: "description",
          content:
            "Expert articles on web development, design trends, and technical strategy by GP Digital Designs.",
        },
      ],
    };
  },
  component: BlogComponent,
});

function BlogComponent() {
  const searchParams = Route.useSearch();
  const page = searchParams.page ?? 1;
  const { search, tag, author, sort } = Route.useSearch();
  const navigate = Route.useNavigate();

  const {
    data: response,
    isLoading,
    isError,
  } = useBlogPosts({
    page,
    search,
    tag,
    author,
    sort,
  });

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  if (isError)
    return (
      <div className="text-center py-20 text-red-500">Error loading blogs.</div>
    );

  // Extract array from Strapi 5 response
  const posts = (response as any)?.data || [];
  const pageCount = (response as any)?.meta?.pagination?.pageCount || 1;

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-20 animate-in fade-in duration-700">
      {/* Search & Filter Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-100 dark:border-slate-800 pb-8">
        <div className="max-w-xl w-full space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-950 dark:text-white">
            Insights & Articles
          </h1>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) =>
                navigate({
                  search: (prev) => ({
                    ...prev,
                    search: e.target.value,
                    page: 1,
                  }),
                })
              }
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            />
            {(search || tag || author) && (
              <button
                onClick={() =>
                  navigate({ search: (prev) => ({ sort: "newest", page: 1 }) })
                }
                className="text-xs font-black uppercase tracking-widest text-blue-600 hover:text-blue-800 mt-3 block"
              >
                × Clear All Filters
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

          {/* Pagination - Themed Blue */}
          {pageCount > 1 && (
            <div className="flex items-center justify-center gap-6 pt-12 border-t border-slate-100 dark:border-slate-800">
              <button
                disabled={page <= 1}
                onClick={() =>
                  navigate({ search: (prev) => ({ ...prev, page: page - 1 }) })
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
                    search: (prev) => ({ ...prev, page: (prev.page ?? 1) + 1 }),
                  })
                }
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-blue-600 hover:text-white transition-all disabled:opacity-20"
              >
                <ChevronRight size={20} strokeWidth={3} />
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <BlogSidebar />
        </aside>
      </div>
    </div>
  );
}
