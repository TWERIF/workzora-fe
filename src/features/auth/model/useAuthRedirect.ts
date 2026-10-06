import { useRouter } from "next/router";
import { useCallback } from "react";

const safeNext = (value: string | string[] | undefined) => {
    const next = Array.isArray(value) ? value[0] : value;
    return next && next.startsWith("/") && !next.startsWith("//") ? next : "/profile";
};

export const useAuthRedirect = () => {
    const router = useRouter();
    const next = safeNext(router.query.next);

    const redirectAfterAuth = useCallback(() => {
        void router.replace(next);
    }, [router, next]);

    const withNext = useCallback(
        (path: string) => (router.query.next ? `${path}?next=${encodeURIComponent(next)}` : path),
        [router.query.next, next],
    );

    return { redirectAfterAuth, withNext };
};
