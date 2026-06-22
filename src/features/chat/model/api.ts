import { $api } from "@/shared/components/http";

export const getChats = async (params: { page?: number; limit?: number }) => {
    const res = await $api.get("/chat", { params });
    return res.data;
};