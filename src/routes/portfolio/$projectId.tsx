import { createFileRoute, Link } from "@tanstack/react-router";
import { useRelatedProjects, fetchProject } from "../../hooks/useStrapi";
import { getTechIcon } from "../../lib/iconMapper";
import { FaGithub } from "react-icons/fa";
import { Loader2, ChevronLeft, ExternalLink } from "lucide-react";
import { RelatedProjects } from "../../components/blog/RelatedProjects";

export const Route = createFileRoute("/portfolio/$projectId")({
  loader: ({ params }) => fetchProject(params.projectId),
  head: (ctx) => {
    const project = ctx.loaderData?.data;
    if (!project) {
      return {
        meta: [{ title: "Project | GP Digital Web Studio" }],
      };
    }

    return {
      meta: [
        // Updated Branding
        { title: `${project.title} | GP Digital Web Studio` },
        {
          name: "description",
          content:
            project.excerpt ||
            project.description?.replace(/<[^>]*>/g, "").substring(0, 160),
        },
        // Open Graph
        { property: "og:title", content: project.title },
        { property: "og:site_name", content: "GP Digital Designs" },
        { property: "og:type", content: "website" },
        { property: "og:image", content: project.image?.url },
      ],
    };
  },
  component: portfolioDetailsComponent,
});

function portfolioDetailsComponent() {
  const response = Route.useLoaderData();
  const project = response?.data;
  const { data: relatedResponse } = useRelatedProjects(project?.documentId);
  const relatedProjects = relatedResponse?.data || [];

  const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1338";
  const { status } = Route.useMatch();
  if (status === "pending") {
    return (
      <div className="py-40 text-center flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-blue-500" size={40} />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
          Loading Case Study...
        </p>
      </div>
    );
  }

  if (!project)
    return (
      <div className="p-20 text-center font-bold text-red-500">
        Project not found.
      </div>
    );

  const technologies = project.technologies || [];

  const imageUrl = project.image?.url
    ? project.image.url.startsWith("http")
      ? project.image.url
      : `${STRAPI_URL}${project.image.url}`
    : "https://placehold.co";

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-16 animate-in fade-in duration-700">
      {/* Navigation */}
      <nav>
        <Link
          to="/portfolio"
          search={{ page: 1, search: "" }}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-black uppercase tracking-widest text-xs transition-all"
        >
          <ChevronLeft size={16} strokeWidth={3} /> Back to Portfolio
        </Link>
      </nav>

      <header className="space-y-10">
        <div className="aspect-21/9 rounded-[3rem] overflow-hidden border-2 border-slate-200 dark:border-slate-800 shadow-2xl bg-slate-100">
          <img
            src={imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-4xl">
          <h4 className="text-blue-600 font-black uppercase tracking-[0.2em] text-xs mb-2">
            Case Study
          </h4>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-slate-950 dark:text-white">
            {project.title}
          </h1>
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-12">
          <div
            className="prose prose-xl dark:prose-invert max-w-none font-medium text-slate-900 dark:text-slate-200 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: project.description }}
          />

          {/* TECH STACK */}
          {technologies.length > 0 && (
            <div className="space-y-6 pt-10 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-3">
                {technologies.map((tech: any) => {
                  const TechIcon = getTechIcon(tech.iconName);
                  return (
                    <span
                      key={tech.id}
                      className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-black tracking-wide uppercase bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 hover:border-blue-500 transition-all"
                    >
                      <TechIcon size={14} className="text-blue-600" />
                      <span className="text-slate-900 dark:text-slate-100">
                        {tech.name}
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <aside className="lg:col-span-4">
          <div className="p-10 sticky top-24 bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-[3rem] shadow-xl space-y-8">
            <h4 className="text-xl font-black tracking-tight text-slate-950 dark:text-white">
              Project Links
            </h4>
            <div className="flex flex-col gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg hover:bg-blue-700 hover:-translate-y-1 transition-all"
                >
                  Launch Demo <ExternalLink size={20} />
                </a>
              )}

              {/* GitHub Link - Fixed and Styled */}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-4 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl font-black shadow-lg hover:bg-black dark:hover:bg-slate-700 hover:-translate-y-1 transition-all"
                >
                  Source Code <FaGithub size={20} />
                </a>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* RELATED PROJECTS */}
      {relatedProjects.length > 0 && (
        <div className="pt-24 border-t-2 border-slate-100 dark:border-slate-800">
          <RelatedProjects projects={relatedProjects} />
        </div>
      )}
    </div>
  );
}
