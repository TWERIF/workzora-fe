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
  reserveEmail?: string; // nullable: true
  password?: string; // зазвичай ховаємо при передачі на фронтенд
  firstName: string;
  lastName: string;
  username: string;
  role: UserRole | string;
  isActive: boolean;
  skills: string[];
  ratings: number;
  position: string;
  rates: number;
  createdAt?: Date; // якщо додаси CreateDateColumn пізніше
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
