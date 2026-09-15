import { $api } from "@/shared/components/http";
import {
  CreateProjectDto,
  FindProjectsParams,
  PaginatedProjects,
  Project,
} from "./types";

export const getTopProjects = async () => {
  const res = await $api.get("/projects/topProjects");
  return res.data;
};
export const update = async (id: string, body: Partial<Project>) => {
  const res = await $api.patch(`/projects/${id}`, body);
  return res.data;
};
export const create = async (body: CreateProjectDto) => {
  const res = await $api.post("/projects", body);
  return res.data;
};
export const deleteProject = async (id: string) => {
  const res = await $api.delete(`/projects/${id}`);
  return res.data;
};
export const getOne = async (id: string): Promise<Project | undefined> => {
  if (!id) return;
  const res = await $api.get(`/projects/${id}`);
  return res.data;
};
export const getMyProjects = async (params: { status: string; page?: number; limit?: number }) => {
  const res = await $api.get("/projects/my", { params });
  return res.data;
};
export const searchProjects = async (searchTerm: string): Promise<Project[]> => {
  const res = await $api.get("/projects/search", { params: { searchTerm } });
  return res.data;
};
export const toAwaitingPayment = async (data: { id: string; freelancerId: string }) => {
  const res = await $api.patch(`/projects/${data.id}/awaiting-payment`, {
    freelancerId: data.freelancerId,
  });
  return res.data;
};
export const toCompleted = async (data: { id: string; }) => {
  const res = await $api.patch(`/projects/${data.id}/completed`);
  return res.data;
};
export const count = async (): Promise<number> => {
  const res = await $api.get("/projects/count");
  return res.data;
};

/**
 * Public "Find Work" listing with search + filters.
 *
 * NOTE for backend: this currently hits GET /projects and sends
 * `categories` / `tags` as comma-separated strings (e.g. "cat1,cat2") and
 * `minPrice` / `maxPrice` as numbers. The endpoint needs to be extended to
 * parse these and filter accordingly. Until then it will simply be ignored
 * by the API and behave like an unfiltered list.
 */
export const findAllProjects = async (
  params: FindProjectsParams,
): Promise<PaginatedProjects> => {
  const { search, page = 1, limit = 10, categories, tags, minPrice, maxPrice } = params;

  const res = await $api.get("/projects", {
    params: {
      search: search || undefined,
      page,
      limit,
      categories: categories && categories.length ? categories.join(",") : undefined,
      tags: tags && tags.length ? tags.join(",") : undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
    },
  });

  return res.data;
};