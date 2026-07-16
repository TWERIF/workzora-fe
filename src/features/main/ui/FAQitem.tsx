interface Props {
    question: string;
    answer: string;
    isOpen: boolean;
    handleToggle: () => void;
}

export const FAQItem = ({ question, answer, isOpen, handleToggle }: Props) => {
    return (
        <div className="w-full flex flex-col gap-3">
            {/* Блок питання */}
            <div
                className={`w-full rounded-3xl overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen
                        ? "bg-success shadow-[0px_0px_20px_0px_rgba(0,0,0,0.15)]"
                        : "bg-white dark:bg-bg-dark shadow-input dark:shadow-input-dark border border-border dark:border-transparent"
                }`}
            >
                <button
                    onClick={handleToggle}
                    className="w-full flex justify-between items-center gap-4 text-left px-6 py-5 focus:outline-none"
                >
                    <span
                        className={`text-lg font-semibold leading-tight transition-colors duration-300 ${
                            isOpen ? "text-white" : "text-text dark:text-text-dark"
                        }`}
                    >
                        {question}
                    </span>

                    <span
                        className={`relative flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 transition-colors duration-300 ${
                            isOpen ? "bg-white" : "bg-success"
                        }`}
                    >
                        <span
                            className={`absolute w-3.5 h-[2px] rounded-full transition-colors duration-300 ${
                                isOpen ? "bg-success" : "bg-white"
                            }`}
                        />
                        <span
                            className={`absolute w-3.5 h-[2px] rounded-full rotate-90 transition-all duration-300 ${
                                isOpen ? "bg-success opacity-0 scale-0" : "bg-white opacity-100 scale-100"
                            }`}
                        />
                    </span>
                </button>
            </div>

            {/* Блок відповіді — окрема картка, розкривається під питанням */}
            <div
                className={`grid transition-all duration-500 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
            >
                <div className="overflow-hidden">
                    <div className="w-full rounded-3xl bg-white dark:bg-bg-dark shadow-input dark:shadow-input-dark border border-border dark:border-transparent px-6 py-5">
                        <p className="leading-relaxed text-sm text-text-muted dark:text-text-muted">
                            {answer}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};