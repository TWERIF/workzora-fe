import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getHelpArticle, getHelpArticles, getHelpCategories, sendHelpFeedback } from "./api";
import type { HelpReaction } from "./types";

const helpLocale = (locale?: string) => (locale === "uk" ? "uk" : "en");

export const useHelpLocale = () => helpLocale(useRouter().locale);

export const useHelpCategories = () => {
    const locale = useHelpLocale();
    return useQuery({ queryKey: ["help", "categories", locale], queryFn: () => getHelpCategories(locale), staleTime: 5 * 60 * 1000 });
};

export const useHelpArticles = ({ category, search }: { category?: string; search?: string }) => {
    const locale = useHelpLocale();
    const term = search?.trim() ?? "";
    return useQuery({
        queryKey: ["help", "articles", locale, category ?? null, term],
        queryFn: () => getHelpArticles({ locale, ...(category && { category }), ...(term && { search: term }) }),
        enabled: Boolean(category || term),
    });
};

export const useHelpArticle = (category?: string, slug?: string) => {
    const locale = useHelpLocale();
    return useQuery({
        queryKey: ["help", "article", locale, category, slug],
        queryFn: () => getHelpArticle({ locale, category: category ?? "", slug: slug ?? "" }),
        enabled: Boolean(category && slug),
        retry: false,
    });
};

const feedbackKey = (id: string) => `help-feedback-${id}`;

const readReaction = (id: string): HelpReaction | null => {
    try {
        const value = window.localStorage.getItem(feedbackKey(id));
        return value === "yes" || value === "maybe" || value === "no" ? value : null;
    } catch {
        return null;
    }
};

export const useHelpFeedback = (id?: string) => {
    const [reaction, setReaction] = useState<HelpReaction | null>(null);
    const mutation = useMutation({ mutationFn: sendHelpFeedback });

    useEffect(() => {
        setReaction(id ? readReaction(id) : null);
    }, [id]);

    const send = (next: HelpReaction) => {
        if (!id || reaction) return;
        setReaction(next);
        mutation.mutate({ id, reaction: next });
        try {
            window.localStorage.setItem(feedbackKey(id), next);
        } catch {
            return;
        }
    };

    return { reaction, send };
};
