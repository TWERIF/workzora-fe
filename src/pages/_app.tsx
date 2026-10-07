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
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

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

  const noHeaderRoutes = ['/registration', '/login', '/forgot-password'];

  const showChrome = !noHeaderRoutes.includes(pathname);

  return (
    <ReactQueryProvider>
      <style jsx global>{`
        :root {
          --font-poppins: ${poppins.style.fontFamily};
          --font-manrope: ${manrope.style.fontFamily};
        }
      `}</style>
      <ThemeProvider attribute="class" defaultTheme="light">
        <I18nextProvider i18n={getI18n(locale ?? 'en')}>
          <Layout>
            {showChrome && <Header />}
            <div className="font-sans">
              <Component {...pageProps} />
            </div>
            {showChrome && <Footer />}
            <Toaster position="top-right" richColors offset={112} style={{ zIndex: 10001 }} />
            <Hotjar />
            <VisitTracker />
          </Layout>
        </I18nextProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  );
}

export default appWithTranslation(App);