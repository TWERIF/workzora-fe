import React from 'react';
import ButtonGradient from '../Button/ButtonGradient';

const VerificationAccount = () => {
    return (
        <div className="max-w-5xl mx-auto bg-[#F9F9F9] rounded-[40px] p-12 shadow-sm font-sans text-[#333]">
            <h1 className="text-4xl font-bold mb-10">Verification Account</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Ліва колонка: Форми завантаження */}
                <div className="space-y-8">

                    {/* Секція 1: Паспорт */}
                    <div className="space-y-3">
                        <label className="block text-lg font-medium ml-2">
                            Upload youre passport/ID card
                        </label>
                        <div className="flex items-center gap-4">
                            <div className="relative flex-grow">
                                <input
                                    type="text"
                                    placeholder="Select file"
                                    className="w-full bg-white border border-gray-300 rounded-full py-4 px-6 pr-12 focus:outline-none focus:ring-2 focus:ring-lime-500"
                                    readOnly
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    {/* Placeholder для іконки картинки */}
                                    <div className="w-6 h-6 border-2 border-gray-300 rounded-md" />
                                </div>
                            </div>
                            <ButtonGradient text="Upload" onClick={() => { }} />
                        </div>
                    </div>

                    {/* Секція 2: Селфі */}
                    <div className="space-y-3">
                        <label className="block text-lg font-medium ml-2">
                            Make selfie with id's
                        </label>
                        <div className="flex items-center gap-4">
                            <div className="relative flex-grow">
                                <input
                                    type="text"
                                    placeholder="Select file"
                                    className="w-full bg-white border border-gray-300 rounded-full py-4 px-6 pr-12 focus:outline-none focus:ring-2 focus:ring-lime-500"
                                    readOnly
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    {/* Placeholder для іконки камери/телефона */}
                                    <div className="w-5 h-8 border-2 border-gray-300 rounded-lg relative">
                                        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-gray-300 rounded-full" />
                                    </div>
                                </div>
                            </div>
                            <ButtonGradient text="Make foto" onClick={() => { }} />

                        </div>
                    </div>
                </div>

                {/* Права колонка: Інфо-текст */}
                <div className="flex flex-col justify-center">
                    <p className="text-lg leading-relaxed text-gray-600">
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

export default VerificationAccount;