import { useAuth } from "@/features/auth/model/useAuth";
import { useProjectBids } from "@/features/bids/model/useBids";
import BidForm from "@/features/bids/ui/BidForm";
import { BidList } from "@/features/bids/ui/BidList";
import CategoryThumb from "@/features/categories/ui/CategoryThumb";
import { Project } from "@/features/projects/model/types";
import { projectQueries, useProjects } from "@/features/projects/model/useProjects";
import { detectContentLocale, LOCALES } from "@/shared/components/seo/site";
import Breadcrumbs, { BreadcrumbItem } from "@/shared/components/ui/BreadCrumbs";
import Can from "@/shared/components/ui/Can";
import Loader from "@/shared/components/ui/Loader";
import { ClientSidebar } from "@/shared/components/ui/Project/ProjectClientSidebar";
import { ProjectHeader } from "@/shared/components/ui/Project/ProjectHeader";
import { ProjectMeta } from "@/shared/components/ui/Project/ProjectMeta";
import { getRelativeTime, stripHtml } from "@/shared/utils";
import { createServerQueryClient, loadOrNotFound, prefetch, type PrefetchedProps } from "@/shared/utils/prefetch";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const BottomActionBar = ({
    project,
    onToggleForm,
    isFormOpen
}: {
    project: Project;
    onToggleForm: () => void;
    isFormOpen: boolean;
}) => {
    const bids = useProjectBids(project.id);
    const { t } = useTranslation("discussion");

    return (
        <div className="w-full bg-white dark:bg-bg-modalDark rounded-20 p-4 shadow-sm border border-border dark:border-gray-600 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button className="px-6 py-2.5 bg-bg dark:bg-bg-dark hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors rounded-full text-[14px] text-text-muted font-medium w-full sm:w-auto">
                {t("complain")}
            </button>

            <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-end">
                <span className="text-[14px] font-medium text-text-muted dark:text-text-dark">
                    {bids.data?.length ?? 0} {t("bids")}
                </span>
                <button className="text-success hover:opacity-80 transition-opacity">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" /></svg>
                </button>
                <button
                    onClick={onToggleForm}
                    className="px-8 py-3 bg-success hover:opacity-90 transition-opacity text-white rounded-full font-medium text-[15px]"
                >
                    {isFormOpen ? t("closeForm") : t("bidOnProject")}
                </button>
            </div>
        </div>
    );
}

const GuestBidsCard = ({ project }: { project: Project }) => {
    const { t } = useTranslation("discussion");
    const { asPath } = useRouter();
    const next = encodeURIComponent(asPath);

    return (
        <section className="mt-8 flex flex-col gap-4 rounded-20 border border-border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-bg-modalDark sm:flex-row sm:items-center sm:justify-between">
            <div>
                <p className="text-sm font-medium text-success">{t("proposals", { count: project.proposalsCount ?? 0 })}</p>
                <h2 className="mt-1 text-lg font-semibold text-text dark:text-text-dark">{t("guest.title")}</h2>
                <p className="mt-1 text-sm text-text-muted">{t("guest.text")}</p>
            </div>
            <div className="flex flex-shrink-0 gap-3">
                <Link href={`/login?next=${next}`} className="rounded-full border border-success px-6 py-2.5 text-sm font-medium text-success transition-colors hover:bg-success hover:text-white">
                    {t("guest.login")}
                </Link>
                <Link href={`/registration?next=${next}`} className="rounded-full bg-success px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90">
                    {t("guest.signup")}
                </Link>
            </div>
        </section>
    );
};

const ProjectNotFound = () => {
    const { t } = useTranslation("discussion");

    return (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
            <h1 className="text-2xl font-semibold">{t("notFound.title")}</h1>
            <p className="text-sm text-text-muted">{t("notFound.subtitle")}</p>
            <Link href="/categories" className="rounded-full bg-success px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90">
                {t("notFound.back")}
            </Link>
        </div>
    );
};

export default function Discussion() {
    const router = useRouter();
    const id = typeof router.query.id === "string" ? router.query.id : undefined;

    const [isBidFormOpen, setIsBidFormOpen] = useState(false);

    const { t } = useTranslation("common");
    const { user, isLoading: isAuthLoading } = useAuth();
    const { project, isLoadingProjectData } = useProjects(id);
    const isGuest = !isAuthLoading && !user;

    if (isLoadingProjectData) return <Loader />;

    if (!project) {
        return (
            <div className="w-full min-h-screen bg-bg dark:bg-bg-dark text-text dark:text-text-dark">
                <div className="w-[90%] max-w-[1200px] mx-auto pt-28 lg:pt-[130px]">
                    <ProjectNotFound />
                </div>
            </div>
        );
    }

    const breadcrumbs: BreadcrumbItem[] = [
        { label: t("breadcrumbs.home"), href: `/` },
        { label: t("breadcrumbs.categories"), href: `/categories` },
        { label: project.title },
    ];

    const description = stripHtml(project.description).slice(0, 160);
    const time = getRelativeTime(project.createdAt);
    const posted = `${t("projects.singleProject.posted") || "Posted"}: ${time.days ?? ""} ${time.days ? (time.days > 1 ? t("projects.singleProject.days") : t("projects.singleProject.day")) : ""
        } ${time.hours}${t("projects.singleProject.hour") || "h"} ${t("projects.singleProject.ago") || "ago"}`;

    return (
        <div className="w-full min-h-screen pb-12 bg-bg dark:bg-bg-dark text-text dark:text-text-dark transition-colors">
            <Head>
                <title key="title">{`${project.title} | Workzora`}</title>
                <meta key="description" name="description" content={description} />
                <meta key="og:title" property="og:title" content={project.title} />
                <meta key="og:description" property="og:description" content={description} />
            </Head>
            <div className="w-[90%] max-w-[1200px] mx-auto pt-28 lg:pt-[130px]">
                <Breadcrumbs customItems={breadcrumbs} />

                <div className="flex flex-col lg:flex-row gap-8 mt-6">
                    <article className="flex-1 w-full overflow-hidden">
                        <section className="w-full">
                            <ProjectHeader title={project.title} price={Number(project.price || 0)} />
                            <ProjectMeta project={project} postedText={posted} />

                            <div className="prose dark:prose-invert max-w-none text-text dark:text-text-dark text-[15px] leading-relaxed">
                                <div dangerouslySetInnerHTML={{ __html: project.description }} />
                            </div>
                        </section>

                        <section className="flex flex-wrap gap-2 mt-8">
                            {project.categories.map((item) => (
                                <CategoryThumb key={item.id} title={item.title} />
                            ))}
                        </section>

                        <Can roles={["freelancer"]}>
                            <BottomActionBar
                                project={project}
                                isFormOpen={isBidFormOpen}
                                onToggleForm={() => setIsBidFormOpen((prev) => !prev)}
                            />
                        </Can>

                        {user && (
                            <BidForm
                                projectId={project.id}
                                projectPrice={project.price}
                                isOpen={isBidFormOpen}
                                onClose={() => setIsBidFormOpen(false)}
                            />
                        )}

                        {isGuest && <GuestBidsCard project={project} />}
                    </article>

                    {project.client && <ClientSidebar client={project.client} />}
                </div>
                {user && <BidList project={project} />}
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<PrefetchedProps & { seoLocales: string[] }> = async ({ params }) => {
    const id = String(params?.id ?? "");
    const client = createServerQueryClient();
    const loaded = await loadOrNotFound(client.fetchQuery(projectQueries.one(id)));
    if (loaded.notFound) return { notFound: true };

    const project = loaded.data;
    const seoLocales = project ? [detectContentLocale(`${project.title} ${project.description}`)] : [...LOCALES];

    return { props: { ...(await prefetch(client)), seoLocales } };
};
