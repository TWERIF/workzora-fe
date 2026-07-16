import { User } from "@/features/auth/model/types";

export interface Showcase {
    creator: User;
    imageUrl: string;
    workUrl: string;
}