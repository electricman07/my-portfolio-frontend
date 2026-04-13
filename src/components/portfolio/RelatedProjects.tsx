import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function RelatedProjects({ projects }: { projects: any[] }) {
  const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1338";

  if (!projects || projects.length === 0) return null;

  return (
    <section className="mt-20 pt-12 border-t-2 border-slate-100 dark:border-slate-800">
      <h3 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white mb-10">
        Related Projects
      </h3>

      <div className="grid sm:grid-cols-2 gap-8">
        {projects.map((project: any) => {
          // Robust image path extraction for Strapi v5
          const image = project.thumbnail || project.image;
          const path =
            typeof image === "string"
              ? image
              : image?.url || image?.data?.attributes?.url;

          const imageUrl = path
            ? path.startsWith("http")
              ? path
              : `${STRAPI_URL}${path}`
            : "https://placehold.co";

          return (
            <Link
              key={project.id}
              to="/portfolio/$projectId"
              params={{
                projectId: project.documentId || project.id.toString(),
              }}
              className="group flex flex-col bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-4xl overflow-hidden hover:border-blue-500 hover:shadow-xl transition-all duration-300"
            >
              {/* Image Section */}
              <div className="aspect-video relative overflow-hidden bg-slate-100 dark:bg-slate-950">
                <img
                  src={imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content Section */}
              <div className="p-6 space-y-3">
                <h4 className="text-xl font-bold text-slate-950 dark:text-white group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h4>
                <p className="text-sm text-slate-800 dark:text-slate-400 line-clamp-2 font-medium">
                  {project.description ||
                    "View project details and technical stack..."}
                </p>
                <div className="pt-2 flex items-center gap-2 text-blue-600 text-xs font-black uppercase tracking-widest">
                  View Project <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
