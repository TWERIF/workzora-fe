import ButtonGradient from "@/shared/components/ui/Button/ButtonGradient";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

interface TrustedFreelancersProps {
    handleReg?: () => void;
}

export default function TrustedFreelancers({ handleReg }: TrustedFreelancersProps) {
    const { t } = useTranslation("main");
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const router = useRouter();
    const locale = router.locale || "en";

    const goToFreelancers = () => {
        if (handleReg) {
            handleReg();
            return;
        }
        router.push(`/${locale}/freelancers`);
    };

    return (
        <section className={`py-16 md:py-20 ${isDark ? "bg-bg-dark text-text-dark" : "bg-bg text-text"}`}>
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
                    <div className="relative w-[260px] h-[260px] md:w-[320px] md:h-[320px] shrink-0 mx-auto">
                        <img
                            src="/images/main/trusted/freelancer-1.png"
                            alt=""
                            className="absolute top-0 left-0 w-[45%] h-[45%] rounded-full object-cover"
                        />
                        <img
                            src="/images/main/trusted/freelancer-2.png"
                            alt=""
                            className="absolute top-0 right-0 w-[45%] h-[45%] rounded-full object-cover"
                        />
                        <img
                            src="/images/main/trusted/freelancer-3.png"
                            alt=""
                            className="absolute bottom-0 left-0 w-[45%] h-[45%] rounded-full object-cover"
                        />
                        <img
                            src="/images/main/trusted/freelancer-4.png"
                            alt=""
                            className="absolute bottom-0 right-0 w-[45%] h-[45%] rounded-full object-cover"
                        />
                        <img
                            src="/images/main/trusted/star.png"
                            alt=""
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[26%] h-[26%]"
                        />
                    </div>

                    <div className="text-center md:text-left max-w-lg">
                        <h2 className="text-2xl md:text-4xl font-bold mb-4">
                            {t("trustedFreelancers.title.line1")}{" "}
                            {t("trustedFreelancers.title.line2")}
                        </h2>
                        <p className="text-text-muted mb-6">
                            {t("trustedFreelancers.description")}
                        </p>
                        <ButtonGradient onClick={goToFreelancers} text={t("hero.HireFreelancerBtn1")} />
                    </div>
                </div>
            </div>
        </section>
    );
}