import Head from "next/head";
import { useTranslation } from "react-i18next";

interface PageMetaProps {
  page: string;
  noindex?: boolean;
}

export default function PageMeta({ page, noindex = false }: PageMetaProps) {
  const { t } = useTranslation("seo");
  const title = `${t(`${page}.title`)} | Workzora`;
  const description = t(`${page}.description`);

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
