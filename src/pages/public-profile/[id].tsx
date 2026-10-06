"use client";

import { AboutSection } from "@/features/freelancerProfile/ui/AboutSection";
import { PortfolioSection } from "@/features/freelancerProfile/ui/PortfolioSection";
import { ProfileHeaderCard } from "@/features/freelancerProfile/ui/ProfileHeaderCard";
import { ProfileTab, ProfileTabs } from "@/features/freelancerProfile/ui/ProfileTabs";
import { SkillsSection } from "@/features/freelancerProfile/ui/SkillsSection";
import { usePortfolioByUserId } from "@/features/portfolio/model/usePortfolio";
import { UserReviews } from "@/features/reviews/ui/UserReviews";
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
        <div className="min-h-screen bg-bg px-4 dark:bg-bg-dark sm:px-8 py-28">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
                <ProfileHeaderCard user={isLoading ? undefined : user} />
                {/* {user?.role === "freelancer" && <QuickActionsCard />} */}

                {user?.role === "freelancer" && <div className="lg:col-span-2">
                    <ProfileTabs active={activeTab} onChange={setActiveTab} />

                    <div className="mt-4">
                        {activeTab === "about" && <AboutSection user={isLoading ? undefined : user} />}
                        {activeTab === "portfolio" && <PortfolioSection items={portfolios} />}
                        {activeTab === "skills" && <SkillsSection skills={user?.skills} />}
                        {activeTab === "reviews" && <UserReviews userId={user?.id} />}
                    </div>
                </div>}

                {/* clients have no portfolio/skills tabs, only reviews left by freelancers */}
                {user?.role === "client" && (
                    <div className="lg:col-span-2">
                        <UserReviews userId={user.id} />
                    </div>
                )}
            </div>
        </div>
    );
};