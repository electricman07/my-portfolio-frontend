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

  const projects = response?.projects || [];
  const services = response?.services || [];
  const posts = response?.posts || [];
  const faqs = response?.faqs || [];
  const kbResults = response?.kb || [];

  const totalResults =
    projects.length + services.length + posts.length + faqs.length;

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
          {/* PROJECTS SECTION */}
          {projects.length > 0 && (
            <section className="space-y-8">
              <h2 className="text-2xl font-black uppercase tracking-widest text-slate-400">
                Projects ({projects.length})
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project: any) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
              </div>
            </section>
          )}

          {/* SERVICES SECTION */}
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

          {/* ARTICLES SECTION */}
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

          {/* FAQS SECTION */}
          {faqs.length > 0 && (
            <section className="space-y-8">
              <h2 className="text-2xl font-black uppercase tracking-widest text-slate-400">
                Matching FAQs ({faqs.length})
              </h2>
              <div className="grid gap-4 max-w-4xl">
                {faqs.map((faq: any) => (
                  <AccordionItem
                    key={faq.id}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={false}
                    // Since search doesn't have local state for each FAQ,
                    // this simply provides the prop required by AccordionItem
                    onClick={() => {}}
                  />
                ))}
              </div>
            </section>
          )}
          {/* KNOWLEDGE BASE SECTION */}
          {kbResults.length > 0 && (
            <section className="space-y-8">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-blue-500">
                Troubleshooting & Fixes ({kbResults.length})
              </h2>
              <div className="grid gap-4 max-w-4xl">
                {kbResults.map((item: any) => (
                  <AccordionItem
                    key={item.id}
                    question={item.title} // The Problem
                    answer={item.fix} // The Solution
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
