import ProfileNavigation from "@/features/profile/ui/ProfileNavigation";
import ProjectsPagination from "@/features/projects/ui/ProjectPagination";
import Loader from "@/shared/components/ui/Loader";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NOTIFICATION_TYPES, type AppNotification, type NotificationFilter } from "../model/types";
import { useNotificationActions, useNotifications, useUnreadNotifications } from "../model/useNotifications";
import NotificationCard from "./NotificationCard";

const PAGE_SIZE = 10;
const FILTERS: NotificationFilter[] = ["all", ...NOTIFICATION_TYPES];

export default function NotificationsPage() {
    const { t } = useTranslation("notifications");
    const [filter, setFilter] = useState<NotificationFilter>("all");
    const [page, setPage] = useState(1);

    const { data, isLoading, isError } = useNotifications(filter, page, PAGE_SIZE);
    const { data: unread } = useUnreadNotifications();
    const { markRead, markAllRead, isMarkingAll } = useNotificationActions();

    const unreadInFilter = filter === "all" ? (unread?.total ?? 0) : (unread?.byType[filter] ?? 0);

    const changeFilter = (next: NotificationFilter) => {
        setFilter(next);
        setPage(1);
    };

    const open = (notification: AppNotification) => {
        if (!notification.isRead) markRead(notification.id);
    };

    return (
        <main className="mx-auto grid w-full max-w-[1358px] grid-cols-1 gap-[30px] px-4 pb-[100px] pt-24 text-main-100 lg:grid-cols-[minmax(0,1fr)_317px] lg:items-start lg:pt-[171px]">
            <section className="min-w-0">
                <header className="flex items-center justify-between gap-4">
                    <h1 className="text-[28px] font-bold sm:text-[32px]">{t("title")}</h1>
                    {unread && unread.total > 0 && <span className="text-xl font-semibold text-primary">({unread.total})</span>}
                </header>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div
                        role="tablist"
                        className="flex min-w-0 gap-1 overflow-x-auto rounded-full bg-main-5 p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                        {FILTERS.map((item) => (
                            <button
                                key={item}
                                type="button"
                                role="tab"
                                aria-selected={filter === item}
                                onClick={() => changeFilter(item)}
                                className={`shrink-0 rounded-full px-5 py-2 text-xs transition-colors sm:min-w-[96px] ${
                                    filter === item ? "bg-primary text-white" : "bg-background hover:text-primary"
                                }`}
                            >
                                {t(`tabs.${item}`)}
                            </button>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={() => markAllRead(filter)}
                        disabled={unreadInFilter === 0 || isMarkingAll}
                        className="shrink-0 self-end border-b border-dashed border-primary text-xs text-primary disabled:border-transparent disabled:text-main-50 sm:self-auto"
                    >
                        {t("markAll")}
                    </button>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                    {isLoading ? (
                        <Loader />
                    ) : isError ? (
                        <p className="rounded-20 bg-main-5 p-6 text-center text-sm text-status-danger">{t("error")}</p>
                    ) : data && data.data.length > 0 ? (
                        data.data.map((notification) => (
                            <NotificationCard key={notification.id} notification={notification} onOpen={open} />
                        ))
                    ) : (
                        <p className="rounded-20 border border-dashed border-main-10 p-10 text-center text-sm text-main-50">{t("empty")}</p>
                    )}
                </div>

                {data && <ProjectsPagination currentPage={page} totalPages={data.totalPages} onPageChange={setPage} />}
            </section>

            <aside className="flex flex-col gap-3">
                <ProfileNavigation activeHref="/notifications" />
            </aside>
        </main>
    );
}
