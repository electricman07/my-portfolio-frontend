import { Link } from "@tanstack/react-router";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  id: string | number;
  title: string;
  description: string;
  image: any;
  githubUrl?: string;
  liveUrl?: string;
}

const premiumCardClasses = `
    group relative overflow-hidden flex flex-col h-full
    /* LIGHT: Pearl / Slate-300 */
    bg-[#F8FAFC] border-2 border-slate-300 
    /* DARK: High-Contrast Slate-600 */
    dark:bg-slate-900 dark:border-slate-600 
    /* SHARED */
    rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2
  `;

export function ProjectCard({
  id,
  title,
  description,
  image,
  githubUrl,
  liveUrl,
}: ProjectCardProps) {
  const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1338";

  const path = typeof image === "string" ? image : image?.url;

  const imageUrl = path
    ? path.startsWith("http")
      ? path
      : `${STRAPI_URL}${path}`
    : "https://placehold.co";

  return (
    <>
      <div className={premiumCardClasses}>
        {/* IMAGE & LINK SECTION */}
        <Link
          to="/portfolio/$projectId"
          params={{ projectId: id.toString() }}
          className="block relative aspect-16/10 overflow-hidden bg-slate-100 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800"
        >
          {/* Placeholder text (hidden behind image) */}
          <span className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium text-sm">
            Loading Image...
          </span>

          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 z-10"
            onError={(e) => {
              e.currentTarget.style.opacity = "0";
            }}
          />

          {/* Hover Overlay with Arrow */}
          <div className="absolute inset-0 flex items-center justify-center bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
            <div className="bg-blue-600 text-white p-4 rounded-full shadow-xl transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 ease-out">
              <ArrowUpRight size={24} strokeWidth={3} />
            </div>
          </div>
        </Link>

        {/* TEXT CONTENT */}
        <div className="p-6 flex flex-col grow">
          <Link
            to="/portfolio/$projectId"
            params={{ projectId: id.toString() }}
            className="hover:text-blue-600 transition-colors"
          >
            <h3 className="text-2xl font-black tracking-tight mb-2">{title}</h3>
          </Link>
          <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 font-medium leading-relaxed mb-6">
            {description}
          </p>

          {/* FOOTER LINKS */}
          <div className="mt-auto pt-6 border-t-2 border-slate-100 dark:border-slate-800 flex items-center justify-between">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Github size={18} /> Code
              </a>
            )}

            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:opacity-80 transition-opacity ml-auto"
              >
                Live Demo <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
