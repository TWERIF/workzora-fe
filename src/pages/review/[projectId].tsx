"use client";

import { useAuth } from "@/features/auth/model/useAuth";
import { ProjectStatus } from "@/features/projects/model/types";
import { useProjects } from "@/features/projects/model/useProjects";
import { useMyProjectReview } from "@/features/reviews/model/useReviews";
import { ReviewForm } from "@/features/reviews/ui/ReviewForm";
import { ReviewTips } from "@/features/reviews/ui/ReviewTips";
import ButtonGradient from "@/shared/components/ui/Button/ButtonGradient";
import Loader from "@/shared/components/ui/Loader";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const REVIEWABLE_STATUSES = [ProjectStatus.COMPLETED, ProjectStatus.CLOSED];

export default function LeaveReviewPage() {
    const router = useRouter();
    const { t } = useTranslation("review");
    const locale = router.locale || "en";
    const projectId = router.isReady ? (router.query.projectId as string | undefined) : undefined;

    const { user, isLoading: isUserLoading } = useAuth();
    const { project, isLoadingProjectData } = useProjects(projectId);
    const { data: myReview, isLoading: isReviewLoading } = useMyProjectReview(projectId, Boolean(user));

    if (!router.isReady || isUserLoading || isLoadingProjectData || isReviewLoading) return <Loader />;

    const clientId = project?.client?.id;
    const isClient = !!user && user.id === clientId;
    const isFreelancer = !!user && !!project?.freelancerId && user.id === project.freelancerId;
    const targetId = isClient ? project?.freelancerId : clientId;

    const chatHref = `/${locale}/chats/${projectId}`;
    const goToChat = () => router.push(chatHref);

    let notice: string | null = null;
    if (!project) notice = t("notices.notFound");
    else if (!isClient && !isFreelancer) notice = t("notices.notParticipant");
    else if (!REVIEWABLE_STATUSES.includes(project.status)) notice = t("notices.notCompleted");
    else if (myReview) notice = t("notices.alreadyReviewed");

    return (
        <div className="min-h-screen bg-bg-header px-4 pb-24 pt-32 dark:bg-bg-dark sm:px-8 lg:pt-40">
            <div className="mx-auto flex max-w-[1358px] flex-col gap-[30px] lg:flex-row lg:items-start">
                <div className="flex min-w-0 flex-1 flex-col gap-6">
                    <header className="flex flex-col gap-3 text-text dark:text-text-dark">
                        <h1 className="text-25 font-bold">{t("title")}</h1>
                        <p className="text-sm">{t("subtitle")}</p>
                        {project && <p className="text-sm text-text-light dark:text-text-muted">{project.title}</p>}
                    </header>

                    {notice ? (
                        <div className="flex flex-col items-start gap-4 rounded-3xl bg-surface p-6 dark:bg-bg-modalDark">
                            <p className="text-text dark:text-text-dark">{notice}</p>
                            <div className="flex flex-wrap gap-3">
                                {project && (isClient || isFreelancer) && (
                                    <ButtonGradient
                                        text={t("actions.backToChat")}
                                        onClick={goToChat}
                                        filled={false}
                                        className="!rounded-[100px] !px-6 !py-3"
                                    />
                                )}
                                {myReview && targetId && (
                                    <ButtonGradient
                                        text={t("actions.openProfile")}
                                        onClick={() => router.push(`/${locale}/public-profile/${targetId}`)}
                                        className="!rounded-[100px] !px-6 !py-3"
                                    />
                                )}
                            </div>
                        </div>
                    ) : (
                        <ReviewForm
                            projectId={project!.id}
                            reviewing={isClient ? "freelancer" : "client"}
                            onCancel={goToChat}
                            onSuccess={() => {
                                toast.success(t("success"));
                                router.push(`/${locale}/public-profile/${targetId}`);
                            }}
                        />
                    )}
                </div>

                <div className="lg:sticky lg:top-32">
                    <ReviewTips />
                </div>
            </div>
        </div>
    );
}
