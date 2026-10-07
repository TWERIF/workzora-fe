import { $api } from "@/shared/components/http";
import { ChatList, ChatMessage, ChatRoom } from "./types";

export const getChats = async (params: { page?: number; limit?: number }): Promise<ChatList> => {
    const res = await $api.get<ChatList>("/chat", { params });
    return res.data;
};

export const getProjectChat = async (projectId: string): Promise<ChatRoom> => {
    const res = await $api.get<ChatRoom>(`/chat/project/${projectId}`);
    return res.data;
};

export const getChatMessages = async (chatId: string, amount = 50): Promise<ChatMessage[]> => {
    const res = await $api.get<ChatMessage[]>(`/chat/${chatId}/messages`, { params: { amount } });
    return res.data;
};

export const uploadChatFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await $api.post<{ fileUrl: string }>("/chat/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.fileUrl;
};
