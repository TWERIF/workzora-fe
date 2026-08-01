"use client";

import { AboutSection } from "@/features/freelancerProfile/ui/AboutSection";
import { PortfolioSection } from "@/features/freelancerProfile/ui/PortfolioSection";
import { ProfileHeaderCard } from "@/features/freelancerProfile/ui/ProfileHeaderCard";
import { ProfileTab, ProfileTabs } from "@/features/freelancerProfile/ui/ProfileTabs";
import { QuickActionsCard } from "@/features/freelancerProfile/ui/QuickActionsCard";
import { ReviewsSection } from "@/features/freelancerProfile/ui/ReviewsSection";
import { SkillsSection } from "@/features/freelancerProfile/ui/SkillsSection";
import { usePortfolioByUserId } from "@/features/portfolio/model/usePortfolio";
import { useUser } from "@/features/users/model/useUsers";
import { useRouter } from "next/router";
import { useState } from "react";

export default function FreelancerProfilePage() {
    const router = useRouter();

    const id = router.isReady ? (router.query.id as string | undefined) : undefined;

    const {
        data: user,
        isLoading,
    } = useUser(id);

    const { data: portfolios, isLoading: isLoadingList } = usePortfolioByUserId(user?.id);

    const [activeTab, setActiveTab] = useState<ProfileTab>("about");

    if (!router.isReady) {
        return null;
    }

    return (
        <div className="min-h-screen bg-bg px-4 py-6 dark:bg-bg-dark sm:px-8 sm:py-10">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 lg:grid-cols-[1fr_280px]">
                <ProfileHeaderCard user={isLoading ? undefined : user} />
                {user?.role === "freelancer" && <QuickActionsCard />}

                {user?.role === "freelancer" && <div className="lg:col-span-2">
                    <ProfileTabs active={activeTab} onChange={setActiveTab} />

                    <div className="mt-4">
                        {activeTab === "about" && <AboutSection user={isLoading ? undefined : user} />}
                        {activeTab === "portfolio" && <PortfolioSection items={portfolios} />}
                        {activeTab === "skills" && <SkillsSection skills={user?.skills} />}
                        {activeTab === "reviews" && <ReviewsSection />}
                    </div>
                </div>}
            </div>
        </div>
    );
};