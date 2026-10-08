import PasswordRecovery from "@/features/auth/ui/PasswordRecovery";
import PageMeta from "@/shared/components/seo/PageMeta";

export default function ForgotPasswordPage() {
    return (
        <>
            <PageMeta page="forgotPassword" noindex />
            <PasswordRecovery />
        </>
    );
}
