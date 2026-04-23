import { useMutation, useQuery } from "@tanstack/react-query";
import { Project } from "next/dist/build/swc/types";
import { getOne, getTopProjects, update } from "./api";
export const projectKeys = {
  topProjects: ["topProjects"],
};
export const useProjects = (id?: string) => {
  const updateMutaion = useMutation({
    mutationFn: (body: Partial<Project>) => update(),
    mutationKey: projectKeys.topProjects,
  });
  const { data: topProjects } = useQuery({
    queryFn: getTopProjects,
    queryKey: projectKeys.topProjects,
  });
  const { data: project, isLoading: isLoadingProjectData } = useQuery({
    queryFn: () => getOne(id),
    enabled: !!id,
    queryKey: ["project", id],
  });

  return { updateMutaion, topProjects, project, isLoadingProjectData };
};
