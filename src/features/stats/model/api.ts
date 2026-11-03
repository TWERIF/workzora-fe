import { $api } from "@/shared/components/http";
import type { SiteStats } from "./types";

export const getSiteStats = async () => (await $api.get<SiteStats>("/stats/public")).data;
