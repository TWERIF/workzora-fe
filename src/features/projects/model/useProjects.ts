import { retryUnlessNotFound } from "@/shared/utils/prefetch";
import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import {
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
  allProjects: (params: FindProjectsParams) => ["all-projects", params],
};

export const projectQueries = {
  one: (id: string) =>
    queryOptions({
      queryKey: projectKeys.one(id),
      queryFn: () => getOne(id),
    }),
  allProjects: (params: FindProjectsParams) =>
    queryOptions({
      queryKey: projectKeys.allProjects(params),
      queryFn: () => findAllProjects(params),
    }),
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

  const { data: project, isLoading: isLoadingProjectData, isError: isProjectError } = useQuery({
    ...projectQueries.one(id ?? ""),
    enabled: !!id,
    retry: retryUnlessNotFound,
  });

  return {
    topProjects,
    project,
    isLoadingProjectData,
    isProjectError,

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

export const useMyDeals = (page = 1, limit = 10) =>
  useQuery({
    queryFn: () => getMyProjects({ group: "deals", page, limit }),
    queryKey: [...projectKeys.myProjects("deals", page, limit)],
    placeholderData: (previous) => previous,
  });

export const useSearchProjects = (searchTerm: string) => {
  return useQuery({
    queryFn: () => searchProjects(searchTerm),
    queryKey: projectKeys.search(searchTerm),
    enabled: !!searchTerm.trim(),
  });
};

export const useAllProjects = (params: FindProjectsParams) => {
  return useQuery({
    ...projectQueries.allProjects(params),
    placeholderData: (previousData) => previousData,
  });
};