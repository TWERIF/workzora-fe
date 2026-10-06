import GuestRoute from "@/features/auth/model/guestRoute";
import LoginForm from "@/features/auth/ui/LoginForm";
import PageMeta from "@/shared/components/seo/PageMeta";

export default function LoginPage() {
    return (
        <GuestRoute>
            <PageMeta page="login" noindex />
            <LoginForm />
        </GuestRoute>
    );
}
