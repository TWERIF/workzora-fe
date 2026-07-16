import { VerificationStatus } from "@/features/kyc/model/types";

export interface UserCreate {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  userName: string;
  locale: string;
  isActive: boolean;
}
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

  avatarUrl?: string | null;

  verification: Verification | null;

  phone?: string;

  city?: string;

  country?: string;

  createdAt?: Date;
  updatedAt?: Date;
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
