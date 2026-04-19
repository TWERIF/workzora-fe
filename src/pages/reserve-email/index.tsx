"use client";

import { $api } from "@/shared/components/http";
import ButtonGradient from "@/shared/components/ui/Button/ButtonGradientSmall";
import AuthHeader from "@/shared/components/ui/Header/AuthHeader";
import Input from "@/shared/components/ui/Input/Input";
import Submit from "@/shared/components/ui/Input/Submit";
import AuthLayout from "@/shared/components/ui/Layout/AuthLayout";
import Link from "@/shared/components/ui/Link/Link";
import { validateEmail } from "@/utils/validators";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReserveEmail() {
  const [email, setEmail] = useState("");
  const [submit, setSubmit] = useState(false);
  const [errors, seterrors] = useState<string[]>([]);

  const { t, i18n } = useTranslation("common");
  const [ready, setReady] = useState(false);
  const locale = i18n.language;

  const router = useRouter();
  const validate = () => {
    const tmpErrors: string[] = [];

    const emailErrorKey = validateEmail(email);
    if (emailErrorKey) tmpErrors[3] = t(emailErrorKey);

    if (!submit) tmpErrors[2] = t("auth.errors.submitRules");

    seterrors(tmpErrors);

    return tmpErrors.every((e) => !e);
  };

  const addEmail = async () => {
    if (!validate() || !submit) return;

    const res = await $api.put("/users/update", {
      reserveEmail: email,
    });
    if (res) router.push(`/${locale}/account-type`);
  };

  useEffect(() => {
    i18n.reloadResources().then(() => setReady(true));
  }, [i18n]);

  if (!ready) return null;
  return (
    <>
      <Head>
        <title>Workzora | Reserve Email</title>
        <meta name="description" content="Workzora | Registration" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthLayout>
        <div className="flex-1 max-w-[50%] bg-bg opacity-1 z-10 flex flex-col items-end justify-center dark:bg-bg-dark">
          <div className="flex flex-col items-center gap-[30px] mr-[77px]">
            <AuthHeader backUrl={`/${locale}/registration`} />
            <div className="flex flex-col mt-[25px] w-full max-w-[541px] items-center">
              <span className="font-semibold text-text dark:text-text-dark">
                {t("auth.texts.welcome")}
              </span>
              <span className="text-text dark:text-text-dark mt-[11px] mb-[13px]">
                {t("auth.texts.welcomeText")}
              </span>
              <Input
                errorText={errors[3]}
                value={email}
                setValue={setEmail}
                placeholder={t("auth.placeholders.email")}
              />
              <div className="mt-[25px] mb-[32px]">
                <Submit
                  value={submit}
                  setValue={setSubmit}
                  errorText={errors[2]}
                  text={
                    <span className="whitespace-normal break-words">
                      {t("auth.texts.agree")}
                      <Link
                        href="/agreement"
                        text={" " + t("auth.texts.user") + " "}
                      />
                      {t("auth.texts.and")}
                      <Link
                        href="/privacy"
                        text={" " + t("auth.texts.privacy")}
                      />
                    </span>
                  }
                />
              </div>
              <ButtonGradient
                onClick={addEmail}
                text={t("auth.buttons.join")}
              />
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
}
