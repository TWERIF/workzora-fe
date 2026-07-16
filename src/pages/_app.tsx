import Footer from '@/shared/components/ui/Footer/Footer';
import Header from '@/shared/components/ui/Header/Header';
import Layout from '@/shared/components/ui/Layout/Layout';
import '@/styles/globals.css';
import ReactQueryProvider from '@/utils/providers/QueryClientProvider';
import ThemeProviderGuard from '@/utils/providers/ThemeProviderGuard';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import '../i18n';
import i18n from '../i18n';
import HeaderOld from '@/shared/components/ui/Header/HeaderOld';
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
  const showHeaderNew = pathname==="/";

  return (
    <ReactQueryProvider>

      <ThemeProvider attribute="class" defaultTheme="light">
        <ThemeProviderGuard>
          <Layout>
            {showHeaderNew && <Header />}
            {showHeader && !showHeaderNew && <HeaderOld />}
            <Component {...pageProps} />
            <Footer />
          </Layout>
        </ThemeProviderGuard>
      </ThemeProvider>
    </ReactQueryProvider>
  );
}

export default appWithTranslation(App);
