import { User } from "@/features/auth/model/types";
import Top10BadgeIcon from "@/shared/components/svg/Profile/Top10BadgeIcon";
import VerifiedBadgeIcon from "@/shared/components/svg/Profile/VerifiedBadgeIcon";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import placeHolderAvatar from "../../../../public/images/avatar_placeholder.png";
import { RatingStars } from "./RatingStars";

interface ProfileHeaderCardProps {
    user: User | null | undefined;
    isPro?: boolean;
    isTop10?: boolean;
}

export const ProfileHeaderCard = ({ user, isPro = false, isTop10 = false }: ProfileHeaderCardProps) => {
    const { t, i18n } = useTranslation("common");

    const fullName =
        user?.firstName || user?.lastName
            ? `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim()
            : t("profile.noData.name");

    const memberSince = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString(i18n.language, {
            month: "long",
            year: "numeric",
        })
        : t("profile.noData.memberSince");

    const avatar = user?.avatarUrl ?? placeHolderAvatar;

    const formatRating = (value: number) =>
        value.toLocaleString(i18n.language, { minimumFractionDigits: 1, maximumFractionDigits: 1 });

    return (
        <section className="flex flex-col gap-6 rounded-36 bg-surface p-6 dark:bg-bg-modalDark sm:flex-row sm:items-center sm:p-9">
            <div className="relative size-[153px] shrink-0 overflow-hidden rounded-full">
                <Image src={avatar} alt={fullName} fill sizes="153px" className="object-cover" />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                    <p className="flex gap-[6px]">
                        <span className="text-text-light">{t("profile.header.memberSince")}</span>
                        <span className="text-text dark:text-text-dark">{memberSince}</span>
                    </p>
                    <span className="text-text-light">{t("profile.noData.onlineStatus")}</span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold leading-normal text-text dark:text-text-dark">
                            {fullName}
                        </h1>
                        <div className="flex items-center gap-[6px]">
                            {user?.verification && <VerifiedBadgeIcon />}
                            {isPro && (
                                <span className="flex p-0.5">
                                    {/* Figma crop of the WZ_colors raster inside a 32px frame */}
                                    <span className="relative size-8 overflow-hidden">
                                        <img
                                            src="/images/profile/wz-badge.png"
                                            alt=""
                                            className="absolute left-[-209.92%] top-[-181.43%] h-[510.21%] w-[519.84%] max-w-none"
                                        />
                                    </span>
                                </span>
                            )}
                            {isTop10 && <Top10BadgeIcon />}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <RatingStars value={user?.ratings ?? 0} />
                        {user?.ratings != null ? (
                            <p className="whitespace-nowrap">
                                <span className="text-xl font-bold text-text dark:text-text-dark">
                                    {formatRating(user.ratings)}
                                </span>{" "}
                                <span className="text-xs text-text-light">/ {formatRating(5)}</span>
                            </p>
                        ) : (
                            <span className="text-xs text-text-light">{t("profile.noData.rating")}</span>
                        )}
                    </div>
                </div>

                <p className="line-clamp-3 whitespace-pre-line text-sm text-text dark:text-text-dark">
                    {user?.bio || t("profile.noData.bio")}
                </p>
            </div>
        </section>
    );
};
