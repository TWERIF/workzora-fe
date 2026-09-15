import { Project, ProjectStatus } from "../model/types";

/**
 * Same routing rule that was already live on the page:
 * OPEN / CLOSED projects go to the "activeProjects" discussion view,
 * everything else goes to the plain chat view.
 * Kept as a pure helper so the design refactor doesn't touch behavior.
 */
export function getProjectChatHref(locale: string, project: Project): string {
  return project.status === ProjectStatus.CLOSED || project.status === ProjectStatus.OPEN
    ? `/${locale}/activeProjects/discussion/${project.id}`
    : `/${locale}/chats/${project.id}`;
}