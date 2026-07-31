import { useTheme } from "next-themes";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useUsers } from "../model/useUsers";
import UserCard from "./UserCard";
import UsersCountCard from "./UsersCountCard";
import { useRouter } from "next/router";
import { TabButton } from "./HowItWorks";
import { HandIcon } from "@/shared/components/svg/HandIcon";
import { WorkIcon } from "@/shared/components/svg/WorkIcon";

type Tab = "freelancers" | "clients";

export default function TrustedUsers() {
  const { t } = useTranslation("main");
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [tab, setTab] = useState<Tab>("freelancers");

  const { topFreelancers, topClients } = useUsers();
  const items = tab === "freelancers" ? topFreelancers : topClients;
  const router = useRouter();
  const locale = router.locale || "en";
  const handleShowAll = () => {
    router.push(`/${locale}/${tab}`)
  };

  return (
    <section className={`py-16 md:py-20 ${isDark ? "bg-bg-dark text-text-dark" : "bg-white"}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6 mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold">{t("community.title")}</h2>

          <div
            className={`inline-flex rounded-full p-1 border ${isDark ? "border-white/15" : "border-border"
              }`}
          >
            <TabButton
              active={tab === "clients"}
              onClick={() => setTab("clients")}
              icon={HandIcon}
              label={t(`community.topClients`)}
            />
            <TabButton
              active={tab === "freelancers"}  
              onClick={() => setTab("freelancers")}
              icon={WorkIcon}
              label={t(`community.topFreelancers`)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items?.slice(0, 3).map((user) => <UserCard key={user.id} user={user} />)}

          <UsersCountCard
            count={items?.length ?? 0}
            labelKey={
              tab === "freelancers"
                ? "community.freelancersCountSuffix"
                : "community.clientsCountSuffix"
            }
            onClick={handleShowAll}
          />
        </div>
      </div>
    </section>
  );
}