import { useProjects, useSearchProjects } from "@/features/projects/model/useProjects";
import ProjectCard from "@/shared/components/ui/Card/ProjectCard";
import { Search } from "@/shared/components/ui/Search/ui/Search";
import { useState } from "react";
import { CategoriesProps } from "../model/types";

export default function ProjectsList(props: CategoriesProps) {
    const { t } = props;
    const [query, setQuery] = useState<string>("");

    const { topProjects } = useProjects();

    const { data: searchResults, isLoading: isLoadingSearch } = useSearchProjects(query);

    const onChange = (q: string) => {
        setQuery(q);
    };

    const onClick = () => {
    };

    const isSearching = query.trim().length > 0;

    const projectsData = isSearching ? searchResults : topProjects;

    const projectsList = Array.isArray(projectsData) ? projectsData : projectsData?.items;

    return (
        <div className="w-full">
            <Search
                t={t}
                query={query}
                placeholder={t("projects.search")}
                onChange={onChange}
                onClick={onClick}
            />

            {isSearching && isLoadingSearch ? (
                <div className="w-full text-center py-12 text-gray-500">
                    {t("common.loading", "Завантаження...")}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-8 py-12">
                    {projectsList && projectsList.length > 0 ? (
                        projectsList.map((project: any) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                            />
                        ))
                    ) : (
                        <div className="w-full text-center text-gray-500 col-span-full">
                            {isSearching ? t("projects.notFound", "Нічого не знайдено") : t("projects.noTopProjects", "Немає топ проектів")}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}