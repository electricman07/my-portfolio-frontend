import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchServiceBySlug } from "../../hooks/useStrapi";
import { Loader2, ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/service/$serviceId")({
  loader: async ({ params }) => {
    const service = await fetchServiceBySlug(params.serviceId);
    if (!service) throw new Error("Service not found");
    return { service };
  },
  component: ServiceDetailPage,
  pendingComponent: () => <Loader2 className="animate-spin" />,
});

function ServiceDetailPage() {
  const { service } = Route.useLoaderData();
  return (
    <main className="max-w-4xl mx-auto py-20 px-4 animate-in fade-in duration-500">
      <nav className="mb-10">
        <Link
          to="/service"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold uppercase tracking-widest text-xs transition-colors group"
        >
          <ChevronLeft
            size={18}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to All Services
        </Link>
      </nav>
      {/* Blue theme branding applied here */}
      <h1 className="text-4xl font-bold mb-6 text-blue-600 dark:text-blue-400 tracking-tight">
        {service.title}
      </h1>
      <div
        className="prose prose-blue dark:prose-invert max-w-none text-slate-900 dark:text-slate-200"
        dangerouslySetInnerHTML={{ __html: service.descriptionDetail }}
      ></div>
    </main>
  );
}
