import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

interface Project {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  image?: { url: string };
}

export function RelatedProjects({ projects }: { projects: Project[] }) {
  if (!projects || !Array.isArray(projects) || projects.length === 0)
    return null;

  const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1338";

  return (
    <section className="mt-24 pt-16 border-t border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex items-center justify-between mb-10">
        <div className="space-y-1">
          <h3 className="text-2xl font-black tracking-tighter uppercase">
            Related Projects
          </h3>
          <p className="text-xs font-black text-blue-500 uppercase tracking-widest">
            Design & Dev in Action
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => {
          return (
            <Link
              key={project.id}
              to="/portfolio/$projectId"
              params={{ projectId: project.documentId }}
              className="group relative flex flex-col bg-slate-50 dark:bg-slate-900 rounded-4xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Project Image */}
              <div className="aspect-video overflow-hidden bg-slate-200 dark:bg-slate-800">
                {project.image ? (
                  <img
                    src={`${STRAPI_URL}${project.image?.url}`}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    No Image
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="p-8 space-y-3">
                <h4 className="text-xl font-black tracking-tight">
                  {project.title}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 font-medium">
                  {project.description}
                </p>
                <div className="pt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-500">
                  View Case Study{" "}
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
