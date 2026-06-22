import { useQuery } from "@tanstack/react-query";
import { getChats } from "./api";

export const chatKeys = {
    all: ["chats"] as const,
    list: (page: number, limit: number) => [...chatKeys.all, page, limit] as const,
};

export const useChats = (page: number = 1, limit: number = 10) => {
    return useQuery({
        queryFn: () => getChats({ page, limit }),
        queryKey: chatKeys.list(page, limit),
    });
};