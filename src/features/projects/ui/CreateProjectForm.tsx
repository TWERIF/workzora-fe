"use client";

import { useForm } from "@tanstack/react-form";
import type { ComponentType, SVGProps } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { useAuth } from "@/features/auth/model/useAuth";

import TipTapEditor from "@/shared/components/ui/TipTapEditor";

import { FormValues, schema } from "../model/schema";
import { useProjects } from "../model/useProjects";
import CategoryPicker from "./CategoryPicker";

import ChevronDownIcon from "@/shared/components/svg/ChevronDownIcon";
import UsFlagIcon from "@/shared/components/svg/UsFlagIcon";
import { fieldClass, groupFieldClass, labelClass } from "../model/fieldStyles";
import ProjectBriefChecklist from "./ProjectBriefChecklist";

interface Currency {
    code: string;
    symbol: string;
    Flag: ComponentType<SVGProps<SVGSVGElement>>;
}

const USD: Currency = { code: "USD", symbol: "$", Flag: UsFlagIcon };
const CURRENCIES: Currency[] = [USD];

function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return (
        <p role="alert" className="mt-1.5 text-xs text-error">
            {message}
        </p>
    );
}

export default function CreateProjectForm() {
    const { t } = useTranslation("createProject");
    const tError = (message?: string) =>
        message ? t(message, { ns: ["common", "createProject"] }) : "";

    const { createMutation } = useProjects();
    const { user } = useAuth();

    const [currencyCode, setCurrencyCode] = useState(USD.code);
    const currency = CURRENCIES.find((item) => item.code === currencyCode) ?? USD;

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
                    toast.error(tError(issue.message));
                });
                return;
            }

            try {
                await createMutation.mutateAsync({ ...result.data, clientId: user?.id! });

                toast.success(t("toast.success_created"));

                form.reset();
            } catch {
                toast.error(t("toast.error_creating"));
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
            className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_316px]"
        >
            <div className="min-w-0">
                <h1 className="mb-8 text-3xl font-bold text-text dark:text-text-dark sm:text-[40px] sm:leading-tight">
                    {t("form.heading")}
                </h1>

                <div className="space-y-6">
                    <form.Field
                        name="title"
                        validators={{
                            onChange: ({ value }) => {
                                const res = schema.shape.title.safeParse(value);
                                return res.success ? undefined : tError(res.error.issues[0]?.message);
                            },
                        }}
                        children={(field) => {
                            const error = field.state.meta.errors[0];
                            return (
                                <div>
                                    <label htmlFor={field.name} className={labelClass}>
                                        {t("form.title_label")}
                                    </label>
                                    <input
                                        id={field.name}
                                        type="text"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder={t("form.title_placeholder")}
                                        aria-invalid={Boolean(error)}
                                        className={`${fieldClass(Boolean(error))} h-[50px] px-4`}
                                    />
                                    <FieldError message={error} />
                                </div>
                            );
                        }}
                    />

                    {/* Бюджет + валюта */}
                    <div className="grid items-start gap-x-3 gap-y-6 sm:grid-cols-2">
                        <form.Field
                            name="price"
                            validators={{
                                onChange: ({ value }) => {
                                    const res = schema.shape.price.safeParse(value);
                                    return res.success ? undefined : tError(res.error.issues[0]?.message);
                                },
                            }}
                            children={(field) => {
                                const error = field.state.meta.errors[0];
                                return (
                                    <div>
                                        <label htmlFor={field.name} className={labelClass}>
                                            {t("form.price_label")}
                                        </label>
                                        <div className={groupFieldClass(Boolean(error))}>
                                            <span className="flex w-12 shrink-0 items-center justify-center border-r border-inherit text-lg">
                                                {currency.symbol}
                                            </span>
                                            <input
                                                id={field.name}
                                                type="text"
                                                inputMode="numeric"
                                                value={field.state.value === 0 ? "" : field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => {
                                                    const onlyDigits = e.target.value.replace(/\D/g, "");
                                                    const parsedValue = onlyDigits ? parseInt(onlyDigits, 10) : 0;

                                                    field.handleChange(parsedValue);
                                                }}
                                                aria-invalid={Boolean(error)}
                                                className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none"
                                            />
                                        </div>
                                        {error ? (
                                            <FieldError message={error} />
                                        ) : (
                                            <p className="mt-2 text-xs text-text-muted">
                                                {t("form.price_hint")}
                                            </p>
                                        )}
                                    </div>
                                );
                            }}
                        />

                        <div>
                            <label htmlFor="currency" className={labelClass}>
                                {t("form.currency_label")}
                            </label>
                            <div className="relative">
                                <currency.Flag className="pointer-events-none absolute left-[15px] top-1/2 h-4 w-[22px] -translate-y-1/2" />
                                <select
                                    id="currency"
                                    value={currency.code}
                                    onChange={(e) => setCurrencyCode(e.target.value)}
                                    className={`${fieldClass(false)} h-[50px] cursor-pointer appearance-none pl-[43px] pr-10`}
                                >
                                    {CURRENCIES.map((item) => (
                                        <option key={item.code} value={item.code}>
                                            {t(`form.currency_options.${item.code}`)}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 h-2 w-3 -translate-y-1/2 text-text dark:text-text-dark" />
                            </div>
                        </div>
                    </div>

                    <form.Field
                        name="categories"
                        validators={{
                            onChange: ({ value }) => {
                                const res = schema.shape.categories.safeParse(value);
                                return res.success ? undefined : tError(res.error.issues[0]?.message);
                            },
                        }}
                        children={(field) => (
                            <CategoryPicker
                                value={field.state.value as string[]}
                                onChange={field.handleChange}
                                error={field.state.meta.errors[0]}
                            />
                        )}
                    />

                    <form.Field
                        name="description"
                        validators={{
                            onChange: ({ value }) => {
                                const res = schema.shape.description.safeParse(value);
                                return res.success ? undefined : tError(res.error.issues[0]?.message);
                            },
                        }}
                        children={(field) => {
                            const error = field.state.meta.errors[0];
                            return (
                                <div>
                                    <span className={labelClass}>{t("form.description_label")}</span>
                                    <div className={error ? "rounded-20 border border-error" : ""}>
                                        <TipTapEditor
                                            value={field.state.value}
                                            onChange={(html) => field.handleChange(html)}
                                        />
                                    </div>
                                    <FieldError message={error} />
                                </div>
                            );
                        }}
                    />
                </div>
            </div>

            {/* Права колонка: чекліст + кнопка відправки */}
            <ProjectBriefChecklist isPending={createMutation.isPending} />
        </form>
    );
}
