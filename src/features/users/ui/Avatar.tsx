import { User } from "@/features/auth/model/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import placeHolderAvatar from "../../../../public/images/avatar_placeholder.png";

const SIZES = {
  sm: "w-8 h-8",
  md: "w-16 h-16",
  lg: "w-[38px] h-[38px]",
} as const;

export const Avatar = ({ user, size = "md" }: { user: User; size?: keyof typeof SIZES }) => {
    const router = useRouter();

    const locale = router.locale ?? "en";
    const displayName = user.name || user.username || `${user.firstName} ${user.lastName}`.trim();
    const avatar = user?.avatarUrl ?? placeHolderAvatar;
    return (
        <Link href={`/${locale}/public-profile/${user.id}`}>
              <div className={`relative ${SIZES[size]} rounded-full overflow-hidden bg-input`}>
                {avatar && (
                    <Image src={avatar} alt={displayName} fill className="object-cover" />
                )}
            </div>
        </Link>
    )
}