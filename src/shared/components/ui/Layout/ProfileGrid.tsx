import React from "react";
import { useTranslation } from "react-i18next";
import IconArrow from "../../svg/IconArrow";
import PreviewCardSmall from "../Card/ProfileCardSmall";

interface Props {
  items: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
  }[];
  title: string;
}

export default function ProfileGrid({ items = [], title }: Props) {
  const { t } = useTranslation("common");

  // Вибираємо перші 5 елементів для мобільної версії
  const mobileItems = items.slice(0, 5);

  return (
    <section
      className="flex flex-col gap-6 md:gap-10 lg:gap-12 bg-white p-5 sm:p-8 md:p-14 rounded-[30px] md:rounded-[40px] 
      shadow-[0px_15px_40px_rgba(0,0,0,0.08)] border border-gray-50 mx-auto w-full"
    >
      {/* HEADER */}
      <div className="space-y-1">
        <h2 className="text-3xl sm:text-4xl md:text-[55px] font-bold text-black leading-[1.1] tracking-tight">
          {t(`${title}.top`)}
          <br />
          <span className="text-success">{t(`${title}.role`)}</span>
        </h2>
      </div>

      {/* GRID CONTAINER */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8 sm:gap-8">
        {/* На мобільних (hidden sm:flex) показуємо лише 5. 
           На десктопі (sm:block) показуємо всі.
        */}
        {items.length > 0 ? (
          <>
            {/* Мобільна версія: строго 5 елементів */}
            <div className="contents sm:hidden">
              {mobileItems.map((item) => (
                <div key={`mob-${item.id}`} className="w-full">
                  <PreviewCardSmall preview={item} />
                </div>
              ))}
            </div>

            {/* Десктопна версія: всі елементи */}
            <div className="contents hidden sm:contents">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="transform transition-transform duration-300 hover:-translate-y-1 w-full"
                >
                  <PreviewCardSmall preview={item} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="col-span-full text-gray-400 italic py-10 text-center">
            {t("common.noItems")}
          </p>
        )}

        {/* Кнопка Show All */}
        <div className="flex items-center justify-center">
          <button className="group flex flex-col items-center justify-center gap-3 transition-all">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-2 border-dashed border-success/30 flex items-center justify-center group-hover:border-success group-hover:bg-success/5 transition-all duration-300">
              <div className="transform group-hover:translate-x-1 transition-transform scale-75 sm:scale-100">
                <IconArrow />
              </div>
            </div>
            <span className="text-[10px] sm:text-[12px] text-success font-bold uppercase tracking-widest text-center leading-tight">
              {t("community.showAll")}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
