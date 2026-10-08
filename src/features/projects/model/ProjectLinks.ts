import { Project, ProjectStatus } from "../model/types";

export function getProjectChatHref(locale: string, project: Project): string {
  return project.status === ProjectStatus.CLOSED || project.status === ProjectStatus.OPEN
    ? `/${locale}/activeProjects/discussion/${project.id}`
    : `/${locale}/chats/${project.id}`;
}