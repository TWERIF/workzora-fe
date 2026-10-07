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
  proposalsCount?: number;
  tags?: string[];
  startedAt?: string | null;
  completedAt?: string | null;
  isUrgent?: boolean;
  isFeatured?: boolean;
}

export interface MyProjectsPage {
  items: Project[];
  meta: { total: number; page: number; limit: number; totalPages: number };
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
  tags?: string[];
  price: number;
  isUrgent?: boolean;
}

export interface FindProjectsParams {
  search?: string;
  page?: number;
  limit?: number;
  categories?: string[];
  tags?: string[];
  minPrice?: number;
  maxPrice?: number;
  sort?: "new" | "top";
}

export interface PaginatedProjects {
  data: Project[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}