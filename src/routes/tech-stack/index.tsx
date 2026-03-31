import { createFileRoute } from "@tanstack/react-router";
import { TechCard } from "../../components/tech/TechCard";
import { useTechStack } from "../../hooks/useStrapi";
import { getTechIcon } from "../../lib/textIcons";
import { z } from "zod";

export const Route = createFileRoute("/tech-stack/")({
  head: () => ({
    meta: [
      { title: "Modern Tech Stack & Expertise | Glen Studio" },
      {
        name: "description",
        content:
          "Exploring the technologies behind the builds. Specialized in React, TypeScript, Node.js, and the TanStack ecosystem for scalable, type-safe applications.",
      },
    ],
  }),
  validateSearch: (search) => techSearchSchema.parse(search),
  component: TechComponent,
});

const techSearchSchema = z.object({
  page: z.number().optional().catch(1),
  q: z.string().optional().catch(""),
});

// const TECH_DATA = [
//   { name: "HTML", Icon: SiHtml5, color: "#E34F26" },
//   { name: "CSS", Icon: SiCss, color: "#1572B6" },
//   { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
//   { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
//   { name: "React", Icon: SiReact, color: "#61DAFB" },
//   { name: "TanStack", Icon: SiTanstack, color: "#FF4154" },
//   { name: "TailwindCss", Icon: SiTailwindcss, color: "#06B6D4" },
//   { name: "Nodejs", Icon: SiNodedotjs, color: "#339933" },
//   { name: "Express", Icon: SiExpress, color: "#60a5fa" }, // Light blue for visibility
//   { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
//   { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
//   { name: "MongoDB", Icon: SiMongodb, color: "#47A24A" },
// ];

function TechComponent() {
  const { data: response, isLoading, isError } = useTechStack();
  if (isLoading)
    return <div className="py-20 text-center">Loading tech stack...</div>;
  if (isError)
    return (
      <div className="py-20 text-center text-red-500">
        Failed to load tech stack.
      </div>
    );

  const items = response?.data || [];

  if (isLoading)
    return <div className="py-20 text-center">Loading technologies...</div>;
  if (isError)
    return (
      <div className="py-20 text-center text-red-500">
        Failed to load tech stack.
      </div>
    );
  return (
    <div className="max-w-7xl mx-auto py-20 px-6 space-y-20 animate-in fade-in duration-700">
      <header className="max-w-3xl mx-auto text-center space-y-6">
        <h4 className="text-blue-500 font-black uppercase tracking-[0.2em] text-xs">
          Technical Arsenal
        </h4>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
          The Engine Behind My Work
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
          Modern, robust, and scalable technologies for future-proof projects.
        </p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {items.length > 0 ? (
          items.map((tech: any) => (
            <TechCard
              key={tech.id}
              documentId={tech.documentId} // Use documentId for Strapi 5 routing
              name={tech.name}
              Icon={getTechIcon(tech.iconName)}
              color={tech.color}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-slate-400 py-10">
            No published technologies found. Check Strapi permissions and
            publication status.
          </p>
        )}
      </div>
    </div>
  );
}
