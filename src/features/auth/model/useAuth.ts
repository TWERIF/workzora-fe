import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { login, register, verify, logout } from "./api"; // Додай logout в api.ts
import { User } from "./types";
import { useRouter } from "next/navigation"; // Якщо використовуєш App Router

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
        // Оскільки бекенд повертає { isValid: true, user: payload }
        return response.user as User;
      } catch (error) {
        // Якщо токен невалідний, повертаємо null, щоб react-query не вважав це помилкою запиту
        return null;
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 хвилин
    refetchOnWindowFocus: true,
  });

  // 2. Логін
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onSuccess: (data) => {
      // Оновлюємо кеш 'me' даними, які повернув логін (заощаджуємо на запиті verify)
      queryClient.setQueryData(authKeys.me, data.user);
      router.push("/profile");
    },
  });

  // 3. Реєстрація
  const registerMutation = useMutation({
    mutationFn: (userData: RegisterData) => register(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.me });
      router.push("/auth/login"); // Або відразу в кабінет
    },
  });

  // 4. Вихід (Logout)
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Повністю очищаємо кеш і ресетуємо стан
      queryClient.setQueryData(authKeys.me, null);
      queryClient.clear();
      router.push("/auth/login");
    },
  });

  return {
    // Дані
    user,
    isAuthenticated: !!user,

    // Функції
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    refetchMe: refetch,

    // Статуси
    isLoading: isUserLoading || isFetching,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,

    // Помилки
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
};
