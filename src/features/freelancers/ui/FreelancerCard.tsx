import type { FreelancerListItem } from "@/features/freelancers/model/types";
import RatingStarIcon from "@/shared/components/svg/RatingStarIcon";
import { IconEye, IconImage } from "@/shared/components/svg/UiIcons";
import VerifiedIcon from "@/shared/components/svg/VerifiedIcon";
import WorkzoraMarkIcon from "@/shared/components/svg/WorkzoraMarkIcon";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const formatDate = (value: string) => {
    const date = new Date(value);
    const pad = (part: number) => String(part).padStart(2, "0");
    return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`;
};

export default function FreelancerCard({ freelancer }: { freelancer: FreelancerListItem }) {
    const { t } = useTranslation("topFreelancers");
    const { locale = "en" } = useRouter();
    const href = `/public-profile/${freelancer.id}`;
    const name = [freelancer.firstName, freelancer.lastName].filter(Boolean).join(" ") || freelancer.username;
    const rating = Number(freelancer.ratings) || 0;
    const about = freelancer.bio?.trim() || freelancer.position;
    const work = freelancer.portfolio;

    return (
        <article className="flex flex-col gap-5 rounded-[24px] bg-main-5 p-4 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="flex min-w-0 flex-1 gap-4">
                    {freelancer.avatarUrl ? (
                        <img src={freelancer.avatarUrl} alt={name} className="h-14 w-14 shrink-0 rounded-full object-cover sm:h-[60px] sm:w-[60px]" />
                    ) : (
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-background text-xl font-semibold text-main-50 sm:h-[60px] sm:w-[60px]">
                            {name.charAt(0).toUpperCase()}
                        </span>
                    )}
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                            <Link href={href} className="truncate text-xl font-semibold transition-colors hover:text-primary">
                                {name}
                            </Link>
                            {freelancer.isVerified && (
                                <>
                                    <VerifiedIcon w={18} h={18} />
                                    <WorkzoraMarkIcon w={18} h={18} />
                                </>
                            )}
                        </div>
                        {about && <p className="mt-1 line-clamp-3 break-words text-xs leading-5">{about}</p>}
                    </div>
                </div>
                <div className="flex shrink-0 items-center justify-between gap-3 sm:justify-end">
                    <div className="flex items-center gap-2">
                        <span className="flex gap-0.5" aria-hidden>
                            {Array.from({ length: 5 }, (_, index) => (
                                <RatingStarIcon key={index} filled={index < Math.round(rating)} />
                            ))}
                        </span>
                        <span className="text-sm">
                            <b className="text-lg">{rating.toFixed(1).replace(".", ",")}</b>
                            <span className="text-main-50"> / {t("card.outOf")}</span>
                        </span>
                    </div>
                    <Link href={href} className="flex h-[38px] items-center rounded-full bg-gradient px-5 text-xs text-white transition-opacity hover:opacity-90">
                        {t("card.goToProfile")}
                    </Link>
                </div>
            </div>

            {work && (
                <div>
                    <h3 className="mb-3 text-lg font-semibold">{t("card.lastWork")}</h3>
                    <Link href={href} className="flex flex-col overflow-hidden rounded-[20px] bg-background sm:flex-row">
                        {work.imageUrl ? (
                            <img src={work.imageUrl} alt={work.title} loading="lazy" className="aspect-[16/10] w-full object-cover object-top sm:w-[240px] sm:shrink-0" />
                        ) : (
                            <span className="flex aspect-[16/10] w-full items-center justify-center bg-main-10 text-main-50 sm:w-[240px] sm:shrink-0">
                                <IconImage size={36} />
                            </span>
                        )}
                        <div className="flex min-w-0 flex-1 flex-col gap-2.5 p-4">
                            <div className="flex items-center justify-between gap-2 text-xs text-main-50">
                                <span className="flex items-center gap-1.5">
                                    <IconEye size={16} className="text-primary" />
                                    {(work.views ?? 0).toLocaleString(locale === "uk" ? "uk-UA" : "en-US")}
                                </span>
                                {work.createdAt && <time dateTime={work.createdAt}>{formatDate(work.createdAt)}</time>}
                            </div>
                            <h4 className="break-words text-sm font-semibold">{work.title}</h4>
                            {work.tags && work.tags.length > 0 && (
                                <ul className="flex flex-wrap gap-1.5">
                                    {work.tags.slice(0, 4).map((tag) => (
                                        <li key={tag} className="rounded-full bg-primary-10 px-2.5 py-0.5 text-[11px] text-primary">
                                            #{tag}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {work.description && <p className="line-clamp-3 break-words text-xs leading-5">{work.description}</p>}
                        </div>
                    </Link>
                </div>
            )}
        </article>
    );
}
