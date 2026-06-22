"use client";

import { useTranslation } from "react-i18next";
import { useState } from "react";

interface ChatSearchProps {
  onSearch: (value: string) => void;
}

export default function ChatSearch({ onSearch }: ChatSearchProps) {
  const { t } = useTranslation("common");
  const [searchValue, setSearchValue] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <form onSubmit={handleSearchSubmit} className="flex gap-4 items-center w-full">
      <div className="relative flex-1">
        <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={t("chatPage.search_placeholder") || "Search for chats"}
          className="w-full pl-12 pr-4 py-3 bg-input dark:bg-input-dark text-text dark:text-text-dark rounded-20 border border-border/40 focus:outline-none focus:ring-1 focus:ring-success shadow-input dark:shadow-input-dark text-sm transition-all"
        />
      </div>
      <button
        type="submit"
        className="bg-success hover:brightness-105 active:brightness-95 text-white font-medium px-8 py-3 rounded-20 text-sm transition-all shadow-md"
      >
        {t("chatPage.search_button") || "Search"}
      </button>
    </form>
  );
}