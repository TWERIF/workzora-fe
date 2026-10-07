import { Availability, type User } from "@/features/auth/model/types";
import { useMyPortfolios } from "@/features/portfolio/model/usePortfolio";
import { useUsers } from "@/features/users/model/useUsers";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { calcProfileCompletion } from "../model/completion";
import ProfileCompletionCard from "./ProfileCompletionCard";
import ProfileNavigation from "./ProfileNavigation";
import BasicInfoSection from "./settings/BasicInfoSection";
import HourlyRateSection from "./settings/HourlyRateSection";
import PortfolioSettingsSection from "./settings/PortfolioSettingsSection";
import SettingsTabs from "./settings/SettingsTabs";
import SkillsSection from "./settings/SkillsSection";
import type { SettingsFormValues } from "./settings/types";
import WorkPreferencesSection from "./settings/WorkPreferencesSection";

const toFormValues = (user: User): SettingsFormValues => ({
  firstName: user.firstName ?? "",
  lastName: user.lastName ?? "",
  username: user.username ?? "",
  email: user.email ?? "",
  phone: user.phone ?? "",
  country: user.country ?? "",
  city: user.city ?? "",
  skills: user.skills ?? [],
  rate: Number(user.rate) || 0,
  rateType: user.rateType ?? "STANDARD",
  rateNote: user.rateNote ?? "",
  availability: user.availability ?? Availability.AVAILABLE,
  projectType: user.projectType ?? "",
  budgetRange: user.budgetRange ?? "",
  workFormat: user.workFormat ?? "",
});

const toPayload = (values: SettingsFormValues, isFreelancer: boolean): Partial<User> => {
  const base: Partial<User> = {
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    username: values.username.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    country: values.country,
    city: values.city.trim(),
  };
  if (!isFreelancer) return base;
  return {
    ...base,
    skills: values.skills,
    rate: Number.isFinite(values.rate) ? values.rate : 0,
    rateType: values.rateType,
    rateNote: values.rateNote.trim(),
    availability: values.availability,
    ...(values.projectType && { projectType: values.projectType }),
    ...(values.budgetRange && { budgetRange: values.budgetRange }),
    ...(values.workFormat && { workFormat: values.workFormat }),
  };
};

export default function ProfileSettings({ user }: { user: User }) {
  const { t } = useTranslation("profile");
  const { locale = "en" } = useRouter();
  const { updateMutaion } = useUsers();
  const { data: portfolios = [] } = useMyPortfolios();
  const isFreelancer = user.role === "freelancer";

  const defaultValues = useMemo(() => toFormValues(user), [user]);
  const { register, handleSubmit, setValue, watch } = useForm<SettingsFormValues>({ values: defaultValues });

  const skills = watch("skills");
  const rate = watch("rate");
  const rateNote = watch("rateNote");
  const progress = calcProfileCompletion({ ...user, ...toPayload(watch(), isFreelancer) }, portfolios.length);

  const tabs = [
    { id: "basic-info", label: t("nav.basicInfo") },
    ...(isFreelancer
      ? [
          { id: "skills", label: t("nav.skills") },
          { id: "hourly-rate", label: t("nav.hourlyRate") },
          { id: "portfolio", label: t("nav.portfolio", { count: portfolios.length }) },
          { id: "work-preferences", label: t("nav.workPreferences") },
        ]
      : []),
  ];

  const save = handleSubmit((values) =>
    updateMutaion.mutate(toPayload(values, isFreelancer), {
      onSuccess: () => toast.success(t("settingsSaved")),
      onError: () => toast.error(t("settingsError")),
    }),
  );

  return (
    <div
      className="mx-auto grid w-full max-w-[1358px] grid-cols-1 gap-[30px] px-4 pb-[100px] pt-24 text-main-100 lg:grid-cols-[minmax(0,1fr)_317px] lg:items-start lg:pt-[171px]"
    >
      <div className="flex min-w-0 flex-col gap-6">
        {tabs.length > 1 && <SettingsTabs items={tabs} />}
        <BasicInfoSection user={user} register={register} />
        {isFreelancer && (
          <>
            <SkillsSection skills={skills} onChange={(next) => setValue("skills", next, { shouldDirty: true })} />
            <HourlyRateSection register={register} rate={rate} noteLength={rateNote.length} />
            <PortfolioSettingsSection />
            <WorkPreferencesSection register={register} />
          </>
        )}
      </div>

      <aside className="flex flex-col gap-3 lg:sticky lg:top-[112px]">
        <ProfileNavigation activeHref="/profile" />
        <ProfileCompletionCard
          progress={progress}
          actions={
            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => void save()}
                disabled={updateMutaion.isPending}
                className="h-[45px] w-full rounded-full bg-gradient text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {t("completion.action")}
              </button>
              <Link
                href={`/${locale}/public-profile/${user.id}`}
                className="flex h-[45px] w-full items-center justify-center rounded-full border border-primary text-sm text-primary transition-colors hover:bg-primary-10"
              >
                {t("completion.publicProfile")}
              </Link>
            </div>
          }
        />
      </aside>
    </div>
  );
}
