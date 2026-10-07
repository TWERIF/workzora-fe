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
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {noindex && <meta name="robots" content="noindex" />}
    </Head>
  );
}
