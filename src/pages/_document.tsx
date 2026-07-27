import { Head, Html, Main, NextScript } from "next/document";
import type { DocumentContext, DocumentProps } from "next/document";

export default function Document(props: DocumentProps & { locale?: string }) {
  return (
    <Html lang={props.locale ?? "en"}>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="96x96" href="/icon1.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
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