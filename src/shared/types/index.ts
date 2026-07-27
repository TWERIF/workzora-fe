import { ReactNode } from "react";

export interface ButtonI {
  text: ReactNode;
  onClick?: () => void;
  filled?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  id?: string;
  form?: string;
  className?: string;
}
export interface InputI {
  value: string;
  setValue: (s: string) => void;
  placeholder: string;
  errorText?: string | null;
  password?: boolean;
  className?: string;
}
