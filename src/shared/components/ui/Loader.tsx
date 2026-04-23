import React from "react";

export default function Loader() {
  return (
    <div className="flex h-[100dvh] w-full flex-col items-center justify-center bg-[#F7F7F7] dark:bg-[#2A2A2A] transition-colors duration-300">
      <div className="relative flex items-center justify-center">
        {/* Зовнішнє кільце */}
        <div className="h-12 w-12 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
        {/* Внутрішнє кільце, що крутиться */}
        <div className="absolute h-12 w-12 animate-spin rounded-full border-4 border-transparent border-t-blue-600 dark:border-t-blue-500"></div>
      </div>
      <p className="mt-4 text-sm font-medium text-gray-500 dark:text-gray-400 animate-pulse">
        Завантаження чатів...
      </p>
    </div>
  );
}
