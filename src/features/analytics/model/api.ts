import { $api } from "@/shared/components/http";

export const trackVisit = async (visitorId: string) => {
  await $api.post("/stats/visit", { visitorId });
};
