import { Availability, BUDGET_RANGES, PROJECT_TYPES, WORK_FORMATS } from "@/features/auth/model/types";
import type { UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { RadioChoice, SettingsSection } from "./SettingsFields";
import type { SettingsFormValues } from "./types";

const AVAILABILITY_OPTIONS = [
    { value: Availability.AVAILABLE, key: "availableNow" },
    { value: Availability.OPENTOOFFERS, key: "openToOffers" },
    { value: Availability.BUSY, key: "busy" },
    { value: Availability.NOTAVAILABLE, key: "notAvailable" },
];

function Group({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <fieldset>
            <legend className="text-lg font-semibold">{title}</legend>
            <div className="mt-3 flex flex-col gap-2.5">{children}</div>
        </fieldset>
    );
}

export default function WorkPreferencesSection({ register }: { register: UseFormRegister<SettingsFormValues> }) {
    const { t } = useTranslation("profile");

    return (
        <SettingsSection id="work-preferences" title={t("workPreferences.title")} description={t("workPreferences.description")}>
            <div className="flex flex-col gap-6">
                <Group title={t("workPreferences.availability")}>
                    {AVAILABILITY_OPTIONS.map((option) => (
                        <RadioChoice key={option.value} label={t(`workPreferences.${option.key}`)} value={option.value} {...register("availability")} />
                    ))}
                </Group>
                <Group title={t("workPreferences.projectType")}>
                    {PROJECT_TYPES.map((value) => (
                        <RadioChoice key={value} label={t(`workPreferences.${value}`)} value={value} {...register("projectType")} />
                    ))}
                </Group>
                <Group title={t("workPreferences.budgetRange")}>
                    {BUDGET_RANGES.map((value) => (
                        <RadioChoice key={value} label={t(`workPreferences.${value}`)} value={value} {...register("budgetRange")} />
                    ))}
                </Group>
                <Group title={t("workPreferences.workFormat")}>
                    {WORK_FORMATS.map((value) => (
                        <RadioChoice key={value} label={t(`workPreferences.${value}`)} value={value} {...register("workFormat")} />
                    ))}
                </Group>
            </div>
        </SettingsSection>
    );
}
