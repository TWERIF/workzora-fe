import { $api } from "@/shared/components/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { authKeys } from "./useAuth";

interface SwitchRoleResponse {
  role: "client" | "freelancer";
  roleSwitchedAt: string;
  nextSwitchAt: string;
}

const switchRole = async (): Promise<SwitchRoleResponse> => {
  const res = await $api.post<SwitchRoleResponse>("/users/switch-role");
  return res.data;
};

export const useSwitchRole = () => {
  const queryClient = useQueryClient();

  return useMutation<SwitchRoleResponse, AxiosError<{ message?: string; statusCode?: number }>>({
    mutationFn: switchRole,
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      await queryClient.refetchQueries({ queryKey: authKeys.me });
    },
  });
};
