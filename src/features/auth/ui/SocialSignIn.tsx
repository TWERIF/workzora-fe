import { useTranslation } from "react-i18next";
import GoogleSignIn, { isGoogleSignInEnabled } from "./GoogleSignIn";

export default function SocialSignIn({ onSuccess }: { onSuccess: () => void }) {
    const { t } = useTranslation("auth");
    if (!isGoogleSignInEnabled) return null;

    return (
        <div className="mt-[30px] flex flex-col gap-3">
            <div className="flex items-center gap-4 text-xs text-main-50">
                <span className="h-px flex-1 bg-main-10" />
                {t("social.divider")}
                <span className="h-px flex-1 bg-main-10" />
            </div>
            <GoogleSignIn onSuccess={onSuccess} />
        </div>
    );
}
