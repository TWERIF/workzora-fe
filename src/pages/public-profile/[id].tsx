import PublicProfile from "@/features/freelancerProfile/ui/PublicProfile";
import { userQueries, useUser } from "@/features/users/model/useUsers";
import Loader from "@/shared/components/ui/Loader";
import { createServerQueryClient, loadOrNotFound, prefetch, type PrefetchedProps } from "@/shared/utils/prefetch";
import type { GetServerSideProps } from "next";
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

export const getServerSideProps: GetServerSideProps<PrefetchedProps> = async ({ params }) => {
    const id = String(params?.id ?? "");
    const client = createServerQueryClient();
    const loaded = await loadOrNotFound(client.fetchQuery(userQueries.one(id)));
    if (loaded.notFound) return { notFound: true };

    return { props: await prefetch(client) };
};
