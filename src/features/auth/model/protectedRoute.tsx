import Loader from "@/shared/components/ui/Loader";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { UserRole } from "./types";
import { useAuth } from "./useAuth";

export default function ProtectedRoute({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: UserRole;
}) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      void router.replace(`/login?next=${encodeURIComponent(router.asPath)}`);
      return;
    }

    if (role && user?.role !== role) {
      void router.replace("/");
    }
  }, [isLoading, isAuthenticated, user, role, router]);

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (role && user?.role !== role) {
    return null;
  }

  return <>{children}</>;
}