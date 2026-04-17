import IconSupport from '@/shared/components/svg/IconSupport'
import Breadcrumbs from '@/shared/components/ui/BreadCrumbs'
import ButtonGradient from '@/shared/components/ui/Button/ButtonGradientSmall'
import Input from '@/shared/components/ui/Input/Input'
import { useState } from 'react'
import Avatar from '../../../../public/images/profileIcon.png'
import Message from './Message'
import { useTheme } from 'next-themes'
import { useTranslation } from 'react-i18next' // Додано імпорт

const mockMessages = [
    {
        id: '1',
        text: 'Привіт! Як просувається розробка на Next.js?',
        senderName: 'Олександр',
        senderAvatar: Avatar,
        timestamp: '14:20',
        isMe: false,
    },
    {
        id: '2',
        text: 'Привіт! Все супер, якраз верстаю компоненти повідомлень.',
        senderName: 'Михайло',
        senderAvatar: Avatar,
        timestamp: '14:22',
        isMe: true,
    },
];

export default function Chat() {
    const { t } = useTranslation("common"); // Використовуємо простір імен "chat"
    const [searchInput, setSearchInput] = useState("")
    const [newMessage, setNewMessage] = useState("")
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // Дані тепер також локалізовані через t()


    return (<>
        <div className={`pt-1 min-h-screen pb-14 transition-colors duration-300 ${isDark ? "bg-[#2A2A2A]" : "bg-[#F7F7F7]"}`}>
            <div className='mx-auto max-w-[950px] mb-4'>
                <Breadcrumbs />
                <div className={`mx-auto rounded-xl p-5 max-w-[950px]  transition-colors duration-300 ${isDark ? "bg-[#333333] text-white" : "bg-white text-[#333333]"}`}>
                    <div className='text-[40px] mb-6 font-bold'>{t('chat.title')}</div>

                    <div className='flex gap-8'>
                        <Input
                            value={searchInput}
                            setValue={(value) => { setSearchInput(value) }}
                            placeholder={t('chat.searchPlaceholder')}
                        />
                        <ButtonGradient text={t('chat.searchBtn')} onClick={() => { }} />
                    </div>

                    <div className='mt-14'>
                        <div className='flex justify-between mb-4 flex-wrap gap-4'>
                            <div className={`text-2xl font-medium ${isDark ? "text-gray-100" : "text-[#333333]"}`}>
                                I’m looking for someone to design a logo for my new brand.
                            </div>
                            <button className='text-[#B22234] text-base flex items-center gap-2 hover:opacity-80 transition-opacity'>
                                <IconSupport />
                                <span>{t('chat.inviteSupport')}</span>
                            </button>
                        </div>

                        <div className={`p-6 rounded-2xl flex flex-col h-[600px] transition-colors duration-300 ${isDark ? "bg-[#252525]" : "bg-[#F7F7F7]"}`}>

                            {mockMessages.length > 0 ?
                                (<div className="flex-1 overflow-y-auto mb-6 pr-2 custom-scrollbar">
                                    {mockMessages.map((msg) => (
                                        <Message key={msg.id} {...msg} />
                                    ))}
                                </div>) : (
                                    <div className={`text-center py-10 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                                        {t('chat.emptyMessages')}
                                    </div>
                                )
                            }

                            <div className={`flex items-center gap-3 pl-4 pr-2 py-2 rounded-[100px] border shadow-sm mt-auto transition-colors duration-300 ${isDark ? "bg-[#333333] border-[#444444]" : "bg-white border-[#E5E5E5]"
                                }`}>

                                <button className={`${isDark ? "text-gray-400 hover:text-white" : "text-[#A0A1A3] hover:text-gray-700"} transition-colors`}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                                    </svg>
                                </button>

                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder={t('chat.inputPlaceholder')}
                                    className={`flex-1 bg-transparent outline-none text-base py-2 transition-colors ${isDark ? "text-white placeholder-gray-500" : "text-[#333333] placeholder-gray-400"
                                        }`}
                                />

                                <button
                                    className="w-[44px] h-[44px] rounded-full bg-gradient flex items-center justify-center text-white flex-shrink-0 hover:opacity-90 transition-opacity shadow-md"
                                    onClick={() => {
                                        if (newMessage.trim()) {
                                            setNewMessage("");
                                        }
                                    }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    </>
    )
}