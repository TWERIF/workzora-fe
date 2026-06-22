import { useAuth } from "@/features/auth/model/useAuth";
import BidForm from "@/features/bids/ui/BidForm";
import { BidList } from "@/features/bids/ui/BidList";
import CategoryThumb from "@/features/categories/ui/CategoryThumb";
import { Project } from "@/features/projects/model/types";
import { useProjects } from "@/features/projects/model/useProjects";
import Breadcrumbs, { BreadcrumbItem } from "@/shared/components/ui/BreadCrumbs";
import Can from "@/shared/components/ui/Can";
import Loader from "@/shared/components/ui/Loader";
import { ClientSidebar } from "@/shared/components/ui/Project/ProjectClientSidebar";
import { ProjectHeader } from "@/shared/components/ui/Project/ProjectHeader";
import { ProjectMeta } from "@/shared/components/ui/Project/ProjectMeta";
import { getRelativeTime } from "@/shared/utils";
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
}) => (
    <div className="w-full bg-white dark:bg-bg-modalDark rounded-20 p-4 shadow-sm border border-border dark:border-gray-600 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button className="px-6 py-2.5 bg-bg dark:bg-bg-dark hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors rounded-full text-[14px] text-text-muted font-medium w-full sm:w-auto">
            Complain about the project
        </button>

        <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-[14px] font-medium text-text-muted dark:text-text-dark">
                139 bids
            </span>
            <button className="text-success hover:opacity-80 transition-opacity">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" /></svg>
            </button>
            <button
                onClick={onToggleForm}
                className="px-8 py-3 bg-success hover:opacity-90 transition-opacity text-white rounded-full font-medium text-[15px]"
            >
                {isFormOpen ? "Close form" : "Bid on the project"}
            </button>
        </div>
    </div>
);

export default function Discussion() {
    const router = useRouter();
    const { id } = router.query;

    const [isBidFormOpen, setIsBidFormOpen] = useState(false);

    const locale = router.locale || "en";
    const { t } = useTranslation("common");
    const { user, isLoading } = useAuth();
    const { project, isLoadingProjectData } = useProjects(id as string);

    if (!router.isReady) {
        return null;
    }

    if (isLoadingProjectData || !project) return <Loader />;

    const breadcrumbs: BreadcrumbItem[] = [
        { label: t("breadcrumbs.home") || "Home", href: `/${locale}` },
        { label: t("breadcrumbs.activeProjects") || "Active Projects", href: `/${locale}/activeProjects` },
        { label: project.title },
    ];

    const time = getRelativeTime(project.createdAt);
    const posted = `${t("projects.singleProject.posted") || "Posted"}: ${time.days ?? ""} ${time.days ? (time.days > 1 ? t("projects.singleProject.days") : t("projects.singleProject.day")) : ""
        } ${time.hours}${t("projects.singleProject.hour") || "h"} ${t("projects.singleProject.ago") || "ago"}`;

    return (
        <div className="w-full min-h-screen pb-12 bg-bg dark:bg-bg-dark text-text dark:text-text-dark transition-colors">
            <div className="w-[90%] max-w-[1200px] mx-auto pt-6">
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

                        <BidForm
                            projectId={project.id}
                            projectPrice={project.price}
                            isOpen={isBidFormOpen}
                            onClose={() => setIsBidFormOpen(false)}
                        />
                    </article>

                    <ClientSidebar client={project.client} />
                </div>
                <BidList project={project} />
            </div>
            <article>

            </article>
        </div>
    );
}