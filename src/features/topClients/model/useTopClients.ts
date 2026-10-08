import { useQuery } from "@tanstack/react-query";
import { getTopClients } from "./api";
import type { TopClientsParams } from "./types";

export const useTopClients = (params: TopClientsParams) =>
    useQuery({
        queryKey: ["topClients", "list", params],
        queryFn: () => getTopClients(params),
        placeholderData: (previousData) => previousData,
    });
