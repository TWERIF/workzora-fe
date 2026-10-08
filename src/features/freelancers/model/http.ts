import type { CategoryNode } from "@/features/categories/model/types";
import { $api } from "@/shared/components/http";
import type { FreelancersPage, FreelancersQuery } from "./types";

export const getFreelancers = async ({ category, specializations, search, ...query }: FreelancersQuery): Promise<FreelancersPage> =>
    (
        await $api.get<FreelancersPage>("/users/freelancers", {
            params: {
                ...query,
                ...(search?.trim() && { search: search.trim() }),
                ...(category && { category }),
                ...(specializations?.length && { specializations: specializations.join(",") }),
            },
        })
    ).data;

export const getFreelancerCategories = async (): Promise<CategoryNode[]> => (await $api.get<CategoryNode[]>("/users/freelancers/categories")).data;
