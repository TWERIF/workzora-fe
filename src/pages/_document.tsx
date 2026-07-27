import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {

  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon1.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        />
      </Head>
      <body
        className="relative"
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
