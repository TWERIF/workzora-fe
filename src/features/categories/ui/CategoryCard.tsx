import { CategoryProps } from "../model/types"

export const CategoryCard = (props: CategoryProps) => {
    const { title, desc } = props;
    return (
        <div className="flex gap-[1.25rem]">
            <div>
                <h2 className="text-text dark:text-text-dark text-[1.25rem] font-bold leading-6">{title}</h2>
                <span className="text-text dark:text-text-muted leading-6 text-[1rem] transition-colors">{desc}</span>
            </div>
        </div>
    )
}