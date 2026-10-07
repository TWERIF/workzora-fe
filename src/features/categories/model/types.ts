import { TFunction } from "i18next";

export interface CategoriesProps {
    t: TFunction<"common", undefined>;

}

export interface CategoryProps {
    title: string;
    desc: string;
    img?: string;
}      


type Subcategory = {
    name: string;
    count: number;
};

export type Category = {
    id: string;
    title: string;
    description:string;
    count: number;
    subcategories: Subcategory[];
};
export interface SpecializationNode {
    id: string;
    title: string;
    count: number;
}

export interface CategoryNode {
    id: string;
    title: string;
    description: string;
    count: number;
    specializations: SpecializationNode[];
}
