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

export interface User {
  id: string;
  email: string;
  reserveEmail: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  skills: string[];
  ratings: number;
  position: string;
  rates: number;
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
