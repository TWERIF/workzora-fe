import { RatingStars } from "@/features/freelancerProfile/ui/RatingStars";
import VerifiedIcon from "@/shared/components/svg/VerifiedIcon";
import WorkzoraMarkIcon from "@/shared/components/svg/WorkzoraMarkIcon";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import placeholderAvatar from "../../../../public/images/avatar_placeholder.png";

interface UserCardHeaderProps {
    id: string;
    name: string;
    avatarUrl?: string | null;
    about?: string;
    rating: number;
    isVerified: boolean;
}

export default function UserCardHeader({ id, name, avatarUrl, about, rating, isVerified }: UserCardHeaderProps) {
    const { t } = useTranslation("common");
    const href = `/public-profile/${id}`;

    return (
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="relative size-[88px] shrink-0 overflow-hidden rounded-full sm:size-[114px]">
                <Image src={avatarUrl || placeholderAvatar} alt={name} fill sizes="114px" className="object-cover" />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-[6px]">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                        <Link href={href} className="truncate text-2xl font-bold transition-colors hover:text-primary sm:text-[30px]">
                            {name}
                        </Link>
                        {isVerified && (
                            <div className="flex shrink-0 items-center gap-[6px]">
                                <VerifiedIcon w={36} h={36} />
                                <div className="p-[2px]">
                                    <WorkzoraMarkIcon w={32} h={32} />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-3">
                            <RatingStars value={rating} />
                            <p className="whitespace-nowrap">
                                <span className="text-xl font-bold">{rating.toFixed(1).replace(".", ",")}</span> <span className="text-xs text-main-50">/ 5,0</span>
                            </p>
                        </div>
                        <Link href={href} className="rounded-full bg-gradient px-6 py-3 text-sm text-white transition-opacity hover:opacity-90">
                            {t("userCard.goToProfile")}
                        </Link>
                    </div>
                </div>

                {about && <p className="line-clamp-3 break-words text-sm">{about}</p>}
            </div>
        </div>
    );
}
