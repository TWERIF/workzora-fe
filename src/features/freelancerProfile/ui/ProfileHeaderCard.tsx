import { User } from "@/features/auth/model/types";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import placeHolderAvatar from "../../../../public/images/avatar_placeholder.png";
import { CheckBadgeIcon } from "./icons";
import { RatingStars } from "./RatingStars";

interface ProfileHeaderCardProps {
    user: User | null | undefined;
}

export const ProfileHeaderCard = ({ user }: ProfileHeaderCardProps) => {
    const { t } = useTranslation("common");

    const fullName =
        user?.firstName || user?.lastName
            ? `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim()
            : t("profile.noData.name");

    const memberSince = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString(undefined, {
            month: "long",
            year: "numeric",
        })
        : t("profile.noData.memberSince");

    const avatar = user?.avatarUrl ?? placeHolderAvatar;

    return (
        <section className="rounded-20 border border-border bg-bg-header px-15 py-13 shadow-input dark:bg-bg-modalDark dark:shadow-input-dark">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="relative shrink-0">
                        <div className="h-20 w-20 overflow-hidden rounded-full bg-gradient p-0.5">
                            <Image
                                src={avatar}
                                alt={fullName}
                                fill
                                className="h-full w-full rounded-full object-cover"
                            />
                        </div>
                    </div>

                    <div>
                        <p className="text-xs text-text-muted">{memberSince}</p>
                        <div className="mt-1 flex items-center gap-1.5">
                            <h1 className="text-lg font-semibold text-text dark:text-text-dark">
                                {fullName}
                            </h1>
                            {user?.verification && <CheckBadgeIcon className="h-4 w-4" />}
                        </div>
                        <div className="mt-1 flex items-center gap-1.5">
                            <RatingStars value={user?.ratings ?? 0} />
                            <span className="text-xs text-text-muted">
                                {user?.ratings != null ? `${user.ratings} / 5,0` : t("profile.noData.rating")}
                            </span>
                        </div>
                    </div>
                </div>

                <span className="text-xs text-text-muted">{t("profile.noData.onlineStatus")}</span>
            </div>

            <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-text-muted">
                {t("profile.noData.bio")}
            </p>
        </section>
    );
};