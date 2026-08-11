import { Icon } from "@iconify/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { PortfolioItem } from "../model/types";

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  initialData?: PortfolioItem | null;
  isLoading: boolean;
}

export default function PortfolioModal({ isOpen, onClose, onSubmit, initialData, isLoading }: PortfolioModalProps) {
  const { t } = useTranslation("profile");

  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      title: "",
      description: "",
      image: undefined as FileList | undefined,
    }
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        title: initialData?.title || "",
        description: initialData?.description || "",
        image: undefined,
      });
    }
  }, [initialData, isOpen, reset]);

  if (!isOpen) return null;

  const submitHandler = (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    onSubmit(formData);

  };
  const selectedFile = watch("image");

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-bg-modalDark w-full max-w-lg rounded-20 shadow-input-dark overflow-hidden text-text dark:text-text-dark">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h3 className="text-xl font-bold">
            {initialData ? t("portfolioModal.modalTitleEdit") : t("portfolioModal.modalTitleAdd")}
          </h3>
          <button onClick={onClose} type="button" className="text-text-muted hover:text-error transition-colors">
            <Icon icon="lucide:x" className="text-2xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className="p-6 space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-muted">{t("portfolioModal.labelTitle")}</label>
            <input
              {...register("title", { required: true })}
              className="w-full px-4 py-2.5 rounded-20 border border-border bg-input dark:bg-input-dark focus:ring-2 focus:ring-success outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-muted">{t("portfolioModal.labelDesc")}</label>
            <textarea
              {...register("description")}
              rows={3}
              className="w-full px-4 py-2.5 rounded-20 border border-border bg-input dark:bg-input-dark focus:ring-2 focus:ring-success outline-none"
            />
          </div>

          {/* Завантаження картинки */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-muted">{t("portfolioModal.labelImage")}</label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="w-full px-4 py-2.5 rounded-20 border border-border bg-input dark:bg-input-dark focus:ring-2 focus:ring-success outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-success/10 file:text-success hover:file:bg-success/20 cursor-pointer"
            />

            {/* Повідомлення, якщо ми в режимі редагування і фото вже є, але нове не вибрано */}
            {initialData?.imageUrl && (!selectedFile || selectedFile.length === 0) && (
              <span className="text-xs text-text-muted ml-2">
                Поточне фото завантажено. Оберіть нове, щоб замінити його.
              </span>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-border rounded-20 hover:bg-bg dark:hover:bg-bg-dark transition-colors"
            >
              {t("portfolioModal.cancel")}
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3 bg-gradient text-white font-semibold rounded-20 shadow-lg shadow-success/30 disabled:opacity-50 flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              {isLoading && <Icon icon="eos-icons:loading" />}
              {t("portfolioModal.save")}
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}