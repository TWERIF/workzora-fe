import type { ClientProject, ClientProjectsPage } from "@/features/auth/model/types";
import { Pagination } from "@/features/freelancerProfile/ui/Pagination";
import UsdtIcon from "@/shared/components/svg/UsdtIcon";
import { IconEye } from "@/shared/components/svg/UiIcons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const formatDate = (value: string) => {
    const date = new Date(value);
    const pad = (part: number) => String(part).padStart(2, "0");
    return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`;
};

const Price = ({ value }: { value: number }) => (
    <span className="flex shrink-0 items-center gap-2 text-lg font-semibold">
        <UsdtIcon width={22} height={22} />
        {value.toLocaleString("en-US")}
    </span>
);

function ActiveProjectCard({ project }: { project: ClientProject }) {
    const { t } = useTranslation("common");
    const { locale = "en" } = useRouter();
    const tags = project.tags.length ? project.tags : project.categories.map((category) => category.title);

    return (
        <article className="rounded-[24px] bg-main-5 p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex min-w-0 flex-wrap items-center gap-3">
                    <Link href={`/${locale}/activeProjects/discussion/${project.id}`} className="break-words text-lg font-semibold hover:text-primary">
                        {project.title}
                    </Link>
                    <span className="rounded-full border border-primary/30 bg-primary-10 px-3 py-0.5 text-xs text-primary">{t("profile.client.statusActive")}</span>
                </div>
                <Price value={project.price} />
            </div>
            <p className="mt-3 line-clamp-2 break-words text-sm leading-6 text-main-50">{project.description}</p>
            {tags.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2">
                    {tags.slice(0, 5).map((tag) => (
                        <li key={tag} className="rounded-full bg-background px-3 py-1 text-xs text-primary">
                            #{tag}
                        </li>
                    ))}
                </ul>
            )}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-main-50">
                <div className="flex items-center gap-5">
                    <span>{t("profile.client.proposals", { count: project.proposals })}</span>
                    <span className="flex items-center gap-1.5">
                        <IconEye size={16} className="text-primary" />
                        {project.views.toLocaleString("en-US")}
                    </span>
                </div>
                <time dateTime={project.createdAt}>{formatDate(project.createdAt)}</time>
            </div>
        </article>
    );
}

interface SectionProps {
    data?: ClientProjectsPage;
    page: number;
    onPageChange: (page: number) => void;
}

export function ActiveProjectsSection({ data, page, onPageChange }: SectionProps) {
    const { t } = useTranslation("common");
    return (
        <section className="flex flex-col gap-6">
            <h2 className="text-25 font-bold">{t("profile.client.activeTitle")}</h2>
            {data && data.data.length > 0 ? (
                <>
                    <div className="flex flex-col gap-3">
                        {data.data.map((project) => (
                            <ActiveProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                    <Pagination page={page} pageCount={data.totalPages} onPageChange={onPageChange} />
                </>
            ) : (
                <p className="rounded-3xl bg-main-5 px-6 py-3 text-sm text-main-50">{t("profile.client.noActive")}</p>
            )}
        </section>
    );
}

export function CompletedProjectsSection({ data, page, onPageChange }: SectionProps) {
    const { t } = useTranslation("common");
    return (
        <section className="flex flex-col gap-6">
            <h2 className="text-25 font-bold">{t("profile.client.completedTitle")}</h2>
            {data && data.data.length > 0 ? (
                <>
                    <ul className="flex flex-col">
                        {data.data.map((project) => (
                            <li
                                key={project.id}
                                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 border-b border-main-10 py-4 text-sm last:border-b-0 sm:grid-cols-[minmax(0,1fr)_110px_110px_130px]"
                            >
                                <span className="min-w-0 break-words">{project.title}</span>
                                <span className="w-fit rounded-full border border-main-10 px-3 py-0.5 text-xs text-main-50 sm:justify-self-center">
                                    {t("profile.client.statusCompleted")}
                                </span>
                                <Price value={project.price} />
                                <span className="truncate text-main-50 sm:text-right">{project.categories[0]?.title ?? ""}</span>
                            </li>
                        ))}
                    </ul>
                    <Pagination page={page} pageCount={data.totalPages} onPageChange={onPageChange} />
                </>
            ) : (
                <p className="rounded-3xl bg-main-5 px-6 py-3 text-sm text-main-50">{t("profile.client.noCompleted")}</p>
            )}
        </section>
    );
}
