import type { User } from "@/features/auth/model/types";
import type { PortfolioItem } from "@/features/portfolio/model/types";

export interface FreelancerListItem extends User {
    portfolio: PortfolioItem | null;
    isVerified: boolean;
}

export interface FreelancersQuery {
    page: number;
    limit: number;
    search?: string;
    category?: string | null;
    specializations?: string[];
}

export interface FreelancersPage {
    data: FreelancerListItem[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
