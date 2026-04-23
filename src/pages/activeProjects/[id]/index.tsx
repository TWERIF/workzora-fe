"use client";

import { useParams } from "next/navigation";
import { useAuth } from "@/features/auth/model/useAuth";
import { useProjects } from "@/features/projects/model/useProjects";
import Chat from "@/features/chat/ui/Chat";
import Loader from "@/shared/components/ui/Loader";

export default function SingleChatPage() {
  const params = useParams();
  console.log(params);
  const id = params.id as string; // Отримуємо ID з URL
  const { user, isLoading } = useAuth();
  // Використовуємо динамічний ID замість захардкодженого
  const { project, isLoadingProjectData } = useProjects(id);

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
