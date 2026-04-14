import IconSupport from '@/shared/components/svg/IconSupport'
import Breadcrumbs from '@/shared/components/ui/BreadCrumbs'
import ButtonGradient from '@/shared/components/ui/Button/ButtonGradientSmall'
import Input from '@/shared/components/ui/Input/Input'
import { useState } from 'react'
import Avatar from '../../../../public/profileIcon.png'
import Message from './Message'
import { MessageProps } from '../model/types'

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
    const [searchInput, setSearchInput] = useState("")
    const [newMessage, setNewMessage] = useState("") // Стан для тексту в новому інпуті
    const [messages, setMessages] = useState<MessageProps[]>([])


    return (
        <div className='pt-10'>
            <div className='mx-auto rounded-xl p-5 max-w-[950px] container bg-white'>
                <Breadcrumbs />
                <div className='text-[40px] mb-6'>Chat</div>
                <div className='flex gap-8'>
                    <Input
                        value={searchInput}
                        setValue={(value) => { setSearchInput(value) }}
                        placeholder='Search for message'
                    />
                    <ButtonGradient text='Search' onClick={() => { }} />
                </div>

                <div className='my-14'>
                    <div className='flex justify-between mb-4'>
                        <div className='text-2xl font-medium'>I’m looking for someone to design a logo for my new brand.</div>
                        <button className='text-[#B22234] text-base flex items-center gap-2 hover:opacity-80 transition-opacity'>
                            <IconSupport />
                            <span>Invite support for chat</span>
                        </button>
                    </div>

                    {/* Головний контейнер чату (додано flex та висоту) */}
                    <div className="bg-[#F7F7F7] p-6 rounded-2xl flex flex-col h-[600px]">

                        {messages.length > 0 ?
                            (<div className="flex-1 overflow-y-auto mb-6 pr-2 custom-scrollbar">
                                {messages.map((msg) => (
                                    <Message key={msg.id} {...msg} />
                                ))}
                            </div>) : (<div> Повідомлення ще немає</div>)

                        }

                        <div className="flex items-center gap-3 bg-white pl-4 pr-2 py-2 rounded-[100px] border border-[#E5E5E5] shadow-sm mt-auto">

                            {/* Іконка прикріплення файлу */}
                            <button className="text-[#A0A1A3] hover:text-gray-700 transition-colors">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                                </svg>
                            </button>

                            {/* Поле вводу тексту */}
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 bg-transparent outline-none text-base text-text placeholder-text-muted py-2"
                            />

                            {/* Кнопка відправки (використовує твій bg-gradient) */}
                            <button
                                className="w-[44px] h-[44px] rounded-full bg-gradient flex items-center justify-center text-white flex-shrink-0 hover:opacity-90 transition-opacity"
                                onClick={() => {
                                    if (newMessage.trim()) {
                                        console.log("Відправлено:", newMessage);
                                        setNewMessage(""); // Очищаємо інпут після відправки
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
    )
}