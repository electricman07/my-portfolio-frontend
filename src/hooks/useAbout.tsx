import { useQuery } from "@tanstack/react-query";
import { fetchStrapi } from "../lib/api";

export function useAboutData() {
  return useQuery({
    queryKey: ["about"],
    queryFn: () => fetchStrapi<any>("about", { populate: "*" }),
  });
}
