import { TFunction } from "i18next";

export interface SearchProps {
    t: TFunction<"common", undefined>;
    query: string;
    placeholder: string;
    onChange: (q: string) => void;
    onClick: () => void;
}