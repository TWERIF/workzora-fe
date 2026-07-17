import { User } from "@/features/auth/model/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import placeHolderAvatar from "../../../../public/images/avatar_placeholder.png";

export const Avatar = ({ user, size }: { user: User, size?: string }) => {
    const router = useRouter();

    const locale = router.locale ?? "en";
    const displayName = user.name || user.username || `${user.firstName} ${user.lastName}`.trim();
    const avatar = user?.avatarUrl ?? placeHolderAvatar;
    return (
        <Link href={`/${locale}/public-profile/${user.id}`}>
            <div className={`relative w-${size ?? "16"} h-${size ?? "16"} rounded-full overflow-hidden bg-input`}>
                {avatar && (
                    <Image src={avatar} alt={displayName} fill className="object-cover" />
                )}
            </div>
        </Link>
    )
}