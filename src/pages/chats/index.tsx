"use client";

import { useChats } from "@/features/chat/model/useChat";
import { FilterType } from "@/features/chat/ui/ChatFilters";
import ChatItem, { ChatItemData } from "@/features/chat/ui/ChatItem";
import ChatPagination from "@/features/chat/ui/ChatPagination";
import ChatSearch from "@/features/chat/ui/ChatSearch";
import AccountSettings from "@/features/profile/ui/AccountSettings";
import Breadcrumbs from "@/shared/components/ui/BreadCrumbs";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useTranslation } from "react-i18next";


export default function ChatsPage() {
    const { t } = useTranslation("common");
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [filter, setFilter] = useState<FilterType>("chats");

    const [page, setPage] = useState(1);
    const limit = 10;

    const { data, isLoading, isError } = useChats(page, limit);

    const rawChats = data?.data || [];
    const totalItems = data?.total || 0;

    const totalPages = Math.ceil(totalItems / limit);

    const handleSearch = (value: string) => {
        console.log("Searching for:", value);
    };

    const handleDeleteChat = (id: string) => {
        console.log("Delete chat trigger for ID:", id);
    };

    const chatsList: ChatItemData[] = rawChats.map((chat: any) => {
        const chatDate = new Date(chat.updatedAt || Date.now());

        return {
            id: chat.id,
            date: chatDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
            time: chatDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
            avatarUrl: chat.avatarUrl || null,
            userName: chat.projectTitle || chat.userName || "Unknown User",
            projectId: chat.projectId,
            topic: chat.topic || "Conversation",
            messageCount: chat.messageCount || 0,
            isUnread: chat.isUnread || false,
        };
    });

    return (
        <div className={`min-h-screen transition-colors duration-200 ${isDark ? "bg-[#2A2A2A] py-8 text-white" : "bg-bg text-text"}`}>
            <div className="container mx-auto px-4 max-w-[1200px]">
                <Breadcrumbs />

                <h1 className="text-3xl font-extrabold my-10 tracking-tight">
                    {t("chatPage.title") || "Chats"}
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="order-2 lg:order-1 lg:col-span-8 flex flex-col gap-5">
                        <ChatSearch onSearch={handleSearch} />

                        <div className="flex flex-col gap-3 mt-2">
                            {isLoading ? (
                                <div className="text-center py-12 text-text-muted">Loading chats...</div>
                            ) : isError ? (
                                <div className="text-center py-12 text-red-500">Error loading chats</div>
                            ) : chatsList.length > 0 ? (
                                chatsList.map((chat) => (
                                    <ChatItem key={chat.id} chat={chat} onDelete={handleDeleteChat} />
                                ))
                            ) : (
                                <div className="text-center py-12 text-text-muted text-sm">
                                    {t("chatPage.no_chats") || "No chats found"}
                                </div>
                            )}
                        </div>

                        {totalPages > 1 && (
                            <ChatPagination
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={setPage}
                            />
                        )}
                    </div>

                    <aside className="order-1 lg:order-2 lg:col-span-4 w-full lg:sticky lg:top-8">
                        <AccountSettings />
                    </aside>
                </div>
            </div>
        </div>
    );
}