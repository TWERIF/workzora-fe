import { $api } from "@/shared/components/http";
import type { TopClientsParams, TopClientsResponse } from "./types";

export const getTopClients = async ({ ratings, search, ...params }: TopClientsParams): Promise<TopClientsResponse> => {
    const res = await $api.get("/users/clients/top", {
        params: {
            ...params,
            search: search?.trim() || undefined,
            ratings: ratings?.length ? ratings.join(",") : undefined,
        },
    });
    return res.data;
};
