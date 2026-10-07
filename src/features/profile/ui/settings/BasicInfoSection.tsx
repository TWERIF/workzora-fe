import type { User } from "@/features/auth/model/types";
import { useUsers } from "@/features/users/model/useUsers";
import { IconMail, IconPhone, IconTrash, IconUpload, IconUser } from "@/shared/components/svg/UiIcons";
import { countryOptions } from "@/shared/utils/countries";
import { useMemo, useRef, type ChangeEvent } from "react";
import type { UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SelectField, SettingsSection, TextField } from "./SettingsFields";
import type { SettingsFormValues } from "./types";

const MAX_AVATAR_BYTES = 4 * 1024 * 1024;

export default function BasicInfoSection({ user, register }: { user: User; register: UseFormRegister<SettingsFormValues> }) {
    const { t, i18n } = useTranslation("profile");
    const { uploadAvatarMutation, removeAvatarMutation } = useUsers();
    const fileInput = useRef<HTMLInputElement>(null);
    const countries = useMemo(() => countryOptions(i18n.language), [i18n.language]);

    const changeAvatar = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        event.target.value = "";
        if (!file || file.size > MAX_AVATAR_BYTES || !/^image\/(jpeg|png)$/.test(file.type)) return;
        uploadAvatarMutation.mutate(file);
    };

    return (
        <SettingsSection id="basic-info" title={t("basicInfo.title")}>
            <div className="rounded-[24px] bg-main-5 p-5 sm:p-6">
                <h3 className="text-lg font-semibold sm:text-xl">{t("basicInfo.photo")}</h3>
                <div className="mt-4 flex flex-wrap items-center gap-4 sm:gap-6">
                    <div className="flex h-[100px] w-[100px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-background text-main-50">
                        {user.avatarUrl ? (
                            <img src={user.avatarUrl} alt="" className="h-full w-full object-cover" />
                        ) : (
                            <IconUser size={40} />
                        )}
                    </div>
                    <div className="min-w-0">
                        <p className="text-base font-medium">{t("basicInfo.uploadTitle")}</p>
                        <p className="text-sm text-main-50">{t("basicInfo.uploadHint")}</p>
                    </div>
                    <input ref={fileInput} type="file" accept="image/jpeg,image/png" className="hidden" onChange={changeAvatar} />
                    <button
                        type="button"
                        onClick={() => fileInput.current?.click()}
                        disabled={uploadAvatarMutation.isPending}
                        className="flex h-[45px] items-center gap-2 rounded-full border border-primary px-[30px] text-sm transition-colors hover:bg-primary-10 disabled:opacity-60"
                    >
                        <IconUpload size={16} className="text-primary" />
                        {t("basicInfo.upload")}
                    </button>
                    {user.avatarUrl && (
                        <button
                            type="button"
                            onClick={() => removeAvatarMutation.mutate()}
                            disabled={removeAvatarMutation.isPending}
                            className="flex flex-col items-center gap-1.5 text-xs text-main-50 transition-colors hover:text-status-danger disabled:opacity-60 sm:ml-auto"
                        >
                            <span className="flex h-[45px] w-[45px] items-center justify-center rounded-[10px] border border-status-danger/20 bg-status-dangerSoft text-status-danger">
                                <IconTrash size={18} />
                            </span>
                            {t("basicInfo.delete")}
                        </button>
                    )}
                </div>
            </div>

            <h3 className="mt-6 text-lg font-semibold sm:text-xl">{t("basicInfo.general")}</h3>
            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                <TextField label={t("basicInfo.firstName")} required icon={<IconUser />} autoComplete="given-name" {...register("firstName", { required: true })} />
                <TextField label={t("basicInfo.lastName")} icon={<IconUser />} autoComplete="family-name" {...register("lastName")} />
                <TextField
                    label={t("basicInfo.jobTitle")}
                    required
                    icon={<IconUser />}
                    autoComplete="username"
                    wrapperClassName="md:col-span-2"
                    {...register("username", { required: true })}
                />
                <TextField label={t("basicInfo.email")} required type="email" icon={<IconMail />} autoComplete="email" {...register("email", { required: true })} />
                <TextField label={t("basicInfo.phone")} required type="tel" icon={<IconPhone />} autoComplete="tel" {...register("phone")} />
                <SelectField label={t("basicInfo.country")} required {...register("country")}>
                    <option value="">{t("basicInfo.selectCountry")}</option>
                    {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                            {country.name}
                        </option>
                    ))}
                </SelectField>
                <TextField label={t("basicInfo.city")} placeholder={t("basicInfo.cityPlaceholder")} autoComplete="address-level2" {...register("city")} />
            </div>
        </SettingsSection>
    );
}
