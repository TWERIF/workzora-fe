import { useTheme } from 'next-themes'
import React from 'react'

export default function FooterMeta({ info }) {
    const { theme } = useTheme()
    const isDark = theme == "dark"
    return (
        <section className={` py-10  ${isDark ? "bg-[#333333] text-white" : "border-t border-gray-200 bg-white text-[#333333]"}`}>
            <div className="container mx-auto px-4 flex  justify-between gap-8">

                {/* Статистика (чорні числа на білому фоні) */}
                <div className="flex flex-wrap  gap-12 md:gap-24 text-center">
                    <div className="flex flex-col gap-1">
                        <span className="text-2xl md:text-3xl font-medium tracking-tight ">
                            {info.registeredUsers}
                        </span>
                        <span className="text-xs md:text-sm font-medium  uppercase tracking-widest">
                            {info.registeredUsersText}
                        </span>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="text-2xl md:text-3xl font-medium tracking-tight ">
                            {info.totalJobs}
                        </span>
                        <span className="text-xs md:text-sm font-medium  uppercase tracking-widest">
                            {info.totalJobsText}
                        </span>
                    </div>

                </div>
                {/* Юридичний текст */}
                <div className="flex flex-col items-center gap-1 text-center  text-base ">
                    <p className="font-medium">{info.trademark}</p>
                    <p>{info.copyright}</p>
                </div>

            </div>
        </section>
    )
}
