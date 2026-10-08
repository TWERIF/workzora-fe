import { useRouter } from "next/router";
import { useEffect } from "react";
import { trackVisit } from "./api";

const STORAGE_KEY = "wz_visitor_id";

const createId = () =>
  typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;

const getVisitorId = (): string | null => {
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) return existing;
    const id = createId();
    localStorage.setItem(STORAGE_KEY, id);
    return id;
  } catch {
    return null;
  }
};

export const useVisitTracking = () => {
  const router = useRouter();

  useEffect(() => {
    const track = () => {
      const visitorId = getVisitorId();
      if (visitorId) trackVisit(visitorId).catch(() => undefined);
    };

    track();
    router.events.on("routeChangeComplete", track);
    return () => router.events.off("routeChangeComplete", track);
  }, [router.events]);
};
