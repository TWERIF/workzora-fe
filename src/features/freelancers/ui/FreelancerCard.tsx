import { TopFreelancer } from "@/features/auth/model/types";
import RatingStarIcon from "@/shared/components/svg/RatingStarIcon";
import VerifiedIcon from "@/shared/components/svg/VerifiedIcon";
import WorkzoraMarkIcon from "@/shared/components/svg/WorkzoraMarkIcon";
import ButtonGradientSmall from "@/shared/components/ui/Button/ButtonGradientSmall";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

interface FreelancerCardProps {
  freelancer: TopFreelancer;
}

export default function FreelancerCard({ freelancer }: FreelancerCardProps) {
  const { t } = useTranslation("topFreelancers");
  const router = useRouter();
  const locale = router.locale ?? "en";

  const gotoProfile = (id: string) => {
    router.push(`/${locale}/public-profile/${id}`)
  }

  const fullName =
    freelancer.name || `${freelancer.firstName} ${freelancer.lastName}`;
  const ratingRounded = Math.round(freelancer.ratings || 0);
  const ratingLabel = (freelancer.ratings || 0)
    .toFixed(1)
    .replace(".", ",");

  return (
    <div className="rounded-3xl bg-bg dark:bg-bg-dark p-5 md:p-6 flex flex-col gap-6 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
        <div className="relative w-16 h-16 shrink-0 rounded-full overflow-hidden bg-input dark:bg-input-dark">
          {freelancer.avatarUrl ? (
            <Image
              src={freelancer.avatarUrl}
              alt={fullName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-muted font-bold text-xl">
              {fullName.charAt(0)}
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-text dark:text-text-dark">
                {fullName}
              </span>
              {freelancer.verification && (
                <>
                  <VerifiedIcon w={18} h={18} />
                  <WorkzoraMarkIcon w={18} h={18} />
                </>
              )}
            </div>

            <div className="flex flex-col sm:flex-col items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <RatingStarIcon key={i} filled={i < ratingRounded} />
                  ))}
                </div>
                <span className="text-sm text-text dark:text-text-dark">
                  <span className="font-bold">{ratingLabel}</span>{" "}
                  <span className="text-text-light dark:text-text-muted">
                    / {t("card.outOf")}
                  </span>
                </span>
              </div>

              <ButtonGradientSmall
                text={t("card.goToProfile")}
                onClick={() => { gotoProfile(freelancer.id) }}
              />
            </div>
          </div>

          {freelancer.position && (
            <p className="text-sm text-text-light dark:text-text-muted leading-relaxed max-w-2xl">
              {freelancer.position}
            </p>
          )}
          <p>
            {/* {freelancer.} */}
          </p>
        </div>
      </div>

      {freelancer.portfolio && (
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-base text-text dark:text-text-dark">
            {t("card.lastWork")}
          </h3>

          <div className="rounded-2xl overflow-hidden bg-input dark:bg-input-dark flex flex-col md:flex-row">
            <div className="relative w-full md:w-[230px] h-[150px] md:h-auto shrink-0">
              <Image
                src={freelancer.portfolio.imageUrl}
                alt={freelancer.portfolio.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 p-4 flex flex-col gap-2">
              <h4 className="font-bold text-text dark:text-text-dark">
                {freelancer.portfolio.title}
              </h4>
              {freelancer.skills && freelancer.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {freelancer.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-1 rounded-full bg-status-successSoft text-success"
                    >
                      #{skill}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-sm text-text-light dark:text-text-muted leading-relaxed">
                {freelancer.portfolio.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
