import { createFileRoute, useParams, Link } from "@tanstack/react-router";
import { useBlogPost, fetchBlogPost } from "../../hooks/useStrapi";
import { Loader2, Calendar, User, ChevronLeft } from "lucide-react";
import { BlogSidebar } from "../../components/blog/BlogSidebar";
import { RelatedProjects } from "../../components/blog/RelatedProjects";

export const Route = createFileRoute("/blog/$blogId")({
  loader: async ({ params }) => {
    return await fetchBlogPost(params.blogId);
  },
  // 3. Inject SEO Tags
  head: (ctx) => {
    const post = ctx.loaderData?.data;
    if (!post) return { meta: [{ title: "Blog | GP Digital Web Studio" }] };

    return {
      meta: [
        // Updated Site Name
        { title: `${post.title} | GP Digital Web Studio` },
        {
          name: "description",
          content:
            post.excerpt ||
            // Fallback: Strip HTML tags from content string and take first 160 chars
            post.content?.replace(/<[^>]*>/g, "").substring(0, 160),
        },
        // Social Media Tags
        { property: "og:title", content: post.title },
        { property: "og:site_name", content: "GP Digital Designs" },
        { property: "og:type", content: "article" },
        { property: "og:image", content: post.coverImage?.url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "article:published_time", content: post.createdAt },
      ],
    };
  },
  component: BlogDetailPage,
});

function BlogDetailPage() {
  const { blogId } = useParams({ from: "/blog/$blogId" });
  const response = Route.useLoaderData();
  const { isLoading, isError } = useBlogPost(blogId);
  const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1338";

  if (!response?.data)
    return (
      <div className="py-20 text-center text-red-500 font-black">
        Article not found.
      </div>
    );

  if (isLoading)
    return (
      <div className="py-20 text-center">
        <Loader2 className="animate-spin mx-auto" />
      </div>
    );
  if (isError || !response?.data)
    return (
      <div className="py-20 text-center text-red-500">Post not found.</div>
    );

  const post = response.data; // Strapi 5 flattened response

  const safeTags = Array.isArray(post.tags) ? post.tags : [];

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 animate-in fade-in duration-700">
      {/* Back Button */}
      <Link
        to="/blog"
        search={{ page: 1, sort: "newest", search: "" }}
        className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-500 mb-8 transition-colors"
      >
        <ChevronLeft size={20} /> Back to Insights
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* LEFT: MAIN ARTICLE */}
        <article className="lg:col-span-8">
          {/* Hero Header */}
          <header className="space-y-6 mb-12 text-left">
            <div className="flex items-center gap-4 text-sm font-medium text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <User size={16} /> {post.author?.name || "Admin"}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={16} />{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-slate-950 dark:text-white">
              {post.title}
            </h1>
            {post.coverImage && (
              <div className="aspect-21/9 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg bg-slate-100">
                <img
                  src={`${STRAPI_URL}${post.coverImage.url}`}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </header>

          {/* Main Content Body */}
          <div
            className="prose prose-lg max-w-none text-slate-950 dark:text-slate-200 prose-headings:text-slate-950 dark:prose-headings:text-white prose-headings:font-black prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-3xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>

          {/* Footer Tags */}
          {safeTags?.length > 0 && (
            <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                Posted in
              </h4>
              <div className="flex flex-wrap gap-2">
                {safeTags.map((tag: any) => (
                  <Link
                    key={tag.id}
                    to="/blog"
                    search={{
                      tag: tag.name,
                      page: 1,
                      sort: "newest",
                      search: "",
                    }}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-900 rounded-full text-sm font-medium hover:bg-blue-500 hover:text-white transition-all"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <RelatedProjects projects={post.related_projects} />
        </article>

        {/* RIGHT: SIDEBAR */}
        <aside className="lg:col-span-4 space-y-10 sticky top-24 self-start">
          <BlogSidebar />
        </aside>
      </div>{" "}
    </div>
  );
}
