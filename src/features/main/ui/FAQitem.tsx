import IconArrow from "@/shared/components/svg/IconArrow";

interface Props {
    question: string;
    answer: string;
    isOpen: boolean;
    handleToggle: () => void;
}

export const FAQItem = ({ question, answer, isOpen, handleToggle }: Props) => {
    // Видаляємо використання useTheme(), щоб компонент не перемальовувався при зміні теми

    return (
        /* Фіксуємо bg-white та shadow незалежно від теми */
        <div className={`p-5 w-full rounded-3xl transition-all duration-300 ease-in-out bg-white shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)] border border-gray-100`}>
            <button
                onClick={handleToggle}
                className="w-full flex justify-between items-start text-left focus:outline-none"
            >
                {/* Фіксуємо колір тексту text-black */}
                <span className="text-lg font-medium pr-4 leading-tight min-h-[3rem] flex items-center text-black">
                    {question}
                </span>

                <span className={`transform transition-transform duration-500 flex-shrink-0 mt-2 ${isOpen ? 'rotate-180' : ''}`}>
                    <IconArrow />
                </span>
            </button>

            <div
                className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
                    }`}
            >
                <div className="overflow-hidden">
                    {/* Фіксуємо колір тексту text-gray-600 та колір лінії border-gray-100 */}
                    <p className="border-t pt-4 leading-relaxed text-gray-600 border-gray-100">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    );
};