import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import PersonIcon from '@/components/svg/PersonIcon';
import IconCalendar from '@/components/svg/IconCalendar';
import IconViews from '@/components/svg/IconViews';

export default function ProjectCard({ project }) {
    const { t } = useTranslation("common");

    // Припускаємо, що дані приходять через props
    const { title, description, skills, author, createdAt, views } = project;

    return (
        <div className="bg-white rounded-3xl p-6 shadow-[0px_10px_30px_rgba(0,0,0,0.05)] hover:shadow-xl transition-shadow duration-300 flex flex-col gap-5 border border-gray-100">

            {/* HEADER: Title & Skills */}
            <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-bold text-black leading-tight">
                    {title}
                </h3>
                {/* BODY: Description */}
                <p className="text-gray-600 leading-relaxed text-base line-clamp-3">
                    {description}
                </p>

                <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-[#7EA310] rounded-full text-sm font-medium"
                        >
                            #{skill}
                        </span>
                    ))}
                </div>
            </div>


            {/* FOOTER: Author, Date, Views */}
            <div className="pt-5 border-t border-gray-100 flex items-center justify-between text-sm text-[rgba(51,51,51,1)]">

                {/* ЛІВА ЧАСТИНА: Автор та Дата в один ряд */}
                <div className="flex items-center gap-6">

                    {/* Author (тепер теж flex) */}
                    <div className="flex items-center gap-2">
                        <PersonIcon />
                        <span className="  whitespace-nowrap">
                            {author.name}
                        </span>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-1.5">
                        <IconCalendar />
                        <span className="whitespace-nowrap">{createdAt}</span>
                    </div>

                </div>

                {/* ПРАВА ЧАСТИНА: Views */}
                <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-lg">
                    <IconViews />
                    <span className="font-medium text-gray-700">{views}</span>
                </div>

            </div>

        </div >
    );
}