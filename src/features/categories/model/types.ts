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