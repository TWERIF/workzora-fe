"use client";

import { useAuth } from "@/features/auth/model/useAuth";
import Chat from "@/features/chat/ui/Chat";
import { useProjects } from "@/features/projects/model/useProjects";
import Loader from "@/shared/components/ui/Loader";
import { useRouter } from "next/router";

export default function SingleChatPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!router.isReady) {
    return null;
  }

  const { user, isLoading } = useAuth();
  const { project, isLoadingProjectData } = useProjects(id as string);

  if (isLoading || isLoadingProjectData) return <Loader />;
  if (!project || !user) return <div className="p-8">Дані не знайдено</div>;

  const receiverId =
    user.id === project.clientId ? project.freelancerId : project.clientId;

  return (
    <div className="animate-fade-in w-full">
      <Chat project={project} receiverId={receiverId} />
    </div>
  );
}
