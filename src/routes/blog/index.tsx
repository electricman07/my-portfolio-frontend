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
  component: RouteComponent,
});

function RouteComponent() {
  const searchParams = Route.useSearch();
  const page = searchParams.page ?? 1;
  const { search, tag, author, sort } = Route.useSearch();
  const navigate = Route.useNavigate();

  // Fetch real data from Strapi 5
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
    <div className="max-w-7xl mx-5 py-12 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="max-w-xl w-full space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
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
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() =>
                navigate({
                  search: (prev: any) => ({
                    ...prev,
                    year: undefined,
                    month: undefined,
                    page: 1,
                  }),
                })
              }
              className="text-xs text-blue-500 underline mt-2"
            >
              Clear Archive Filter
            </button>
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
          className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <div className="grid lg:grid-cols-4 gap-12">
        <div className="lg:col-span-3 space-y-12">
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {posts.map((post: any) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-center py-10">No articles found.</p>
          )}

          {/* Pagination */}
          {pageCount > 1 && (
            <div className="flex items-center justify-center gap-4 pt-8">
              <button
                disabled={page <= 1}
                onClick={() =>
                  navigate({ search: (prev) => ({ ...prev, page: page - 1 }) })
                }
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 disabled:opacity-30"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="font-medium">
                Page {page} of {pageCount}
              </span>
              <button
                disabled={page >= pageCount}
                onClick={() =>
                  navigate({
                    search: (prev) => ({ ...prev, page: (prev.page ?? 1) - 1 }),
                  })
                }
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 disabled:opacity-30"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        <aside className="lg:col-span-1">
          <BlogSidebar />
        </aside>
      </div>
    </div>
  );
}
