import { useQuery } from "@tanstack/react-query";
import { fetchStrapi } from "../lib/api";
import { useMutation } from "@tanstack/react-query";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1338";

// Fetch all projects for the gallery
export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    // Ensure you are using populate: '*' to catch all new fields
    queryFn: () => fetchStrapi<any>("projects", { populate: "*" }),
  });
}

// Fetch a single project for the detail page
export function useProjectDetail(documentId: string) {
  return useQuery({
    queryKey: ["project", documentId],
    queryFn: () =>
      fetchStrapi<any>(`projects/${documentId}`, {
        populate: ["image", "technologies"],
      }),
    enabled: !!documentId,
  });
}

export function useRelatedProjects(excludeId: string) {
  return useQuery({
    queryKey: ["related-projects", excludeId],
    queryFn: () =>
      fetchStrapi<any>("projects", {
        filters: {
          // Ensure this matches the field in your Strapi DB
          documentId: { $ne: excludeId },
        },
        pagination: { limit: 4 },
        populate: "*",
      }),
    // Only run if we actually have an ID to exclude
    enabled: !!excludeId,
  });
}

// Hook for fetching the Services (mapped to your icon names)
export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: () => fetchStrapi<any[]>("services"),
  });
}

export async function fetchTechDetail(id: string) {
  const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1338";

  // Strapi 5 uses /api/technologies/ID. Use documentId if applicable.
  const res = await fetch(`${STRAPI_URL}/api/technologies/${id}?populate=*`);

  if (!res.ok) {
    throw new Error(`Failed to fetch technology: ${id}`);
  }

  return res.json();
}

export function useTechStack() {
  return useQuery({
    queryKey: ["tech-stack"],
    queryFn: () => fetchStrapi<any>("tech-stacks"),
    // Fetches your tech list: [{ name: 'React', iconName: 'SiReact', color: '#61DAFB' }, ...]
  });
}

export function useTechDetail(techId: string) {
  return useQuery({
    // ADD 'populated' TO THE KEY: This forces a fresh fetch
    queryKey: ["tech-detail", techId, "populated"],
    queryFn: async () => {
      const STRAPI_URL =
        import.meta.env.VITE_STRAPI_URL || "http://localhost:1338";

      // Use the EXACT URL that worked in your browser
      const res = await fetch(
        `${STRAPI_URL}/api/tech-stacks/${techId}?populate=milestones`,
      );

      if (!res.ok) throw new Error("Failed to fetch tech details");

      const json = await res.json();
      console.log("FRESH API DATA:", json); // Check this in F12 console
      return json;
    },
    enabled: !!techId,
    // Optional: force it to stay fresh
    staleTime: 0,
  });
}

export function useBlogPosts(filters: any) {
  const query: any = {
    populate: {
      coverImage: true,
      author: true,
      tags: true,
    },
    pagination: {
      page: filters.page || 1,
      pageSize: 6,
    },
    sort: filters.sort === "oldest" ? "createdAtDay:asc" : "createdAtDay:desc",
    filters: {},
  };

  // Strapi 5 Filter Syntax
  if (filters.search) query.filters.title = { $containsi: filters.search };
  if (filters.tag) query.filters.tags = { name: { $eq: filters.tag } };
  if (filters.author) query.filters.author = { name: { $eq: filters.author } };

  // Date filtering for the Sidebar Calendar
  if (filters.year && filters.month) {
    const start = `${filters.year}-${filters.month}-01`;
    const end = `${filters.year}-${filters.month}-31`;
    query.filters.createdAt = { $gte: start, $lte: end };
  }

  return useQuery({
    queryKey: ["blog-posts", filters],
    queryFn: () => fetchStrapi<any>("posts", query),
  });
}

export function useBlogPost(documentId: string) {
  return useQuery({
    queryKey: ["blog-posts", documentId],
    queryFn: () =>
      fetchStrapi<any>(`posts/${documentId}`, {
        populate: ["tags", "author", "coverImage"],
      }),
    enabled: !!documentId,
  });
}

export function useFaqs() {
  return useQuery({
    queryKey: ["faqs"],
    queryFn: () => fetchStrapi<any>("faqs"),
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
  });
}

export async function fetchBlogPost(id: string) {
  const res = await fetch(`${STRAPI_URL}/api/posts/${id}?populate=*`);
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}

export async function fetchProject(id: string) {
  const res = await fetch(`${STRAPI_URL}/api/projects/${id}?populate=*`);
  if (!res.ok) throw new Error("Failed to fetch project");
  return res.json();
}

export function useAboutData() {
  return useQuery({
    queryKey: ["about"],
    // Endpoint for a Single Type 'About' is usually /api/about
    queryFn: () => fetchStrapi<any>("about", { populate: "*" }),
  });
}

export function useContactMutation() {
  return useMutation({
    retry: false,
    mutationFn: async (formData: any) => {
      const response = await fetch(`${STRAPI_URL}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Strapi 5 expects data to be wrapped in a "data" object
        body: JSON.stringify({ data: formData }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      return response.json();
    },
  });
}

export async function fetchAboutData() {
  const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1338";
  const res = await fetch(`${STRAPI_URL}/api/about?populate=*`);
  if (!res.ok) throw new Error("Failed to fetch about data");
  return res.json();
}
