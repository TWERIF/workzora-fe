import React from 'react';

interface BidWinnerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading?: boolean;
}

export const BidWinnerModal: React.FC<BidWinnerModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    isLoading
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-bg-modalDark rounded-20 p-6 shadow-input dark:shadow-input-dark max-w-md w-full border border-border dark:border-gray-700">
                <h2 className="text-xl font-bold text-text dark:text-text-dark mb-6 text-center">
                    Ви дійсно хочете вибрати переможцем цього фрилансера?
                </h2>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-6 py-2.5 rounded-full border border-border dark:border-gray-600 text-text dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors w-full sm:w-auto"
                    >
                        Ні
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="px-6 py-2.5 rounded-full bg-success text-white hover:opacity-90 transition-opacity disabled:opacity-50 w-full sm:w-auto"
                    >
                        Так
                    </button>
                </div>
            </div>
        </div>
    );
};