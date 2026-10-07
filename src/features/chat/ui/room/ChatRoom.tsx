import { useAuth } from "@/features/auth/model/useAuth";
import { walletKeys } from "@/features/finances/model/useWallet";
import { useCreateEscrow, useProjectDispute } from "@/features/payment/model/usePayment";
import ProfileNavigation from "@/features/profile/ui/ProfileNavigation";
import { Project, ProjectStatus } from "@/features/projects/model/types";
import { projectKeys, useProjects } from "@/features/projects/model/useProjects";
import DealTimingInfo from "@/features/projects/ui/DealTimingInfo";
import { useContactForm } from "@/features/support/model/useSupport";
import { API_URL } from "@/shared/components/http";
import { IconSearch } from "@/shared/components/svg/UiIcons";
import Breadcrumbs, { type BreadcrumbItem } from "@/shared/components/ui/BreadCrumbs";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { io, type Socket } from "socket.io-client";
import { toast } from "sonner";
import { useProjectChat, useUploadChatFile } from "../../model/useChat";
import type { ChatMessage } from "../../model/types";
import { ChatReviewPrompt } from "../ChatReviewPrompt";
import Composer from "./Composer";
import MessageItem from "./MessageItem";

const outlineButton = "h-[40px] rounded-full border border-primary px-5 text-sm text-primary transition-colors hover:bg-primary-10 disabled:opacity-50";
const fillButton = "h-[40px] rounded-full bg-gradient px-5 text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-50";

export default function ChatRoom({ project }: { project: Project }) {
    const { t } = useTranslation("chat");
    const { t: tCommon } = useTranslation("common");
    const router = useRouter();
    const locale = router.locale ?? "en";
    const queryClient = useQueryClient();
    const { user } = useAuth();
    const { chatId, messages: initialMessages } = useProjectChat(project.id);
    const uploadFile = useUploadChatFile();
    const createEscrow = useCreateEscrow();
    const dispute = useProjectDispute(project.id);
    const contact = useContactForm();
    const { toCompletedMutation } = useProjects(project.id);

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [sending, setSending] = useState(false);
    const [draftSearch, setDraftSearch] = useState("");
    const [search, setSearch] = useState("");
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (initialMessages) setMessages(initialMessages);
    }, [initialMessages]);

    useEffect(() => {
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    }, [messages.length]);

    useEffect(() => {
        if (!chatId || !user?.id) return;
        const apiUrl = new URL(API_URL);
        const next = io(`${apiUrl.origin}/chat`, {
            transports: ["websocket"],
            withCredentials: true,
            path: `${apiUrl.pathname.replace(/\/$/, "")}/socket.io`,
        });
        next.on("connect", () => next.emit("joinChat", chatId));
        next.on("newMessage", (message: ChatMessage) => setMessages((current) => (current.some((item) => item.id === message.id) ? current : [...current, message])));
        next.on("errorMessage", () => toast.error(t("sendError")));
        setSocket(next);
        return () => {
            next.disconnect();
        };
    }, [chatId, user?.id, t]);

    const visible = useMemo(() => {
        const needle = search.trim().toLowerCase();
        return needle ? messages.filter((message) => message.content.toLowerCase().includes(needle)) : messages;
    }, [messages, search]);

    const send = async (text: string, files: File[]) => {
        if (!socket || !chatId) return false;
        setSending(true);
        try {
            const urls = await Promise.all(files.map((file) => uploadFile.mutateAsync(file)));
            const payloads = urls.length ? urls.map((url, index) => ({ content: index === 0 ? text : "", fileUrl: url })) : [{ content: text, fileUrl: undefined }];
            for (const payload of payloads) socket.emit("sendMessage", { chatId, ...payload });
            return true;
        } catch {
            toast.error(t("sendError"));
            return false;
        } finally {
            setSending(false);
        }
    };

    const inviteSupport = () => {
        if (!user || !window.confirm(t("room.inviteConfirm"))) return;
        contact.mutate(
            {
                name: [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email,
                email: user.email,
                message: t("room.inviteMessage", { title: project.title, url: `${window.location.origin}/${locale}/chats/${project.id}` }),
            },
            { onSuccess: () => toast.success(t("room.invited")), onError: () => toast.error(t("room.inviteError")) },
        );
    };

    const reserveFunds = () =>
        createEscrow.mutate(
            { projectId: project.id, description: project.title },
            {
                onSuccess: (escrow) => {
                    if (escrow.pageUrl) window.location.href = escrow.pageUrl;
                },
                onError: () => toast.error(t("paymentError")),
            },
        );

    const complete = () =>
        toCompletedMutation.mutate(
            { id: project.id },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: projectKeys.one(project.id) });
                    queryClient.invalidateQueries({ queryKey: walletKeys.all });
                    void router.push(`/${locale}/review/${project.id}`);
                },
                onError: () => toast.error(t("completeError")),
            },
        );

    const openDispute = () => {
        if (!user) return;
        const reason = window.prompt(t("room.arbitrationPrompt"))?.trim();
        if (!reason || reason.length < 10) return;
        dispute.mutate(
            { initiatorId: user.id, reason },
            { onSuccess: () => toast.success(t("room.arbitrationOpened")), onError: () => toast.error(t("room.arbitrationError")) },
        );
    };

    const isClient = Boolean(user && user.id === (project.client?.id ?? project.clientId));
    const inProgress = project.status === ProjectStatus.IN_PROGRESS;
    const awaitingPayment = project.status === ProjectStatus.AWAITING_PAYMENT;
    const isFinished = project.status === ProjectStatus.COMPLETED || project.status === ProjectStatus.CLOSED;

    const breadcrumbs: BreadcrumbItem[] = [
        { label: tCommon("breadcrumbs.home"), href: `/${locale}` },
        { label: t("hub.title"), href: `/${locale}/chats` },
        { label: project.title },
    ];

    const submitSearch = (event: FormEvent) => {
        event.preventDefault();
        setSearch(draftSearch);
    };

    return (
        <main className="mx-auto grid w-full max-w-[1358px] grid-cols-1 gap-[30px] px-4 pb-[100px] pt-24 text-main-100 lg:grid-cols-[minmax(0,1fr)_317px] lg:items-start lg:pt-[140px]">
            <div className="flex min-w-0 flex-col gap-6">
                <div>
                    <Breadcrumbs customItems={breadcrumbs} />
                    <h1 className="mt-4 text-[32px] font-bold sm:text-[40px]">{t("hub.title")}</h1>
                </div>

                <form onSubmit={submitSearch} className="flex items-center gap-2 rounded-full bg-main-5 p-2.5">
                    <label className="flex h-[45px] min-w-0 flex-1 items-center gap-2 rounded-full bg-background px-4">
                        <IconSearch size={18} className="shrink-0 text-primary" />
                        <input
                            type="search"
                            value={draftSearch}
                            onChange={(event) => {
                                setDraftSearch(event.target.value);
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

                <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="min-w-0 break-words text-xl font-semibold sm:text-2xl">{project.title}</h2>
                    <button type="button" onClick={inviteSupport} disabled={contact.isPending} className="shrink-0 text-sm text-status-danger hover:underline disabled:opacity-50">
                        {t("room.inviteSupport")}
                    </button>
                </div>

                <div ref={listRef} className="flex max-h-[640px] min-h-[320px] flex-col gap-3 overflow-y-auto rounded-20 bg-main-5 p-4 sm:p-5">
                    {visible.length ? (
                        visible.map((message) => <MessageItem key={message.id} message={message} isMe={message.senderId === user?.id} />)
                    ) : (
                        <p className="m-auto max-w-sm text-center text-sm text-main-50">{t(search ? "room.notFound" : "room.empty")}</p>
                    )}
                </div>

                {!isFinished && <Composer disabled={!chatId} sending={sending} onSend={send} />}

                <div className="flex flex-col gap-4 rounded-20 bg-main-5 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <DealTimingInfo project={project} />
                    <div className="flex flex-wrap gap-2.5">
                        {isClient && awaitingPayment && (
                            <button type="button" onClick={reserveFunds} disabled={createEscrow.isPending} className={fillButton}>
                                {createEscrow.isPending ? t("room.processing") : t("room.reserveFunds")}
                            </button>
                        )}
                        {isClient && inProgress && (
                            <button type="button" onClick={complete} disabled={toCompletedMutation.isPending} className={fillButton}>
                                {t("complete")}
                            </button>
                        )}
                        {inProgress && (
                            <button type="button" onClick={openDispute} disabled={dispute.isPending} className={outlineButton}>
                                {t("room.arbitration")}
                            </button>
                        )}
                    </div>
                </div>

                {isFinished && <ChatReviewPrompt projectId={project.id} />}
            </div>

            <aside className="flex flex-col gap-3 lg:sticky lg:top-[112px]">
                <ProfileNavigation activeHref="/chats" />
            </aside>
        </main>
    );
}
