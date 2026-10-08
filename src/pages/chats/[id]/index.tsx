import ProtectedRoute from "@/features/auth/model/protectedRoute";
import ChatRoom from "@/features/chat/ui/room/ChatRoom";
import { useProjects } from "@/features/projects/model/useProjects";
import PageMeta from "@/shared/components/seo/PageMeta";
import Loader from "@/shared/components/ui/Loader";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

function ChatRoomPage() {
    const router = useRouter();
    const { t } = useTranslation("chat");
    const id = router.isReady && typeof router.query.id === "string" ? router.query.id : undefined;
    const { project, isLoadingProjectData } = useProjects(id);

    if (!id || isLoadingProjectData) return <Loader />;
    if (!project) {
        return <main className="mx-auto max-w-[1358px] px-4 pb-[100px] pt-24 text-center text-main-50 lg:pt-[171px]">{t("room.notAvailable")}</main>;
    }
    return <ChatRoom project={project} />;
}

export default function SingleChatPage() {
    return (
        <ProtectedRoute>
            <PageMeta page="chats" noindex />
            <ChatRoomPage />
        </ProtectedRoute>
    );
}
