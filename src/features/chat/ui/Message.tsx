import Image from 'next/image';
import React from 'react';
import { useTheme } from 'next-themes';

interface MessageProps {
    id: string;
    text: string;
    senderName: string;
    senderAvatar: string;
    timestamp: string;
    isMe: boolean;
}

const Message: React.FC<MessageProps> = ({
    text,
    senderName,
    senderAvatar,
    timestamp,
    isMe
}) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className={`flex w-full items-end gap-3 mb-6 rounded-2xl px-5 py-3 transition-colors duration-300 
            ${isMe
                ? (isDark ? 'flex-row-reverse bg-[#333333]' : 'flex-row-reverse bg-white')
                : 'flex-row'
            }`}
        >
            <div className={`flex flex-col max-w-[70%] ${isMe ? 'items-end' : 'items-start'}`}>
                <div className='flex'>
                    {/* Інфо над повідомленням */}
                    <div className={`flex gap-2 mb-1 items-center ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className="flex-shrink-0">
                            <Image
                                width={40}
                                height={40}
                                src={senderAvatar}
                                alt={senderName}
                                className="w-10 h-10 rounded object-cover shadow-sm"
                            />
                        </div>
                        <span className={`text-sm font-semibold transition-colors ${isDark ? "text-gray-100" : "text-[#333333]"
                            }`}>
                            {senderName}
                        </span>
                        <span className={`text-[11px] ${isDark ? "text-gray-500" : "text-gray-400"
                            }`}>
                            {timestamp}
                        </span>
                    </div>
                </div>

                <div className={`mt-1 ${isMe ? 'text-right' : 'text-left'}`}>
                    <p className={`text-base leading-snug break-words transition-colors ${isDark ? "text-gray-200" : "text-[#333333]"
                        }`}>
                        {text}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Message;