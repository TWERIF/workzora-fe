import { User, UserRole } from "@/features/auth/model/types";
import { authKeys } from "@/features/auth/model/useAuth";
import WalletBalanceOverview from "@/features/finances/ui/WalletBalanceOverview";
import { AboutSection } from "@/features/freelancerProfile/ui/AboutSection";
import { PortfolioSection } from "@/features/freelancerProfile/ui/PortfolioSection";
import { ProfileHeaderCard } from "@/features/freelancerProfile/ui/ProfileHeaderCard";
import { ProfileTab, ProfileTabs } from "@/features/freelancerProfile/ui/ProfileTabs";
import { ReviewsSection } from "@/features/freelancerProfile/ui/ReviewsSection";
import { SkillsSection } from "@/features/freelancerProfile/ui/SkillsSection";
import { useCreatePortfolio, useMyPortfolios } from "@/features/portfolio/model/usePortfolio";
import PortfolioModal from "@/features/portfolio/ui/PortfolioModal";
import { useUsers } from "@/features/users/model/useUsers";
import ProBanner from "@/shared/components/ui/ProBanner";
import Toast from "@/shared/components/ui/Toast";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { calcProfileCompletion } from "../model/completion";
import ProfileCompletionCard from "./ProfileCompletionCard";
import ProfileInfoCards from "./ProfileInfoCards";
import ProfileNavigation from "./ProfileNavigation";

const PORTFOLIO_PAGE_SIZE = 5;

const sectionId = (tab: ProfileTab) => `profile-${tab}`;

export default function MyProfile({ user }: { user: User }) {
  const { t, i18n } = useTranslation("profile");
  const locale = i18n.language;

  const isFreelancer = user.role === UserRole.FREELANCER;

  const { data: portfolios = [] } = useMyPortfolios();
  const createMutation = useCreatePortfolio();
  const { updateMutaion } = useUsers();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<ProfileTab>("about");
  const [portfolioPage, setPortfolioPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState<{ msg: string; id: number } | null>(null);

  const pageCount = Math.max(1, Math.ceil(portfolios.length / PORTFOLIO_PAGE_SIZE));
  const pagedPortfolios = portfolios.slice(
    (portfolioPage - 1) * PORTFOLIO_PAGE_SIZE,
    portfolioPage * PORTFOLIO_PAGE_SIZE
  );

  const progress = calcProfileCompletion(user, portfolios.length);

  const handleTabChange = (tab: ProfileTab) => {
    setActiveTab(tab);
    document.getElementById(sectionId(tab))?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const showToast = (msg: string) => setToast({ msg, id: Date.now() });

  const updateProfile = (body: Partial<User>) => {
    updateMutaion.mutate(body, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: authKeys.me });
        showToast(t("userDataUpdated"));
      },
    });
  };

  const onPortfolioSubmit = (formData: FormData) => {
    createMutation.mutate(formData, {
      onSuccess: () => {
        setIsModalOpen(false);
        showToast(t("workSaved"));
      },
    });
  };

  return (
    <div className="min-h-screen bg-white text-text dark:bg-bg-dark dark:text-text-dark">
      <main className="mx-auto grid w-full max-w-[1358px] grid-cols-1 gap-[30px] px-4 pb-[100px] pt-24 lg:grid-cols-[minmax(0,1fr)_317px] lg:items-start lg:pt-[171px]">
        <div className="flex min-w-0 flex-col gap-6">
          <ProfileHeaderCard user={user} />

          <WalletBalanceOverview />

          <ProfileInfoCards />

          <ProBanner
            title={t("overview.proBanner.title")}
            description={t("overview.proBanner.description")}
            href={`/${locale}/pro`}
          />

          {isFreelancer && (
            <>
              <ProfileTabs
                active={activeTab}
                onChange={handleTabChange}
                counts={{ portfolio: portfolios.length }}
              />

              <div id={sectionId("about")} className="scroll-mt-32">
                <AboutSection
                  user={user}
                  onSaveBio={(bio) => updateProfile({ bio })}
                  isSaving={updateMutaion.isPending}
                />
              </div>

              <div id={sectionId("portfolio")} className="scroll-mt-32">
                <PortfolioSection
                  items={pagedPortfolios}
                  page={portfolioPage}
                  pageCount={pageCount}
                  onPageChange={setPortfolioPage}
                  onAddProject={() => setIsModalOpen(true)}
                />
              </div>

              <div id={sectionId("skills")} className="scroll-mt-32">
                <SkillsSection
                  skills={user.skills}
                  onSaveSkills={(skills) => updateProfile({ skills })}
                  isSaving={updateMutaion.isPending}
                />
              </div>

              <div id={sectionId("reviews")} className="scroll-mt-32">
                <ReviewsSection />
              </div>
            </>
          )}
        </div>

        <aside className="flex flex-col gap-3">
          <ProfileNavigation activeHref="/profile" />
          {isFreelancer && (
            <ProfileCompletionCard progress={progress} actionHref={`/${locale}/profile/settings`} />
          )}
        </aside>
      </main>

      <PortfolioModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onPortfolioSubmit}
        initialData={null}
        isLoading={createMutation.isPending}
      />

      {toast && <Toast key={toast.id} message={toast.msg} />}
    </div>
  );
}
