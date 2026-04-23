"use client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAuth } from "@/features/auth/model/useAuth";
import { $api } from "@/shared/components/http";
import ProjectCard from "@/features/chat/ui/ProjectCard";
import Link from "next/link";
import { Project } from "@/features/projects/model/types";
import Loader from "@/shared/components/ui/Loader";
import { useTranslation } from "react-i18next";

export default function ChatsPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();
  const locale = router.locale || "en";
  const { t } = useTranslation("common");
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user) return;

      try {
        setIsLoadingProjects(true);

        // 1. Передаємо параметри пагінації на бекенд
        const res = await $api.get("/projects", {
          params: {
            page: currentPage,
            limit: ITEMS_PER_PAGE,
          },
        });

        const projectsData = res.data.data ? res.data.data : res.data;
        setProjects(Array.isArray(projectsData) ? projectsData : []);

        if (res.data.total) {
          // Якщо твій бекенд повертає поле 'total' (загальна кількість записів у БД)
          setTotalPages(Math.ceil(res.data.total / ITEMS_PER_PAGE));
        } else {
          const returnedItemsCount = Array.isArray(projectsData)
            ? projectsData.length
            : 0;
          if (returnedItemsCount === ITEMS_PER_PAGE) {
            setTotalPages(currentPage + 1);
          } else {
            setTotalPages(currentPage);
          }
        }
      } catch (error) {
        console.error("Помилка завантаження списку проєктів:", error);
      } finally {
        setIsLoadingProjects(false);
      }
    };

    fetchProjects();
  }, [user, currentPage]); // Додали currentPage, щоб запит йшов при зміні сторінки

  if (isAuthLoading || isLoadingProjects) {
    return <Loader />;
  }

  if (!user) {
    return (
      <div className="flex h-[100dvh] items-center justify-center text-gray-500">
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

  return (
    <div className="p-8 max-w-3xl mx-auto h-[100dvh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        {t("chats.title")}
      </h1>

      {projects.length === 0 && currentPage === 1 ? (
        <div className="text-gray-500 text-center p-12 bg-gray-50 dark:bg-[#333333] rounded-2xl">
          {t("chats.empty")}
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {/* Виводимо проєкти безпосередньо, адже бекенд вже віддав потрібний шматок */}
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/${locale}/activeProjects/${project.id}`}
              >
                <ProjectCard project={project} currentUserId={user?.id} />
              </Link>
            ))}
          </div>

          {/* Відображаємо пагінацію */}
          <div className="flex justify-center items-center gap-6 mt-8 pb-8">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-5 py-2 text-sm font-medium rounded-xl bg-white dark:bg-[#333333] border border-gray-200 dark:border-[#444444] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-[#444444] transition-all"
            >
              {t("chats.pagination.prev")}
            </button>

            <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
              {currentPage}{" "}
              {totalPages > currentPage
                ? `${t("chats.pagination.of")} ${totalPages}`
                : ""}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className="px-5 py-2 text-sm font-medium rounded-xl bg-white dark:bg-[#333333] border border-gray-200 dark:border-[#444444] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-[#444444] transition-all"
            >
              {t("chats.pagination.next")}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
