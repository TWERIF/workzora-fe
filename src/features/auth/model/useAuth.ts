import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login, loginWithGoogle, logout, register, verify } from "./api";
import { LoginCredentials, UserCreate } from "./types";

export const authKeys = {
  me: ["me"] as const,
  countUsers: () => ["countUsers"] as const,
  findUser: (id: string) => ["user", id] as const,
};

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
    queryFn: () => verify().catch(() => null),
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onSuccess: () => refetch(),
  });

  const googleLoginMutation = useMutation({
    mutationFn: loginWithGoogle,
    onSuccess: () => refetch(),
  });

  const registerMutation = useMutation({
    mutationFn: (userData: UserCreate) => register(userData),
    onSuccess: () => refetch(),
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
    loginWithGoogle: googleLoginMutation.mutateAsync,
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
