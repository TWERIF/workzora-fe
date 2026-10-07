import { IconCheck, IconChecks, IconUser } from "@/shared/components/svg/UiIcons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import type { ChatListItem } from "../../model/types";

const ONLINE_WINDOW_MS = 5 * 60 * 1000;

const formatTime = (value: string, locale: string, yesterday: string) => {
    const date = new Date(value);
    const diff = Date.now() - date.getTime();
    if (diff < 24 * 60 * 60 * 1000 && new Date().getDate() === date.getDate()) {
        return date.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" });
    }
    const format = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
    const days = Math.max(1, Math.round(diff / (24 * 60 * 60 * 1000)));
    return days === 1 ? yesterday : format.format(-days, "day");
};

export default function ChatRow({ chat }: { chat: ChatListItem }) {
    const { t, i18n } = useTranslation("chat");
    const { locale = "en" } = useRouter();
    const isOnline = Boolean(chat.counterpartLastSeenAt && Date.now() - new Date(chat.counterpartLastSeenAt).getTime() < ONLINE_WINDOW_MS);
    const yesterday = new Intl.RelativeTimeFormat(i18n.language, { numeric: "auto" }).format(-1, "day");

    return (
        <Link
            href={`/${locale}/chats/${chat.projectId}`}
            className="flex items-center gap-4 rounded-20 bg-main-5 p-4 transition-colors hover:bg-primary-10 sm:px-5"
        >
            <span className="relative shrink-0">
                <span className="flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-full bg-main-10 text-main-50">
                    {chat.avatarUrl ? <img src={chat.avatarUrl} alt="" className="h-full w-full object-cover" /> : <IconUser size={24} />}
                </span>
                {isOnline && (
                    <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-main-5 bg-primary" aria-label={t("hub.online")} />
                )}
            </span>

            <span className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="flex min-w-0 items-center gap-2">
                    <span className="truncate text-base font-medium">{chat.userName ?? t("list.unknownUser")}</span>
                    {chat.projectTitle && (
                        <span className="min-w-0 max-w-[45%] truncate rounded-[6px] border border-primary/30 bg-primary-10 px-1.5 py-0.5 text-[10px] text-primary">
                            {chat.projectTitle}
                        </span>
                    )}
                </span>
                <span className="truncate text-sm text-main-50">{chat.topic ?? t("list.chatCreated")}</span>
            </span>

            <span className="flex shrink-0 flex-col items-end gap-1.5">
                {chat.messageCount > 0 ? (
                    <span
                        className="flex h-5 min-w-5 items-center justify-center rounded-[6px] bg-primary px-1.5 text-[10px] font-semibold text-white"
                        aria-label={t("hub.unread", { count: chat.messageCount })}
                    >
                        {chat.messageCount}
                    </span>
                ) : (
                    <span className="h-5" />
                )}
                <span className="flex items-center gap-1.5 text-xs text-main-50">
                    {chat.lastMessageFromMe &&
                        (chat.lastMessageRead ? (
                            <IconChecks size={16} className="text-primary" aria-label={t("hub.read")} />
                        ) : (
                            <IconCheck size={16} className="text-main-50" aria-label={t("hub.sent")} />
                        ))}
                    <time dateTime={chat.updatedAt} suppressHydrationWarning>
                        {formatTime(chat.updatedAt, i18n.language, yesterday)}
                    </time>
                </span>
            </span>
        </Link>
    );
}
