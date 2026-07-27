import { Head, Html, Main, NextScript } from "next/document";
import type { DocumentContext, DocumentProps } from "next/document";

export default function Document(props: DocumentProps & { locale?: string }) {
  return (
    <Html lang={props.locale ?? "en"}>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <script src="https://accounts.google.com/gsi/client" async defer />
      </Head>
      <body className="relative">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await ctx.defaultGetInitialProps(ctx);
  return { ...initialProps, locale: ctx.locale ?? ctx.defaultLocale ?? "en" };
};