import Head from "next/head";
import { useTranslation } from "react-i18next";

interface PageMetaProps {
  page: string;
  noindex?: boolean;
  params?: Record<string, string>;
}

export default function PageMeta({ page, noindex = false, params }: PageMetaProps) {
  const { t } = useTranslation("seo");
  const title = `${t(`${page}.title`, params)} | Workzora`;
  const description = t(`${page}.description`, params);

  return (
    <Head>
      <title key="title">{title}</title>
      <meta key="description" name="description" content={description} />
      <meta key="og:title" property="og:title" content={title} />
      <meta key="og:description" property="og:description" content={description} />
      {noindex && <meta key="robots" name="robots" content="noindex, nofollow" />}
    </Head>
  );
}
