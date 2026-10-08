import ProtectedRoute from "@/features/auth/model/protectedRoute";
import ChatsHub from "@/features/chat/ui/hub/ChatsHub";
import PageMeta from "@/shared/components/seo/PageMeta";

export default function ChatsPage() {
    return (
        <ProtectedRoute>
            <PageMeta page="chats" noindex />
            <ChatsHub />
        </ProtectedRoute>
    );
}
