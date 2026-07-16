import { User } from "@/features/auth/model/types";

export interface PortfolioItem {
    id: string;
    userId: string;
    title: string;
    description: string;
    imageUrl: string;
    user?: User;
}

export interface CreatePortfolio {
    userId: string;
    title: string;
    description: string;
}

export interface UpdatePortfolio extends CreatePortfolio {
    id: string;
}