import type { User } from "@/features/auth/model/types";
import VerificationBlock from "@/features/kyc/ui/VerificationBlock";
import { IconLockLine } from "@/shared/components/svg/AuthIcons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import ProfileNavigation from "./ProfileNavigation";

export default function SecurityPage({ user }: { user: User }) {
    const { t } = useTranslation("profile");
    const { locale = "en" } = useRouter();

    return (
        <main className="mx-auto grid w-full max-w-[1358px] grid-cols-1 gap-[30px] px-4 pb-[100px] pt-24 text-main-100 lg:grid-cols-[minmax(0,1fr)_317px] lg:items-start lg:pt-[171px]">
            <div className="flex min-w-0 flex-col gap-6">
                <h1 className="text-[28px] font-bold sm:text-[32px]">{t("security.title")}</h1>

                <VerificationBlock user={user} />

                <section className="rounded-[24px] bg-main-5 p-5 sm:p-6">
                    <h2 className="flex items-center gap-2 text-lg font-semibold sm:text-xl">
                        <IconLockLine className="text-primary" />
                        {t("security.password.title")}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-main-50">{t("security.password.text")}</p>
                    <Link
                        href={`/${locale}/forgot-password?email=${encodeURIComponent(user.email)}`}
                        className="mt-5 inline-flex h-[45px] items-center rounded-full border border-primary px-8 text-sm text-primary transition-colors hover:bg-primary-10"
                    >
                        {t("security.password.action")}
                    </Link>
                </section>
            </div>

            <aside className="flex flex-col gap-3">
                <ProfileNavigation activeHref="/security" />
            </aside>
        </main>
    );
}
