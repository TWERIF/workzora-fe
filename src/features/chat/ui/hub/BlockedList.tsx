import { useBlockedUsers } from "@/features/users/model/useUsers";
import { IconUser } from "@/shared/components/svg/UiIcons";
import Loader from "@/shared/components/ui/Loader";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export default function BlockedList({ search }: { search: string }) {
    const { t, i18n } = useTranslation("chat");
    const { locale = "en" } = useRouter();
    const { blocked, isLoading, unblock, isUnblocking } = useBlockedUsers();
    const needle = search.trim().toLowerCase();
    const visible = needle
        ? blocked.filter(({ user }) => `${user.firstName} ${user.lastName}`.toLowerCase().includes(needle))
        : blocked;

    if (isLoading) return <Loader />;
    if (!visible.length) {
        return <p className="rounded-20 border border-dashed border-main-10 p-10 text-center text-sm text-main-50">{t(needle ? "hub.emptySearch" : "hub.emptyBlocked")}</p>;
    }

    return (
        <ul className="flex flex-col gap-2.5">
            {visible.map(({ user, blockedAt }) => (
                <li key={user.id} className="flex items-center gap-4 rounded-20 bg-main-5 p-4 sm:px-5">
                    <Link href={`/${locale}/public-profile/${user.id}`} className="flex min-w-0 flex-1 items-center gap-4">
                        <span className="flex h-[50px] w-[50px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-main-10 text-main-50">
                            {user.avatarUrl ? <img src={user.avatarUrl} alt="" className="h-full w-full object-cover" /> : <IconUser size={24} />}
                        </span>
                        <span className="flex min-w-0 flex-col">
                            <span className="truncate text-base font-medium">{[user.firstName, user.lastName].filter(Boolean).join(" ")}</span>
                            <span className="text-xs text-main-50">
                                {t("hub.blockedOn", { date: new Date(blockedAt).toLocaleDateString(i18n.language) })}
                            </span>
                        </span>
                    </Link>
                    <button
                        type="button"
                        onClick={() => unblock(user.id)}
                        disabled={isUnblocking}
                        className="h-[38px] shrink-0 rounded-full border border-primary px-4 text-xs text-primary transition-colors hover:bg-primary-10 disabled:opacity-60"
                    >
                        {t("hub.unblock")}
                    </button>
                </li>
            ))}
        </ul>
    );
}
