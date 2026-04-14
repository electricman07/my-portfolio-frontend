import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { ProjectCard } from "../../components/portfolio/ProjectCard";
import { useProjects } from "../../hooks/useStrapi";
// 1. Define Search Params for Portfolio (Simplified compared to Blog)
type PortfolioSearch = {
  page: number;
  search: string;
};

export const Route = createFileRoute("/portfolio/")({
  validateSearch: (search: Record<string, unknown>): PortfolioSearch => {
    return {
      // 2. Keep the fallbacks here so the component logic still works
      page: Number(search.page) || 1,
      search: (search.search as string) || "",
    };
  },
  loaderDeps: ({ search: { search, page } }) => ({ search, page }),
  loader: ({ deps }) => ({ deps }),
  head: (ctx) => {
    const search = ctx.loaderData?.deps?.search;
    const base = "GP Digital Designs";

    // Dynamic Title Logic
    const title = search
      ? `Search: "${search}" | Portfolio | ${base}`
      : `Portfolio | Featured Works | ${base}`;

    return {
      meta: [
        { title },
        {
          name: "description",
          content:
            "Explore a curated collection of web development and design projects by GP Digital Designs.",
        },
      ],
    };
  },
  component: PortfolioPage,
});

function PortfolioPage() {
  const { search } = Route.useSearch();
  const navigate = Route.useNavigate();

  // 2. Use the correct hook for Portfolio
  const { data: response, isLoading, isError, error } = useProjects();

  // 3. Handle Loading State
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4 text-slate-400">
        <Loader2 className="animate-spin text-blue-500" size={48} />
        <p className="font-medium animate-pulse">Loading portfolio...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-20 text-center space-y-6 max-w-md mx-auto">
        <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-3xl border border-red-100 dark:border-red-900/30">
          <h2 className="text-red-600 dark:text-red-400 font-bold text-xl mb-2">
            Connection Error
          </h2>
          <p className="text-slate-500 text-sm">
            {error instanceof Error
              ? error.message
              : "Failed to load projects."}
          </p>
        </div>
      </div>
    );
  }

  const responseData = response as any;

  const allProjects = Array.isArray(responseData)
    ? responseData
    : responseData?.data || [];

  const filteredProjects = allProjects.filter((project: any) =>
    project.title.toLowerCase().includes(search.toLowerCase()),
  );

  const clearSearch = () =>
    navigate({ search: (prev) => ({ ...prev, search: "", page: 1 }) });

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-20 animate-in fade-in duration-700">
      <header className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Selected Works
        </h1>
        {search && (
          <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-xl w-fit">
            <p className="text-sm">
              Results for: <span className="font-bold">"{search}"</span>
            </p>
            <button
              onClick={clearSearch}
              className="text-xs font-bold text-blue-500 hover:underline"
            >
              Clear
            </button>
          </div>
        )}
      </header>

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project: any) => (
            <ProjectCard
              key={project.id}
              id={project.documentId}
              title={project.title}
              description={project.description}
              image={project.image?.url}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 font-medium">
            No projects found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
