import Image from 'next/image';
import React from 'react';
import infoImage from './../../../../../public/images/Rectangle 34.png'
import SkillPin from '../SkillPin';

const InfoCard = () => {
    return (
        <div className="w-[285px] text-base bg-white dark:bg-[#222222] rounded-[40px] overflow-hidden shadow-lg border border-gray-100 dark:border-[#333333] transition-all duration-300 hover:shadow-xl">
            {/* Зображення-затичка */}
            <div className="relative w-full">
                <Image src={infoImage} width={285} height={110} alt='info image' />
                {/* Градієнтне накладання (опціонально, як на фото) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Контентна частина */}
            <div className="p-8 flex flex-col gap-4">
                <span className="text-[#7EA310] font-medium">
                    {"It's free and easy!"}
                </span>

                <h3 className="font-bold text-[#333333] dark:text-white leading-tight transition-colors">
                    50 million professionals on demand
                </h3>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors">
                    {"It's free and easy! Get lots of competitive bids that suit your budget in minutes."}
                </p>

                {/* Теги */}
                <div className="flex flex-nowrap gap-2 mt-4">
                    {["webdesign", "design", "web"].map((s, i) => <SkillPin skill={s} key={i} />)}
                </div>
            </div>
        </div>
    );
};

export default InfoCard;