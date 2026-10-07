import { User } from "@/features/auth/model/types";
import { authKeys } from "@/features/auth/model/useAuth";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { blockUser, count, findOne, getClientProjects, getRelation, removeAvatar, unblockUser, update, uploadAvatar } from "./api";

export const useUsers = () => {
  const queryClient = useQueryClient();

  const updateMutaion = useMutation({
    mutationFn: (body: Partial<User>) => update(body),
    mutationKey: authKeys.me,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: authKeys.me }),
  });

  const removeAvatarMutation = useMutation({
    mutationFn: removeAvatar,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: authKeys.me }),
  });

  const uploadAvatarMutation = useMutation({
    mutationFn: (file: File) => uploadAvatar(file),
    mutationKey: [...authKeys.me, "avatar"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authKeys.me,
      });
    }
  });

  return {
    updateMutaion,
    uploadAvatarMutation,
    removeAvatarMutation,
  };
};

export const useCountUsers = () => {
  return useQuery({
    queryFn: () => count(),
    queryKey: authKeys.countUsers(),
  });
};

export const useUser = (id?: string) => {
  return useQuery({
    queryKey: id ? authKeys.findUser(id) : ["user"],
    queryFn: () => findOne(id!),
    enabled: !!id,
  });
};
export const useUserRelation = (id?: string, enabled = true) => {
  const queryClient = useQueryClient();
  const key = ["user-relation", id] as const;
  const relation = useQuery({ queryKey: key, queryFn: () => getRelation(id!), enabled: Boolean(id) && enabled });
  const toggleBlock = useMutation({
    mutationFn: (block: boolean) => (block ? blockUser(id!) : unblockUser(id!)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });
  return { relation: relation.data, toggleBlock: toggleBlock.mutate, isToggling: toggleBlock.isPending };
};

export const useClientProjects = (id: string | undefined, status: "active" | "completed", page = 1, limit = 5) =>
  useQuery({
    queryKey: ["client-projects", id, status, page, limit],
    queryFn: () => getClientProjects(id!, status, page, limit),
    enabled: Boolean(id),
    placeholderData: keepPreviousData,
  });
