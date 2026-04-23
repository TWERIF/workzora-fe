import { $api } from "@/shared/components/http";

export const getTopProjects = async () => {
  const res = await $api.get("/projects/topProjects");
  return res.data;
};
export const update = async () => {
  const res = await $api.get("/projects/topProjects");
  return res.data;
};
export const getOne = async (id: string) => {
  if (!id) return;
  const res = await $api.get(`/projects/${id}`);
  return res.data;
};
