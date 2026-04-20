import { $api } from "@/shared/components/http";

export const getTopProjects = async () => {
  const res = await $api.get("/projects/topProjects");
  return res.data;
};
export const update = async () => {
  const res = await $api.get("/projects/topProjects");
  return res.data;
};
