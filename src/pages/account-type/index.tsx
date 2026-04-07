'use client';

import { $api } from "@/components/http";
import IconDoc from "@/components/svg/IconDoc";
import IconLaptop from "@/components/svg/IconLaptop";
import AccountTypeCard from "@/components/ui/Card/AccountTypeCard";
import AuthHeader from "@/components/ui/Header/AuthHeader";
import AuthLayout from "@/components/ui/Layout/AuthLayout";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function AccountType() {

    const [type, setType] = useState<string>("")

    const { t, i18n } = useTranslation('common');
    const [ready, setReady] = useState(false);
    const locale = i18n.language;
    const router = useRouter();

    useEffect(() => {
        if (!type.trim().length) return;
        const update = async () => {
            const res = await $api.put('/users/update', {
                role: type
            })
            if (res) router.push(`/${locale}/profile`)
        }
        update();
    }, [type])

    useEffect(() => {
        i18n.reloadResources().then(() => setReady(true));
    }, [i18n]);

    if (!ready) return null;
    return (
        <>
            <Head>
                <title>Workzora | Registration</title>
                <meta name="description" content="Workzora | Registration" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AuthLayout>
                <div className="flex-1 max-w-[50%] bg-bg opacity-1 z-10 flex flex-col items-end justify-center dark:bg-bg-dark">
                    <div className="flex flex-col items-center gap-[30px] mr-[77px]">
                        <AuthHeader backUrl={`/${locale}/reserve-email`} />
                        <div className="flex flex-col mt-[25px] w-full max-w-[541px] items-center">
                            <span className="font-semibold text-text dark:text-text-dark">{t("auth.texts.select")}</span>
                            <span className="text-text dark:text-text-dark mt-[11px] mb-[13px]">{t("auth.texts.dontWorry")}</span>
                            <div className="mt-[65px] flex w-full gap-[31px]">
                                <AccountTypeCard
                                    type="freelancer"
                                    typeValue={type}
                                    setTypeValue={setType}
                                >
                                    <div className="flex gap-[16px] items-center">
                                        <IconLaptop />
                                        {t("auth.cards.earn")}
                                    </div>
                                </AccountTypeCard>
                                <AccountTypeCard
                                    type="client"
                                    typeValue={type}
                                    setTypeValue={setType}
                                >
                                    <div className="flex gap-[16px] items-center">
                                        <IconDoc />
                                        {t("auth.cards.hire")}
                                    </div>
                                </AccountTypeCard>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthLayout>
        </>
    );
}
