import { useAuth } from "@/features/auth/model/useAuth";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotifications, getUnreadCount, markAllNotificationsRead, markNotificationRead } from "./api";
import type { NotificationFilter } from "./types";

const UNREAD_REFRESH_MS = 60_000;

export const notificationKeys = {
    all: ["notifications"] as const,
    list: (filter: NotificationFilter, page: number, limit: number) => ["notifications", "list", filter, page, limit] as const,
    unread: ["notifications", "unread"] as const,
};

export const useNotifications = (filter: NotificationFilter, page: number, limit: number) =>
    useQuery({
        queryKey: notificationKeys.list(filter, page, limit),
        queryFn: () => getNotifications({ type: filter === "all" ? undefined : filter, page, limit }),
        placeholderData: keepPreviousData,
    });

export const useUnreadNotifications = () => {
    const { isAuthenticated } = useAuth();
    return useQuery({
        queryKey: notificationKeys.unread,
        queryFn: getUnreadCount,
        enabled: isAuthenticated,
        refetchInterval: UNREAD_REFRESH_MS,
        staleTime: UNREAD_REFRESH_MS / 2,
    });
};

export const useNotificationActions = () => {
    const queryClient = useQueryClient();
    const refresh = () => queryClient.invalidateQueries({ queryKey: notificationKeys.all });

    const markRead = useMutation({ mutationFn: markNotificationRead, onSuccess: refresh });
    const markAllRead = useMutation({
        mutationFn: (filter: NotificationFilter) => markAllNotificationsRead(filter === "all" ? undefined : filter),
        onSuccess: refresh,
    });

    return {
        markRead: markRead.mutate,
        markAllRead: markAllRead.mutate,
        isMarkingAll: markAllRead.isPending,
    };
};
