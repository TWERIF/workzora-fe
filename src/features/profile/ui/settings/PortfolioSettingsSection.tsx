import { PortfolioCard } from "@/features/freelancerProfile/ui/PortfolioCard";
import type { PortfolioItem } from "@/features/portfolio/model/types";
import { useCreatePortfolio, useDeletePortfolio, useMyPortfolios, useUpdatePortfolio } from "@/features/portfolio/model/usePortfolio";
import PortfolioModal from "@/features/portfolio/ui/PortfolioModal";
import { IconPencil, IconTrash, IconUpload } from "@/shared/components/svg/UiIcons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { SettingsSection } from "./SettingsFields";

export default function PortfolioSettingsSection() {
    const { t } = useTranslation("profile");
    const { data: portfolios = [] } = useMyPortfolios();
    const createMutation = useCreatePortfolio();
    const updateMutation = useUpdatePortfolio();
    const deleteMutation = useDeletePortfolio();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);

    const open = (item: PortfolioItem | null) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const save = (formData: FormData) => {
        const onSuccess = () => {
            setIsModalOpen(false);
            toast.success(t("workSaved"));
        };
        const onError = () => toast.error(t("settingsError"));
        if (editingItem) updateMutation.mutate({ id: editingItem.id, data: formData }, { onSuccess, onError });
        else createMutation.mutate(formData, { onSuccess, onError });
    };

    const remove = (item: PortfolioItem) => {
        if (window.confirm(t("portfolioSection.deleteConfirm"))) deleteMutation.mutate(item.id);
    };

    const actionClass = "flex h-9 w-9 items-center justify-center rounded-full bg-background/90 shadow-sm backdrop-blur transition-colors";

    return (
        <SettingsSection id="portfolio" title={t("portfolioSection.title")} counter={portfolios.length}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                <div className="flex min-h-[320px] flex-col items-center justify-center gap-3 rounded-[24px] border-2 border-dashed border-main-10 p-6 text-center">
                    <h3 className="text-base font-semibold">{t("portfolioSection.addTitle")}</h3>
                    <p className="text-sm leading-6">{t("portfolioSection.addText")}</p>
                    <button
                        type="button"
                        onClick={() => open(null)}
                        className="mt-2 flex h-[45px] items-center gap-2 rounded-full bg-gradient px-6 text-sm text-white transition-opacity hover:opacity-90"
                    >
                        <IconUpload size={16} />
                        {t("portfolioSection.addButton")}
                    </button>
                </div>

                {portfolios.map((item) => (
                    <PortfolioCard
                        key={item.id}
                        item={item}
                        actions={
                            <>
                                <button type="button" onClick={() => open(item)} aria-label={t("portfolioSection.edit")} className={`${actionClass} text-primary hover:bg-primary hover:text-white`}>
                                    <IconPencil size={16} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => remove(item)}
                                    aria-label={t("portfolioSection.delete")}
                                    className={`${actionClass} text-status-danger hover:bg-status-danger hover:text-white`}
                                >
                                    <IconTrash size={16} />
                                </button>
                            </>
                        }
                    />
                ))}
            </div>

            <PortfolioModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={save}
                initialData={editingItem}
                isLoading={createMutation.isPending || updateMutation.isPending}
            />
        </SettingsSection>
    );
}
