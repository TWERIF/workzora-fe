import Logo from "@/shared/components/svg/Logo";
import LogoRegWhite from "@/shared/components/svg/LogoRegWhite";
import { useTheme } from "@/utils/useTheme";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

export type AuthScene = "login" | "registration" | "recovery";

interface AuthLayoutProps {
    scene: AuthScene;
    title: string;
    subtitle?: ReactNode;
    children: ReactNode;
}

export default function AuthLayout({ scene, title, subtitle, children }: AuthLayoutProps) {
    const { t } = useTranslation("auth");
    const { theme } = useTheme();

    return (
        <div className="min-h-[100dvh] bg-background text-main-100 lg:grid lg:grid-cols-2 lg:gap-[30px] lg:p-[30px] 2xl:p-[60px]">
            <aside className="relative hidden overflow-hidden rounded-[60px] bg-primary-10 lg:flex lg:min-h-[calc(100dvh-60px)] lg:flex-col lg:justify-between lg:p-[60px] 2xl:min-h-[calc(100dvh-120px)]">
                <Image src={`/images/auth/${scene}.webp`} alt="" fill priority sizes="50vw" className="object-cover" />
                <Link href="/" className="relative w-fit" aria-label="WorkZora">
                    <Image src="/images/auth/logo-white.png" alt="WorkZora" width={136} height={84} priority />
                </Link>
                <div className="relative max-w-[765px] text-white">
                    <h2 className="text-[48px] font-bold leading-[1.4] xl:text-[60px] 2xl:text-[75px]">{t(`side.${scene}.title`)}</h2>
                    <p className="mt-6 max-w-[490px] text-lg leading-[27px]">{t(`side.${scene}.text`)}</p>
                </div>
            </aside>

            <main className="flex min-h-[100dvh] flex-col items-center px-4 py-10 lg:min-h-0 lg:justify-center lg:px-0">
                <Link href="/" className="mb-10 lg:hidden" aria-label="WorkZora">
                    {theme === "dark" ? <LogoRegWhite /> : <Logo />}
                </Link>
                <div className="w-full max-w-[490px]">
                    <h1 className="text-center text-[32px] font-bold leading-[1.5] sm:text-[40px]">{title}</h1>
                    {subtitle && <p className="mt-3 text-center text-base leading-[27px] sm:text-lg">{subtitle}</p>}
                    <div className="mt-10">{children}</div>
                </div>
            </main>
        </div>
    );
}
