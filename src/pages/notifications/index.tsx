import ProtectedRoute from "@/features/auth/model/protectedRoute";
import NotificationsPage from "@/features/notifications/ui/NotificationsPage";
import PageMeta from "@/shared/components/seo/PageMeta";

export default function Notifications() {
    return (
        <ProtectedRoute>
            <PageMeta page="notifications" noindex />
            <NotificationsPage />
        </ProtectedRoute>
    );
}
