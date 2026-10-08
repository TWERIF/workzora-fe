import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getFreelancerCategories, getFreelancers } from "./http";
import type { FreelancersQuery } from "./types";

export const useFreelancers = (query: FreelancersQuery) =>
    useQuery({ queryKey: ["freelancers", query], queryFn: () => getFreelancers(query), placeholderData: keepPreviousData });

export const useFreelancerCategories = () =>
    useQuery({ queryKey: ["freelancers", "categories"], queryFn: getFreelancerCategories, staleTime: 5 * 60 * 1000 });
