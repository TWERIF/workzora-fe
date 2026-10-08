import { useMutation, useQuery } from "@tanstack/react-query";
import { getChatMessages, getChats, getProjectChat, uploadChatFile } from "./api";

export const chatKeys = {
    all: ["chats"] as const,
    list: (page: number, limit: number) => [...chatKeys.all, page, limit] as const,
    room: (projectId: string) => [...chatKeys.all, "room", projectId] as const,
    messages: (chatId: string) => [...chatKeys.all, "messages", chatId] as const,
};

export const useChats = (page: number = 1, limit: number = 10) => {
    return useQuery({
        queryFn: () => getChats({ page, limit }),
        queryKey: chatKeys.list(page, limit),
    });
};

export const useProjectChat = (projectId?: string) => {
    const room = useQuery({
        queryKey: chatKeys.room(projectId ?? ""),
        queryFn: () => getProjectChat(projectId!),
        enabled: !!projectId,
    });

    const chatId = room.data?.id;
    const messages = useQuery({
        queryKey: chatKeys.messages(chatId ?? ""),
        queryFn: () => getChatMessages(chatId!),
        enabled: !!chatId,
        refetchOnWindowFocus: false,
    });

    return { chatId, messages: messages.data, isLoading: room.isLoading || messages.isLoading };
};

export const useUploadChatFile = () => useMutation({ mutationFn: uploadChatFile });
