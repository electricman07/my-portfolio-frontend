import { createFileRoute } from "@tanstack/react-router";
import { TechCard } from "../../components/tech/TechCard";
import { useTechStack } from "../../hooks/useStrapi";
import { getTechIcon } from "../../lib/textIcons";

export const Route = createFileRoute("/tech-stack/")({
  component: RouteComponent,
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

function RouteComponent() {
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
    <div className="max-w-7xl mx-5 py-12 space-y-16 animate-in fade-in duration-700">
      <header className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          The Engine Behind My Work
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">
          Modern, robust, and scalable technologies for future-proof projects.
        </p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.length > 0 ? (
          items.map((tech: any) => (
            <TechCard
              key={tech.id}
              id={tech.documentId} // Use documentId for Strapi 5 routing
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
