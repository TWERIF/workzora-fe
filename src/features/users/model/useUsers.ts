import { User } from "@/features/auth/model/types";
import { authKeys } from "@/features/auth/model/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { count, findOne, update, uploadAvatar } from "./api";

export const useUsers = () => {
  const queryClient = useQueryClient();

  const updateMutaion = useMutation({
    mutationFn: (body: Partial<User>) => update(body),
    mutationKey: authKeys.me,
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