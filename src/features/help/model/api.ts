import { $api } from "@/shared/components/http";
import type { HelpArticle, HelpArticleSummary, HelpCategoryCount, HelpReaction } from "./types";

export const getHelpCategories = async (locale: string) =>
    (await $api.get<HelpCategoryCount[]>("/help/categories", { params: { locale } })).data;

export const getHelpArticles = async (params: { locale: string; category?: string; search?: string }) =>
    (await $api.get<HelpArticleSummary[]>("/help/articles", { params })).data;

export const getHelpArticle = async ({ locale, category, slug }: { locale: string; category: string; slug: string }) =>
    (await $api.get<HelpArticle>(`/help/categories/${encodeURIComponent(category)}/${encodeURIComponent(slug)}`, { params: { locale } })).data;

export const sendHelpFeedback = async ({ id, reaction }: { id: string; reaction: HelpReaction }) =>
    (await $api.post(`/help/articles/${id}/feedback`, { reaction })).data;
