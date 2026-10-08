import ProtectedRoute from "@/features/auth/model/protectedRoute";
import { useMyTickets } from "@/features/support/model/useSupport";
import SupportTicketView from "@/features/support/ui/SupportTicketView";
import PageMeta from "@/shared/components/seo/PageMeta";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function SupportContent() {
  const { t, i18n } = useTranslation("common");
  const { data: tickets, isLoading } = useMyTickets();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const activeId = selectedId ?? tickets?.[0]?.id ?? null;

  return (
    <main className="min-h-screen bg-bg px-15 py-28 text-text dark:bg-bg-dark dark:text-text-dark">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{t("supportPage.title")}</h1>
            <p className="mt-2 text-sm text-text-light">{t("supportPage.subtitle")}</p>
          </div>
          <Link href={`/${i18n.language}/contacts`} className="rounded-20 bg-gradient px-15 py-13 text-sm font-semibold text-white">
            {t("supportPage.newRequest")}
          </Link>
        </div>

        {isLoading ? (
          <div className="h-40 animate-pulse rounded-20 bg-input dark:bg-input-dark" />
        ) : !tickets?.length ? (
          <p className="rounded-20 border border-dashed border-border p-6 text-center text-sm text-text-light">{t("supportPage.empty")}</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <ul className="flex flex-col gap-2">
              {tickets.map((ticket) => (
                <li key={ticket.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(ticket.id)}
                    className={`w-full rounded-20 border p-15 text-left text-sm transition-colors ${
                      ticket.id === activeId ? "border-success bg-surface-success dark:bg-input-dark" : "border-border hover:bg-surface dark:hover:bg-input-dark"
                    }`}
                  >
                    <span className="block font-medium">{new Date(ticket.createdAt).toLocaleDateString(i18n.language)}</span>
                    <span className="text-xs text-text-light">
                      {ticket.status === "open" ? t("supportPage.open") : t("supportPage.closed")}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            {activeId ? <SupportTicketView ticketId={activeId} /> : <p className="text-sm text-text-light">{t("supportPage.select")}</p>}
          </div>
        )}
      </div>
    </main>
  );
}

export default function SupportPage() {
  return (
    <ProtectedRoute>
      <PageMeta page="support" noindex />
      <SupportContent />
    </ProtectedRoute>
  );
}
