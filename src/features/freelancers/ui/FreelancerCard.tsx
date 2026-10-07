import UserCardHeader from "@/features/directory/ui/UserCardHeader";
import type { FreelancerListItem } from "@/features/freelancers/model/types";
import { IconEye, IconImage } from "@/shared/components/svg/UiIcons";
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
    const name = [freelancer.firstName, freelancer.lastName].filter(Boolean).join(" ") || freelancer.username;
    const work = freelancer.portfolio;

    return (
        <article className="flex flex-col justify-center gap-6 rounded-36 bg-surface p-6 transition-colors dark:bg-bg-modalDark sm:p-9">
            <UserCardHeader
                id={freelancer.id}
                name={name}
                avatarUrl={freelancer.avatarUrl}
                about={freelancer.bio?.trim() || freelancer.position}
                rating={Number(freelancer.ratings) || 0}
                isVerified={freelancer.isVerified}
            />

            {work && (
                <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-bold">{t("card.lastWork")}</h3>
                    <Link
                        href={`/public-profile/${freelancer.id}`}
                        className="flex flex-col overflow-hidden rounded-[28px] bg-bg-header transition-shadow hover:shadow-card dark:bg-input-dark sm:flex-row"
                    >
                        {work.imageUrl ? (
                            <img src={work.imageUrl} alt={work.title} loading="lazy" className="aspect-[16/10] w-full object-cover object-top sm:w-[320px] sm:shrink-0" />
                        ) : (
                            <span className="flex aspect-[16/10] w-full items-center justify-center bg-main-10 text-main-50 sm:w-[320px] sm:shrink-0">
                                <IconImage size={40} />
                            </span>
                        )}
                        <div className="flex min-w-0 flex-1 flex-col gap-3 p-6">
                            <div className="flex items-center justify-between gap-2 text-xs text-main-50">
                                <span className="flex items-center gap-1.5">
                                    <IconEye size={18} className="text-primary" />
                                    {(work.views ?? 0).toLocaleString(locale === "uk" ? "uk-UA" : "en-US")}
                                </span>
                                {work.createdAt && <time dateTime={work.createdAt}>{formatDate(work.createdAt)}</time>}
                            </div>
                            <h4 className="break-words text-xl font-medium">{work.title}</h4>
                            {work.tags && work.tags.length > 0 && (
                                <ul className="flex flex-wrap gap-2">
                                    {work.tags.slice(0, 4).map((tag) => (
                                        <li key={tag} className="rounded-full bg-primary-10 px-3 py-1 text-xs text-primary">
                                            #{tag}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {work.description && <p className="line-clamp-3 break-words text-sm">{work.description}</p>}
                        </div>
                    </Link>
                </div>
            )}
        </article>
    );
}
