import AiFolderIcon from "@/shared/components/svg/Knowledgebase/AiFolderIcon";
import UsersThreeIcon from "@/shared/components/svg/Knowledgebase/GroupPeople";
import MoneyIcon from "@/shared/components/svg/Knowledgebase/MoneyIcon";
import { PersonSupportIcon } from "@/shared/components/svg/Knowledgebase/PersonSupportIcon";
import RocketIcon from "@/shared/components/svg/Knowledgebase/RocketIcon";
import SolarCaseOutline from "@/shared/components/svg/Knowledgebase/SolarCaseOutline";
import { UserRoundIcon } from "@/shared/components/svg/Knowledgebase/UserRoundIcon";
import { ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import type { HelpCategorySlug } from "../model/types";

const ICONS: Record<HelpCategorySlug, ReactNode> = {
    "getting-started": <RocketIcon />,
    "for-clients": <SolarCaseOutline />,
    "for-freelancers": <UsersThreeIcon />,
    "payments-escrow": <MoneyIcon />,
    "projects-proposals": <AiFolderIcon />,
    "account-settings": <UserRoundIcon />,
    "safety-arbitration": <ShieldCheck size={24} />,
    "technical-support": <PersonSupportIcon />,
};

export default function HelpCategoryIcon({ category }: { category: HelpCategorySlug }) {
    return <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-primary text-white">{ICONS[category]}</span>;
}
