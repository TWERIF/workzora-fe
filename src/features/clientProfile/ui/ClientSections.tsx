import type { PublicProfile } from "@/features/auth/model/types";
import { ProfileTab, ProfileTabs } from "@/features/freelancerProfile/ui/ProfileTabs";
import { UserReviews } from "@/features/reviews/ui/UserReviews";
import { useClientProjects } from "@/features/users/model/useUsers";
import { useMemo, useState } from "react";
import ClientAboutSection from "./ClientAboutSection";
import { ActiveProjectsSection, CompletedProjectsSection } from "./ClientProjectsSections";

const sectionId = (tab: ProfileTab) => `profile-${tab}`;

const CLIENT_TABS: ProfileTab[] = ["about", "active", "completed", "reviews"];
const CLIENT_PAGE_SIZE = 5;

export default function ClientSections({ user }: { user: PublicProfile }) {
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
                <UserReviews userId={user.id} ownerName={user.firstName} />
            </div>
        </>
    );
}

