import type { PublicProfile as PublicProfileData } from "@/features/auth/model/types";
import type { PortfolioItem } from "@/features/portfolio/model/types";
import { usePortfolioByUserId, usePortfolioView } from "@/features/portfolio/model/usePortfolio";
import { UserReviews } from "@/features/reviews/ui/UserReviews";
import PageMeta from "@/shared/components/seo/PageMeta";
import ClientAboutSection from "@/features/clientProfile/ui/ClientAboutSection";
import { ActiveProjectsSection, CompletedProjectsSection } from "@/features/clientProfile/ui/ClientProjectsSections";
import { useClientProjects } from "@/features/users/model/useUsers";
import { useCallback, useMemo, useState } from "react";
import { AboutSection } from "./AboutSection";
import { PortfolioSection } from "./PortfolioSection";
import PortfolioPreview from "./PortfolioPreview";
import { ProfileHeaderCard } from "./ProfileHeaderCard";
import { ProfileTab, ProfileTabs } from "./ProfileTabs";
import { QuickActionsCard } from "./QuickActionsCard";
import { SkillsSection } from "./SkillsSection";

const PORTFOLIO_PAGE_SIZE = 6;

const sectionId = (tab: ProfileTab) => `profile-${tab}`;

const CLIENT_TABS: ProfileTab[] = ["about", "active", "completed", "reviews"];
const CLIENT_PAGE_SIZE = 5;

function ClientSections({ user }: { user: PublicProfileData }) {
    const [activeTab, setActiveTab] = useState<ProfileTab>("about");
    const [activePage, setActivePage] = useState(1);
    const [completedPage, setCompletedPage] = useState(1);
    const { data: active } = useClientProjects(user.id, "active", activePage, CLIENT_PAGE_SIZE);
    const { data: completed } = useClientProjects(user.id, "completed", completedPage, CLIENT_PAGE_SIZE);

    const hiresFor = useMemo(() => {
        const counts = new Map<string, number>();
        for (const project of [...(active?.data ?? []), ...(completed?.data ?? [])]) {
            for (const category of project.categories) counts.set(category.title, (counts.get(category.title) ?? 0) + 1);
        }
        return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([title]) => title);
    }, [active, completed]);

    const goTo = (tab: ProfileTab) => {
        setActiveTab(tab);
        document.getElementById(sectionId(tab))?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <>
            <div className="sticky top-[112px] z-20">
                <ProfileTabs
                    tabs={CLIENT_TABS}
                    active={activeTab}
                    onChange={goTo}
                    counts={{ active: active?.total ?? 0, completed: completed?.total ?? 0, reviews: Number(user.rates) || 0 }}
                />
            </div>
            <div id={sectionId("about")} className="scroll-mt-48">
                <ClientAboutSection user={user} hiresFor={hiresFor} />
            </div>
            <div id={sectionId("active")} className="scroll-mt-48">
                <ActiveProjectsSection data={active} page={activePage} onPageChange={setActivePage} />
            </div>
            <div id={sectionId("completed")} className="scroll-mt-48">
                <CompletedProjectsSection data={completed} page={completedPage} onPageChange={setCompletedPage} />
            </div>
            <div id={sectionId("reviews")} className="scroll-mt-48">
                <UserReviews userId={user.id} />
            </div>
        </>
    );
}

export default function PublicProfile({ user }: { user: PublicProfileData }) {
    const isFreelancer = user.role === "freelancer";
    const { data: portfolios = [] } = usePortfolioByUserId(isFreelancer ? user.id : undefined);
    const { mutate: countView } = usePortfolioView();

    const [activeTab, setActiveTab] = useState<ProfileTab>("about");
    const [portfolioPage, setPortfolioPage] = useState(1);
    const [preview, setPreview] = useState<PortfolioItem | null>(null);

    const pageCount = Math.max(1, Math.ceil(portfolios.length / PORTFOLIO_PAGE_SIZE));
    const pagedPortfolios = portfolios.slice((portfolioPage - 1) * PORTFOLIO_PAGE_SIZE, portfolioPage * PORTFOLIO_PAGE_SIZE);

    const goTo = (tab: ProfileTab) => {
        setActiveTab(tab);
        document.getElementById(sectionId(tab))?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const openPreview = (item: PortfolioItem) => {
        setPreview(item);
        countView(item.id);
    };
    const closePreview = useCallback(() => setPreview(null), []);

    const name = [user.firstName, user.lastName].filter(Boolean).join(" ");

    return (
        <main className="mx-auto grid w-full max-w-[1358px] grid-cols-1 gap-[30px] px-4 pb-[100px] pt-24 text-main-100 lg:grid-cols-[minmax(0,1fr)_317px] lg:items-start lg:pt-[171px]">
            <PageMeta page={isFreelancer ? "freelancerProfile" : "clientProfile"} params={{ name }} />
            <div className="flex min-w-0 flex-col gap-6">
                <ProfileHeaderCard user={user} />

                {isFreelancer ? (
                    <>
                        <div className="sticky top-[112px] z-20">
                            <ProfileTabs active={activeTab} onChange={goTo} counts={{ portfolio: portfolios.length, reviews: Number(user.rates) || 0 }} />
                        </div>
                        <div id={sectionId("about")} className="scroll-mt-48">
                            <AboutSection user={user} stats={user.stats} showRatingPosition={false} />
                        </div>
                        <div id={sectionId("portfolio")} className="scroll-mt-48">
                            <PortfolioSection
                                items={pagedPortfolios}
                                page={portfolioPage}
                                pageCount={pageCount}
                                onPageChange={setPortfolioPage}
                                onOpen={openPreview}
                            />
                        </div>
                        <div id={sectionId("skills")} className="scroll-mt-48">
                            <SkillsSection skills={user.skills} />
                        </div>
                        <div id={sectionId("reviews")} className="scroll-mt-48">
                            <UserReviews userId={user.id} />
                        </div>
                    </>
                ) : (
                    <ClientSections user={user} />
                )}
            </div>

            <aside className="flex flex-col gap-3 lg:sticky lg:top-[112px]">
                <QuickActionsCard profileId={user.id} profileRole={user.role} />
            </aside>

            {preview && <PortfolioPreview item={preview} onClose={closePreview} />}
        </main>
    );
}
