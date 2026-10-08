import ProtectedRoute from "@/features/auth/model/protectedRoute";
import { useAuth } from "@/features/auth/model/useAuth";
import SecurityPage from "@/features/profile/ui/SecurityPage";
import PageMeta from "@/shared/components/seo/PageMeta";

function SecurityContent() {
    const { user } = useAuth();
    return user ? <SecurityPage user={user} /> : null;
}

export default function Security() {
    return (
        <ProtectedRoute>
            <PageMeta page="security" noindex />
            <SecurityContent />
        </ProtectedRoute>
    );
}
