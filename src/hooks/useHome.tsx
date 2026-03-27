import { useQuery } from "@tanstack/react-query";
import { fetchStrapi } from "../lib/api";

export function useHomeData() {
  return useQuery({
    queryKey: ["home"],
    queryFn: () => fetchStrapi<any>("home", { populate: "*" }),
  });
}

export function useLatestProjects() {
  return useQuery({
    queryKey: ["latest-projects"],
    queryFn: () =>
      fetchStrapi<any>("projects", {
        sort: "createdAt:desc",
        pagination: { limit: 5 },
        populate: "*",
      }),
  });
}
