import { useQuery } from "@tanstack/react-query";
import { fetchStrapi } from "../lib/api";

export function useGlobalSettings() {
  const { data, isLoading } = useQuery({
    queryKey: ["global-settings"],
    queryFn: () => fetchStrapi<any>("global?populate=*"),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 15,
  });

  const avatarUrl = data?.data?.avatar?.url;

  return {
    siteName: data?.data?.siteName || "GP Digital Design",
    footerCopyright: data?.data?.footerCopyright || "GP Digital Design",
    avatarUrl: avatarUrl || "/Avatar50.png",
    isLoading,
  };
}
