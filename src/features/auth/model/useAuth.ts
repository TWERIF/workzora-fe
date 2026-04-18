import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { login, register, verify, logout } from "./api";
import { User, UserCreate } from "./types";
import { useRouter } from "next/navigation";

export const authKeys = {
  me: ["me"] as const,
};

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends LoginCredentials {
  firstName: string;
  lastName: string;
}

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // 1. Отримання поточного користувача
  const {
    data: user,
    isLoading: isUserLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: authKeys.me,
    queryFn: async () => {
      try {
        const response = await verify();
        return response.user as User;
      } catch (error) {
        return null;
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });

  // 2. Логін
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onSuccess: (data) => {
      // Бекенд повернув { success: true, user: ... }, токени вже в куках
      queryClient.setQueryData(authKeys.me, data.user);
      router.push("/profile");
    },
  });

  // 3. Реєстрація
  const registerMutation = useMutation({
    // Використовуємо UserCreate замість RegisterData
    mutationFn: (userData: UserCreate) => register(userData),
    onSuccess: async () => {
      // Бекенд вже поставив куки, тому просто перезапитуємо дані юзера
      await refetch(); // Переконайся, що викликаєш правильну функцію з useQuery або refetch
      // Редирект зробимо на самій сторінці (в index.tsx)
    },
  });

  // 4. Вихід (Logout)
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(authKeys.me, null);
      queryClient.clear();
      router.push("/auth/login");
    },
  });

  return {
    user,
    isAuthenticated: !!user,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync, // Експортуємо функцію реєстрації
    logout: logoutMutation.mutateAsync,
    refetchMe: refetch,
    isLoading: isUserLoading || isFetching,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
};