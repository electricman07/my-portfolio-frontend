import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchStrapi } from "../lib/api";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1338";

// --- 1. STANDALONE FETCHERS ---

export async function fetchProject(id: string) {
  const res = await fetch(`${STRAPI_URL}/api/projects/${id}?populate=*`);
  if (!res.ok) throw new Error("Failed to fetch project");
  return res.json();
}

export async function fetchBlogPost(id: string) {
  const url = `${STRAPI_URL}/api/posts/${id}?populate[0]=coverImage&populate[1]=related_projects.image&populate[2]=tags&populate[3]=author`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}

export async function fetchTechDetail(id: string) {
  if (!id || id === "undefined") return null;
  const res = await fetch(`${STRAPI_URL}/api/tech-stacks/${id}?populate=*`);
  if (!res.ok) throw new Error(`Failed to fetch technology: ${id}`);
  if (!res.ok) return null;
  return res.json();
}

export async function fetchServiceBySlug(slug: string) {
  if (!slug) return null;
  const url = `${STRAPI_URL}/api/services?filters[slug][$eq]=${slug}&populate=*`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch service: ${slug}`);
  const json = await res.json();
  return json.data?.[0] || null;
}

export async function fetchService(id: string) {
  if (!id || id === "undefined") return null;
  const res = await fetch(`${STRAPI_URL}/api/services/${id}?populate=*`);
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
  let url = `${STRAPI_URL}/api/knowledge-bases?populate[0]=categories`;
  if (categoryName && categoryName !== "All") {
    url += `&filters[categories][name][$eq]=${encodeURIComponent(categoryName)}`;
  }

  const res = await fetch(url);

  if (!res.ok) {
    const errorBody = await res.json();
    console.error("Strapi 400 Error Detail:", errorBody);
    return { data: [] };
  }

  return res.json();
}

export async function fetchKBInfinite({ pageParam = 1, category = "All" }) {
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
    // Ensure slug is included in the fields/populate if not global
    queryFn: () => fetchStrapi<any[]>("services", { populate: "*" }),
  });
}

export function useTechStack() {
  return useQuery({
    queryKey: ["tech-stack"],
    queryFn: () => fetchStrapi<any>("tech-stacks"),
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
