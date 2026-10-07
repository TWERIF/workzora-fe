import type { Availability, BudgetRange, ProjectType, RateType, WorkFormat } from "@/features/auth/model/types";

export interface SettingsFormValues {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    skills: string[];
    specializations: string[];
    rate: number;
    rateType: RateType;
    rateNote: string;
    availability: Availability;
    projectType: ProjectType | "";
    budgetRange: BudgetRange | "";
    workFormat: WorkFormat | "";
}
