import { User } from "@/features/auth/model/types";
import { $api } from "@/shared/components/http";

export const getTopFreelancers = async (): Promise<User[]> => {
  const res = await $api.get("/users/topFreelancers");
  return res.data;
};
export const getTopClients = async (): Promise<User[]> => {
  const res = await $api.get("/users/topClients");
  return res.data;
};
