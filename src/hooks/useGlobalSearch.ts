import { useQuery } from "@tanstack/react-query";
import { fetchStrapi } from "../lib/api";

export function useGlobalSearch(query: string) {
  return useQuery({
    queryKey: ["global-search", query],
    queryFn: async () => {
      if (!query) return { projects: [], services: [], posts: [] };

      const safeQuery = encodeURIComponent(query.trim());

      // Strapi 5: We must explicitly populate media/relations for each collection
      const [projectsRes, servicesRes, postsRes] = await Promise.all([
        fetchStrapi<any>(
          `projects?filters[title][$containsi]=${safeQuery}&populate=*`,
        ),
        fetchStrapi<any>(
          `services?filters[title][$containsi]=${safeQuery}&populate=*`,
        ),
        fetchStrapi<any>(
          `posts?filters[title][$containsi]=${safeQuery}&populate=*`,
        ),
      ]);

      return {
        // Strapi 5 returns data directly in a flattened array
        projects: projectsRes?.data || [],
        services: servicesRes?.data || [],
        posts: postsRes?.data || [],
      };
    },
    enabled: query.length > 0,
  });
}
