import { useTheme } from 'next-themes';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
// Заміни на свої реальні шляхи
import UsdtIcon from '../../svg/UsdtIcon';
import StarIcon from '../../svg/StarIcon';

export default function ProfileCard({ profile }) {
    const { t } = useTranslation("common");
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const {
        name,
        role,
        avatar,
        rating,
        jobsCount,
        skills,
        pricePerHour
    } = profile;

    return (
        <div className={`
            relative rounded-[35px] p-5 md:p-6 transition-all duration-300 
            flex flex-col sm:flex-row gap-5 items-center sm:items-stretch border-2 w-full
            ${isDark
                ? "bg-[#2A2A2A] text-white border-[#7EA310]/20 shadow-xl"
                : "bg-white text-[#333333] border-[#7EA310]/40 shadow-[0px_10px_30px_rgba(0,0,0,0.04)]"}
            hover:border-[#7EA310] group
        `}>

            {/* ЛІВА ЧАСТИНА: АВАТАР */}
            <div className="relative flex-shrink-0">
                <div className="w-[100px] h-[100px] md:w-[115px] md:h-[115px]  overflow-hidden  ">
                    <Image
                        src={avatar || "/images/default-avatar.png"}
                        alt={name}
                        width={115}
                        height={115}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                </div>
                {/* Бейдж верифікації */}
                <div className="absolute -bottom-1 -right-1 bg-[#7EA310] p-1.5 rounded-lg border-2 border-white dark:border-[#2A2A2A] shadow-sm">
                    <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center text-[8px] text-[#7EA310] font-bold">✓</div>
                </div>
            </div>

            {/* СЕРЕДНЯ ЧАСТИНА: ІНФО */}
            <div className="flex-1 flex flex-col min-w-0 text-center sm:text-left">
                <div className="mb-2">
                    <h3 className="text-2xl md:text-2xl font-bold text-[#7EA310] truncate">
                        {name || "Untitled"}
                    </h3>
                    <p className="text-lg font-medium opacity-80 truncate leading-tight">
                        {role}
                    </p>
                </div>

                {/* ТЕГИ/СКІЛИ */}
                <div className="flex flex-nowrap justify-center sm:justify-start gap-1.5 mt-1">
                    {skills?.slice(0, 3)?.map((skill, index) => (
                        <span
                            key={index}
                            className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider
                                ${isDark ? "bg-[#383838] text-[#7EA310]" : "bg-[#F4F7E9] text-[#7EA310]"}`}
                        >
                            {skill}
                        </span>
                    ))}
                    {skills?.length > 3 && (
                        <span className="text-gray-400 text-xs self-center ml-1">+{skills.length - 3}</span>
                    )}
                </div>

                {/* РЕЙТИНГ */}
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-auto pt-4">
                    <div className="flex items-center gap-1 bg-[#7EA310]/10 px-2 py-1 rounded-lg">
                        <StarIcon className="text-[#7EA310] w-4 h-4 fill-current" />
                        <span className="font-bold text-[#7EA310]">{rating || '5.0'}</span>
                    </div>
                    <span className="text-sm opacity-50 whitespace-nowrap">
                        ({jobsCount || 0} {t('jobs') || 'jobs'})
                    </span>
                </div>
            </div>

            {/* ПРАВА ЧАСТИНА: ЦІНА ТА ДІЯ */}
            <div className="flex flex-col items-center sm:items-end justify-between border-t sm:border-t-0  border-gray-100 dark:border-gray-700 pt-4 sm:pt-0 sm:pl-6 min-w-[160px]">
                {/* Блок ціни в один рядок */}
                <div className="flex items-baseline gap-1 text-[#333] dark:text-white">
                    <span className="text-xl font-black">{pricePerHour}</span>
                    <UsdtIcon className="w-5 h-5 self-center" />
                    <span className="text-sm uppercase font-bold opacity-40 tracking-wider ml-1">
                        / Per Hour
                    </span>
                </div>

                <button className="mt-4 sm:mt-8 w-full sm:w-auto bg-gradient-to-r from-[#1D6343] to-[#7EA310] text-white px-8 py-3 rounded-[18px] font-bold text-sm hover:brightness-110 transition-all shadow-md active:scale-95 whitespace-nowrap">
                    View profile
                </button>
            </div>
        </div>
    );
}
