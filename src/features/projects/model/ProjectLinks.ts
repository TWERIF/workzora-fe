import { Project, ProjectStatus } from "../model/types";

export function getProjectChatHref(project: Project): string {
  return project.status === ProjectStatus.CLOSED || project.status === ProjectStatus.OPEN
    ? `/activeProjects/discussion/${project.id}`
    : `/chats/${project.id}`;
}