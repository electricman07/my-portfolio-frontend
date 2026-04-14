import { useQuery } from "@tanstack/react-query";

export function useKBCategories() {
  const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1338";
  return useQuery({
    queryKey: ["kb-categories"],
    queryFn: async () => {
      const res = await fetch(`${STRAPI_URL}/api/categories`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },
  });
}
