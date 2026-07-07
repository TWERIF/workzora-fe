import IdIcon from "@/shared/components/svg/IdIcon";
import ImageIcon from "@/shared/components/svg/ImageIcon";
import ButtonGradient from "@/shared/components/ui/Button/ButtonGradientSmall";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useKyc } from "../model/useKyc";
import { User } from "@/features/auth/model/types";
import { VerificationStatus } from "../model/types";

const VerificationBlock = ({ user }: { user: User }) => {

    const { t } = useTranslation("common");
    const { createMutation } = useKyc();

    const [documentFile, setDocumentFile] = useState<File | null>(null);
    const [selfieFile, setSelfieFile] = useState<File | null>(null);

    const documentInputRef = useRef<HTMLInputElement>(null);
    const selfieInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = () => {
        if (!documentFile || !selfieFile) return;

        const formData = new FormData();

        formData.append("documentFile", documentFile);
        formData.append("selfiFile", selfieFile);

        createMutation.mutate(formData);
    };
    if (user.verification?.status === VerificationStatus.IN_PROGRESS || user.verification?.status === VerificationStatus.VERIFIED) return <></>
    return (
        <div className="max-w-5xl mx-auto bg-[#F9F9F9] dark:bg-[#1A1A1A] rounded-[40px] p-12 shadow-sm font-sans text-[#333] dark:text-white">
            <h1 className="text-4xl font-bold mb-10">
                {t("profilePage.verification.title")}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div className="space-y-3">
                        <label className="block text-lg font-medium ml-2">
                            {t("profilePage.verification.passport_label")}
                        </label>

                        <input
                            ref={documentInputRef}
                            type="file"
                            className="hidden"
                            onChange={(e) =>
                                setDocumentFile(e.target.files?.[0] || null)
                            }
                        />

                        <div
                            className="relative flex-grow cursor-pointer"
                            onClick={() => documentInputRef.current?.click()}
                        >
                            <input
                                type="text"
                                value={documentFile?.name || ""}
                                placeholder={t(
                                    "profilePage.verification.select_file"
                                )}
                                className="w-full bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-full py-4 px-6 pr-12 cursor-pointer"
                                readOnly
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <ImageIcon />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="block text-lg font-medium ml-2">
                            {t("profilePage.verification.selfie_label")}
                        </label>

                        <input
                            ref={selfieInputRef}
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) =>
                                setSelfieFile(e.target.files?.[0] || null)
                            }
                        />

                        <div
                            className="relative flex-grow cursor-pointer"
                            onClick={() => selfieInputRef.current?.click()}
                        >
                            <input
                                type="text"
                                value={selfieFile?.name || ""}
                                placeholder={t(
                                    "profilePage.verification.select_file"
                                )}
                                className="w-full bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-full py-4 px-6 pr-12 cursor-pointer"
                                readOnly
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <IdIcon />
                            </div>
                        </div>
                    </div>

                    <ButtonGradient
                        text={
                            createMutation.isPending
                                ? t("common.loading")
                                : t("profilePage.verification.upload_btn")
                        }
                        onClick={handleSubmit}
                        disabled={
                            !documentFile ||
                            !selfieFile ||
                            createMutation.isPending
                        }
                    />
                </div>

                <div className="flex flex-col justify-center">
                    <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                        {t("profilePage.verification.info_text")}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VerificationBlock;