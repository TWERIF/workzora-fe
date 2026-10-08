import { $api } from "@/shared/components/http";
import type { NotificationPage, NotificationType, UnreadCount } from "./types";

export const getNotifications = async (params: { type?: NotificationType; page: number; limit: number }) => {
    const res = await $api.get<NotificationPage>("/notifications", { params });
    return res.data;
};

export const getUnreadCount = async () => {
    const res = await $api.get<UnreadCount>("/notifications/unread-count");
    return res.data;
};

export const markNotificationRead = async (id: string) => {
    const res = await $api.patch<{ success: boolean }>(`/notifications/${id}/read`);
    return res.data;
};

export const markAllNotificationsRead = async (type?: NotificationType) => {
    const res = await $api.patch<{ success: boolean }>("/notifications/read-all", { type });
    return res.data;
};
