import { $api } from "@/shared/components/http";
import { User, UserCreate } from "./types";
export const login = async ({
  password,
  email,
}: {
  password: string;
  email: string;
}) => {
  const res = await $api.post("/auth/login", { password, email });
  return res.data;
};
export const logout = async () => {
  const res = await $api.post("/auth/logout");
  return res.data;
};
export const register = async ({
  firstName,
  lastName,
  password,
  email,
  userName,
  locale,
  isActive,
}: UserCreate) => {
  const res = await $api.post("/auth/register", {
    firstName,
    lastName,
    password,
    email,
    username: userName,
    locale,
  });

  return res.data;
};
export const verify = async (): Promise<User> => {
  const res = await $api.get("/auth/verify");
  return res.data;
};

export const confirmEmail = async (email: string) => {
  const res = await $api.post<{ success: boolean }>("/auth/confirm-email", { email });
  return res.data;
};

export const verifyEmailCode = async ({ email, code }: { email: string; code: number }) => {
  const res = await $api.post<{ success: boolean }>("/auth/verify-email", { email, code });
  return res.data;
};

export const requestPasswordReset = async ({ email, locale }: { email: string; locale?: string }) => {
  const res = await $api.post<{ success: boolean }>("/auth/forgot-password", { email, locale });
  return res.data;
};

export const resetPassword = async (data: { email: string; code: string; password: string }) => {
  const res = await $api.post<{ success: boolean }>("/auth/reset-password", data);
  return res.data;
};
