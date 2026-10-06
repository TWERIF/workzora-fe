import ProFeatures from "@/features/pro/ui/ProFeatures";
import ProHero from "@/features/pro/ui/ProHero";
import ProPricing from "@/features/pro/ui/ProPricing";
import { useTranslation } from "react-i18next";
import Head from "next/head";


export default function ProPage() {
  const { t } = useTranslation("pro");

  return (
    <>
      <Head>
        <title>{`WorkZora - ${t("hero.badge")}`}</title>
        <meta name="description" content={t("hero.description")} />
      </Head>

      <div className="py-16 min-h-screen bg-white dark:bg-bg-dark">
        <ProHero />
        <ProFeatures />
        <ProPricing />
      </div>
    </>
  );
}
