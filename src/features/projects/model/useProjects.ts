import { useMutation, useQuery } from "@tanstack/react-query";
import {
  create,
  deleteProject,
  getMyProjects,
  getOne,
  getTopProjects,
  searchProjects,
  toAwaitingPayment,
  update,
} from "./api";
import { Project, ProjectStatus, type CreateProjectDto } from "./types";

export const projectKeys = {
  topProjects: ["topProjects"],
  one: (id: string) => ["project", id],
  categoriesSearch: (
    search: string,
    page: number,
    limit: number,
  ) => ["categories-search", search, page, limit],
  search: (searchTerm: string) => ["projects-search", searchTerm],
  myProjects: (status: string, page: number, limit: number) =>
    ["my-projects", status, page, limit],
};

export const useProjects = (id?: string) => {
  const createMutation = useMutation({
    mutationFn: (body: CreateProjectDto) => create(body),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string;
      body: Partial<Project>;
    }) => update(id, body),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProject(id),
  });

  const toAwaitingPaymentMutation = useMutation({
    mutationFn: (data: { id: string; freelancerId: string }) => toAwaitingPayment(data),
  });

  const { data: topProjects } = useQuery({
    queryFn: getTopProjects,
    queryKey: projectKeys.topProjects,
  });

  const { data: project, isLoading: isLoadingProjectData } = useQuery({
    queryFn: () => getOne(id!),
    enabled: !!id,
    queryKey: projectKeys.one(id!),
  });

  return {
    topProjects,
    project,
    isLoadingProjectData,

    createMutation,
    updateMutation,
    deleteMutation,
    toAwaitingPaymentMutation,
  };
};

export const useMyProjects = (status: string = ProjectStatus.OPEN, page: number = 1, limit: number = 10) => {
  return useQuery({
    queryFn: () => getMyProjects({ status, page, limit }),
    queryKey: projectKeys.myProjects(status, page, limit),
    enabled: !!status,
  });
};

export const useSearchProjects = (searchTerm: string) => {
  return useQuery({
    queryFn: () => searchProjects(searchTerm),
    queryKey: projectKeys.search(searchTerm),
    enabled: !!searchTerm.trim(),
  });
};