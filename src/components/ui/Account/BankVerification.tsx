import React, { useState } from 'react';
import ButtonGradient from '../Button/ButtonGradient';
import { useTheme } from 'next-themes';

const BankVerification = () => {
    const [selectedBank, setSelectedBank] = useState('Payoneer');
    const { theme } = useTheme();

    const banks = [
        { name: 'Wise', logo: 'https://placehold.co/100x40/transparent/000?text=WISE' },
        { name: 'Payoneer', logo: 'https://placehold.co/100x40/transparent/000?text=Payoneer' },
        { name: 'American Express', logo: 'https://placehold.co/100x40/transparent/000?text=AMEX' },
        { name: 'Приват24', logo: 'https://placehold.co/100x40/transparent/000?text=Privat24' },
        { name: 'monobank', logo: 'https://placehold.co/100x40/transparent/000?text=monobank' },
        { name: 'KredoBank', logo: 'https://placehold.co/100x40/transparent/000?text=KredoBank' },
    ];

    return (
        <div className="max-w-5xl mx-auto bg-white rounded-[40px] p-10 shadow-sm font-sans text-[#333]">
            <h1 className="text-3xl font-bold mb-8">Bank Verification</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Ліва колонка */}
                <div className="space-y-10">

                    {/* Секція Test Payment */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-medium px-2">Make terest payment</h3>
                        <ButtonGradient text="Test Payment" onClick={() => { }} />

                    </div>

                    {/* Секція Bank API (Сітка банків) */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-medium px-2">Use bank api</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {banks.map((bank) => (
                                <div
                                    key={bank.name}
                                    onClick={() => setSelectedBank(bank.name)}
                                    className={`relative flex flex-col items-center justify-center p-6 h-32 border-[1.5px] rounded-[25px] cursor-pointer transition-all ${selectedBank === bank.name
                                        ? 'border-lime-500 shadow-md'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    {/* Радіо-кнопка вгорі */}
                                    <div className="absolute top-3 flex justify-center">
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedBank === bank.name ? 'border-lime-500' : 'border-gray-200'
                                            }`}>
                                            {selectedBank === bank.name && (
                                                <div className="w-3 h-3 bg-lime-500 rounded-full" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Логотип (Placeholder) */}
                                    <div className="mt-6 flex items-center justify-center w-full">
                                        <img src={bank.logo} alt={bank.name} className="max-h-8 object-contain grayscale opacity-80" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Права колонка (Тексти) */}
                <div className="flex flex-col space-y-20 pt-2">
                    <p className="text-gray-600 text-lg leading-relaxed">
                        All data after verification is automatically transferred from our server.
                        All data after verification is automatically transferred from our server.
                        from our server.
                    </p>

                    <p className="text-gray-600 text-lg leading-relaxed">
                        All data after verification is automatically transferred from our server.
                        All data after verification is automatically transferred from our server.
                        All data after verification is automatically transferred from our server.
                        All data after verification is automatically transferred from our server.
                        All data after verification is automatically transferred from our server.
                        All data after verification is automatically transferred from our server.
                        All data after verification is automatically transferred from our server.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BankVerification;