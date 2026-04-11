// src/hooks/useAuth.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { $api } from "@/components/http";
import { useRouter } from "next/router";

// 1. Функції запитів до вашого NestJS API
const fetchMe = async () => {
  const res = await $api.get("/auth/me");
  return res.data;
};

const registerApi = async (body: any) => {
  const res = await $api.post("/auth/register", body);
  return res.data; // Повертає { success: true, userId: ... }
};

const loginApi = async (body: any) => {
  const res = await $api.post("/auth/login", body);
  return res.data;
};

const logoutApi = async () => {
  const res = await $api.post("/auth/logout");
  return res.data;
};

// 2. Сам хук
export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Запит на перевірку авторизації
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchMe,
    retry: false, // Не повторюємо, якщо отримуємо 401 Unauthorized
    staleTime: 1000 * 60 * 5, // Дані валідні 5 хвилин
  });

  // Мутація реєстрації
  const registerMutation = useMutation({
    mutationFn: registerApi,
    onSuccess: async () => {
      // Оскільки register повертає лише userId, ми робимо refetch,
      // щоб отримати повний профіль користувача через /auth/me
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  // Мутація логіну
  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: async () => {
      // Аналогічно до реєстрації, оновлюємо дані користувача після логіну
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      queryClient.clear();
      router.push("/login");
    },
  });

  return {
    user,
    isAuth: !!user && !isError,
    isLoading,

    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,

    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,

    logout: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,
  };
};
