import { useQuery } from "@tanstack/react-query";
import { fetchStrapi } from "../lib/api";

export function useGlobalSearch(query: string) {
  return useQuery({
    queryKey: ["global-search", query],
    queryFn: async () => {
      // 1. ADD 'faqs: []' to the fallback return
      if (!query)
        return { projects: [], services: [], posts: [], faqs: [], kb: [] };

      const safeQuery = encodeURIComponent(query.trim());

      const [projectsRes, servicesRes, postsRes, faqsRes, kbRes] =
        await Promise.all([
          fetchStrapi<any>(
            `projects?filters[title][$containsi]=${safeQuery}&populate=*`,
          ),
          fetchStrapi<any>(
            `services?filters[title][$containsi]=${safeQuery}&populate=*`,
          ),
          fetchStrapi<any>(
            `posts?filters[title][$containsi]=${safeQuery}&populate=*`,
          ),
          fetchStrapi<any>(
            `faqs?filters[question][$containsi]=${safeQuery}&populate=*`,
          ),
          fetchStrapi<any>(
            `knowledge-bases?filters[title][$containsi]=${safeQuery}&populate=*`,
          ),
        ]);

      return {
        projects: projectsRes?.data || [],
        services: servicesRes?.data || [],
        posts: postsRes?.data || [],
        // 3. ADD 'faqs' to the final returned object
        faqs: faqsRes?.data || [],
        kb: kbRes?.data || [],
      };
    },
    enabled: query.length > 0,
  });
}
