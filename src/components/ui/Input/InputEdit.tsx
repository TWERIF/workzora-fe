import React, { InputHTMLAttributes, ReactNode } from 'react';
import { useTheme } from 'next-themes';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    isFullWidth?: boolean;
    icon?: ReactNode; // Опціональна іконка
}

const InputEdit = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, isFullWidth, icon, className = '', ...props }, ref) => {
        const { theme } = useTheme();
        const isDark = theme === 'dark';

        return (
            <div className={`flex flex-col gap-2 ${isFullWidth ? 'w-full' : ''}`}>
                {label && (
                    <label className={`text-sm font-semibold opacity-70 transition-colors ${isDark ? 'text-white' : 'text-[#333333]'}`}>
                        {label}
                    </label>
                )}

                <div className="relative w-full">
                    <input
                        ref={ref}
                        className={`
              w-full p-4 rounded-2xl border outline-none transition-all duration-300
              ${icon ? 'pr-12' : ''}  /* Додаємо відступ справа, якщо є іконка */
              ${isDark
                                ? "bg-[#1A1A1A] border-white/10 text-white placeholder:text-gray-600 focus:border-success focus:ring-1 focus:ring-success"
                                : "bg-gray-50 border-gray-100 text-[#333333] placeholder:text-gray-400 focus:border-[#7EA310] focus:ring-1 focus:ring-[#7EA310]"}
              ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
              ${className}
            `}
                        {...props}
                    />

                    {/* Контейнер для іконки */}
                    {icon && (
                        <div className={`
              absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center
              ${isDark ? 'text-white/50' : 'text-gray-400'}
            `}>
                            {icon}
                        </div>
                    )}
                </div>

                {error && (
                    <span className="text-xs text-red-500 font-medium px-1">
                        {error}
                    </span>
                )}
            </div>
        );
    }
);

InputEdit.displayName = 'InputEdit';

export default InputEdit;