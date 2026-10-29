import { keepPreviousData, queryOptions, useQuery } from "@tanstack/react-query";
import { getFreelancerCategories, getFreelancers } from "./http";
import type { FreelancersQuery } from "./types";

export const freelancerQueries = {
    list: (query: FreelancersQuery) => queryOptions({ queryKey: ["freelancers", query], queryFn: () => getFreelancers(query) }),
    categories: () =>
        queryOptions({ queryKey: ["freelancers", "categories"], queryFn: getFreelancerCategories, staleTime: 5 * 60 * 1000 }),
};

export const useFreelancers = (query: FreelancersQuery) =>
    useQuery({ ...freelancerQueries.list(query), placeholderData: keepPreviousData });

export const useFreelancerCategories = () => useQuery(freelancerQueries.categories());
