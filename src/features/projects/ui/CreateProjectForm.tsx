"use client";

import { useForm } from "@tanstack/react-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { useAuth } from "@/features/auth/model/useAuth";
import { Category } from "@/features/categories/model/types";
import { useCategoriesSearch } from "@/features/categories/model/useData";
import TipTapEditor from "@/shared/components/ui/TipTapEditor";
import { useState } from "react";
import { FormValues, schema } from "../model/schema";
import { useProjects } from "../model/useProjects";


export default function CreateProjectForm() {
    const { t } = useTranslation("common");

    const { createMutation } = useProjects();
    const { user } = useAuth();

    const [search, setSearch] = useState("");
    const [cachedCategoryTitles, setCachedCategoryTitles] = useState<Record<string, string>>({});

    const { data: categoriesResult } = useCategoriesSearch({
        search,
        page: 1,
        limit: 10,
    });

    const form = useForm({
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            categories: [] as string[],
        } satisfies FormValues,

        onSubmit: async ({ value }) => {
            const result = schema.safeParse(value);

            if (!result.success) {
                result.error.issues.forEach((issue) => {
                    toast.error(t(issue.message));
                });
                return;
            }

            try {
                await createMutation.mutateAsync({ ...result.data, clientId: user?.id! });

                toast.success(t("createProject.toast.success_created"));

                form.reset();
            } catch {
                toast.error(t("createProject.toast.error_creating"));
            }
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
            className="space-y-6 rounded-20 bg-bg-header p-6 shadow-input dark:bg-bg-modalDark"
        >
            <h2 className="text-2xl font-semibold text-text dark:text-text-dark">
                {t("createProject.form.heading")}
            </h2>

            <form.Field
                name="title"
                validators={{
                    onChange: ({ value }) => {
                        const res = schema.shape.title.safeParse(value);
                        return res.success ? undefined : t(res.error.issues[0]?.message as string);
                    },
                }}
                children={(field) => (
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            {t("createProject.form.title_label")}
                        </label>
                        <input
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className={`
                                w-full rounded-xl border px-4 py-3 text-text outline-none focus:ring-2 dark:bg-input-dark dark:text-text-dark bg-input
                                ${field.state.meta.errors.length > 0
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-border focus:ring-success"
                                }
                            `}
                            placeholder={t("createProject.form.title_placeholder")}
                        />
                        {field.state.meta.errors.length > 0 && (
                            <p className="mt-1 text-sm text-red-500">
                                {field.state.meta.errors[0]}
                            </p>
                        )}
                    </div>
                )}
            />

            <form.Field
                name="price"
                validators={{
                    onChange: ({ value }) => {
                        const res = schema.shape.price.safeParse(value);
                        return res.success ? undefined : t(res.error.issues[0]?.message as string);
                    },
                }}
                children={(field) => (
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            {t("createProject.form.price_label")}
                        </label>
                        <input
                            type="text"
                            inputMode="numeric"
                            value={field.state.value === 0 ? "" : field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => {
                                const onlyDigits = e.target.value.replace(/\D/g, "");
                                const parsedValue = onlyDigits ? parseInt(onlyDigits, 10) : 0;

                                field.handleChange(parsedValue);
                            }}
                            className={`
                                w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 dark:bg-input-dark dark:text-text-dark bg-input
                                ${field.state.meta.errors.length > 0
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-border focus:ring-success"
                                }
                            `}
                        />
                        {field.state.meta.errors.length > 0 && (
                            <p className="mt-1 text-sm text-red-500">
                                {field.state.meta.errors[0]}
                            </p>
                        )}
                    </div>
                )}
            />

            <form.Field
                name="categories"
                validators={{
                    onChange: ({ value }) => {
                        const res = schema.shape.categories.safeParse(value);
                        return res.success ? undefined : t(res.error.issues[0]?.message as string);
                    },
                }}
                children={(field) => {
                    const selectedCategories = field.state.value as string[];
                    return (
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                {t("createProject.form.categories_label")}
                            </label>
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder={t("createProject.form.categories_placeholder")}
                                className={`
                                    mb-3 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 dark:bg-input-dark dark:text-text-dark bg-input
                                    ${field.state.meta.errors.length > 0
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-border focus:ring-success"
                                    }
                                `}
                            />

                            {selectedCategories.length > 0 && (
                                <div className="mb-3 flex flex-wrap gap-2">
                                    {selectedCategories.map((id) => {
                                        const category = categoriesResult?.items?.find(
                                            (item: Category) => item.id === id
                                        );
                                        const displayTitle = category?.title ?? cachedCategoryTitles[id] ?? id;

                                        return (
                                            <button
                                                key={id}
                                                type="button"
                                                onClick={() =>
                                                    field.handleChange(
                                                        field.state.value.filter((categoryId) => categoryId !== id)
                                                    )
                                                }
                                                className="rounded-full bg-success px-3 py-1 text-sm text-white"
                                            >
                                                {displayTitle} ✕
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            {search.length > 1 && categoriesResult?.items?.length > 0 && (
                                <div className="max-h-60 overflow-y-auto rounded-xl border border-border bg-input dark:bg-input-dark">
                                    {categoriesResult.items.map((category: Category) => {
                                        const selected = field.state.value.includes(category.id);
                                        return (
                                            <button
                                                key={category.id}
                                                type="button"
                                                disabled={selected || field.state.value.length >= 3}
                                                onClick={() => {
                                                    setCachedCategoryTitles((prev) => ({
                                                        ...prev,
                                                        [category.id]: category.title,
                                                    }));
                                                    field.handleChange([...field.state.value, category.id]);
                                                    setSearch("");
                                                }}
                                                className="block w-full px-4 py-3 text-left hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                {category.title}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            <div className="mt-2 flex items-center justify-between text-sm">
                                {field.state.meta.errors.length > 0 ? (
                                    <span className="text-red-500">
                                        {field.state.meta.errors[0]}
                                    </span>
                                ) : (
                                    <span className="text-text-muted">
                                        {t("createProject.form.categories_hint")}
                                    </span>
                                )}
                                <span className="text-text-muted">
                                    {t("createProject.form.selected")}: {field.state.value.length}/3
                                </span>
                            </div>
                        </div>
                    );
                }}
            />

            <form.Field
                name="description"
                validators={{
                    onChange: ({ value }) => {
                        const res = schema.shape.description.safeParse(value);
                        return res.success ? undefined : t(res.error.issues[0]?.message as string);
                    },
                }}
                children={(field) => (
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            {t("createProject.form.description_label")}
                        </label>
                        <div className={field.state.meta.errors.length > 0 ? "rounded-xl border border-red-500" : ""}>
                            <TipTapEditor
                                value={field.state.value}
                                onChange={(html) => field.handleChange(html)}
                            />
                        </div>
                        {field.state.meta.errors.length > 0 && (
                            <p className="mt-1 text-sm text-red-500">
                                {field.state.meta.errors[0]}
                            </p>
                        )}
                    </div>
                )}
            />

            <button
                type="submit"
                disabled={createMutation.isPending}
                className="w-full rounded-xl bg-gradient px-6 py-3 font-medium text-white disabled:opacity-50"
            >
                {createMutation.isPending
                    ? t("createProject.form.button_creating")
                    : t("createProject.form.button_create")}
            </button>
        </form>
    );
}