import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function NotFoundPage() {
    const { t } = useTranslation('common');

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-bg dark:bg-bg-dark transition-colors duration-300 px-4">
            <div className="text-center max-w-2xl mx-auto flex flex-col items-center">

                <h1 className="text-[120px] md:text-[180px] font-extrabold leading-none bg-gradient text-transparent bg-clip-text drop-shadow-sm select-none">
                    {t('notFound.title')}
                </h1>

                <div className="mt-4 mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-text dark:text-text-dark mb-4 transition-colors">
                        {t('notFound.subtitle')}
                    </h2>
                    <p className="text-text-muted text-lg md:text-xl max-w-md mx-auto transition-colors">
                        {t('notFound.description')}
                    </p>
                </div>

                <Link
                    href="/"
                    className="
            inline-block 
            bg-gradient 
            text-white 
            font-semibold 
            rounded-20 
            px-15 
            py-13 
            shadow-input 
            dark:shadow-input-dark 
            hover:scale-105 
            hover:opacity-90 
            transition-all 
            duration-300
            active:scale-95
          "
                >
                    {t('notFound.button')}
                </Link>

            </div>
        </div>
    );
}