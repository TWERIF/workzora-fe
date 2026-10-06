import { RatingStars } from "@/features/freelancerProfile/ui/RatingStars";
import VerifiedIcon from "@/shared/components/svg/VerifiedIcon";
import WorkzoraMarkIcon from "@/shared/components/svg/WorkzoraMarkIcon";
import ButtonGradient from "@/shared/components/ui/Button/ButtonGradient";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import placeholderAvatar from "../../../../public/images/avatar_placeholder.png";
import type { TopClient } from "../model/types";
import { LastActivityBlock } from "./LastActivityBlock";
import { LastReviewBlock } from "./LastReviewBlock";

export const ClientCard = ({ client }: { client: TopClient }) => {
    const { t } = useTranslation("topClients");
    const router = useRouter();
    const locale = router.locale ?? "en";

    const fullName = `${client.firstName ?? ""} ${client.lastName ?? ""}`.trim() || t("card.anonymous");
    const rating = Number(client.ratings) || 0;
    const about = client.bio || client.position;

    return (
        <article className="flex flex-col justify-center gap-6 rounded-36 bg-surface p-6 transition-colors dark:bg-bg-modalDark sm:p-9">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="relative size-[88px] shrink-0 overflow-hidden rounded-full sm:size-[114px]">
                    <Image
                        src={client.avatarUrl || placeholderAvatar}
                        alt={fullName}
                        fill
                        sizes="114px"
                        className="object-cover"
                    />
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-[6px]">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <p className="text-2xl font-bold text-text dark:text-text-dark sm:text-[30px]">{fullName}</p>
                            {client.isVerified && (
                                <div className="flex items-center gap-[6px]">
                                    <VerifiedIcon w={36} h={36} />
                                    <div className="p-[2px]">
                                        <WorkzoraMarkIcon w={32} h={32} />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-3">
                                <RatingStars value={rating} />
                                <p className="whitespace-nowrap text-text dark:text-text-dark">
                                    <span className="text-xl font-bold">{rating.toFixed(1).replace(".", ",")}</span>{" "}
                                    <span className="text-xs text-text-light dark:text-text-muted">/ 5,0</span>
                                </p>
                            </div>
                            <ButtonGradient
                                text={t("card.goToProfile")}
                                onClick={() => router.push(`/${locale}/public-profile/${client.id}`)}
                                className="!rounded-[100px] !px-6 !py-3"
                            />
                        </div>
                    </div>

                    {about && <p className="text-sm text-text dark:text-text-dark">{about}</p>}
                </div>
            </div>

            {client.lastReview ? (
                <LastReviewBlock review={client.lastReview} />
            ) : (
                client.lastProject && <LastActivityBlock project={client.lastProject} />
            )}
        </article>
    );
};
