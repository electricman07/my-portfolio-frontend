import { createFileRoute } from "@tanstack/react-router";

import { ServiceCard } from "../../components/services/ServiceCard";
import { useServices } from "../../hooks/useStrapi";
import { getIcon } from "../../lib/icons";

export const Route = createFileRoute("/service/")({
  head: () => {
    const base = "Glen Studio";
    const title = `Expert Digital Services | ${base}`;
    const description =
      "High-performance Web Development, UI/UX Design, and end-to-end digital solutions built with React, Strapi, and PostgreSQL.";

    return {
      meta: [
        { title },
        {
          name: "description",
          content: description,
        },
        // OpenGraph / Social Media Tags
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:description",
          content: description,
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
      ],
    };
  },
  component: ServiceComponent,
});

function ServiceComponent() {
  const { data: servicesResponse, isLoading, isError } = useServices();

  if (isLoading)
    return <div className="py-20 text-center">Loading services...</div>;
  if (isError)
    return (
      <div className="py-20 text-center text-red-500">
        Error loading services.
      </div>
    );
  const responseData = servicesResponse as any;
  const services = Array.isArray(servicesResponse)
    ? responseData
    : responseData?.data || [];

  return (
    <div className="max-w-7xl mx-auto py-20  px-6 space-y-20 animate-in fade-in duration-700">
      <header className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Expert Solutions
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">
          I provide a full suite of digital services to help your business grow,
          from initial concept and design to deployment and optimization.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services?.map((service: any) => (
          <ServiceCard
            key={service.id}
            serviceId={service.slug}
            title={service.title}
            description={service.description}
            icon={getIcon(service.iconName)}
            color={service.color}
            bg={service.bg}
          />
        ))}
      </div>
    </div>
  );
}
