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
  /** Number of proposals submitted for this project. Optional until backend adds it. */
  proposalsCount?: number;
  /** Tags attached to the project, used for search/filtering. */
  tags?: string[];
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

/**
 * Query params for the public "Find Work" / "All projects" listing.
 * Frontend already sends these; backend needs to add support for
 * `categories`, `tags`, `minPrice` and `maxPrice` (see api.ts findAllProjects).
 */
export interface FindProjectsParams {
  search?: string;
  page?: number;
  limit?: number;
  /** Category ids, multi-select. Sent as a comma-separated string, e.g. "cat1,cat2". */
  categories?: string[];
  /** Free-text tags, multi-select. Sent as a comma-separated string. */
  tags?: string[];
  minPrice?: number;
  maxPrice?: number;
}

export interface PaginatedProjects {
  data: Project[];
  total: number;
  page: number;
  limit: number;
}