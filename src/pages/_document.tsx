import Header from "@/components/ui/Header/Header";
import { Html, Head, hero, NextScript } from "next/document";

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
      <body>
        <hero />
        <NextScript />
      </body>
    </Html>
  );
}
