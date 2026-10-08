export const NOTIFICATION_TYPES = ["projects", "messages", "payments", "system"] as const;
export type NotificationType = (typeof NOTIFICATION_TYPES)[number];
export type NotificationFilter = NotificationType | "all";

export interface AppNotification {
    id: string;
    type: NotificationType;
    key: string;
    params: Record<string, string | number>;
    link: string | null;
    isRead: boolean;
    createdAt: string;
}

export interface NotificationPage {
    data: AppNotification[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface UnreadCount {
    total: number;
    byType: Record<NotificationType, number>;
}
