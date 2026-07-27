"use client";
import { useAuth } from "@/features/auth/model/useAuth";
import ProjectCard from "@/features/chat/ui/ProjectCard";
import { ProjectStatus } from "@/features/projects/model/types";
import { useMyProjects } from "@/features/projects/model/useProjects";
import Loader from "@/shared/components/ui/Loader";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ITEMS_PER_PAGE = 10;

export default function ChatsPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();
  const locale = router.locale || "en";
  const { t } = useTranslation("common");

  const [currentPage, setCurrentPage] = useState(1);
  const [currentStatus, setCurrentStatus] = useState<ProjectStatus>(ProjectStatus.OPEN);

  const { data, isLoading: isLoadingProjects } = useMyProjects(
    currentStatus,
    currentPage,
    ITEMS_PER_PAGE
  );

  const projects = data?.items || [];
  const totalPages = data?.meta?.totalPages || 1;

  if (isAuthLoading) {
    return <Loader />;
  }

  if (!user) {
    return (
      <div className="flex h-[100dvh] items-center justify-center text-text-muted">
        Авторизація...
      </div>
    );
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleStatusChange = (status: ProjectStatus) => {
    setCurrentStatus(status);
    setCurrentPage(1);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto h-[100dvh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] bg-bg dark:bg-bg-dark">
      <h1 className="text-3xl font-bold mb-6 text-text dark:text-text-dark">
        {t("projects.myProjects")}
      </h1>

      <div className="flex gap-3 overflow-x-auto pb-4 mb-6 [&::-webkit-scrollbar]:hidden">
        {Object.values(ProjectStatus).map((status) => {
          const isActive = currentStatus === status;
          return (
            <button
              key={status}
              onClick={() => handleStatusChange(status)}
              className={`
                px-5 py-2 rounded-20 text-sm font-medium whitespace-nowrap transition-all
                ${isActive
                  ? "bg-gradient text-white shadow-input dark:shadow-input-dark border-transparent"
                  : "bg-input dark:bg-input-dark text-text dark:text-text-dark border border-border hover:bg-gray-50 dark:hover:bg-modalDark"
                }
              `}
            >
              {t(`status.${status}`, status.replace("_", " ").toUpperCase())}
            </button>
          );
        })}
      </div>

      {isLoadingProjects ? (
        <div className="flex justify-center py-10">
          <Loader />
        </div>
      ) : projects.length === 0 ? (
        <div className="text-text-muted text-center p-12 bg-input dark:bg-modalDark rounded-20 shadow-sm">
          {t("chats.empty")}
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {projects.map((project: any) => (
              <Link
                key={project.id}
                href={project.status === ProjectStatus.CLOSED || project.status === ProjectStatus.OPEN ? `/${locale}/activeProjects/discussion/${project.id}` : `/${locale}/chats/${project.id}`}
              >
                <ProjectCard project={project} currentUserId={user.id} />
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-6 mt-8 pb-8">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-5 py-2 text-sm font-medium rounded-20 bg-input dark:bg-input-dark text-text dark:text-text-dark border border-border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-modalDark transition-all"
              >
                {t("chats.pagination.prev")}
              </button>

              <span className="text-sm font-semibold text-text-muted">
                {currentPage} {t("chats.pagination.of")} {totalPages}
              </span>

              <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages}
                className="px-5 py-2 text-sm font-medium rounded-20 bg-input dark:bg-input-dark text-text dark:text-text-dark border border-border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-modalDark transition-all"
              >
                {t("chats.pagination.next")}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}