import { createFileRoute } from "@tanstack/react-router";
import { fetchServiceBySlug } from "../../hooks/useStrapi";
import { Loader2 } from "lucide-react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

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
    <main className="max-w-4xl mx-auto py-20 px-4">
      {/* Blue theme branding applied here */}
      <h1 className="text-4xl font-bold mb-6 text-blue-600 dark:text-blue-400">
        {service.title}
      </h1>
      <div className="prose prose-blue dark:prose-invert max-w-none">
        {service.descriptionDetail ? (
          <BlocksRenderer content={service.descriptionDetail} />
        ) : (
          <p>No description available.</p>
        )}
      </div>
    </main>
  );
}
