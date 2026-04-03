import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchStrapi } from "../lib/api";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1338";

// --- 1. STANDALONE FETCHERS (For TanStack Router Loaders) ---
// These are the "Source of Truth" for your dynamic pages

export async function fetchProject(id: string) {
  const res = await fetch(`${STRAPI_URL}/api/projects/${id}?populate=*`);
  if (!res.ok) throw new Error("Failed to fetch project");
  return res.json();
}

export async function fetchBlogPost(id: string) {
  const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1338";
  const url = `${STRAPI_URL}/api/posts/${id}?populate[0]=coverImage&populate[1]=related_projects.image&populate[2]=tags&populate[3]=author`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}

export async function fetchTechDetail(id: string) {
  if (!id || id === "undefined") return null;
  const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1338";
  const res = await fetch(`${STRAPI_URL}/api/tech-stacks/${id}?populate=*`);
  if (!res.ok) throw new Error(`Failed to fetch technology: ${id}`);
  if (!res.ok) return null;
  return res.json();
}

export async function fetchAboutData() {
  const res = await fetch(`${STRAPI_URL}/api/about?populate=*`);
  if (!res.ok) throw new Error("Failed to fetch about data");
  return res.json();
}

export async function fetchKB(categoryName?: string) {
  const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1338";

  // 1. STRAPI 5 FIX: Instead of 'populate=*', we target 'categories' specifically
  // This prevents the 'knowledge_bases' circular key error
  let url = `${STRAPI_URL}/api/knowledge-bases?populate[0]=categories`;

  if (categoryName && categoryName !== "All") {
    // 2. Ensure 'categories' matches your field ID exactly
    url += `&filters[categories][name][$eq]=${encodeURIComponent(categoryName)}`;
  }

  console.log("Fetching KB URL:", url);

  const res = await fetch(url);

  if (!res.ok) {
    const errorBody = await res.json();
    console.error("Strapi 400 Error Detail:", errorBody);
    return { data: [] }; // Return empty data so the UI doesn't crash
  }

  return res.json();
}

export async function fetchKBInfinite({ pageParam = 1, category = "All" }) {
  const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1338";

  // Use pagination[page] and pagination[pageSize]
  const catFilter =
    category !== "All"
      ? `&filters[categories][name][$eq]=${encodeURIComponent(category)}`
      : "";
  const url = `${STRAPI_URL}/api/knowledge-bases?populate=categories&pagination[page]=${pageParam}&pagination[pageSize]=10${catFilter}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch KB");
  return res.json();
}

export async function fetchFAQsInfinite({ pageParam = 1 }) {
  const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1338";

  // Strapi 5 uses pagination[page] and pagination[pageSize]
  const url = `${STRAPI_URL}/api/faqs?pagination[page]=${pageParam}&pagination[pageSize]=6&populate=*`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch FAQs");
  return res.json();
}

// --- 2. REACT HOOKS (For Lists and Global Data) ---
export function useBlogPost(id: string) {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchBlogPost(id),
    enabled: !!id,
  });
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => fetchStrapi<any>("projects", { populate: "*" }),
  });
}

export function useRelatedProjects(excludeId: string) {
  return useQuery({
    queryKey: ["related-projects", excludeId],
    queryFn: () =>
      fetchStrapi<any>("projects", {
        filters: { documentId: { $ne: excludeId } },
        pagination: { limit: 4 },
        populate: "*",
      }),
    enabled: !!excludeId,
  });
}

export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: () => fetchStrapi<any[]>("services"),
  });
}

export function useTechStack() {
  return useQuery({
    queryKey: ["tech-stack"],
    queryFn: () => fetchStrapi<any>("tech-stacks"), // Ensure endpoint matches Strapi
  });
}

export function useBlogPosts(filters: any) {
  const query: any = {
    populate: ["coverImage", "author", "tags"],
    pagination: { page: filters.page || 1, pageSize: 6 },
    sort: filters.sort === "oldest" ? "createdAt:asc" : "createdAt:desc",
    filters: {},
  };

  if (filters.search) query.filters.title = { $containsi: filters.search };
  if (filters.tag) query.filters.tags = { name: { $eq: filters.tag } };

  return useQuery({
    queryKey: ["blog-posts", filters],
    queryFn: () => fetchStrapi<any>("posts", query),
  });
}

export function useFaqs() {
  return useQuery({
    queryKey: ["faqs"],
    queryFn: () => fetchStrapi<any>("faqs"),
    staleTime: 1000 * 60 * 10,
  });
}

export function useKB(category?: string) {
  return useQuery({
    queryKey: ["kb", category],
    queryFn: () => fetchKB(category),
  });
}

// --- 3. MUTATIONS (For Form Actions) ---

export function useContactMutation() {
  return useMutation({
    retry: false,
    mutationFn: async (formData: any) => {
      const response = await fetch(`${STRAPI_URL}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: formData }),
      });
      if (!response.ok) throw new Error("Failed to send message");
      return response.json();
    },
  });
}
