import { User } from "@/features/auth/model/types";

export interface Bid {
    id: string;
    projectId?: string;
    description?: string;
    price?: number;
    time?: number;
    userId: string;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateBidDto {
    projectId?: string;
    description?: string;
    price?: number;
    time?: number;
}

export type UpdateBidDto = Partial<CreateBidDto>;