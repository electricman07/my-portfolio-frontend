import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export function ProjectSlider({ projects }: { projects: any[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000, stopOnInteraction: false })],
  );

  const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1338";

  return (
    <section className="max-w-7xl mx-auto px-6 py-5 overflow-hidden">
      {/* 1. HEADER SECTION (Title + Arrows) */}
      <div className="flex items-end justify-between mb-12">
        <div className="space-y-2">
          <h4 className="text-blue-500 font-black uppercase tracking-widest text-xs">
            Portfolio
          </h4>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
            Latest Work
          </h2>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="p-4 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-800 shadow-md hover:bg-blue-600 hover:text-white transition-all group"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="p-4 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-800 shadow-md hover:bg-blue-600 hover:text-white transition-all group"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* 2. CAROUSEL CONTAINER */}
      <div className="overflow-visible" ref={emblaRef}>
        <div className="flex -ml-8">
          {projects?.map((project) => (
            <div
              key={project.id}
              className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-8 pb-10"
            >
              {/* 3. INDIVIDUAL PROJECT CARD */}
              <div className="group relative flex flex-col h-full bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-800 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-blue-500">
                {/* Image Section */}
                <Link
                  to="/portfolio/$projectId"
                  params={{ projectId: project.documentId }}
                  className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800"
                >
                  <img
                    src={`${STRAPI_URL}${project.image?.url}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={project.title}
                  />

                  {/* Floating Arrow Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="bg-blue-600 text-white p-3 rounded-full shadow-xl transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <ArrowUpRight size={20} strokeWidth={3} />
                    </div>
                  </div>
                </Link>

                {/* Text Content Section */}
                <div className="p-6 flex flex-col grow">
                  <Link
                    to="/portfolio/$projectId"
                    params={{ projectId: project.documentId }}
                    className="group-hover:text-blue-600 transition-colors"
                  >
                    <h3 className="font-black text-xl mb-2 tracking-tight line-clamp-1">
                      {project.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
