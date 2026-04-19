import { User } from "@/features/auth/model/types";
import { $api } from "@/shared/components/http";

export const update = async (body: Partial<User>): Promise<User> => {
  const res = await $api.put("/users/update", body);
  return res.data;
};
