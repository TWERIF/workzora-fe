"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import IconArrowSmall from "../svg/IconArrowSmall";

// Створюємо тип для кастомних хлібних крихт
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  customItems?: BreadcrumbItem[]; // Робимо пропс необов'язковим
}

const Breadcrumbs = ({ customItems }: BreadcrumbsProps) => {
  const { t } = useTranslation("common");
  const pathname = usePathname();

  const commonOpacity = "opacity-80";

  // ВАРІАНТ 1: ЯКЩО ПЕРЕДАНІ КАСТОМНІ КРИХТИ (для чату)
  if (customItems && customItems.length > 0) {
    return (
      <nav aria-label="Breadcrumb" className="mb-6 my-4">
        <ol className="flex flex-wrap items-center gap-2 text-sm">
          {customItems.map((item, index) => {
            const isLast = index === customItems.length - 1;

            return (
              <li key={index} className="flex items-center gap-2">
                {index > 0 && (
                  <span className={commonOpacity}>
                    <IconArrowSmall color="currentColor" />
                  </span>
                )}

                {isLast || !item.href ? (
                  // Останній елемент (або без посилання) не клікабельний
                  <span
                    className={`${commonOpacity} capitalize font-medium line-clamp-1 max-w-[250px]`}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className={`text-inherit ${commonOpacity} hover:opacity-100 transition-opacity capitalize`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }

  // ВАРІАНТ 2: СТАНДАРТНА ЛОГІКА (якщо customItems немає)
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <nav aria-label="Breadcrumb" className="mb-6 my-4">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {/* Головна сторінка */}
        <li className="flex items-center">
          <Link
            href="/"
            className={`text-inherit ${commonOpacity} hover:opacity-100 transition-opacity font-medium`}
          >
            {t("breadcrumbs.home") || "Home"}
          </Link>
        </li>

        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
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
