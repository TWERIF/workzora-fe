import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Showcase } from "../model/types";
import { Avatar } from "@/features/users/ui/Avatar";

export default function ShowcaseItem(props: Showcase) {
    const { t } = useTranslation("main");
    return (
        <div className="block w-[317px] h-[396px] p-[14px] relative">
            <Image
                className="rounded-[22px] w-full h-full object-cover absolute top-0 left-0"
                width={317}
                height={396}
                src={props.imageUrl}
                alt={props.creator.name + " " + "work"}
            />
            <div
                className="
                    absolute
                    top-[14px]
                    left-[14px]
                    right-[14px]
                    h-[54px]
                    rounded-[20px]
                    border
                    border-white/15
                    bg-white/[0.05]
                    backdrop-blur-[11.2px]
                    p-2
                    flex
                    gap-3
                    items-center
                    text-white
                    "
            >
                <Avatar size={"lg"} user={props.creator} />
                <span className="opacity-50">{t("hero.createdBy") + " "}</span>
                {props.creator.name}
            </div>
        </div>
    );
}