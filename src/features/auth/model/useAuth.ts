import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login, logout, register, verify } from "./api";
import { UserCreate } from "./types";

export const authKeys = {
  me: ["me"] as const,
  countUsers: () => ["countUsers"] as const,
  findUser: (id: string) => ["user", id] as const,
};

interface LoginCredentials {
  email: string;
  password: string;
}

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: user,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: authKeys.me,
    queryFn: async () => {
      try {
        const response = await verify();
        return response;
      } catch (error) {
        return null;
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onSuccess: async () => {
      await refetch();
      router.push("/profile");
    },
  });

  const registerMutation = useMutation({
    mutationFn: (userData: UserCreate) => register(userData),
    onSuccess: async () => {
      await refetch(); 
      router.push("/profile");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(authKeys.me, null);
      queryClient.clear();
      router.push("/");
    },
  });

  return {
    user,
    isAuthenticated: !!user,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    refetchMe: refetch,
    isLoading,
    isFetching,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
};
