import { queryOptions, useQuery } from "@tanstack/react-query";
import { getTopClients } from "./api";
import type { TopClientsParams } from "./types";

export const topClientQueries = {
    list: (params: TopClientsParams) =>
        queryOptions({ queryKey: ["topClients", "list", params], queryFn: () => getTopClients(params) }),
};

export const useTopClients = (params: TopClientsParams) =>
    useQuery({
        ...topClientQueries.list(params),
        placeholderData: (previousData) => previousData,
    });
