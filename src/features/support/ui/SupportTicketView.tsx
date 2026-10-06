import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMyTicket, useReplyToMyTicket } from "../model/useSupport";

const formatDateTime = (value: string, locale: string) =>
  new Date(value).toLocaleString(locale, { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });

export default function SupportTicketView({ ticketId }: { ticketId: string }) {
  const { t, i18n } = useTranslation("common");
  const { data: ticket, isLoading } = useMyTicket(ticketId);
  const replyMutation = useReplyToMyTicket();
  const [message, setMessage] = useState("");

  if (isLoading || !ticket) {
    return <div className="h-80 animate-pulse rounded-20 bg-input dark:bg-input-dark" />;
  }

  const send = async () => {
    if (!message.trim()) return;
    await replyMutation.mutateAsync({ id: ticket.id, content: message.trim() });
    setMessage("");
  };

  return (
    <div className="flex flex-col gap-4 rounded-20 border border-border bg-bg-header p-15 dark:bg-bg-modalDark">
      <div className="flex max-h-[460px] flex-col gap-3 overflow-y-auto">
        {ticket.messages.map((item) => (
          <div
            key={item.id}
            className={`max-w-[85%] rounded-20 px-15 py-13 text-sm ${
              item.author === "user" ? "ml-auto bg-success text-white" : "bg-surface text-text dark:bg-input-dark dark:text-text-dark"
            }`}
          >
            <p className="whitespace-pre-wrap break-words">{item.content}</p>
            <p className={`mt-1 text-xs ${item.author === "user" ? "text-white/70" : "text-text-light"}`}>
              {item.author === "user" ? t("supportPage.you") : t("supportPage.team")} · {formatDateTime(item.createdAt, i18n.language)}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <textarea
          rows={2}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={t("supportPage.replyPlaceholder")}
          className="min-w-0 flex-1 resize-none rounded-20 border border-border bg-input px-15 py-13 text-sm text-text focus:outline-none focus:ring-1 focus:ring-success dark:bg-input-dark dark:text-text-dark"
        />
        <button
          type="button"
          onClick={send}
          disabled={!message.trim() || replyMutation.isPending}
          className="rounded-20 bg-gradient px-15 py-13 text-sm font-semibold text-white disabled:opacity-50"
        >
          {t("supportPage.send")}
        </button>
      </div>
      {replyMutation.isError && <p className="text-sm text-red-500">{t("supportPage.sendError")}</p>}
    </div>
  );
}
