import { User } from "@/features/auth/model/types";
import dayjs from 'dayjs';
import Image from "next/image";
import placeHolderAvatar from "../../../../../public/images/avatar_placeholder.png";
import Can from "../Can";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export const ClientSidebar = ({ client }: { client: User }) => {
    const avatar = client.avatarUrl || placeHolderAvatar;
    const router = useRouter();
    const locale = router.locale ?? "en";
    const { t } = useTranslation("discussion");

    return (
        <aside className="w-full lg:w-[340px] flex-shrink-0 flex flex-col gap-6">
            <Can roles={["client"]}>
                <button onClick={() => router.push(`/${locale}/create-project`)} className="w-full bg-success hover:opacity-90 transition-opacity text-white py-3.5 rounded-xl font-medium shadow-sm">
                    {t("clientSidebar.postSameProject")}
                </button>
            </Can>
            <div className="bg-white dark:bg-bg-modalDark rounded-20 p-6 shadow-sm border border-border dark:border-gray-700">
                <h2 className="font-bold text-[20px] text-text dark:text-text-dark mb-5">{t("clientSidebar.aboutClient")}</h2>

                <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                        <Image width={150} height={150} src={avatar} alt="profile icon" className="w-full h-full object-cover" />
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
                        <div className="text-[12px] text-text-muted mt-1">
                            {t("clientSidebar.memberSince", { date: dayjs(client.createdAt).format("MM, YYYY") })}
                        </div>
                    </div>
                </div>

                <div className="border-t border-border dark:border-gray-700 pt-4 mt-2 flex flex-col gap-3 text-[13px] text-text-muted">
                    <Can roles={["client", "admin"]}>
                        <button className="flex items-center gap-2 hover:text-success text-left transition-colors">
                            ✉ {t("clientSidebar.sendMessage")}
                        </button>
                    </Can>
                    <button className="flex items-center gap-2 hover:text-success text-left transition-colors">
                        ✎ {t("clientSidebar.makeNote")}
                    </button>
                    <button className="flex items-center gap-2 hover:text-error text-left transition-colors">
                        ✕ {t("clientSidebar.blockUser")}
                    </button>
                    <button className="flex items-center gap-2 hover:text-error text-left transition-colors">
                        ⚠ {t("clientSidebar.complain")}
                    </button>
                </div>
            </div>
        </aside>
    );
};