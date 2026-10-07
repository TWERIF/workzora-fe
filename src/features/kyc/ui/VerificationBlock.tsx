import type { User } from "@/features/auth/model/types";
import { IconImage, IconInfo, IconUpload } from "@/shared/components/svg/UiIcons";
import { useId, useState, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { VerificationStatus } from "../model/types";
import { useKyc } from "../model/useKyc";

const MAX_FILE_BYTES = 10 * 1024 * 1024;

function FilePicker({ label, file, onChange }: { label: string; file: File | null; onChange: (file: File | null) => void }) {
    const { t } = useTranslation("profile");
    const id = useId();
    const pick = (event: ChangeEvent<HTMLInputElement>) => {
        const next = event.target.files?.[0] ?? null;
        event.target.value = "";
        if (next && (next.size > MAX_FILE_BYTES || !next.type.startsWith("image/"))) {
            toast.error(t("security.kyc.fileError"));
            return;
        }
        onChange(next);
    };

    return (
        <div className="flex min-w-0 flex-col gap-1.5">
            <span className="text-sm leading-[26px]">{label}*</span>
            <label
                htmlFor={id}
                className="flex h-[50px] cursor-pointer items-center gap-2 rounded-20 border border-main-10 bg-background px-15 text-sm transition-colors hover:border-primary"
            >
                <span className={`min-w-0 flex-1 truncate ${file ? "" : "text-main-50"}`}>{file?.name ?? t("security.kyc.selectFile")}</span>
                <IconImage size={20} className="shrink-0 text-main-50" />
            </label>
            <input id={id} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={pick} />
        </div>
    );
}

const VerificationBlock = ({ user }: { user: User }) => {
    const { t } = useTranslation("profile");
    const { createMutation } = useKyc();
    const [documentFile, setDocumentFile] = useState<File | null>(null);
    const [selfieFile, setSelfieFile] = useState<File | null>(null);
    const status = user.verification?.status ?? VerificationStatus.NOT_VERIFIED;

    const submit = () => {
        if (!documentFile || !selfieFile) return;
        const formData = new FormData();
        formData.append("documentFile", documentFile);
        formData.append("selfiFile", selfieFile);
        createMutation.mutate(formData, {
            onSuccess: () => toast.success(t("security.kyc.sent")),
            onError: () => toast.error(t("security.kyc.error")),
        });
    };

    const badge = {
        [VerificationStatus.VERIFIED]: "bg-status-successSoft text-status-success",
        [VerificationStatus.IN_PROGRESS]: "bg-status-infoSoft text-status-info",
        [VerificationStatus.NOT_VERIFIED]: "bg-status-dangerSoft text-status-danger",
    }[status];

    return (
        <section className="rounded-[24px] bg-main-5 p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold sm:text-xl">{t("security.kyc.title")}</h2>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${badge}`}>{t(`security.kyc.status.${status}`)}</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-main-50">{t(`security.kyc.text.${status}`)}</p>

            {status === VerificationStatus.NOT_VERIFIED && (
                <>
                    <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                        <FilePicker label={t("security.kyc.document")} file={documentFile} onChange={setDocumentFile} />
                        <FilePicker label={t("security.kyc.selfie")} file={selfieFile} onChange={setSelfieFile} />
                    </div>
                    <p className="mt-4 flex gap-2 text-xs leading-5 text-main-50">
                        <IconInfo size={16} className="mt-0.5 shrink-0 text-primary" />
                        {t("security.kyc.hint")}
                    </p>
                    <button
                        type="button"
                        onClick={submit}
                        disabled={!documentFile || !selfieFile || createMutation.isPending}
                        className="mt-5 flex h-[45px] items-center gap-2 rounded-full bg-gradient px-8 text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                    >
                        <IconUpload size={16} />
                        {createMutation.isPending ? "..." : t("security.kyc.submit")}
                    </button>
                </>
            )}
        </section>
    );
};

export default VerificationBlock;
