import { SearchIcon } from "@/shared/components/svg/SearchIcon";
import ButtonGradientSmall from "../../Button/ButtonGradientSmall";
import Input from "../../Input/Input";
import { SearchProps } from "../model/types";

export const Search = (props: SearchProps) => {
    const { onClick, onChange, query, placeholder, t } = props;

    return (
        <div className="bg-input dark:bg-input-dark rounded-[1.25rem] w-full flex gap-2 px-[0.875rem] py-[0.813rem] transition-colors duration-200">
            <div className="flex gap-[4px] px-[0.75rem] py-[1rem] items-center w-full text-text-muted dark:text-gray-400">
                <SearchIcon />
                <Input
                    className="w-full text-text dark:text-text-dark bg-transparent outline-none placeholder:text-text-muted dark:placeholder:text-gray-400"
                    setValue={onChange}
                    value={query}
                    placeholder={placeholder}
                />
            </div>
            {/* <ButtonGradientSmall onClick={onClick} text={t("search.button")} /> */}
        </div>
    )
}