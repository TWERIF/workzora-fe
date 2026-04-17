import { InputI } from "@/shared/types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Input from "./Input";
import { $api } from "../../http";

interface ConfirmI extends InputI {
    sendMail: () => void;
    setMailConfirmed: (s: boolean) => void;
    email: string;
    mailConfirmed: boolean;
}

export default function ConfirmEmail(props: ConfirmI) {
    const { t, i18n } = useTranslation('common');
    const [ready, setReady] = useState(false);
    const [cooldown, setCooldown] = useState(0); // ⏱ таймер

    const {
        sendMail,
        value,
        email,
        setMailConfirmed,
        mailConfirmed
    } = props;

    const verifyEmail = async () => {
        const status = await $api.post('/auth/verify-email', {
            email,
            code: parseInt(value)
        })
        setMailConfirmed(status.data.success);
    }
    const effectiveCooldown = mailConfirmed ? 0 : cooldown;

    useEffect(() => {
        if (value.length < 5) return;
        verifyEmail()
    }, [value]);

    useEffect(() => {
        if (cooldown <= 0) return;

        const interval = setInterval(() => {
            setCooldown(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [cooldown]);

    useEffect(() => {
        i18n.reloadResources().then(() => setReady(true));
    }, [i18n]);

    const handleSendMail = () => {
        if (effectiveCooldown > 0) return;
        sendMail();
        setCooldown(120);
    };

    if (!ready) return null;

    return (
        <div className="w-full flex gap-[23px] max-w-full">
            <span className="text-text dark:text-text-dark ml-[18px]">
                {t("auth.confirmEmail.text")}
            </span>

            <div className="flex flex-col gap-[5px]">
                <Input {...props} />

                <span
                    onClick={handleSendMail}
                    className={`cursor-pointer ${effectiveCooldown > 0 ? "text-text-muted cursor-not-allowed" : "text-success"}`}
                >
                    {effectiveCooldown > 0
                        ? `${t("auth.confirmEmail.button")} (${effectiveCooldown}s)`
                        : t("auth.confirmEmail.button")}
                </span>

            </div>
        </div>
    );
}
