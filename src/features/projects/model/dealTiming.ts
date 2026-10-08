import { type Project, ProjectStatus } from "./types";

const DAY_MS = 24 * 60 * 60 * 1000;

export interface DealTiming {
    deadline: Date | null;
    daysLeft: number | null;
    days: number;
    isFinished: boolean;
    isAwaitingPayment: boolean;
}

export const dealTiming = (project: Pick<Project, "time" | "startedAt" | "status" | "completedAt">): DealTiming => {
    const days = Number(project.time) || 0;
    const deadline = project.startedAt && days ? new Date(new Date(project.startedAt).getTime() + days * DAY_MS) : null;
    return {
        deadline,
        daysLeft: deadline ? Math.ceil((deadline.getTime() - Date.now()) / DAY_MS) : null,
        days,
        isFinished: project.status === ProjectStatus.COMPLETED || project.status === ProjectStatus.CLOSED,
        isAwaitingPayment: project.status === ProjectStatus.AWAITING_PAYMENT,
    };
};
