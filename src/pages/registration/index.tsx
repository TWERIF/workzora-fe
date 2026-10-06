import GuestRoute from "@/features/auth/model/guestRoute";
import RegistrationForm from "@/features/auth/ui/RegistrationForm";
import PageMeta from "@/shared/components/seo/PageMeta";

export default function RegistrationPage() {
    return (
        <GuestRoute>
            <PageMeta page="registration" noindex />
            <RegistrationForm />
        </GuestRoute>
    );
}
