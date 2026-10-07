import WorkzoraMarkIcon from "@/shared/components/svg/WorkzoraMarkIcon";
import { useTranslation } from "react-i18next";

export const AuthorCard = () => {
    const { t } = useTranslation("common");

    return (
        <section className="flex flex-col gap-3 rounded-[24px] bg-main-5 p-5">
            <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-background">
                    <WorkzoraMarkIcon w={26} h={26} />
                </span>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold">{t("blog.authorName")}</span>
                    <span className="text-xs text-main-50">{t("post.authorRole")}</span>
                </div>
            </div>
            <p className="text-xs leading-5">{t("post.missionText")}</p>
        </section>
    );
};
