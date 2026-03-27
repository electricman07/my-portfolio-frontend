import { createFileRoute, useParams, Link } from "@tanstack/react-router";
import { useProjectDetail, useRelatedProjects } from "../../hooks/useStrapi";
import { getTechIcon } from "../../lib/iconMapper";
import { FaGithub } from "react-icons/fa";
import { Loader2, ExternalLink, ChevronLeft, ArrowRight } from "lucide-react";
import { ProjectSlider } from "../../components/home/ProjectSlider";

export const Route = createFileRoute("/portfolio/$projectId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { projectId } = useParams({ from: "/portfolio/$projectId" });
  const { data: response, isLoading } = useProjectDetail(projectId);
  const { data: relatedResponse } = useRelatedProjects(projectId);

  const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1338";

  if (isLoading)
    return (
      <div className="py-40 text-center flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-blue-500" size={40} />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
          Loading Case Study...
        </p>
      </div>
    );

  if (!response?.data)
    return (
      <div className="p-20 text-center font-bold text-red-500">
        Project not found.
      </div>
    );

  const project = response.data;
  const technologies = project.technologies || [];
  const relatedProjects = relatedResponse?.data || [];

  const imageUrl = project.image?.url
    ? project.image.url.startsWith("http")
      ? project.image.url
      : `${STRAPI_URL}${project.image.url}`
    : "https://placehold.co";

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-16 animate-in fade-in duration-700">
      {/* 1. NAVIGATION & HERO */}
      <nav>
        <Link
          to="/portfolio"
          search={{ page: 1, search: "" }}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-500 font-black uppercase tracking-widest text-xs transition-all"
        >
          <ChevronLeft size={16} strokeWidth={3} /> Back to Portfolio
        </Link>
      </nav>

      <header className="space-y-10">
        <div className="aspect-21/9 rounded-[3rem] overflow-hidden border-2 border-slate-300 dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-slate-100">
          <img
            src={imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-4xl">
          <h4 className="text-blue-500 font-black uppercase tracking-[0.2em] text-xs mb-2">
            Case Study
          </h4>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
            {project.title}
          </h1>
        </div>
      </header>

      {/* 2. MAIN CONTENT GRID */}
      <div className="grid lg:grid-cols-12 gap-16">
        {/* LEFT: Project Details (8 cols) */}
        <div className="lg:col-span-8 space-y-12">
          <div className="prose prose-xl dark:prose-invert max-w-none font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
            {project.description}
          </div>

          {/* TECH STACK USED */}
          {technologies.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-3">
                {technologies.map((tech: any) => {
                  const TechIcon = getTechIcon(tech.iconName);
                  return (
                    <span
                      key={tech.id}
                      className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-black tracking-wide uppercase bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm transition-transform hover:-translate-y-1"
                    >
                      <TechIcon size={14} className="text-blue-500" />
                      <span>{tech.name}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: PROJECT SIDEBAR (4 cols) */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="p-10 sticky top-24 bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-800 rounded-[3rem] shadow-xl space-y-8">
            <h4 className="text-xl font-black tracking-tight">Project Links</h4>
            <div className="flex flex-col gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center justify-center gap-3 w-full py-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg hover:bg-blue-700 hover:-translate-y-1 transition-all"
                >
                  Launch Demo <ExternalLink size={20} />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center justify-center gap-3 w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl font-black border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition-all"
                >
                  Source Code <FaGithub />
                </a>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* 3. RELATED PROJECTS (Full Width Breakout) */}
      {relatedProjects.length > 0 && (
        <section className="pt-24 border-t-2 border-slate-200 dark:border-slate-800">
          <div className="flex items-end justify-between mb-12">
            <div className="space-y-2">
              <h4 className="text-blue-500 font-black uppercase tracking-widest text-xs">
                Next Up
              </h4>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
                Explore More Work
              </h2>
            </div>
          </div>
          <ProjectSlider projects={relatedProjects} />
          <div className="text-center mt-16">
            <Link
              to="/portfolio"
              search={{ page: 1, search: "" }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-full hover:scale-105 transition-transform"
            >
              Back to Portfolio <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
