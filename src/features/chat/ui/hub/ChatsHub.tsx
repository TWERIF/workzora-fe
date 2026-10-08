import ScrollRow from "@/shared/components/ui/ScrollRow";
import { useUnreadNotifications } from "@/features/notifications/model/useNotifications";
import ProfileNavigation from "@/features/profile/ui/ProfileNavigation";
import { Pagination } from "@/features/freelancerProfile/ui/Pagination";
import { useMyDeals } from "@/features/projects/model/useProjects";
import { IconSearch } from "@/shared/components/svg/UiIcons";
import Breadcrumbs from "@/shared/components/ui/BreadCrumbs";
import Loader from "@/shared/components/ui/Loader";
import { useRouter } from "next/router";
import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useChats } from "../../model/useChat";
import BlockedList from "./BlockedList";
import ChatRow from "./ChatRow";
import DealCard from "./DealCard";

const TABS = ["projects", "chats", "blocked"] as const;
type HubTab = (typeof TABS)[number];
const PAGE_SIZE = 10;

const Empty = ({ text }: { text: string }) => (
    <p className="rounded-20 border border-dashed border-main-10 p-10 text-center text-sm text-main-50">{text}</p>
);

export default function ChatsHub() {
    const { t } = useTranslation("chat");
    const router = useRouter();
    const tab: HubTab = TABS.includes(router.query.tab as HubTab) ? (router.query.tab as HubTab) : "chats";
    const [draft, setDraft] = useState("");
    const [search, setSearch] = useState("");
    const [dealsPage, setDealsPage] = useState(1);
    const [chatsPage, setChatsPage] = useState(1);

    const deals = useMyDeals(dealsPage, PAGE_SIZE);
    const chats = useChats(chatsPage, PAGE_SIZE);
    useUnreadNotifications();

    const needle = search.trim().toLowerCase();
    const visibleDeals = (deals.data?.items ?? []).filter((project) => !needle || project.title.toLowerCase().includes(needle));
    const visibleChats = (chats.data?.data ?? []).filter(
        (chat) => !needle || [chat.userName, chat.projectTitle, chat.topic].some((value) => value?.toLowerCase().includes(needle)),
    );

    const selectTab = (next: HubTab) => {
        void router.replace({ pathname: router.pathname, query: { ...router.query, tab: next } }, undefined, { shallow: true });
    };

    const submitSearch = (event: FormEvent) => {
        event.preventDefault();
        setSearch(draft);
    };

    return (
        <main className="mx-auto grid w-full max-w-[1358px] grid-cols-1 gap-[30px] px-4 pb-[100px] pt-24 text-main-100 lg:grid-cols-[minmax(0,1fr)_317px] lg:items-start lg:pt-[140px]">
            <div className="flex min-w-0 flex-col gap-6">
                <div>
                    <Breadcrumbs />
                    <h1 className="mt-4 text-[32px] font-bold sm:text-[40px]">{t("hub.title")}</h1>
                </div>

                <form onSubmit={submitSearch} className="flex items-center gap-2 rounded-full bg-main-5 p-2.5">
                    <label className="flex h-[45px] min-w-0 flex-1 items-center gap-2 rounded-full bg-background px-4">
                        <IconSearch size={18} className="shrink-0 text-primary" />
                        <input
                            type="search"
                            value={draft}
                            onChange={(event) => {
                                setDraft(event.target.value);
                                if (!event.target.value) setSearch("");
                            }}
                            placeholder={t("hub.search")}
                            className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-main-50"
                        />
                    </label>
                    <button type="submit" className="h-[45px] shrink-0 rounded-full bg-gradient px-6 text-sm text-white transition-opacity hover:opacity-90 sm:px-10">
                        {t("hub.searchButton")}
                    </button>
                </form>

                <ScrollRow role="tablist" className="flex gap-2 rounded-full bg-main-5 p-2.5">
                    {TABS.map((item) => (
                        <button
                            key={item}
                            type="button"
                            role="tab"
                            aria-selected={tab === item}
                            onClick={() => selectTab(item)}
                            className={`h-[45px] flex-1 shrink-0 whitespace-nowrap rounded-full px-4 text-xs transition-colors sm:text-sm ${
                                tab === item ? "bg-primary text-white" : "bg-background hover:text-primary"
                            }`}
                        >
                            {t(`hub.tabs.${item}`)}
                        </button>
                    ))}
                </ScrollRow>

                {tab === "projects" &&
                    (deals.isLoading ? (
                        <Loader />
                    ) : visibleDeals.length ? (
                        <>
                            <div className="flex flex-col gap-2.5">
                                {visibleDeals.map((project) => (
                                    <DealCard key={project.id} project={project} />
                                ))}
                            </div>
                            <Pagination page={dealsPage} pageCount={deals.data?.meta.totalPages ?? 1} onPageChange={setDealsPage} />
                        </>
                    ) : (
                        <Empty text={t(needle ? "hub.emptySearch" : "hub.emptyProjects")} />
                    ))}

                {tab === "chats" &&
                    (chats.isLoading ? (
                        <Loader />
                    ) : visibleChats.length ? (
                        <>
                            <div className="flex flex-col gap-2.5">
                                {visibleChats.map((chat) => (
                                    <ChatRow key={chat.id} chat={chat} />
                                ))}
                            </div>
                            <Pagination
                                page={chatsPage}
                                pageCount={Math.max(1, Math.ceil((chats.data?.total ?? 0) / PAGE_SIZE))}
                                onPageChange={setChatsPage}
                            />
                        </>
                    ) : (
                        <Empty text={t(needle ? "hub.emptySearch" : "hub.emptyChats")} />
                    ))}

                {tab === "blocked" && <BlockedList search={search} />}
            </div>

            <aside className="flex flex-col gap-3 lg:sticky lg:top-[112px]">
                <ProfileNavigation activeHref="/chats" />
            </aside>
        </main>
    );
}
