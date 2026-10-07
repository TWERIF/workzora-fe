import UserCardHeader from "@/features/directory/ui/UserCardHeader";
import { useTranslation } from "react-i18next";
import type { TopClient } from "../model/types";
import { LastActivityBlock } from "./LastActivityBlock";
import { LastReviewBlock } from "./LastReviewBlock";

export const ClientCard = ({ client }: { client: TopClient }) => {
    const { t } = useTranslation("topClients");

    const fullName = `${client.firstName ?? ""} ${client.lastName ?? ""}`.trim() || t("card.anonymous");
    const rating = Number(client.ratings) || 0;
    const about = client.bio || client.position;

    return (
        <article className="flex flex-col justify-center gap-6 rounded-36 bg-surface p-6 transition-colors dark:bg-bg-modalDark sm:p-9">
            <UserCardHeader id={client.id} name={fullName} avatarUrl={client.avatarUrl} about={about} rating={rating} isVerified={Boolean(client.isVerified)} />

            {client.lastReview ? (
                <LastReviewBlock review={client.lastReview} />
            ) : (
                client.lastProject && <LastActivityBlock project={client.lastProject} />
            )}
        </article>
    );
};
