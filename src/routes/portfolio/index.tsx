import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2, Search, X } from "lucide-react"; // Added Search and X
import { ProjectCard } from "../../components/portfolio/ProjectCard";
import { useProjects } from "../../hooks/useStrapi";

type PortfolioSearch = {
  page: number;
  search: string;
};

export const Route = createFileRoute("/portfolio/")({
  validateSearch: (search: Record<string, unknown>): PortfolioSearch => {
    return {
      page: Number(search.page) || 1,
      search: (search.search as string) || "",
    };
  },
  // 1. Crucial: prevents remounting the page on every keystroke
  shouldReload: false,
  loaderDeps: ({ search: { search, page } }) => ({ search, page }),
  loader: ({ deps }) => ({ deps }),
  head: (ctx) => {
    const search = ctx.loaderData?.deps?.search;
    const base = "GP Digital Designs";
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
  const navigate = Route.useNavigate();
  // Use select for performance stability
  const searchInUrl = Route.useSearch({ select: (s) => s.search || "" });

  // 2. Local state for the input box
  const [localSearch, setLocalSearch] = useState(searchInUrl);
  const [debouncedValue] = useDebounce(localSearch, 400);

  // 3. Sync local input with URL after user stops typing
  useEffect(() => {
    if (debouncedValue !== searchInUrl) {
      navigate({
        search: (prev) => ({ ...prev, search: debouncedValue, page: 1 }),
        replace: true,
        resetScroll: false,
      });
    }
  }, [debouncedValue, navigate, searchInUrl]);

  const { data: response, isLoading, isError, error } = useProjects();

  const responseData = response as any;
  const allProjects = Array.isArray(responseData)
    ? responseData
    : responseData?.data || [];

  const filteredProjects = allProjects.filter((project: any) => {
    const searchTerm = searchInUrl.toLowerCase();

    const matchesTitle = project.title?.toLowerCase().includes(searchTerm);

    // 1. Get the tech data (adjust 'technologies' to your actual Strapi field name)
    const techData = project.technologies;

    const matchesTech = Array.isArray(techData)
      ? techData.some((tech) => {
          // 2. Safely check if it's a string OR a Strapi object with a name/title
          const techName =
            typeof tech === "string" ? tech : tech?.name || tech?.title || "";
          return techName.toLowerCase().includes(searchTerm);
        })
      : false;

    return matchesTitle || matchesTech;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-20 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="max-w-xl w-full space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Selected Works
          </h1>

          {/* 4. Search bar with internal "X" */}
          <div className="relative w-full max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search projects..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            />
            {localSearch && (
              <button
                onClick={() => {
                  setLocalSearch("");
                  navigate({
                    search: (prev) => ({ ...prev, search: "", page: 1 }),
                  });
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <X size={16} strokeWidth={3} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 5. Conditional content area (Header remains stable above) */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4 text-slate-400">
          <Loader2 className="animate-spin text-blue-500" size={48} />
          <p className="font-medium animate-pulse">Loading portfolio...</p>
        </div>
      ) : isError ? (
        <div className="py-20 text-center space-y-6 max-w-md mx-auto">
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-3xl border border-red-100 dark:border-red-900/30">
            <h2 className="text-red-600 dark:text-red-400 font-bold text-xl mb-2">
              Connection Error
            </h2>
            <p className="text-slate-500 text-sm">
              {error?.message || "Failed to load projects."}
            </p>
          </div>
        </div>
      ) : filteredProjects.length > 0 ? (
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
            No projects found matching "{searchInUrl}".
          </p>
        </div>
      )}
    </div>
  );
}
