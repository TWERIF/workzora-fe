import { VerificationStatus } from "@/features/kyc/model/types";
import { PortfolioItem } from "@/features/portfolio/model/types";

export interface UserCreate {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  userName: string;
  locale: string;
  role: "client" | "freelancer";
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export const RATE_TYPES = ["STANDARD", "FROM"] as const;
export type RateType = (typeof RATE_TYPES)[number];
export const PROJECT_TYPES = ["ONE_TIME", "ONGOING", "LONG_TERM", "CONSULTATIONS"] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number];
export const BUDGET_RANGES = ["UNDER_500", "FROM_500_TO_1000", "FROM_1000_TO_3000", "OVER_3000"] as const;
export type BudgetRange = (typeof BUDGET_RANGES)[number];
export const WORK_FORMATS = ["REMOTE", "PARTTIME", "FULLTIME", "FLEXIBLE"] as const;
export type WorkFormat = (typeof WORK_FORMATS)[number];
export const RATE_NOTE_MAX = 200;
export const SKILLS_MAX = 15;

export enum UserRole {
  FREELANCER = "freelancer",
  CLIENT = "client",
  ADMIN = "admin",
}
export enum WorkType {
  FULLTIME = 'FULLTIME',
  PARTTIME = 'PARTTIME',
  FLEXIBLE = 'FLEXIBLE',
}

export enum PreferredBudgetType {
  HOURLY = 'HOURLY',
  FIXED = 'FIXED',
}

export enum PreferredProjectSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export enum Availability {
  AVAILABLE = 'AVAILABLE',
  OPENTOOFFERS = 'OPENTOOFFERS',
  BUSY = 'BUSY',
  NOTAVAILABLE = 'NOTAVAILABLE',
}
export interface Verification {
  id: string;
  documentUrl: string;
  selfieUrl: string;
  status: VerificationStatus;
}

export interface User {
  id: string;
  email: string;
  reserveEmail?: string;
  password?: string;
  name?: string;
  firstName: string;
  lastName: string;
  username: string;

  role: UserRole | string;

  isActive: boolean;

  skills: string[];

  ratings: number;

  position: string;

  rates: number;

  rate: number;

  workType: WorkType | null;

  preferredBudgetType: PreferredBudgetType | null;

  preferredProjectSize: PreferredProjectSize | null;

  availability: Availability;

  rateType?: RateType;

  rateNote?: string;

  projectType?: ProjectType | null;

  budgetRange?: BudgetRange | null;

  workFormat?: WorkFormat | null;

  avatarUrl?: string | null;

  bio?: string;

  verification: Verification | null;

  phone?: string;

  city?: string;

  country?: string;

  createdAt?: Date | string | null;
  updatedAt?: Date;
  lastSeenAt?: string | null;
}

export interface UserProjectStats {
  completedAsFreelancer: number;
  takenAsFreelancer: number;
  posted: number;
  completedAsClient: number;
  spent?: number;
}

export interface ClientProject {
  id: string;
  title: string;
  description: string;
  price: number;
  tags: string[];
  views: number;
  status: string;
  createdAt: string;
  proposals: number;
  categories: { id: string; title: string }[];
}

export interface ClientProjectsPage {
  data: ClientProject[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PublicProfile extends User {
  stats: UserProjectStats | null;
}

export interface UserRelation {
  blockedByMe: boolean;
  blockedMe: boolean;
  sharedProjectId: string | null;
}

export interface TopFreelancer extends User {
  portfolio: PortfolioItem;
}

export type UserPreview = Pick<
  User,
  | "id"
  | "firstName"
  | "lastName"
  | "role"
  | "ratings"
  | "position"
  | "rates"
  | "skills"
>;
