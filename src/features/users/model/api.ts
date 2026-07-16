import { User } from "@/features/auth/model/types";
import { $api } from "@/shared/components/http";

export const findOne = async (id: string): Promise<User> => {
  const res = await $api.get(`/users/${id}`);
  return res.data;
};
export const update = async (body: Partial<User>): Promise<User> => {
  const res = await $api.put("/users/update", body);
  return res.data;
};
export const count = async (): Promise<number> => {
  const res = await $api.get("/users/count");
  return res.data;
};
export const uploadAvatar = async (file: File): Promise<User> => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await $api.post("/users/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};