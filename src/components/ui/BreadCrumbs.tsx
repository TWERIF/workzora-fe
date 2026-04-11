'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import IconArrow from '@/components/svg/IconArrow'; // Використовуємо вашу іконку стрілки
import IconArrowSmall from '../svg/IconArrowSmall';

const Breadcrumbs = () => {
    const { t } = useTranslation('common');
    const pathname = usePathname();

    // Розбиваємо шлях на сегменти та видаляємо порожні
    const pathSegments = pathname.split('/').filter((segment) => segment !== '');
    console.log(pathSegments)
    return (
        <nav aria-label="Breadcrumb" className="mb-6 my-4">
            <ol className="flex items-center space-x-2 text-sm">
                {/* Головна сторінка завжди перша */}
                <li>
                    <Link
                        href="/"
                        className="text-gray-500 hover:text-[#7EA310] dark:text-gray-400 dark:hover:text-success transition-colors"
                    >
                        {t('breadcrumbs.home') || 'Home'}
                    </Link>
                </li>

                {pathSegments.map((segment, index) => {
                    const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
                    // const isLast = index === pathSegments.length - 1;
                    console.log(href)

                    return (
                        <li key={href} className="flex items-center space-x-2">
                            <IconArrowSmall />

                            <Link
                                href={href}
                                className="text-gray-500 text-sm hover:text-[#7EA310] dark:text-gray-400 dark:hover:text-success transition-colors capitalize"
                            >
                                {t(`breadcrumbs.${segment}`) || segment}
                            </Link>

                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;