import PublicProfile from "@/features/freelancerProfile/ui/PublicProfile";
import { useUser } from "@/features/users/model/useUsers";
import Loader from "@/shared/components/ui/Loader";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export default function PublicProfilePage() {
    const router = useRouter();
    const { t } = useTranslation("common");
    const id = router.isReady && typeof router.query.id === "string" ? router.query.id : undefined;
    const { data: user, isLoading, isError } = useUser(id);

    if (!router.isReady || isLoading) return <Loader />;

    if (isError || !user) {
        return (
            <main className="mx-auto max-w-[1358px] px-4 pb-[100px] pt-24 text-center text-main-50 lg:pt-[171px]">
                {t("profile.noData.notFound")}
            </main>
        );
    }

    return <PublicProfile user={user} />;
}
