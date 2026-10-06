import Hotjar from '@/features/analytics/ui/Hotjar';
import VisitTracker from '@/features/analytics/ui/VisitTracker';
import Footer from '@/shared/components/ui/Footer/Footer';
import Header from '@/shared/components/ui/Header/Header';
import Layout from '@/shared/components/ui/Layout/Layout';
import '@/styles/globals.css';
import ReactQueryProvider from '@/utils/providers/QueryClientProvider';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { Manrope, Poppins } from "next/font/google";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Toaster } from 'sonner';
import '../i18n';
import i18n from '../i18n';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

// One i18n instance per locale (sharing the loaded resources), so a server render of /uk
// is in Ukrainian and concurrent requests in different languages don't switch each other.
const i18nByLocale: Record<string, typeof i18n> = {};
const getI18n = (locale: string) =>
  (i18nByLocale[locale] ??= i18n.cloneInstance({ lng: locale, initImmediate: false }));

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { locale, pathname } = router;

  useEffect(() => {
    if (locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale]);

  const noHeaderRoutes = ['/registration', '/login', '/reserve-email', '/account-type'];

  const showHeader = !noHeaderRoutes.includes(pathname);
  const showHeaderNew = pathname === "/";

  return (
    <ReactQueryProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        <I18nextProvider i18n={getI18n(locale ?? 'en')}>
          <Layout>
            {/* {showHeaderNew &&  */}
            <Header />
            {/* } */}
            {/* {showHeader && !showHeaderNew && <HeaderOld />} */}
            <main className={`${poppins.variable} ${manrope.variable} font-sans`}>
              <Component {...pageProps} />
            </main>
            <Footer />
            <Toaster position="top-right" richColors />
            <Hotjar />
            <VisitTracker />
          </Layout>
        </I18nextProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  );
}

export default appWithTranslation(App);