import { $api } from "@/shared/components/http";
import { UserCreate } from "./types";
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
    userName,
    locale,
    isActive,
  });

  return res.data;
};
export const verify = async () => {
  const res = await $api.get("/auth/verify");
  return res.data;
};
