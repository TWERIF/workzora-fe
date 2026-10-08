import { IconClose } from "@/shared/components/svg/UiIcons";
import { useEffect, useId } from "react";
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

interface PortfolioFormValues {
  title: string;
  description: string;
  tags: string;
  image: FileList | undefined;
}

const fieldClass =
  "w-full rounded-20 border border-main-10 bg-background px-15 text-sm outline-none transition-colors placeholder:text-main-50 focus:border-primary";

export default function PortfolioModal({ isOpen, onClose, onSubmit, initialData, isLoading }: PortfolioModalProps) {
  const { t } = useTranslation("profile");
  const ids = { title: useId(), description: useId(), tags: useId(), image: useId() };

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<PortfolioFormValues>({
    defaultValues: { title: "", description: "", tags: "", image: undefined },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        title: initialData?.title ?? "",
        description: initialData?.description ?? "",
        tags: (initialData?.tags ?? []).join(", "),
        image: undefined,
      });
    }
  }, [initialData, isOpen, reset]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const submitHandler = (data: PortfolioFormValues) => {
    const formData = new FormData();
    formData.append("title", data.title.trim());
    formData.append("description", data.description.trim());
    formData.append("tags", data.tags);
    if (data.image && data.image.length > 0) formData.append("image", data.image[0]);
    onSubmit(formData);
  };

  const selectedFile = watch("image");
  const hasNewFile = Boolean(selectedFile && selectedFile.length > 0);

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={ids.title + "-heading"}
        onClick={(event) => event.stopPropagation()}
        className="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-[24px] bg-background text-main-100 shadow-input-dark"
      >
        <div className="flex items-center justify-between gap-4 p-6 pb-0">
          <h3 id={ids.title + "-heading"} className="text-xl font-bold">
            {initialData ? t("portfolioModal.modalTitleEdit") : t("portfolioModal.modalTitleAdd")}
          </h3>
          <button onClick={onClose} type="button" aria-label={t("portfolioModal.close")} className="text-main-50 transition-colors hover:text-status-danger">
            <IconClose size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-4 p-6">
          <div className="flex flex-col gap-1.5">
            <label htmlFor={ids.title} className="text-sm">{t("portfolioModal.labelTitle")}*</label>
            <input id={ids.title} maxLength={200} {...register("title", { required: true })} className={`${fieldClass} h-[50px]`} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor={ids.description} className="text-sm">{t("portfolioModal.labelDesc")}</label>
            <textarea id={ids.description} rows={4} maxLength={5000} {...register("description")} className={`${fieldClass} resize-none py-3`} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor={ids.tags} className="text-sm">{t("portfolioModal.labelTags")}</label>
            <input id={ids.tags} maxLength={200} placeholder={t("portfolioModal.tagsPlaceholder")} {...register("tags")} className={`${fieldClass} h-[50px]`} />
            <span className="text-xs text-main-50">{t("portfolioModal.tagsHint")}</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor={ids.image} className="text-sm">
              {t("portfolioModal.labelImage")}
              {!initialData && "*"}
            </label>
            <input
              id={ids.image}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              {...register("image", { validate: (files) => Boolean(initialData) || Boolean(files && files.length > 0) })}
              className={`${fieldClass} cursor-pointer py-2.5 file:mr-4 file:rounded-full file:border-0 file:bg-primary-10 file:px-4 file:py-1.5 file:text-sm file:text-primary`}
            />
            <span className={`text-xs ${errors.image ? "text-status-danger" : "text-main-50"}`}>
              {errors.image
                ? t("portfolioModal.imageRequired")
                : initialData?.imageUrl && !hasNewFile
                  ? t("portfolioModal.currentImage")
                  : t("portfolioModal.imageHint")}
            </span>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="h-[45px] flex-1 rounded-full border border-main-10 text-sm transition-colors hover:bg-main-5">
              {t("portfolioModal.cancel")}
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="h-[45px] flex-1 rounded-full bg-gradient text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {isLoading ? "..." : t("portfolioModal.save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
