"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useSearchProjects } from "../model/useProjects";
import type { Project } from "../model/types";

interface ProjectSearchBarProps {
  /** Pass `null` to clear search and fall back to the status-filtered list. */
  onResults: (results: Project[] | null) => void;
}

export default function ProjectSearchBar({ onResults }: ProjectSearchBarProps) {
  const { t } = useTranslation("additions");
  const [term, setTerm] = useState("");
  const [submittedTerm, setSubmittedTerm] = useState("");

  const { data } = useSearchProjects(submittedTerm);

  useEffect(() => {
    if (!submittedTerm) return;
    onResults(data ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, submittedTerm]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = term.trim();
    setSubmittedTerm(trimmed);
    if (!trimmed) onResults(null);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-3">
      <div className="flex flex-1 items-center gap-3 rounded-20 bg-input px-5 py-3 shadow-input dark:bg-input-dark dark:shadow-input-dark">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          className="shrink-0 text-text-muted"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>

        <input
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          placeholder={t("chats.searchPlaceholder")}
          className="w-full bg-transparent text-sm text-text outline-none placeholder:text-text-muted dark:text-text-dark"
        />
      </div>

      <button
        type="submit"
        className="shrink-0 rounded-20 bg-gradient px-8 py-3 text-sm font-medium text-white shadow-input transition-opacity hover:opacity-90 dark:shadow-input-dark"
      >
        {t("chats.search")}
      </button>
    </form>
  );
}
