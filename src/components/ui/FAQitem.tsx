import IconArrow from "../svg/IconArrow";

export const FAQItem = ({ question, answer, isOpen, handleToggle }: any) => {

    return (
        <div className="p-5 w-full bg-white rounded-3xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out">
            <button
                onClick={handleToggle}
                className="w-full flex justify-between items-start text-left focus:outline-none"
            >
                <span className="text-lg font-medium pr-4 leading-tight min-h-[3rem] flex items-center">
                    {question}
                </span>
                <span className={`transform transition-transform duration-500 flex-shrink-0 mt-2 ${isOpen ? 'rotate-180' : ''}`}>
                    <IconArrow />
                </span>
            </button>

            {/* Використовуємо grid для анімації висоти (це плавніший спосіб, ніж max-height).
         Ми також додаємо невеликий padding, щоб текст не "прилипав".
      */}
            <div
                className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
                    }`}
            >
                <div className="overflow-hidden">
                    <p className="text-gray-600 border-t pt-4 leading-relaxed">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    );
};