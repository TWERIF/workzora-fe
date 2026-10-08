import CardBrandIcon from "@/shared/components/svg/CardBrandIcon";
import { useTranslation } from "react-i18next";
import { maskedCard } from "../model/format";
import { LinkedCard } from "../model/types";
import ActionsMenu from "./ActionsMenu";

interface LinkedCardRowProps {
    card: LinkedCard;
    onMakePrimary: (card: LinkedCard) => void;
    onRemove: (card: LinkedCard) => void;
}

export const LinkedCardRow = ({ card, onMakePrimary, onRemove }: LinkedCardRowProps) => {
    const { t } = useTranslation("finances");

    return (
        <li className="flex items-center gap-4 rounded-20 border border-border bg-white px-5 py-4 dark:border-white/10 dark:bg-input-dark">
            <CardBrandIcon brand={card.brand} className="shrink-0" />

            <div className="min-w-0 flex-1">
                <p className="font-medium tracking-wide text-text dark:text-text-dark">
                    {maskedCard(card.last4)}
                </p>
                {card.expiry && (
                    <p className="text-sm text-text-light dark:text-text-muted">
                        {t("cards.expires", { date: card.expiry })}
                    </p>
                )}
            </div>

            {card.isPrimary && (
                <span className="rounded-full bg-status-successSoft px-3 py-1 text-sm text-status-success">
                    {t("cards.primary")}
                </span>
            )}

            <ActionsMenu
                label={t("cards.actions.label")}
                items={[
                    ...(card.isPrimary ? [] : [{ key: "primary", label: t("cards.actions.makePrimary"), onSelect: () => onMakePrimary(card) }]),
                    { key: "remove", label: t("cards.actions.remove"), onSelect: () => onRemove(card), danger: true },
                ]}
            />
        </li>
    );
};

export default LinkedCardRow;