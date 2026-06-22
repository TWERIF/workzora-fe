import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        />
      </Head>
      <body 
      // className="bg-[#F7F7F7]"
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
