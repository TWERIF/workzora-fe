
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MAX_LINKED_CARDS } from "../model/constants";
import { LinkedCard } from "../model/types";
import AddCardButton from "./AddCardButton";
import LinkedCardRow from "./LinkedCardRow";
import Modal from "./Modal";
import PaymentDataForm from "./PaymentDataForm";
import VerificationNotice from "./VerificationNotice";

interface LinkedCardsSectionProps {
    cards: LinkedCard[];
    isVerified: boolean;
    userId?: string;
    existingCardNumber?: string;
    isLoading?: boolean;
    isError?: boolean;
}

export const LinkedCardsSection = ({
    cards,
    isVerified,
    userId,
    existingCardNumber,
    isLoading,
    isError,
}: LinkedCardsSectionProps) => {
    const { t } = useTranslation("finances");
    const [editingCard, setEditingCard] = useState<LinkedCard | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const isLimitReached = cards.length >= MAX_LINKED_CARDS;
    const isEditing = editingCard !== null;

    const openCreate = () => {
        setEditingCard(null);
        setIsFormOpen(true);
    };

    const openEdit = (card: LinkedCard) => {
        setEditingCard(card);
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setEditingCard(null);
    };

    return (
        <section className="flex min-w-0 flex-col gap-5">
            <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-text dark:text-text-dark">
                        {t("cards.title")}
                    </h2>
                    <p className="mt-1 text-sm text-text-light dark:text-text-muted">
                        {t("cards.subtitle")}
                    </p>
                </div>

                <AddCardButton onClick={openCreate} isLimitReached={isLimitReached} />
            </header>

            {isLoading && (
                <div
                    aria-busy="true"
                    className="h-[76px] animate-pulse rounded-20 bg-black/5 dark:bg-white/5"
                />
            )}

            {!isLoading && isError && (
                <div className="rounded-20 bg-status-dangerSoft p-5 text-sm text-status-danger">
                    {t("cards.loadFailed")}
                </div>
            )}

            {!isLoading && !isError && (
                cards.length > 0 ? (
                    <ul className="flex flex-col gap-3">
                        {cards.map((card) => (
                            <LinkedCardRow key={card.id} card={card} onEdit={openEdit} />
                        ))}
                    </ul>
                ) : existingCardNumber ? <LinkedCardRow key={existingCardNumber} card={{
                    last4: existingCardNumber,
                    brand: "unknown",
                    isPrimary: true
                }} onEdit={openEdit} /> : (
                    <div className="rounded-20 border border-dashed border-border p-8 text-center dark:border-white/15">
                        <p className="font-medium text-text dark:text-text-dark">
                            {t("cards.empty.title")}
                        </p>
                        <p className="mt-1 text-sm text-text-light dark:text-text-muted">
                            {t("cards.empty.description")}
                        </p>
                    </div>
                )
            )}

            <VerificationNotice isVerified={isVerified} />

            <Modal
                isOpen={isFormOpen}
                title={isEditing ? t("modal.editTitle") : t("modal.addTitle")}
                closeLabel={t("modal.close")}
                onClose={closeForm}
            >
                <PaymentDataForm
                    key={isEditing ? "edit" : "create"}
                    userId={userId}
                    existingCardNumber={isEditing ? existingCardNumber : undefined}
                    onSuccess={closeForm}
                />
            </Modal>
        </section>
    );
};

export default LinkedCardsSection;