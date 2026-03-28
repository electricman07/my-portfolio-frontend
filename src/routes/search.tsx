import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { useGlobalSearch } from "../hooks/useGlobalSearch";
import { ProjectCard } from "../components/portfolio/ProjectCard";
import { ServiceCard } from "../components/services/ServiceCard";
import { getServiceIcon } from "../lib/iconMapper";
import { BlogCard } from "../components/blog/BlogCard";
// 1. Define the Search Schema (What ?q= expects)
const searchSchema = z.object({
  q: z.string().optional().catch(""),
});

// 2. Define the Route and link it to the SearchResultsPage component
export const Route = createFileRoute("/search")({
  validateSearch: (search) => searchSchema.parse(search),
  component: SearchResultsPage,
});

function SearchResultsPage() {
  const { q } = Route.useSearch();
  const { data: response, isLoading } = useGlobalSearch(q || "");

  const recent = JSON.parse(localStorage.getItem("recentSearches") || "[]");

  if (isLoading)
    return (
      <div className="py-20 text-center font-bold">Searching for "{q}"...</div>
    );

  // 1. SAFETY: Use optional chaining and default to empty arrays
  const projects = response?.projects || [];
  const services = response?.services || [];
  const posts = response?.posts || [];

  const totalResults = projects.length + services.length + posts.length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      <header className="border-b border-slate-100 dark:border-slate-800 pb-8">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
          Search: {q}
        </h1>

        {recent.length > 0 && (
          <>
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Recent:
              </span>
              {recent.map((term: string) => (
                <Link
                  key={term}
                  to="/search"
                  search={{ q: term }}
                  className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-sm hover:bg-blue-500 hover:text-white transition-all"
                >
                  {term}
                </Link>
              ))}
              <button
                onClick={() => {
                  localStorage.removeItem("recentSearches");
                  window.location.reload();
                }}
                className="text-xs text-red-500 hover:underline ml-2"
              >
                Clear All
              </button>
            </div>

            <p className="text-slate-500 mt-4 text-lg">
              We found{" "}
              <span className="text-blue-500 font-bold">{totalResults}</span>{" "}
              matches across our site.
            </p>
          </>
        )}
      </header>

      {totalResults === 0 ? (
        <div className="py-20 text-center text-slate-400 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
          <p className="text-xl font-bold">No matches found for "{q}"</p>
          <p className="mt-2">
            Try a broader keyword like "Development" or "Design".
          </p>
        </div>
      ) : (
        <div className="space-y-24">
          {/* 2. PROJECTS SECTION */}
          {projects.length > 0 && (
            <section className="space-y-8">
              <h2 className="text-2xl font-black uppercase tracking-widest text-slate-400">
                Projects ({projects.length})
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project: any) => (
                  <ProjectCard
                    key={project.id}
                    id={project.documentId} // CRITICAL: Use documentId for routing
                    {...project}
                  />
                ))}
              </div>
            </section>
          )}

          {/* 3. SERVICES SECTION */}
          {services.length > 0 && (
            <section className="space-y-8">
              <h2 className="text-2xl font-black uppercase tracking-widest text-slate-400">
                Services ({services.length})
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {services.map((service: any) => (
                  <ServiceCard
                    key={service.id}
                    title={service.title}
                    description={service.description}
                    icon={getServiceIcon(service.iconName)}
                    color={service.color}
                    bg={service.bg}
                  />
                ))}
              </div>
            </section>
          )}

          {/* 4. ARTICLES SECTION */}
          {posts.length > 0 && (
            <section className="space-y-8">
              <h2 className="text-2xl font-black uppercase tracking-widest text-slate-400">
                Articles ({posts.length})
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post: any) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
