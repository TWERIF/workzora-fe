import { $api } from "@/shared/components/http";
import { useRouter } from "next/router";
import { useEffect } from "react";

const STORAGE_KEY = "wz_visitor_id";

// Anonymous id kept per browser so the admin stats can count unique visitors per day.
const getVisitorId = (): string | null => {
  try {
    let id = localStorage.getItem(STORAGE_KEY);
    if (!id) {
      // randomUUID exists only on https/localhost
      id = typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
      localStorage.setItem(STORAGE_KEY, id);
    }
    return id;
  } catch {
    // storage blocked (private mode etc.): skip tracking
    return null;
  }
};

const trackVisit = () => {
  const visitorId = getVisitorId();
  if (!visitorId) return;
  $api.post("/stats/visit", { visitorId }).catch(() => {});
};

export default function VisitTracker() {
  const router = useRouter();

  useEffect(() => {
    trackVisit();
    router.events.on("routeChangeComplete", trackVisit);
    return () => router.events.off("routeChangeComplete", trackVisit);
  }, [router.events]);

  return null;
}
