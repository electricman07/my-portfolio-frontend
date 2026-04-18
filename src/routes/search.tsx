import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { useGlobalSearch } from "../hooks/useGlobalSearch";
import { ProjectCard } from "../components/portfolio/ProjectCard";
import { ServiceCard } from "../components/services/ServiceCard";
import { getServiceIcon } from "../lib/iconMapper";
import { BlogCard } from "../components/blog/BlogCard";
import { AccordionItem } from "../components/faq/AccordionItem";

const searchSchema = z.object({
  q: z.string().optional().catch(""),
});

export const Route = createFileRoute("/search")({
  validateSearch: (search) => searchSchema.parse(search),
  head: (ctx: any) => {
    const q = ctx.search?.q;
    return { meta: [{ title: q ? `${q} | Search` : "Search" }] };
  },
  component: SearchResultsPage,
});

function SearchResultsPage() {
  const { q } = Route.useSearch();
  const { data: response, isLoading } = useGlobalSearch(q || "");

  const recent =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("recentSearches") || "[]")
      : [];

  if (isLoading)
    return (
      <div className="py-40 text-center flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
          Searching for "{q}"...
        </p>
      </div>
    );

  const projects = response?.projects || [];
  const services = response?.services || [];
  const posts = response?.posts || [];
  const faqs = response?.faqs || [];
  const kbResults = response?.kb || [];

  const totalResults =
    projects.length + services.length + posts.length + faqs.length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 animate-in fade-in duration-700">
      <header className="border-b border-slate-100 dark:border-slate-800 pb-8 space-y-4">
        {/* FONT COLOR FIX: text-slate-950 */}
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-950 dark:text-white">
          Search: <span className="text-blue-600">"{q}"</span>
        </h1>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-slate-800 dark:text-slate-400 text-lg font-medium">
            We found{" "}
            <span className="text-blue-600 font-bold">{totalResults}</span>{" "}
            matches.
          </p>

          {recent.length > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Recent:
              </span>
              {recent.slice(0, 3).map((term: string) => (
                <Link
                  key={term}
                  to="/search"
                  search={{ q: term }}
                  className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold hover:bg-blue-600 hover:text-white transition-all"
                >
                  {term}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>

      {totalResults === 0 ? (
        <div className="py-20 text-center text-slate-400 bg-slate-50 dark:bg-slate-950 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
          <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
            No matches found for "{q}"
          </p>
          <p className="mt-2 font-medium">
            Try searching for "React", "Design", or "Maintenance".
          </p>
        </div>
      ) : (
        <div className="space-y-24">
          {/* PROJECTS */}
          {projects.length > 0 && (
            <section className="space-y-8">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">
                Projects ({projects.length})
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project: any) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
              </div>
            </section>
          )}

          {/* SERVICES */}
          {services.length > 0 && (
            <section className="space-y-8">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">
                Services ({services.length})
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {services.map((service: any) => (
                  <ServiceCard
                    key={service.id}
                    serviceId={service.slug}
                    title={service.title}
                    description={service.description}
                    icon={getServiceIcon(service.iconName)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* ARTICLES */}
          {posts.length > 0 && (
            <section className="space-y-8">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">
                Insights ({posts.length})
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post: any) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          )}

          {/* KNOWLEDGE BASE & FAQS */}
          {(faqs.length > 0 || kbResults.length > 0) && (
            <section className="space-y-8">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">
                Support & Documentation
              </h2>
              <div className="grid gap-4 max-w-4xl">
                {kbResults.map((item: any) => (
                  <AccordionItem
                    key={item.id}
                    question={`[KB] ${item.title}`}
                    answer={
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.theFix || item.fix,
                        }}
                      />
                    }
                    isOpen={false}
                    onClick={() => {}}
                  />
                ))}
                {faqs.map((faq: any) => (
                  <AccordionItem
                    key={faq.id}
                    question={`[FAQ] ${faq.question}`}
                    answer={faq.answer}
                    isOpen={false}
                    onClick={() => {}}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
