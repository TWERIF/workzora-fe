import { useMutation, useQuery } from "@tanstack/react-query";
import { Project } from "next/dist/build/swc/types";
import { getTopProjects, update } from "./api";
export const projectKeys = {
  topProjects: ["topProjects"],
};
export const useProjects = () => {
  const updateMutaion = useMutation({
    mutationFn: (body: Partial<Project>) => update(),
    mutationKey: projectKeys.topProjects,
  });
  const { data: topProjects } = useQuery({
    queryFn: getTopProjects,
    queryKey: projectKeys.topProjects,
  });

  return { updateMutaion, topProjects };
};
