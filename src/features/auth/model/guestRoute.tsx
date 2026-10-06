import { useEffect, type ReactNode } from "react";
import { useAuth } from "./useAuth";
import { useAuthRedirect } from "./useAuthRedirect";

export default function GuestRoute({ children }: { children: ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth();
    const { redirectAfterAuth } = useAuthRedirect();

    useEffect(() => {
        if (!isLoading && isAuthenticated) redirectAfterAuth();
    }, [isLoading, isAuthenticated, redirectAfterAuth]);

    return <>{children}</>;
}
