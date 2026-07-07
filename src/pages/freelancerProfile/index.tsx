"use client";

import { useAuth } from "@/features/auth/model/useAuth";
import { AboutSection } from "@/features/freelancerProfile/ui/AboutSection";
import { PortfolioSection } from "@/features/freelancerProfile/ui/PortfolioSection";
import { ProfileHeaderCard } from "@/features/freelancerProfile/ui/ProfileHeaderCard";
import { ProfileTab, ProfileTabs } from "@/features/freelancerProfile/ui/ProfileTabs";
import { QuickActionsCard } from "@/features/freelancerProfile/ui/QuickActionsCard";
import { ReviewsSection } from "@/features/freelancerProfile/ui/ReviewsSection";
import { SkillsSection } from "@/features/freelancerProfile/ui/SkillsSection";
import { useState } from "react";


export default function FreelancerProfilePage() {
    const { user, isLoading } = useAuth();
    const [activeTab, setActiveTab] = useState<ProfileTab>("about");

    return (
        <div className="min-h-screen bg-bg px-4 py-6 dark:bg-bg-dark sm:px-8 sm:py-10">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 lg:grid-cols-[1fr_280px]">
                <ProfileHeaderCard user={isLoading ? undefined : user} />
                <QuickActionsCard />

                <div className="lg:col-span-2">
                    <ProfileTabs active={activeTab} onChange={setActiveTab} />

                    <div className="mt-4">
                        {activeTab === "about" && <AboutSection user={isLoading ? undefined : user} />}
                        {activeTab === "portfolio" && <PortfolioSection />}
                        {activeTab === "skills" && <SkillsSection skills={user?.skills} />}
                        {activeTab === "reviews" && <ReviewsSection />}
                    </div>
                </div>
            </div>
        </div>
    );
};