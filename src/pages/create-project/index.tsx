import Link from "next/link";
import { useTranslation } from "react-i18next";

import ProtectedRoute from "@/features/auth/model/protectedRoute";
import { UserRole } from "@/features/auth/model/types";
import CreateProjectForm from "@/features/projects/ui/CreateProjectForm";
import ChevronDownIcon from "@/shared/components/svg/ChevronDownIcon";


export default function CreateProjectPage() {
    const { t } = useTranslation("createProject");

    return (
        <ProtectedRoute role={UserRole.CLIENT}>
            <div className="mx-auto w-full max-w-[1360px] px-4 py-16 ">
                <nav aria-label={t("page.breadcrumb_label")} className="mb-8">
                    <ol className="flex items-center gap-3 text-sm text-text dark:text-text-dark">
                        <li>
                            <Link href="/" className="transition-colors hover:text-success">
                                {t("page.breadcrumb_home")}
                            </Link>
                        </li>
                        <li aria-hidden="true">
                            <ChevronDownIcon className="h-2 w-3 -rotate-90" />
                        </li>
                        <li aria-current="page">{t("page.breadcrumb_current")}</li>
                    </ol>
                </nav>

                <CreateProjectForm />
            </div>
        </ProtectedRoute>
    );
}
