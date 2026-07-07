import { User } from "@/features/auth/model/types";
import { authKeys } from "@/features/auth/model/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { count, update } from "./api";

export const useUsers = () => {
  const updateMutaion = useMutation({
    mutationFn: (body: Partial<User>) => update(body),
    mutationKey: authKeys.me,
  });

  return { updateMutaion };
};
export const useCountUsers = () => {
  return useQuery({
    queryFn: () => count(),
    queryKey: authKeys.countUsers(),
  });
};