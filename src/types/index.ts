import { ReactNode } from "react";

export interface ButtonI {
    text:ReactNode;
    onClick:()=>void;
    type?:"button" | "submit" | "reset";
}
export interface InputI {
    value: string;
    setValue: (s: string) => void;
    placeholder: string;
    errorText?: string | null;
    password?: boolean;
}