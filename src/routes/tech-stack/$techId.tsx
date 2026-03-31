import { createFileRoute, Link } from "@tanstack/react-router";

import { getTechIcon } from "../../lib/iconMapper"; // Your fetch helper
import { ChevronLeft, CheckCircle2, Loader2 } from "lucide-react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { useTechDetail, fetchTechDetail } from "#/hooks/useStrapi";

export const Route = createFileRoute("/tech-stack/$techId")({
  loader: ({ params }) => fetchTechDetail(params.techId),

  // 2. Set the dynamic SEO
  head: (ctx) => {
    const tech = ctx.loaderData?.data;
    if (!tech) return { meta: [{ title: "Technology Stack | Glen Studio" }] };

    return {
      meta: [
        { title: `${tech.name} Expert Development | Glen Studio` },
        {
          name: "description",
          content:
            tech.description?.substring(0, 160) ||
            `Professional ${tech.name} development and architectural solutions.`,
        },
        // Open Graph for social sharing
        { property: "og:title", content: `Specialized ${tech.name} Solutions` },
        { property: "og:image", content: tech.iconUrl },
      ],
    };
  },
  component: TechDetailComponent,
});

function TechDetailComponent() {
  const { techId } = Route.useParams();
  const { data: response, isFetching, isError } = useTechDetail(techId);

  if (isFetching)
    return (
      <div className="py-40 text-center flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-blue-500" size={40} />
        <p className="text-slate-400 font-bold animate-pulse uppercase tracking-widest text-xs">
          Syncing Documentation...
        </p>
      </div>
    );

  if (isError || !response?.data)
    return (
      <div className="py-20 text-center font-bold text-red-500">
        Technology profile not found.
      </div>
    );

  const tech = response.data;
  const proficiency = tech.proficiency || 0;
  const brandColor = tech.color || "#3b82f6";
  const milestones = tech?.milestones || [];
  const TechIcon = getTechIcon(tech.iconName);

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-12 animate-in fade-in duration-700">
      {/* Back Link */}
      <Link
        to="/tech-stack"
        search={{ page: 1 }}
        className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-500 font-black uppercase tracking-widest text-xs transition-all"
      >
        <ChevronLeft size={16} strokeWidth={3} /> Back to Tech Stack
      </Link>

      <article className="space-y-16">
        {/* 1. HERO HEADER: Thick border & Heavy Shadow */}
        <header className="flex flex-col md:flex-row items-center gap-10">
          <div className="p-10 rounded-[3rem] bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-800 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)]">
            <TechIcon
              size={100}
              style={{ color: brandColor }}
              className="drop-shadow-[0_0_15px_rgba(0,0,0,0.1)]"
            />
          </div>
          <div className="text-center md:text-left space-y-2">
            <h4 className="text-blue-500 font-black uppercase tracking-[0.2em] text-xs">
              Technical Profile
            </h4>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
              {tech.name}
            </h1>
          </div>
        </header>

        {/* 2. PROFICIENCY DASHBOARD */}
        <div className="p-10 bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-800 rounded-[3rem] shadow-xl space-y-8">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                Current Proficiency
              </h3>
              <p className="text-3xl font-black tracking-tighter">
                {proficiency < 50
                  ? "Intermediate"
                  : proficiency < 85
                    ? "Advanced"
                    : "Industry Expert"}
              </p>
            </div>
            <span
              className="text-5xl font-black tabular-nums tracking-tighter"
              style={{ color: brandColor }}
            >
              {proficiency}%
            </span>
          </div>

          <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-1">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out shadow-lg"
              style={{
                width: `${proficiency}%`,
                backgroundColor: brandColor,
              }}
            />
          </div>
        </div>

        {/* 3. MILESTONES & DESCRIPTION GRID */}
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Description */}
          <div className="lg:col-span-7 prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            {tech?.description ? (
              <BlocksRenderer content={tech.description} />
            ) : (
              <p>Documentation for {tech.name} is currently being compiled.</p>
            )}
          </div>

          {/* Milestones Sidebar */}
          <aside className="lg:col-span-5">
            {milestones.length > 0 && (
              <div className="p-8 bg-slate-100 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-[2.5rem] sticky top-24">
                <h3 className="text-lg font-black uppercase tracking-widest mb-6">
                  Key Milestones
                </h3>
                <ul className="space-y-4">
                  {milestones.map((m: any) => (
                    <li key={m.id} className="flex items-start gap-3 group">
                      <CheckCircle2
                        size={18}
                        className="mt-1 shrink-0 transition-colors"
                        style={{ color: brandColor }}
                      />
                      <span className="text-slate-700 dark:text-slate-300 font-bold text-sm leading-tight">
                        {m.item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </article>
    </div>
  );
}
