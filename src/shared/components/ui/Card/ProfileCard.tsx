import { useTheme } from "next-themes";
import Image from "next/image";
import { User } from "@/features/auth/model/types";
import StarIcon from "../../svg/StarIcon";
import UsdtIcon from "../../svg/UsdtIcon";
import placeHolderAvatar from "../../../../../public/images/avatar_placeholder.png";

export default function ProfileCard({ profile }: { profile: User }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const avatar = profile.avatarUrl || placeHolderAvatar;
  return (
    <div
      className={`
        relative rounded-[24px] md:rounded-[35px] p-4 md:p-6 transition-all duration-300 border-2 w-full
        ${
          isDark
            ? "bg-[#2A2A2A] text-white shadow-xl"
            : "bg-white text-[#333333] shadow-[0px_10px_30px_rgba(0,0,0,0.04)]"
        }
        block sm:grid sm:grid-cols-[auto_1fr_auto] sm:gap-x-6 sm:gap-y-2
      `}
    >
      {/* 1. АВАТАР */}
      {/* Мобілка: обтікається зліва. Десктоп: 1-ша колонка, займає 3 рядки */}
      <div className="relative float-left mr-3 mb-1 sm:float-none sm:col-start-1 sm:row-span-3 w-fit flex-shrink-0 z-10">
        <div className="w-[75px] h-[75px] md:w-[115px] md:h-[115px] overflow-hidden rounded-xl md:rounded-2xl border border-gray-100 dark:border-gray-800">
          <Image
            src={avatar}
            alt={profile.firstName}
            width={115}
            height={115}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="absolute -bottom-1 -right-1 bg-[#7EA310] p-1 md:p-1.5 rounded-lg border-2 border-white dark:border-[#2A2A2A] shadow-sm z-10">
          <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-white rounded-full flex items-center justify-center text-[6px] md:text-[8px] text-[#7EA310] font-bold">
            ✓
          </div>
        </div>
      </div>

      {/* 2. ІМ'Я ТА РОЛЬ */}
      {/* Мобілка: після аватара. Десктоп: 2-га колонка, 1-й рядок */}
      <div className="mb-2 sm:mb-0 sm:col-start-2 sm:row-start-1 sm:self-start">
        <h3 className="text-lg md:text-2xl font-bold text-[#7EA310] leading-tight break-words">
          {profile.firstName} {profile.lastName}
        </h3>
        <p className="text-sm md:text-lg font-medium opacity-80 leading-snug">
          {profile.role}
        </p>
      </div>

      {/* 3. РЕЙТИНГ */}
      {/* Мобілка: поруч з ціною (inline-flex). Десктоп: 2-га колонка, 3-й рядок (під скілами) */}
      <div className="inline-flex sm:flex items-center gap-1 bg-[#7EA310]/10 px-2 py-1 rounded-lg mr-4 mb-2 sm:mr-0 sm:mb-0 sm:col-start-2 sm:row-start-3 sm:self-end w-fit">
        <StarIcon />
        <span className="font-bold text-[#7EA310] text-sm md:text-base">
          {profile.ratings || "0"}
        </span>
      </div>

      {/* 4. ЦІНА */}
      {/* Мобілка: поруч з рейтингом. Десктоп: 3-тя колонка, 2-й рядок (над кнопкою) */}
      <div className="inline-flex sm:flex items-baseline gap-1 text-[#333] dark:text-white mb-2 sm:mb-0 sm:col-start-3 sm:row-start-2 sm:justify-self-end sm:self-end">
        <span className="text-lg md:text-xl font-black">{profile.rates}</span>
        <UsdtIcon />
        <span className="text-[10px] md:text-xs uppercase font-bold opacity-40 tracking-wider ml-0.5">
          / Hr
        </span>
      </div>

      {/* 5. СКІЛИ */}
      {/* Мобілка: після ціни. Десктоп: 2-га колонка, 2-й рядок */}
      <div className="block sm:flex flex-wrap gap-1.5 mb-3 sm:mb-0 sm:col-start-2 sm:row-start-2 sm:self-center">
        {profile.skills?.slice(0, 3)?.map((skill, index) => (
          <span
            key={index}
            className={`px-2 md:px-3 py-0.5 rounded-full text-[9px] md:text-xs font-semibold uppercase tracking-wider inline-block sm:block
              ${isDark ? "bg-[#383838] text-[#7EA310]" : "bg-[#F4F7E9] text-[#7EA310]"}`}
          >
            {skill}
          </span>
        ))}
        {profile.skills?.length > 3 && (
          <span className="text-gray-400 text-[10px] sm:self-center ml-1 inline-block">
            +{profile.skills.length - 3}
          </span>
        )}
      </div>

      {/* 6. КНОПКА VIEW PROFILE */}
      {/* Мобілка: в самому низу на всю ширину. Десктоп: 3-тя колонка, 3-й рядок (під ціною) */}
      <button className="block w-full sm:w-auto bg-gradient-to-r from-[#1D6343] to-[#7EA310] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-[14px] md:rounded-[18px] font-bold text-xs md:text-sm hover:brightness-110 transition-all shadow-md active:scale-95 whitespace-nowrap mt-1 sm:mt-0 sm:col-start-3 sm:row-start-3 sm:justify-self-end sm:self-end">
        View profile
      </button>
    </div>
  );
}
