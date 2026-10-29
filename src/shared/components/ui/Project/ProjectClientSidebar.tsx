import { User } from "@/features/auth/model/types";
import { useAuth } from "@/features/auth/model/useAuth";
import { QuickActionsCard } from "@/features/freelancerProfile/ui/QuickActionsCard";
import dayjs from 'dayjs';
import Image from "next/image";
import Link from "next/link";
import placeHolderAvatar from "../../../../../public/images/avatar_placeholder.png";
import Can from "../Can";
import { useTranslation } from "react-i18next";

export const ClientSidebar = ({ client }: { client: User }) => {
    const avatar = client.avatarUrl || placeHolderAvatar;
    const { t } = useTranslation("discussion");
    const { isAuthenticated } = useAuth();
    const memberSince = client.createdAt && dayjs(client.createdAt).isValid() ? dayjs(client.createdAt).format("MM, YYYY") : null;

    return (
        <aside className="w-full lg:w-[340px] flex-shrink-0 flex flex-col gap-6">
            <Can roles={["client"]}>
                <Link href="/create-project" className="w-full bg-success hover:opacity-90 transition-opacity text-white py-3.5 rounded-xl font-medium shadow-sm text-center">
                    {t("clientSidebar.postSameProject")}
                </Link>
            </Can>
            <div className="bg-white dark:bg-bg-modalDark rounded-20 p-6 shadow-sm border border-border dark:border-gray-700">
                <h2 className="font-bold text-[20px] text-text dark:text-text-dark mb-5">{t("clientSidebar.aboutClient")}</h2>

                <Link href={`/public-profile/${client.id}`} className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                        <Image width={150} height={150} src={avatar} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5 font-bold text-text dark:text-text-dark">
                            {client.firstName}
                            <span className="text-text-muted text-sm">✔</span>
                            <span className="text-green-500 text-sm">●</span>
                        </div>
                        <div className="text-[13px] text-text-muted mt-1 flex items-center gap-1">
                            <span className="text-success">★</span> {client.ratings} ({t("clientSidebar.reviewsCount", { count: client.rates })})
                        </div>
                        {memberSince && (
                            <div className="text-[12px] text-text-muted mt-1">
                                {t("clientSidebar.memberSince", { date: memberSince })}
                            </div>
                        )}
                    </div>
                </Link>
            </div>
            {isAuthenticated && <QuickActionsCard profileId={client.id} profileRole={client.role} primary={null} />}
        </aside>
    );
};
