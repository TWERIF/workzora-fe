import { User } from "@/features/auth/model/types";
import { Avatar } from "@/features/users/ui/Avatar";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";

interface UserCardProps {
    user: User;
}

const formatRate = (rate?: number) => (typeof rate === "number" ? `$${rate}/hr` : "—");

export default function UserCard({ user }: UserCardProps) {
    const { t } = useTranslation("main");
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const displayName = user.username || `${user.firstName} ${user.lastName}`.trim();
    return (
        <div
            className={`rounded-20 p-6 flex flex-col items-center text-center gap-4 ${isDark ? "bg-bg-modalDark text-text-dark" : "bg-white shadow-input"
                }`}
        >
            <Avatar user={user} />

            <div className="flex flex-col gap-0.5">
                <div className="flex items-center justify-center gap-1.5">
                    <p className="font-semibold">{displayName}</p>
                    {user.verification?.status === "verified" && (
                        <svg
                            className="w-4 h-4 text-success shrink-0"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-label={t("community.verified")}
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                        </svg>
                    )}
                </div>
                {user.position && <p className="text-xs opacity-70">{user.position}</p>}
            </div>

            {user.role === "freelancer" && <button className="text-xs font-semibold text-success hover:underline">
                {t("community.proposeProject")}
            </button>}

            <div className={`grid ${user.role === "freelancer" ? "grid-cols-3" : "grid-cols-1"} gap-4 w-full pt-4 border-t border-border/50 text-xs`}>
                <div>
                    <p className="font-bold">{user.ratings ?? "-"}</p>
                    <p className="opacity-60">{t("community.rating")}</p>
                </div>
                {user.role === "freelancer" && <div>
                    <p className="font-bold">{user.rate ?? "-"}</p>
                    <p className="opacity-60">{t("community.earned")}</p>
                </div>}
                {user.role === "freelancer" && <div>
                    <p className="font-bold">{formatRate(user.rates)}</p>
                    <p className="opacity-60">{t("community.rate")}</p>
                </div>}
            </div>
        </div>
    );
}