import { RATE_NOTE_MAX } from "@/features/auth/model/types";
import IconUsa from "@/shared/components/svg/IconUsa";
import { IconInfo } from "@/shared/components/svg/UiIcons";
import { useId } from "react";
import type { UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { RadioCard, SelectField, SettingsSection, TextField } from "./SettingsFields";
import type { SettingsFormValues } from "./types";

interface HourlyRateSectionProps {
    register: UseFormRegister<SettingsFormValues>;
    rate: number;
    noteLength: number;
}

export default function HourlyRateSection({ register, rate, noteLength }: HourlyRateSectionProps) {
    const { t } = useTranslation("profile");
    const noteId = useId();

    return (
        <SettingsSection id="hourly-rate" title={t("hourlyRate.title")} description={t("hourlyRate.description")}>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <TextField
                    label={t("hourlyRate.rateLabel")}
                    prefix="$"
                    suffix={t("hourlyRate.perHour")}
                    hint={t("hourlyRate.rateHint")}
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step="1"
                    {...register("rate", { valueAsNumber: true, min: 0 })}
                />
                <SelectField label={t("hourlyRate.currencyLabel")} icon={<IconUsa className="h-5 w-5" />} defaultValue="USD">
                    <option value="USD">{t("hourlyRate.usd")}</option>
                </SelectField>
            </div>

            <h3 className="mt-6 text-lg font-semibold">{t("hourlyRate.rateType")}</h3>
            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                <RadioCard label={t("hourlyRate.standard")} description={t("hourlyRate.standardDesc")} value="STANDARD" {...register("rateType")} />
                <RadioCard
                    label={t("hourlyRate.from")}
                    description={t("hourlyRate.fromDesc", { rate: Number.isFinite(rate) && rate > 0 ? rate : "X" })}
                    value="FROM"
                    {...register("rateType")}
                />
            </div>

            <div className="mt-6 flex flex-col gap-1.5">
                <label htmlFor={noteId} className="text-sm leading-[26px]">
                    {t("hourlyRate.note")}
                </label>
                <div className="relative">
                    <textarea
                        id={noteId}
                        rows={4}
                        maxLength={RATE_NOTE_MAX}
                        placeholder={t("hourlyRate.notePlaceholder")}
                        className="w-full resize-none rounded-20 border border-main-10 bg-background px-15 pb-8 pt-3 text-sm outline-none transition-colors placeholder:text-main-50 focus:border-primary"
                        {...register("rateNote", { maxLength: RATE_NOTE_MAX })}
                    />
                    <span className="absolute bottom-3 right-4 text-xs text-main-50">
                        {noteLength}/{RATE_NOTE_MAX}
                    </span>
                </div>
            </div>

            <div className="mt-6 rounded-22 border border-primary/20 bg-primary/5 p-5 sm:p-6">
                <p className="flex items-center gap-2 font-semibold text-primary">
                    <IconInfo size={18} />
                    {t("hourlyRate.tipTitle")}
                </p>
                <p className="mt-3 text-sm leading-6 text-main-50">{t("hourlyRate.tipText")}</p>
            </div>
        </SettingsSection>
    );
}
