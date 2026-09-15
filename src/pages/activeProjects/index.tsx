"use client";

import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useAuth } from "@/features/auth/model/useAuth";

import { ProjectStatus, type Project } from "@/features/projects/model/types";
import { useMyProjects } from "@/features/projects/model/useProjects";
import ProjectListItem from "@/features/projects/ui/ProjectListItem";
import ProjectSearchBar from "@/features/projects/ui/ProjectSearchBar";

import { getProjectChatHref } from "@/features/projects/model/ProjectLinks";
import ProjectsPagination from "@/features/projects/ui/ProjectPagination";
import ProjectStatusTabs from "@/features/projects/ui/ProjectStatusTabs";
import Breadcrumbs from "@/shared/components/ui/BreadCrumbs";
import Loader from "@/shared/components/ui/Loader";
import UserNavigation from "@/shared/components/ui/UserNavigation";

const ITEMS_PER_PAGE = 10;

export default function ChatsPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();
  const locale = router.locale || "en";
  const { t } = useTranslation("additions");

  const [currentPage, setCurrentPage] = useState(1);
  const [currentStatus, setCurrentStatus] = useState<ProjectStatus>(ProjectStatus.OPEN);
  const [searchResults, setSearchResults] = useState<Project[] | null>(null);

  const { data, isLoading: isLoadingProjects } = useMyProjects(
    currentStatus,
    currentPage,
    ITEMS_PER_PAGE,
  );

  if (isAuthLoading) {
    return <Loader />;
  }

  if (!user) {
    return (
      <div className="flex h-[100dvh] items-center justify-center text-text-muted">
        {t("auth.loading", "Авторизація...")}
      </div>
    );
  }

  const isSearching = searchResults !== null;
  const projects = isSearching ? searchResults : data?.items || [];
  const totalPages = isSearching ? 1 : data?.meta?.totalPages || 1;

  const handleStatusChange = (status: ProjectStatus) => {
    setCurrentStatus(status);
    setCurrentPage(1);
    setSearchResults(null);
  };

  return (
    <div className="min-h-[100dvh] bg-bg dark:bg-bg-dark">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-8">
        <Breadcrumbs />

        <h1 className="mb-6 text-3xl font-bold text-text dark:text-text-dark">
          {t("chats.title", "Chat")}
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <ProjectSearchBar onResults={setSearchResults} />

            {!isSearching && (
              <ProjectStatusTabs currentStatus={currentStatus} onChange={handleStatusChange} />
            )}

            {isLoadingProjects && !isSearching ? (
              <div className="flex justify-center py-10">
                <Loader />
              </div>
            ) : projects.length === 0 ? (
              <div className="rounded-20 bg-input p-12 text-center text-text-muted shadow-sm dark:bg-input-dark">
                {t("chats.empty")}
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-4">
                  {projects.map((project: Project) => (
                    <ProjectListItem
                      key={project.id}
                      project={project}
                      chatHref={getProjectChatHref(locale, project)}
                    />
                  ))}
                </div>

                {!isSearching && (
                  <ProjectsPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
          </div>

          <aside>
            <UserNavigation activeHref="/chat" />
          </aside>
        </div>
      </div>
    </div>
  );
}
