import { useUnsubscribe } from "@/features/posts/model/usePosts";
import { MailX } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function UnsubscribePage() {
    const { t } = useTranslation("common");
    const { query, isReady } = useRouter();
    const token = typeof query.token === "string" ? query.token : "";
    const unsubscribe = useUnsubscribe();
    const sent = useRef(false);

    useEffect(() => {
        if (!isReady || !token || sent.current) return;
        sent.current = true;
        unsubscribe.mutate(token);
    }, [isReady, token, unsubscribe]);

    const done = unsubscribe.data?.success === true;
    const failed = unsubscribe.isError || unsubscribe.data?.success === false || (isReady && !token);

    return (
        <div className="mx-auto flex min-h-[70vh] w-full max-w-xl flex-col items-center justify-center gap-4 px-4 pb-24 pt-32 text-center text-main-100">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-10 text-primary">
                <MailX size={30} />
            </span>
            <h1 className="text-2xl font-bold sm:text-3xl">
                {done ? t("blog.unsubscribe.doneTitle") : failed ? t("blog.unsubscribe.errorTitle") : t("blog.unsubscribe.pending")}
            </h1>
            {(done || failed) && <p className="text-sm">{done ? t("blog.unsubscribe.doneText") : t("blog.unsubscribe.errorText")}</p>}
            <Link href="/news" className="mt-2 rounded-full bg-gradient px-6 py-3 text-sm text-white transition-opacity hover:opacity-90">
                {t("blog.unsubscribe.back")}
            </Link>
        </div>
    );
}
