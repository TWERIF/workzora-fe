import Header from '@/components/ui/Header/Header';
import '@/styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import '../i18n';
import i18n from '../i18n';

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

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      {showHeader && <Header />}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default appWithTranslation(App);
