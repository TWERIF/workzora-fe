import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { update } from "./api";
import { User } from "@/features/auth/model/types";
import { authKeys } from "@/features/auth/model/useAuth";

export const useUsers = () => {
  const updateMutaion = useMutation({
    mutationFn: (body: Partial<User>) => update(body),
    mutationKey: authKeys.me,
  });

  return { updateMutaion };
};
