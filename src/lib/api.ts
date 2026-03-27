import qs from "qs";
/**
 * Helper to fetch data from Strapi with auto-population and flattening
 */
// 1. Setup Environment Variables
// Vite requires the VITE_ prefix to expose variables to the client
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1338";
const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

/**
 * Global fetcher for Strapi 5
 * @param endpoint - The API endpoint (e.g., 'projects', 'posts', 'about')
 * @param query - An object containing populate, filters, pagination, or sort
 */
export async function fetchStrapi<T>(
  endpoint: string,
  query?: object,
): Promise<T> {
  // 2. Stringify the query using 'qs' for Strapi's deep filtering syntax
  const queryString = query
    ? `?${qs.stringify(query, { encodeValuesOnly: true })}`
    : "";

  const url = `${STRAPI_URL}/api/${endpoint}${queryString}`;

  // 3. Perform the fetch request
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Attach the API Token if it exists
      ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
    },
  });

  // 4. Handle HTTP Errors
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `Strapi Error: ${response.status} ${response.statusText}. ${errorData?.error?.message || ""}`,
    );
  }

  const json = await response.json();

  /**
   * 5. Strapi 5 Response Formatting:
   * Strapi 5 returns { data: [...] } or { data: { ... }, meta: { ... } }.
   * We return the full json object here so that hooks can access 'meta'
   * (needed for blog pagination) or just 'data'.
   */
  return json;
}

/**
 * Helper to handle Image URLs
 * Prepends the backend URL to relative paths from Strapi
 */
export function getStrapiMedia(url: string | undefined) {
  if (!url) return "https://placehold.co";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}
