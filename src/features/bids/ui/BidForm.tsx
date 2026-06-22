"use client";

import { useForm } from "@tanstack/react-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import TipTapEditor from "@/shared/components/ui/TipTapEditor";
import { BidFormValues, getBidSchema } from "../model/schema";
import { useCreateBid, useUpdateBid } from "../model/useBids";

interface BidFormProps {
    projectId: string;
    projectPrice: number;
    isOpen: boolean;
    onClose: () => void;
    initialData?: {
        id: string;
        price: number;
        time: number;
        description: string;
    };
    onSuccess?: () => void;
}

export default function BidForm({ projectId, projectPrice, isOpen, onClose, initialData, onSuccess }: BidFormProps) {
    const { t } = useTranslation("common");

    const createMutation = useCreateBid();
    const updateMutation = useUpdateBid();

    const isEditing = !!initialData;
    const schema = getBidSchema(projectPrice);

    const form = useForm({
        defaultValues: {
            price: initialData?.price || projectPrice,
            time: initialData?.time || 1,
            description: initialData?.description || "",
        } satisfies BidFormValues,

        onSubmit: async ({ value }) => {
            const result = schema.safeParse(value);

            if (!result.success) {
                result.error.issues.forEach((issue) => {
                    toast.error(t(issue.message));
                });
                return;
            }

            try {
                if (isEditing) {
                    await updateMutation.mutateAsync({
                        id: initialData.id,
                        data: result.data
                    });
                    toast.success(t("bidForm.toast.success_updated"));
                } else {
                    await createMutation.mutateAsync({
                        ...result.data,
                        projectId
                    });
                    toast.success(t("bidForm.toast.success_created"));
                }

                form.reset();
                onClose();
                onSuccess?.();
            } catch {
                toast.error(t("bidForm.toast.error_saving"));
            }
        },
    });

    const isPending = createMutation.isPending || updateMutation.isPending;

    return (
        <div className="w-full">
            <div
                className={`grid transition-all duration-500 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0"
                    }`}
            >
                <div className="overflow-hidden">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit();
                        }}
                        // Додано dark:shadow-input-dark
                        className="space-y-6 rounded-20 bg-bg-header p-6 shadow-input dark:shadow-input-dark dark:bg-bg-modalDark border border-border transition-colors"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-semibold text-text dark:text-text-dark">
                                {isEditing ? t("bidForm.heading_edit") : t("bidForm.heading_create")}
                            </h2>
                            <button
                                type="button"
                                onClick={onClose}
                                className="text-text-muted hover:text-text dark:hover:text-text-dark transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                                        <label className="mb-2 block text-sm font-medium text-text dark:text-text-dark">
                                            {t("bidForm.price_label")} (Min: {projectPrice})
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
                                            // Додано text-text
                                            className={`
                                                w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 dark:bg-input-dark text-text dark:text-text-dark bg-input transition-colors
                                                ${field.state.meta.errors.length > 0
                                                    ? "border-error focus:ring-error"
                                                    : "border-border focus:ring-success"
                                                }
                                            `}
                                        />
                                        {field.state.meta.errors.length > 0 && (
                                            <p className="mt-1 text-sm text-error">
                                                {field.state.meta.errors[0]}
                                            </p>
                                        )}
                                    </div>
                                )}
                            />

                            <form.Field
                                name="time"
                                validators={{
                                    onChange: ({ value }) => {
                                        const res = schema.shape.time.safeParse(value);
                                        return res.success ? undefined : t(res.error.issues[0]?.message as string);
                                    },
                                }}
                                children={(field) => (
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-text dark:text-text-dark">
                                            {t("bidForm.time_label")}
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
                                            // Додано text-text
                                            className={`
                                                w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 dark:bg-input-dark text-text dark:text-text-dark bg-input transition-colors
                                                ${field.state.meta.errors.length > 0
                                                    ? "border-error focus:ring-error"
                                                    : "border-border focus:ring-success"
                                                }
                                            `}
                                            placeholder={t("bidForm.time_placeholder")}
                                        />
                                        {field.state.meta.errors.length > 0 && (
                                            <p className="mt-1 text-sm text-error">
                                                {field.state.meta.errors[0]}
                                            </p>
                                        )}
                                    </div>
                                )}
                            />
                        </div>

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
                                    <label className="mb-2 block text-sm font-medium text-text dark:text-text-dark">
                                        {t("bidForm.description_label")}
                                    </label>
                                    <div className={field.state.meta.errors.length > 0 ? "rounded-xl border border-error" : ""}>
                                        <TipTapEditor
                                            value={field.state.value}
                                            onChange={(html) => field.handleChange(html)}
                                        />
                                    </div>
                                    {field.state.meta.errors.length > 0 && (
                                        <p className="mt-1 text-sm text-error">
                                            {field.state.meta.errors[0]}
                                        </p>
                                    )}
                                </div>
                            )}
                        />

                        <div className="flex gap-4 pt-2">
                            <button
                                type="button"
                                onClick={() => {
                                    form.reset();
                                    onClose();
                                }}
                                className="w-1/3 rounded-xl border border-border px-6 py-3 font-medium text-text dark:text-text-dark hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                            >
                                {t("bidForm.button_cancel")}
                            </button>
                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-2/3 rounded-xl bg-gradient px-6 py-3 font-medium text-white disabled:opacity-50 transition-opacity"
                            >
                                {isPending
                                    ? t("bidForm.button_saving")
                                    : isEditing
                                        ? t("bidForm.button_update")
                                        : t("bidForm.button_submit")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}