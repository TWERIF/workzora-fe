import { ClientProjectsPage, PublicProfile, User, UserRelation } from "@/features/auth/model/types";
import { $api } from "@/shared/components/http";

export const findOne = async (id: string): Promise<PublicProfile> => {
  const res = await $api.get<PublicProfile>(`/users/${id}`);
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
export const removeAvatar = async () => {
  const res = await $api.delete<{ success: boolean }>("/users/avatar");
  return res.data;
};

export const getRelation = async (id: string) => {
  const res = await $api.get<UserRelation>(`/users/${id}/relation`);
  return res.data;
};

export const blockUser = async (id: string) => {
  const res = await $api.post<{ blocked: boolean }>(`/users/${id}/block`);
  return res.data;
};

export const unblockUser = async (id: string) => {
  const res = await $api.delete<{ blocked: boolean }>(`/users/${id}/block`);
  return res.data;
};

export const getClientProjects = async (id: string, status: "active" | "completed", page: number, limit: number) => {
  const res = await $api.get<ClientProjectsPage>(`/users/${id}/projects`, { params: { status, page, limit } });
  return res.data;
};

export interface BlockedUser {
  blockedAt: string;
  user: { id: string; firstName: string; lastName: string; avatarUrl: string | null; role: string };
}

export const getBlockedUsers = async () => {
  const res = await $api.get<BlockedUser[]>("/users/blocked");
  return res.data;
};
