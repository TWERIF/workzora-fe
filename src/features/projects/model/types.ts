import { User } from "@/features/auth/model/types";

export interface Category {
  id: string;
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  categories: Category[];
  price: number;
  clientId: string;
  client: User;
  freelancerId: string;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  status: ProjectStatus;
  clientName: string;
  time?: number | null;
}
export enum ProjectStatus {
  OPEN = 'open',
  AWAITING_PAYMENT = 'awaiting_payment',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CLOSED = 'closed',
}
export interface CreateProjectDto {
  title: string;
  description: string;
  categories: string[];
  clientId: string;
  price: number;
}