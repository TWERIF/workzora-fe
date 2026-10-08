import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../model/useAuth";

interface GoogleCredentialResponse {
    credential: string;
}

interface GoogleIdentity {
    accounts: {
        id: {
            initialize: (options: { client_id: string; callback: (response: GoogleCredentialResponse) => void }) => void;
            renderButton: (element: HTMLElement, options: Record<string, string | number>) => void;
        };
    };
}

declare global {
    interface Window {
        google?: GoogleIdentity;
    }
}

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export const isGoogleSignInEnabled = Boolean(CLIENT_ID);

export default function GoogleSignIn({ onSuccess }: { onSuccess: () => void }) {
    const { t, i18n } = useTranslation("auth");
    const { loginWithGoogle } = useAuth();
    const container = useRef<HTMLDivElement>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!CLIENT_ID || !container.current) return;
        let cancelled = false;

        const render = () => {
            const google = window.google;
            if (cancelled || !google || !container.current) return false;
            google.accounts.id.initialize({
                client_id: CLIENT_ID,
                callback: ({ credential }) => {
                    setError(false);
                    loginWithGoogle(credential).then(onSuccess, () => setError(true));
                },
            });
            google.accounts.id.renderButton(container.current, {
                theme: "outline",
                size: "large",
                shape: "pill",
                text: "continue_with",
                locale: i18n.language,
                width: container.current.offsetWidth,
            });
            return true;
        };

        if (render()) return;
        const timer = window.setInterval(() => render() && window.clearInterval(timer), 300);
        return () => {
            cancelled = true;
            window.clearInterval(timer);
        };
    }, [i18n.language, loginWithGoogle, onSuccess]);

    if (!CLIENT_ID) return null;

    return (
        <div className="flex flex-col items-center gap-2">
            <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />
            <div ref={container} className="flex h-[45px] w-full justify-center" aria-label={t("social.google")} />
            {error && <span className="text-xs text-status-danger">{t("social.failed")}</span>}
        </div>
    );
}
