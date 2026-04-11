import { $api } from "@/components/http";

export const registration = async (body) => {
  const res = await $api.post("/auth/register", body);
  return res.data;
};
export const login = async (body) => {
  const res = await $api.post("/auth/login", body);
  return res.data;
};
