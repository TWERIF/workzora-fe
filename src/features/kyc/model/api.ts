import { $api } from "@/shared/components/http";

export const createVerification = async (formData: FormData) => {
  const res = await $api.post("/kyc", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const getVerification = async (id: string) => {
  if (!id) return;

  const res = await $api.get(`/kyc/${id}`);
  return res.data;
};
