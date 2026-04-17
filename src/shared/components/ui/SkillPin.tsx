import { useTheme } from 'next-themes';
import React from 'react'

export default function SkillPin({ skill }: { skill: string }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    return (
        <span
            className={`px-2 py-1 rounded-full text-sm font-medium transition-colors
                                ${isDark
                    ? "bg-[#333333] text-success border border-success/20"
                    : "bg-gray-100 text-gray-700"}`}
        >
            #{skill}
        </span>
    )
}
