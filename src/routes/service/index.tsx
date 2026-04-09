import { createFileRoute } from "@tanstack/react-router";

import { ServiceCard } from "../../components/services/ServiceCard";
import { useServices } from "../../hooks/useStrapi";
import { getIcon } from "../../lib/icons";

export const Route = createFileRoute("/service/")({
  head: () => ({
    meta: [
      { title: "Specialized Digital Services | Glen Studio" },
      {
        name: "description",
        content:
          "From high-performance Web Development to intuitive UI/UX Design, I provide end-to-end digital solutions built with React, Strapi, and PostgreSQL.",
      },
      {
        property: "og:title",
        content: "Digital Services & Capabilities | Glen Studio",
      },
    ],
  }),
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
