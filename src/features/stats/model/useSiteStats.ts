import { queryOptions, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getSiteStats } from "./api";

export const siteStatsQueries = {
  all: () => queryOptions({ queryKey: ["siteStats"], queryFn: getSiteStats, staleTime: 5 * 60 * 1000 }),
};

export const useSiteStats = () => useQuery(siteStatsQueries.all());

export const useFormatCount = () => {
  const { locale } = useRouter();
  return (value?: number) => (value === undefined ? "—" : value.toLocaleString(locale === "uk" ? "uk-UA" : "en-US"));
};
