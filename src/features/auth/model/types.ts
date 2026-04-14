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
  reserveEmail?: string | null;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
}
