import ScrollRow from "@/shared/components/ui/ScrollRow";
import { useTranslation } from "react-i18next";
import { BLOG_TAGS } from "../model/types";

interface CategoryTabsProps {
    value: string | null;
    onChange: (tag: string | null) => void;
}

export const CategoryTabs = ({ value, onChange }: CategoryTabsProps) => {
    const { t } = useTranslation("common");
    const items = [{ value: null, key: "all" }, ...BLOG_TAGS];

    return (
        <ScrollRow role="tablist" className="flex gap-2 rounded-full bg-main-5 p-2">
            {items.map((item) => {
                const active = item.value === value;
                return (
                    <button
                        key={item.key}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => onChange(item.value)}
                        className={`h-[45px] min-w-[110px] flex-1 shrink-0 whitespace-nowrap rounded-full px-4 text-sm transition-colors ${
                            active ? "bg-gradient text-white" : "bg-background hover:text-primary"
                        }`}
                    >
                        {t(`blog.categories.${item.key}`)}
                    </button>
                );
            })}
        </ScrollRow>
    );
};
