import { Availability, PreferredBudgetType, PreferredProjectSize, User, UserRole, WorkType } from "@/features/auth/model/types";
import { useAuth } from "@/features/auth/model/useAuth";
import VerificationBlock from "@/features/kyc/ui/VerificationBlock";
import { PortfolioItem } from "@/features/portfolio/model/types";
import { useCreatePortfolio, useDeletePortfolio, useUpdatePortfolio, useMyPortfolios } from "@/features/portfolio/model/usePortfolio";
import PortfolioModal from "@/features/portfolio/ui/PortfolioModal";
import { useUsers } from "@/features/users/model/useUsers";
import IconUsa from "@/shared/components/svg/IconUsa";
import ButtonGradient from "@/shared/components/ui/Button/ButtonGradient";
import Loader from "@/shared/components/ui/Loader";
import StickyNav from "@/shared/components/ui/StickyNav";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export default function ProfileSettings() {
  const { t } = useTranslation("profile");
  const { user, logout } = useAuth();
  const { updateMutaion, uploadAvatarMutation } = useUsers();
  const router = useRouter();
  const locale = router.locale || "en";

  const [skillInput, setSkillInput] = useState("");

  const { data: portfolios, isLoading: isLoadingList } = useMyPortfolios();
  const createMutation = useCreatePortfolio();
  const updateMutationPortfolio = useUpdatePortfolio();
  const deleteMutation = useDeletePortfolio();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleAvatarChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    uploadAvatarMutation.mutate(file);

    e.target.value = "";
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const onPortfolioSubmit = (formData: FormData) => {
    if (user?.id) {
      formData.append("userId", user.id);
    }

    if (editingItem) {
      formData.append("id", editingItem.id);
      updateMutationPortfolio.mutate(formData as any, {
        onSuccess: () => setIsModalOpen(false)
      });
    } else {
      createMutation.mutate(formData as any, {
        onSuccess: () => setIsModalOpen(false)
      });
    }
  };

  const { register, handleSubmit, setValue, watch, formState: { isSubmitting } } = useForm<Partial<User>>({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      skills: [],
      rate: 0,
      workType: WorkType.FULLTIME,
      availability: Availability.AVAILABLE,
      preferredBudgetType: PreferredBudgetType.HOURLY,
      preferredProjectSize: PreferredProjectSize.MEDIUM,
      phone: "",
      country: "",
      city: ""
    },
    values: user ? {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      username: user.username || "",
      email: user.email || "",
      skills: user.skills || [],
      rate: user.rate || 0,
      workType: user.workType || WorkType.FULLTIME,
      availability: user.availability || Availability.AVAILABLE,
      preferredBudgetType: user.preferredBudgetType || PreferredBudgetType.HOURLY,
      preferredProjectSize: user.preferredProjectSize || PreferredProjectSize.MEDIUM,
      phone: user.phone || "",
      country: user.country || "",
      city: user.city || ""
    } : undefined
  });

  const currentSkills = (watch("skills") as string[]) || [];

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newSkill = skillInput.trim();

      if (newSkill && !currentSkills.includes(newSkill)) {
        setValue("skills", [...currentSkills, newSkill], { shouldDirty: true });
        setSkillInput("");
      }
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setValue("skills", currentSkills.filter(skill => skill !== skillToRemove), { shouldDirty: true });
  };

  const onSubmit = (data: Partial<User>) => {
    updateMutaion.mutate(data);
  };

  const countComplience = () => {
    const formValues = watch();

    let filledFields = 0;
    const totalFields = 9;

    if (formValues.firstName?.trim()) filledFields++;
    if (formValues.lastName?.trim()) filledFields++;
    if (formValues.username?.trim()) filledFields++;
    if (formValues.email?.trim()) filledFields++;
    if (formValues.phone?.trim()) filledFields++;
    if (formValues.country?.trim()) filledFields++;
    if (formValues.city?.trim()) filledFields++;

    if (formValues.skills && formValues.skills.length > 0) filledFields++;

    if (formValues.rate && formValues.rate > 0) filledFields++;

    const baseProgress = Math.round((filledFields / totalFields) * 85);

    const portfolioBonus = (portfolios?.length || 0) >= 5 ? 15 : 0;

    return Math.min(baseProgress + portfolioBonus, 100);
  }

  const progressPercentage = countComplience();

  const navItems = [
    { id: "basic-info", label: t("nav.basicInfo") },
    { id: "skills", label: t("nav.skills") },
    { id: "hourly-rate", label: t("nav.hourlyRate") },
    { id: "portfolio", label: t("nav.portfolio") },
    { id: "work-preferences", label: t("nav.workPreferences") },
  ];
  if (!user) return <Loader />;
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.target instanceof HTMLElement && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
          }
        }}
        className="max-w-7xl mx-auto px-4 py-8 min-h-screen relative text-text dark:text-text-dark"
      >
        <StickyNav items={user?.role === "freelancer" ? navItems : navItems.filter((item) => item.id == "basic-info")} offset={120} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">

          <div className="lg:col-span-8 xl:col-span-9 space-y-12">

            <section id="basic-info" className="scroll-mt-32">
              <h2 className="text-2xl font-bold mb-6">{t("basicInfo.title")}</h2>

              <div className="bg-white dark:bg-bg-modalDark p-6 rounded-20 shadow-sm border border-border mb-6">
                <h3 className="font-semibold mb-4">{t("basicInfo.photo")}</h3>

                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-bg dark:bg-bg-dark flex items-center justify-center">
                    {user?.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Icon icon="lucide:user-round" className="text-3xl text-text-muted" />
                    )}
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadAvatarMutation.isPending}
                      className="flex items-center gap-2 px-4 py-2 bg-transparent border border-success text-success rounded-full hover:bg-success/10 transition-colors disabled:opacity-50"
                    >
                      {uploadAvatarMutation.isPending ? (
                        <Icon icon="eos-icons:loading" />
                      ) : (
                        <Icon icon="mynaui:upload" />
                      )}

                      {t("basicInfo.upload")}
                    </button>

                    <button
                      type="button"
                      className="flex items-center gap-2 px-4 py-2 text-error hover:bg-error/10 rounded-full transition-colors"
                    >
                      <Icon icon="mynaui:trash" />
                      {t("basicInfo.delete")}
                    </button>
                  </div>
                </div>
              </div>

              {/* Загальна інформація */}
              <div className="bg-white dark:bg-bg-modalDark p-6 rounded-20 shadow-sm border border-border">
                <h3 className="font-semibold mb-4">{t("basicInfo.general")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-text-muted">{t("basicInfo.firstName")} *</label>
                    <div className="relative">
                      <Icon icon="lucide:user-round" className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                      <input {...register("firstName", { required: true })} type="text" className="w-full pl-10 pr-4 py-2.5 rounded-20 border border-border bg-input dark:bg-input-dark focus:ring-2 focus:ring-success outline-none" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-text-muted">{t("basicInfo.lastName")} *</label>
                    <div className="relative">
                      <Icon icon="lucide:user-round" className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                      <input {...register("lastName", { required: true })} type="text" className="w-full pl-10 pr-4 py-2.5 rounded-20 border border-border bg-input dark:bg-input-dark focus:ring-2 focus:ring-success outline-none" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="text-sm font-medium text-text-muted">{t("basicInfo.jobTitle")} *</label>
                    <div className="relative">
                      <Icon icon="lucide:user-round" className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                      <input {...register("username")} type="text" className="w-full pl-10 pr-4 py-2.5 rounded-20 border border-border bg-input dark:bg-input-dark focus:ring-2 focus:ring-success outline-none" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-text-muted">{t("basicInfo.email")} *</label>
                    <div className="relative">
                      <Icon icon="heroicons:envelope" className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                      <input {...register("email", { required: true })} type="email" className="w-full pl-10 pr-4 py-2.5 rounded-20 border border-border bg-input dark:bg-input-dark focus:ring-2 focus:ring-success outline-none" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-text-muted">{t("basicInfo.phone")} *</label>
                    <div className="relative">
                      <Icon icon="solar:phone-outline" className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                      <input {...register("phone")} type="tel" className="w-full pl-10 pr-4 py-2.5 rounded-20 border border-border bg-input dark:bg-input-dark focus:ring-2 focus:ring-success outline-none" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-text-muted">{t("basicInfo.country")} *</label>
                    <select {...register("country")} className="w-full px-4 py-2.5 rounded-20 border border-border bg-input dark:bg-input-dark focus:ring-2 focus:ring-success outline-none appearance-none">
                      <option value="">{t("basicInfo.selectCountry")}</option>
                      <option value="UA">Ukraine</option>
                      <option value="US">United States</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-text-muted">{t("basicInfo.city")} *</label>
                    <select {...register("city")} className="w-full px-4 py-2.5 rounded-20 border border-border bg-input dark:bg-input-dark focus:ring-2 focus:ring-success outline-none appearance-none">
                      <option value="">{t("basicInfo.selectCity")}</option>
                      <option value="Kyiv">Kyiv</option>
                      <option value="Lviv">Lviv</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>
            {user?.role === "freelancer" &&
              <>
                <section id="skills" className="scroll-mt-32">
                  <h2 className="text-2xl font-bold mb-6">{t("skills.title")}</h2>
                  <div className="bg-white dark:bg-bg-modalDark p-6 rounded-20 shadow-sm border border-border">
                    <p className="text-sm text-text-muted mb-4">{t("skills.description")}</p>

                    {/* Інпут більше не використовує register, він контролюється локально */}
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={handleSkillKeyDown}
                      placeholder={t("skills.placeholder", "React, Node.js, Design...")}
                      className="w-full px-4 py-2.5 rounded-20 border border-border bg-input dark:bg-input-dark focus:ring-2 focus:ring-success outline-none mb-4"
                    />

                    {/* Відображення списку доданих навичок */}
                    {currentSkills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {currentSkills.map((skill, index) => (
                          <span
                            key={index}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-bg dark:bg-bg-dark border border-border rounded-full text-sm"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="text-text-muted hover:text-error transition-colors flex items-center justify-center"
                              aria-label={`Remove ${skill}`}
                            >
                              <Icon icon="lucide:x" className="w-4 h-4" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
                <section id="hourly-rate" className="scroll-mt-32">
                  <h2 className="text-2xl font-bold mb-6">{t("hourlyRate.title")}</h2>
                  <div className="bg-white dark:bg-bg-modalDark p-6 rounded-20 shadow-sm border border-border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-text-muted">{t("hourlyRate.rateLabel")}</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-medium">$</span>
                          <input {...register("rate", { valueAsNumber: true })} type="number" min={0} step="0.1" className="w-full pl-8 pr-4 py-2.5 rounded-20 border border-border bg-input dark:bg-input-dark focus:ring-2 focus:ring-success outline-none" placeholder="0.00" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-text-muted">{t("hourlyRate.currencyLabel")}</label>
                        <div className="relative flex items-center border border-border rounded-20 px-4 py-2.5 bg-input dark:bg-input-dark">
                          <IconUsa className="w-5 h-5 mr-2" />
                          <select className="w-full bg-transparent focus:outline-none appearance-none pointer-events-none">
                            <option value="USD">USD - US Dollar</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <h3 className="font-semibold mb-4">{t("hourlyRate.rateType")}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <label className="flex items-start gap-3 p-4 border border-success bg-success/5 rounded-20 cursor-pointer">
                        <input {...register("preferredBudgetType")} value={PreferredBudgetType.HOURLY} type="radio" className="mt-1 text-success focus:ring-success" />
                        <div>
                          <div className="font-medium">{t("hourlyRate.standard")}</div>
                          <div className="text-sm text-text-muted">{t("hourlyRate.standardDesc")}</div>
                        </div>
                      </label>
                      <label className="flex items-start gap-3 p-4 border border-border rounded-20 cursor-pointer hover:bg-bg/50 dark:hover:bg-bg-dark/50">
                        <input {...register("preferredBudgetType")} value={PreferredBudgetType.FIXED} type="radio" className="mt-1 text-success focus:ring-success" />
                        <div>
                          <div className="font-medium">{t("hourlyRate.project")}</div>
                          <div className="text-sm text-text-muted">{t("hourlyRate.projectDesc")}</div>
                        </div>
                      </label>
                    </div>
                  </div>
                </section>
                <section id="portfolio" className="scroll-mt-32">
                  <h2 className="text-2xl font-bold mb-6">{t("portfolioModal.title")}</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Картки існуючих робіт */}
                    {portfolios?.map((item: PortfolioItem) => (
                      <div key={item.id} className="group relative bg-white dark:bg-bg-modalDark rounded-20 border border-border overflow-hidden shadow-sm">
                        <div className="aspect-video w-full bg-bg dark:bg-bg-dark">
                          {item.imageUrl ? (
                            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-text-muted">
                              <Icon icon="lucide:image" className="text-4xl" />
                            </div>
                          )}
                        </div>

                        <div className="p-4">
                          <h4 className="font-bold text-lg truncate">{item.title}</h4>
                          <p className="text-sm text-text-muted line-clamp-2 mt-1">{item.description}</p>

                          <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(item)}
                              className="p-2 bg-success/10 text-success rounded-full hover:bg-success hover:text-white transition-colors"
                            >
                              <Icon icon="lucide:edit-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(t("portfolioModal.deleteConfirm"))) {
                                  deleteMutation.mutate(item.id);
                                }
                              }}
                              className="p-2 bg-error/10 text-error rounded-full hover:bg-error hover:text-white transition-colors"
                            >
                              <Icon icon="lucide:trash-2" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Кнопка додавання */}
                    <button
                      type="button"
                      onClick={handleOpenAdd}
                      className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-success bg-success/5 rounded-20 hover:bg-success/10 transition-colors min-h-[250px]"
                    >
                      <div className="w-12 h-12 bg-success text-white rounded-full flex items-center justify-center text-2xl mb-2">
                        +
                      </div>
                      <div className="font-semibold text-lg text-success">{t("portfolioModal.addProject")}</div>
                      <div className="text-sm text-center text-text-muted">{t("portfolioModal.addProjectDesc")}</div>
                    </button>
                  </div>
                </section>
                <section id="work-preferences" className="scroll-mt-32 mb-12">
                  <h2 className="text-2xl font-bold mb-6">{t("workPreferences.title")}</h2>
                  <div className="bg-white dark:bg-bg-modalDark p-6 rounded-20 shadow-sm border border-border space-y-6">

                    <div>
                      <h3 className="font-semibold mb-3">{t("workPreferences.availability")}</h3>
                      <div className="space-y-2">
                        {[
                          { val: Availability.AVAILABLE, label: t("workPreferences.availableNow") },
                          { val: Availability.OPENTOOFFERS, label: t("workPreferences.openToOffers") },
                          { val: Availability.BUSY, label: t("workPreferences.busy") },
                          { val: Availability.NOTAVAILABLE, label: t("workPreferences.notAvailable") }
                        ].map((item) => (
                          <label key={item.val} className="flex items-center gap-3 cursor-pointer">
                            <input {...register("availability")} value={item.val} type="radio" className="text-success focus:ring-success" />
                            <span>{item.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">{t("workPreferences.projectSize")}</h3>
                      <div className="space-y-2">
                        {[
                          { val: PreferredProjectSize.SMALL, label: t("workPreferences.small") },
                          { val: PreferredProjectSize.MEDIUM, label: t("workPreferences.medium") },
                          { val: PreferredProjectSize.LARGE, label: t("workPreferences.large") }
                        ].map((item) => (
                          <label key={item.val} className="flex items-center gap-3 cursor-pointer">
                            <input {...register("preferredProjectSize")} value={item.val} type="radio" className="text-success focus:ring-success" />
                            <span>{item.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">{t("workPreferences.workload")}</h3>
                      <div className="space-y-2">
                        {[
                          { val: WorkType.FULLTIME, label: t("workPreferences.fullTime") },
                          { val: WorkType.PARTTIME, label: t("workPreferences.partTime") },
                          { val: WorkType.FLEXIBLE, label: t("workPreferences.flexible") }
                        ].map((item) => (
                          <label key={item.val} className="flex items-center gap-3 cursor-pointer">
                            <input {...register("workType")} value={item.val} type="radio" className="text-success focus:ring-success" />
                            <span>{item.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                  </div>
                </section>
              </>
            }

          </div>

          <div className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-32 bg-bg dark:bg-bg-dark p-6 rounded-20 border border-border">
              <h3 className="text-lg font-bold mb-2">{t("completion.title")}</h3>
              <p className="text-sm text-text-muted mb-6">
                {t("completion.description")}
              </p>

              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2 font-medium">
                  <span>{t("completion.progress")}</span>
                  <span className="text-success">{progressPercentage}%</span>
                </div>
                <div className="w-full bg-input dark:bg-input-dark rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                </div>
              </div>
              <div className="flex flex-col justify-start">

                <ButtonGradient
                  type="submit"
                  disabled={isSubmitting}
                  text={t("completion.action", "Save Changes")}
                />
                {user.role === UserRole.FREELANCER && <Link className="mt-5 max-w-fit hover:underline" href={`/${locale}/payment-data`}>{t("changeCardInfo")}</Link>}
                <button className="text-error capitalize  mt-4 max-w-fit" onClick={() => logout()}>{t("logout")}</button>
              </div>
            </div>
          </div>

        </div>
        <VerificationBlock user={user!} />
      </form>
      <PortfolioModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onPortfolioSubmit}
        initialData={editingItem}
        isLoading={createMutation.isPending || updateMutationPortfolio.isPending}
      />
    </>
  );
}