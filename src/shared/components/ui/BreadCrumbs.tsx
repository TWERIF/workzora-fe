'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import IconArrowSmall from '../svg/IconArrowSmall';

const Breadcrumbs = () => {
    const { t } = useTranslation('common');
    const pathname = usePathname();

    const pathSegments = pathname.split('/').filter((segment) => segment !== '');

    // Використовуємо прозорість для всього рядка, щоб він м'яко лягав на будь-який фон
    const commonOpacity = "opacity-80";

    return (
        <nav aria-label="Breadcrumb" className="mb-6 my-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
                {/* Головна сторінка */}
                <li className="flex items-center">
                    <Link
                        href="/"
                        className={`text-inherit ${commonOpacity} hover:opacity-100 transition-opacity font-medium`}
                    >
                        {t('breadcrumbs.home') || 'Home'}
                    </Link>
                </li>

                {pathSegments.map((segment, index) => {
                    const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathSegments.length - 1;

                    return (
                        <li key={href} className="flex items-center gap-2">
                            <span className={commonOpacity}>
                                <IconArrowSmall color="currentColor" />
                            </span>

                            {isLast ? (
                                <span className={`${commonOpacity} capitalize`}>
                                    {t(`breadcrumbs.${segment}`) || segment}
                                </span>
                            ) : (
                                <Link
                                    href={href}
                                    className={`text-inherit ${commonOpacity} hover:opacity-100 transition-opacity capitalize`}
                                >
                                    {t(`breadcrumbs.${segment}`) || segment}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;