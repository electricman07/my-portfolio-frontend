import { useQuery } from "@tanstack/react-query";
import { fetchStrapi } from "../../lib/api";
import { getServiceIcon } from "../../lib/iconMapper";
import { Loader2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function ServicesSummary() {
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["services-summary"],
    queryFn: () => fetchStrapi<any>("services"),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  if (isError || !response?.data) return null;

  const services = response.data;

  return (
    <section className="bg-slate-50/50 dark:bg-transparent py-5">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-black text-center mb-12 tracking-tight">
          My Services
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {services.map((service: any) => {
            const Icon = getServiceIcon(service.iconName);

            return (
              <Link
                to="/service/$serviceId"
                key={service.id}
                params={{ serviceId: service.slug }}
                className="relative block p-4 text-center rounded-3xl  bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] hover:border-blue-500 hover:-translate-y-2 hover:shadow-2xl transition-all group"
              >
                <div
                  className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-2xl 
                    bg-slate-50 dark:bg-slate-900 group-hover:bg-blue-50 transition-colors"
                >
                  <Icon
                    size={32}
                    style={{ color: service.color || "#3b82f6" }}
                    className="group-hover:scale-110 transition-transform"
                  />
                </div>
                <p className="font-bold text-sm text-slate-800 dark:text-slate-200">
                  {service.title}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
