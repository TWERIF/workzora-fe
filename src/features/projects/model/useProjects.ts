import { useMutation, useQuery } from "@tanstack/react-query";
import {
  count,
  create,
  deleteProject,
  findAllProjects,
  getMyProjects,
  getOne,
  getTopProjects,
  searchProjects,
  toAwaitingPayment,
  toCompleted,
  update,
} from "./api";
import {
  FindProjectsParams,
  Project,
  ProjectStatus,
  type CreateProjectDto,
} from "./types";

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
  countProjects: () => ["countProjects"],
  allProjects: (params: FindProjectsParams) => ["all-projects", params],
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

  const toCompletedMutation = useMutation({
    mutationFn: (data: { id: string }) => toCompleted(data),
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
    toCompletedMutation
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
export const useCountProjects = () => {
  return useQuery({
    queryFn: () => count(),
    queryKey: projectKeys.countProjects(),
  });
};

/**
 * Drives the "Find Work" / "All projects" page: search text, multi-category
 * filter, tags filter and a budget range, all sent as query params to the
 * backend (see api.ts findAllProjects for the exact contract).
 */
export const useAllProjects = (params: FindProjectsParams) => {
  return useQuery({
    queryFn: () => findAllProjects(params),
    queryKey: projectKeys.allProjects(params),
    placeholderData: (previousData) => previousData,
  });
};