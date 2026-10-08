import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import type { AppNotification } from "../model/types";

const KNOWN_KEYS = new Set([
    "welcome",
    "newMessage",
    "bidReceived",
    "freelancerSelected",
    "fundsReserved",
    "projectCompleted",
    "paymentReceived",
    "withdrawalCompleted",
    "withdrawalRejected",
    "reviewReceived",
]);

const TIME_STEPS: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31_536_000],
    ["month", 2_592_000],
    ["week", 604_800],
    ["day", 86_400],
    ["hour", 3_600],
    ["minute", 60],
];

const relativeTime = (date: string, locale: string) => {
    const seconds = Math.round((new Date(date).getTime() - Date.now()) / 1000);
    const format = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
    for (const [unit, size] of TIME_STEPS) {
        if (Math.abs(seconds) >= size) return format.format(Math.round(seconds / size), unit);
    }
    return format.format(0, "second");
};

interface NotificationCardProps {
    notification: AppNotification;
    onOpen: (notification: AppNotification) => void;
}

export default function NotificationCard({ notification, onOpen }: NotificationCardProps) {
    const { t } = useTranslation("notifications");
    const { locale = "en" } = useRouter();
    const key = KNOWN_KEYS.has(notification.key) ? notification.key : "unknown";
    const isWelcome = key === "welcome";
    const href = notification.link ? `/${locale}${notification.link}` : null;
    const title = t(`items.${key}.title`, notification.params);
    const text = t(`items.${key}.text`, notification.params);

    const body = (
        <>
            <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                <h2 className="min-w-0 break-words text-base font-medium sm:text-lg">{title}</h2>
                <time dateTime={notification.createdAt} suppressHydrationWarning className="shrink-0 text-xs text-main-50">
                    {relativeTime(notification.createdAt, locale)}
                </time>
            </div>
            {text && <p className="mt-3 break-words text-sm leading-6 text-main-50">{text}</p>}
        </>
    );

    const surface = `relative block rounded-20 p-5 transition-colors sm:px-[22px] sm:py-6 ${
        notification.isRead ? "bg-main-5" : "border border-primary/20 bg-primary-10"
    }`;

    return (
        <article className="relative pt-3">
            {!notification.isRead && (
                <span className="absolute left-5 top-0 z-10 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-medium uppercase text-white">
                    {t("new")}
                </span>
            )}
            {isWelcome || !href ? (
                <div className={surface}>
                    {body}
                    {isWelcome && href && (
                        <Link
                            href={href}
                            onClick={() => onOpen(notification)}
                            className="mt-4 inline-flex h-[42px] items-center rounded-full bg-gradient px-5 text-sm text-white transition-opacity hover:opacity-90"
                        >
                            {t("items.welcome.action")}
                        </Link>
                    )}
                </div>
            ) : (
                <Link href={href} onClick={() => onOpen(notification)} className={`${surface} hover:border-primary/40`}>
                    {body}
                </Link>
            )}
        </article>
    );
}
